'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { PatientContext } from '@/utils/context/physicians/PatientsContext';
import { PtPopContext } from '@/utils/context/physicians/PtsPopContext';
import { EcommContext } from '@/utils/context/physicians/EcommContext';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { getFromLocalStorage } from '@/utils/helpers/auth';
import Spinner from '@/components/global/spinner/Spinner';

export default function DataSetup() {
	const lsUserData = process.env.DATA_PHY;
	const lsDefLoc = process.env.DEFAULT_LOCATION;
	const svdUser = getFromLocalStorage(lsUserData);
	const router = useRouter();
	const { status } = useSession();
	const [_auth, setAuth] = useContext(AuthContext);
	const [_schPatients, setSchPatients] = useContext(PatientContext);
	const [_popPatients, setPopPatients] = useContext(PtPopContext);
	const [_ecomm, setEcomm] = useContext(EcommContext);
	const [_office, setOffice] = useContext(OfficeContext);
	const [_appts, setAppts] = useContext(ApptContext);
	const [loading, setLoading] = useState(true);

	const loadData = useCallback(async () => {
		let user = {};
		let defLoc = '';
		let locsArr = [];
		let locOptsArr = [];
		let userArr = [];
		let rscArr = [];
		let rscOptsArr = [];
		let catsArr = [];
		let svcsArr = [];
		let apptsArr = [];
		let tdyApptsArr = [];

		//set user
		if (!svdUser) {
			const getUser = getFromLocalStorage(lsUserData);
			user = await JSON.parse(getUser);
			setAuth({ user: user });
		} else {
			user = await JSON.parse(svdUser);
		}
		//set default location if already exists
		const svdDefLoc = getFromLocalStorage(lsDefLoc);
		if (svdDefLoc) {
			defLoc = svdDefLoc;
		}
		//set current machine timezone offset
		const dt = new Date();
		const diffTZ = dt.getTimezoneOffset();
		const offset = diffTZ * 60;

		const response = await fetch(`${process.env.API_URL}/private/physicians/loaddata?ofcid=${user.ofcObjId}&offset=${offset}`, {
			method: 'GET',
		});
		const data = await response.json();

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// PATIENT SEARCH
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (data?.arrPtSch) {
			setSchPatients({ patients: data?.arrPtSch, selected: '', filtered: [] });
			setPopPatients({ patients: data?.arrPtSch, selected: '', filtered: [] });
		} else {
			setSchPatients({ patients: [], selected: '', filtered: [] });
			setPopPatients({ patients: [], selected: '', filtered: [] });
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// OFFICE DATA
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//locations
		if (data?.arrLocs) {
			locsArr = data?.arrLocs;
			locOptsArr = data?.arrLocOpts;

			if (!defLoc) {
				defLoc = locsArr[0]._id;
			}
		}
		//users and resource options
		if (data?.arrUsers) {
			userArr = data?.arrUsers;
			rscOptsArr = data?.arrRscOpts;
		}
		//resources
		if (data?.arrRscs) {
			rscArr = data?.arrRscs;
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// ECOMMERCE DATA
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//categories
		if (data?.arrCats) {
			catsArr = data?.arrCats;
		}
		//services
		if (data?.arrSvcs) {
			svcsArr = data?.arrSvcs;
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// APPOINTMENTS
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//all
		if (data?.arrAppts) {
			apptsArr = data?.arrAppts;
		}
		//todays
		if (data?.arrApptsTdy) {
			tdyApptsArr = data?.arrApptsTdy;
		}

		setOffice({
			locations: locsArr,
			selLoc: {},
			locOptions: locOptsArr,
			defLoc: defLoc,
			users: userArr,
			selUser: {},
			resources: rscArr,
			selRscs: [],
			rscOptions: rscOptsArr,
		});
		setEcomm({ cats: catsArr, selCat: '', services: svcsArr, selSvc: '' });
		setAppts({ all: apptsArr, todays: tdyApptsArr, prev: [], selected: {} });
		setLoading(false);
		router.push('/physicians/sphere');
	}, [svdUser, lsDefLoc, lsUserData, router, setAppts, setAuth, setEcomm, setOffice, setSchPatients, setPopPatients]);

	useEffect(() => {
		if (status !== 'authenticated') {
			router.push('/physicians/login');
		}
	}, [status, router]);

	useEffect(() => {
		if (svdUser) {
			const parseUser = async () => {
				const user = await JSON.parse(svdUser);
				setAuth({ user: user });
				loadData();
			};
			parseUser();
		}
	}, [svdUser, setAuth, loadData]);

	return <>{loading && <Spinner />}</>;
}
