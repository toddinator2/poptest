'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';
import Checklist from '../checklist/Checklist';
import General from './general/General';
import Emergency from './emergency/Emergency';
import Pharmacy from './pharmacy/Pharmacy';
import Medications from './medications/Medications';
import Immunizations from './immunizations/Immunizations';
import MedicalHistory from './medicalhistory/MedicalHistory';
import Procedures from './procedures/Procedures';
import Social from './social/Social';
import FamilyHistory from './familyhistory/FamilyHistory';
import Last30 from './last30/Last30';
import Women from './women/health/Women';
import Obgyn from './women/obgyn/Obgyn';
import WmnPrevent from './women/prevent/WmnPrevent';
import WmnSexual from './women/sexual/WmnSexual';
import Menopause from './women/menopause/Menopause';
import Hormone from './women/hormone/Hormone';
import Men from './men/health/Men';
import MenPrevent from './men/prevent/MenPrevent';
import MenUrinary from './men/urinary/MenUrinary';
import MenSexual from './men/sexual/MenSexual';
import Testosterone from './men/testosterone/Testosterone';
import Fitness from './physicalfitness/Fitness';
import AlgMeds from './allergies/medications/AlgMeds';
import AlgFood from './allergies/food/AlgFood';
import AlgEnv from './allergies/environment/AlgEnv';
import AlgSymptoms from './allergies/symptoms/AlgSymptoms';
import AlgCurMeds from './allergies/curmeds/AlgCurMeds';
import Behavioral from './behavioral/Behavioral';
import Chiropractic from './chiropractic/Chiropractic';
import Massage from './massage/Massage';
import PhysicalTherapy from './physicaltherapy/PhysicalTherapy';
import Important from './important/Important';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function MedHist() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [general, setGeneral] = useState(false);
	const [emergency, setEmergency] = useState(false);
	const [pharmacy, setPharmacy] = useState(false);
	const [medications, setMedications] = useState(false);
	const [immunizations, setImmunizations] = useState(false);
	const [medhistory, setMedHistory] = useState(false);
	const [procedures, setProcedures] = useState(false);
	const [social, setSocial] = useState(false);
	const [famhistory, setFamHistory] = useState(false);
	const [last30, setLast30] = useState(false);
	const [wmnhealth, setWmnHealth] = useState(false);
	const [wmnobgyn, setWmnObgyn] = useState(false);
	const [wmnprevent, setWmnPrevent] = useState(false);
	const [wmnsexual, setWmnSexual] = useState(false);
	const [wmnmenopause, setWmnMenopause] = useState(false);
	const [wmnhormone, setWmnHormone] = useState(false);
	const [menhealth, setMenHealth] = useState(false);
	const [menprevent, setMenPrevent] = useState(false);
	const [menurinary, setMenUrinary] = useState(false);
	const [mensexual, setMenSexual] = useState(false);
	const [mentestosterone, setMenTestosterone] = useState(false);
	const [physicalfitness, setPhysicalFitness] = useState(false);
	const [algmeds, setAlgMeds] = useState(false);
	const [algfoods, setAlgFoods] = useState(false);
	const [algenv, setAlgEnv] = useState(false);
	const [algsymptoms, setAlgSymptoms] = useState(false);
	const [algcurmeds, setAlgCurMeds] = useState(false);
	const [behavioral, setBehavioral] = useState(false);
	const [chiropractic, setChiropractic] = useState(false);
	const [massage, setMassage] = useState(false);
	const [physicaltherapy, setPhysicalTherapy] = useState(false);
	const [important, setImportant] = useState(false);

	//Show Divs
	const [shwGeneral, setShwGeneral] = useState(false);
	const [shwEmergency, setShwEmergency] = useState(false);
	const [shwPharmacy, setShwPharmacy] = useState(false);
	const [shwMeds, setShwMeds] = useState(false);
	const [shwImmunizations, setShwImmunizations] = useState(false);
	const [shwMedical, setShwMedical] = useState(false);
	const [shwProcedures, setShwProcedures] = useState(false);
	const [shwSocial, setShwSocial] = useState(false);
	const [shwFamily, setShwFamily] = useState(false);
	const [shwLast30, setShwLast30] = useState(false);
	const [shwWomen, setShwWomen] = useState(false);
	const [shwObgyn, setShwObgyn] = useState(false);
	const [shwWmnPrevent, setShwWmnPrevent] = useState(false);
	const [shwWmnSex, setShwWmnSex] = useState(false);
	const [shwWmnMen, setShwWmnMen] = useState(false);
	const [shwWmnHrt, setShwWmnHrt] = useState(false);
	const [shwMen, setShwMen] = useState(false);
	const [shwMenPrevent, setShwMenPrevent] = useState(false);
	const [shwMenUrinary, setShwMenUrinary] = useState(false);
	const [shwMenSexual, setShwMenSexual] = useState(false);
	const [shwMenTrt, setShwMenTrt] = useState(false);
	const [shwFitness, setShwFitness] = useState(false);
	const [shwAlgMeds, setShwAlgMeds] = useState(false);
	const [shwAlgFood, setShwAlgFood] = useState(false);
	const [shwAlgEnv, setShwAlgEnv] = useState(false);
	const [shwAlgSym, setShwAlgSym] = useState(false);
	const [shwAlgCurMed, setShwAlgCurMed] = useState(false);
	const [shwBehavioral, setShwBehavioral] = useState(false);
	const [shwChiropractic, setShwChiropractic] = useState(false);
	const [shwMassage, setShwMassage] = useState(false);
	const [shwPhysicalTherapy, setShwPhysicalTherapy] = useState(false);
	const [shwImportant, setShwImportant] = useState(false);
	const [chkdMedHist, setChkdMedHist] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// GENERAL FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const historyDone = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/medhistdone`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					subid: auth.user._id,
				}),
			});
			const data = await response.json();

			if (data.status === '200') {
				toast.success(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadMedHist = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/progress/medhist?subid=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setGeneral(data.medhist.general);
				setEmergency(data.medhist.emergency);
				setPharmacy(data.medhist.pharmacy);
				setMedications(data.medhist.medications);
				setImmunizations(data.medhist.immunizations);
				setMedHistory(data.medhist.medicalhistory);
				setProcedures(data.medhist.procedures);
				setSocial(data.medhist.social);
				setFamHistory(data.medhist.familyhistory);
				setLast30(data.medhist.last30);
				setWmnHealth(data.medhist.wmnhealth);
				setWmnObgyn(data.medhist.wmnobgyn);
				setWmnPrevent(data.medhist.wmnprevent);
				setWmnSexual(data.medhist.wmnsexual);
				setWmnMenopause(data.medhist.wmnmenopause);
				setWmnHormone(data.medhist.wmnhormone);
				setMenHealth(data.medhist.menhealth);
				setMenPrevent(data.medhist.menprevent);
				setMenUrinary(data.medhist.menurinary);
				setMenSexual(data.medhist.mensexual);
				setMenTestosterone(data.medhist.mentestosterone);
				setPhysicalFitness(data.medhist.physicalfitness);
				setAlgMeds(data.medhist.algmeds);
				setAlgFoods(data.medhist.algfoods);
				setAlgEnv(data.medhist.algenv);
				setAlgSymptoms(data.medhist.algsymptoms);
				setAlgCurMeds(data.medhist.algcurmeds);
				setBehavioral(data.medhist.behavioral);
				setChiropractic(data.medhist.chiropractic);
				setMassage(data.medhist.massage);
				setPhysicalTherapy(data.medhist.physicaltherapy);
				setImportant(data.medhist.important);
				setChkdMedHist(true);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadMedHist();
	}, [loadMedHist]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchHistory = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const hist = mongodb.db(dbName).collection('subsumedhists');

			for await (const change of hist.watch()) {
				if (change.operationType === 'update') {
					loadMedHist();
				}
			}
		};
		wchHistory();
	}, [dbName, loadMedHist]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHECK PROGRESS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (chkdMedHist) {
			if (
				general &&
				emergency &&
				pharmacy &&
				medications &&
				immunizations &&
				medhistory &&
				procedures &&
				social &&
				famhistory &&
				last30 &&
				physicalfitness &&
				algmeds &&
				algfoods &&
				algenv &&
				algsymptoms &&
				algcurmeds &&
				behavioral &&
				chiropractic &&
				massage &&
				physicaltherapy &&
				important
			) {
				if (auth.user.sex === 'f') {
					if (wmnhealth && wmnobgyn && wmnprevent && wmnsexual && wmnmenopause && wmnhormone) {
						historyDone();
					}
				}
				if (auth.user.sex === 'm') {
					if (menhealth && menprevent && menurinary && mensexual && mentestosterone) {
						historyDone();
					}
				}
			}
		}
	}, [
		auth,
		general,
		emergency,
		pharmacy,
		medications,
		immunizations,
		medhistory,
		procedures,
		social,
		famhistory,
		last30,
		wmnhealth,
		wmnobgyn,
		wmnprevent,
		wmnsexual,
		wmnmenopause,
		wmnhormone,
		menhealth,
		menprevent,
		menurinary,
		mensexual,
		mentestosterone,
		physicalfitness,
		algmeds,
		algfoods,
		algenv,
		algsymptoms,
		algcurmeds,
		behavioral,
		chiropractic,
		massage,
		physicaltherapy,
		important,
		historyDone,
	]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// HANDLE SHOW EDIT DIV FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleEditDiv = (value) => {
		if (value === 'general') {
			setShwGeneral(!shwGeneral);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'emergency') {
			setShwGeneral(false);
			setShwEmergency(!shwEmergency);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'pharmacy') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(!shwPharmacy);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'meds') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(!shwMeds);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'immune') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(!shwImmunizations);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'medical') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(!shwMedical);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'procedures') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(!shwProcedures);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'social') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(!shwSocial);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'family') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(!shwFamily);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'last30') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(!shwLast30);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'women') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(!shwWomen);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'obgyn') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(!shwObgyn);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'wmnprevent') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(!shwWmnPrevent);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'wmnsex') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(!shwWmnSex);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'wmnmen') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(!shwWmnMen);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'wmnhrt') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(!shwWmnHrt);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'men') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(!shwMen);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'menprevent') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(!shwMenPrevent);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'menurinary') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(!shwMenUrinary);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'mensex') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(!shwMenSexual);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'mentrt') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(!shwMenTrt);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'fitness') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(!shwFitness);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'algmeds') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(!shwAlgMeds);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'algfood') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(!shwAlgFood);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'algenv') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(!shwAlgEnv);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'algsym') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(!shwAlgSym);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'algcurmed') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(!shwAlgCurMed);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'behavioral') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(!shwBehavioral);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'chiropractic') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(!shwChiropractic);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'massage') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(!shwMassage);
			setShwPhysicalTherapy(false);
			setShwImportant(false);
		}
		if (value === 'physicaltherapy') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(!shwPhysicalTherapy);
			setShwImportant(false);
		}
		if (value === 'important') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
			setShwProcedures(false);
			setShwSocial(false);
			setShwFamily(false);
			setShwLast30(false);
			setShwWomen(false);
			setShwObgyn(false);
			setShwWmnPrevent(false);
			setShwWmnSex(false);
			setShwWmnMen(false);
			setShwWmnHrt(false);
			setShwMen(false);
			setShwMenPrevent(false);
			setShwMenUrinary(false);
			setShwMenSexual(false);
			setShwMenTrt(false);
			setShwFitness(false);
			setShwAlgMeds(false);
			setShwAlgFood(false);
			setShwAlgEnv(false);
			setShwAlgSym(false);
			setShwAlgCurMed(false);
			setShwBehavioral(false);
			setShwChiropractic(false);
			setShwMassage(false);
			setShwPhysicalTherapy(false);
			setShwImportant(!shwImportant);
		}
	};

	return (
		<>
			<div className='w-full my-7 font-semibold text-center text-2xl'>Medical History</div>
			<div className='w-full pb-5 lg:w-5/6 lg:mx-auto flex flex-col xl:flex-row xl-justify-center xl:gap-3'>
				<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>MEDICAL HISTORY</div>
					<div className='w-full sm:w-5/6 mx-auto px-2 py-3 flex flex-col'>
						{general ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>General Information</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('general')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>General Information</div>
								</div>
								{shwGeneral && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<General userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{emergency ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Emergency Contact</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('emergency')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Emergency Contact</div>
								</div>
								{shwEmergency && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Emergency userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{pharmacy ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Pharmacy</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('pharmacy')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Pharmacy</div>
								</div>
								{shwPharmacy && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Pharmacy userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{medications ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Medications</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('meds')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Medications</div>
								</div>
								{shwMeds && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Medications userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{immunizations ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Immunizations</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('immune')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Immunizations</div>
								</div>
								{shwImmunizations && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Immunizations userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{medhistory ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Medical History</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('medical')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Medical History</div>
								</div>
								{shwMedical && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<MedicalHistory userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{procedures ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Past Medical Procedures</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('procedures')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Past Medical Procedures</div>
								</div>
								{shwProcedures && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Procedures userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{social ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Social History</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('social')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Social History</div>
								</div>
								{shwSocial && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Social userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{famhistory ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Family History</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('family')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Family History</div>
								</div>
								{shwFamily && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<FamilyHistory userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{last30 ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Last 30 Days</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('last30')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Last 30 Days</div>
								</div>
								{shwLast30 && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Last30 userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{auth.user.sex === 'f' ? (
							<>
								{wmnhealth ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Women&apos;s Health</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('women')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Women&apos;s Health</div>
										</div>
										{shwWomen && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Women userId={auth.user._id} />
											</div>
										)}
									</>
								)}
								{wmnobgyn ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Gynecologic History</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('obgyn')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Gynecologic History</div>
										</div>
										{shwObgyn && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Obgyn userId={auth.user._id} />
											</div>
										)}
									</>
								)}
								{wmnprevent ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Preventative Care</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('wmnprevent')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Preventative Care</div>
										</div>
										{shwWmnPrevent && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<WmnPrevent userId={auth.user._id} />
											</div>
										)}
									</>
								)}
								{wmnmenopause ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Menopause</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('wmnmen')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Menopause</div>
										</div>
										{shwWmnMen && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Menopause userId={auth.user._id} />
											</div>
										)}
									</>
								)}
								{wmnsexual ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Sexual Function</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('wmnsex')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Sexual Function</div>
										</div>
										{shwWmnSex && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<WmnSexual userId={auth.user._id} />
											</div>
										)}
									</>
								)}
								{wmnhormone ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Hormone Replacement Therapy</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('wmnhrt')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Hormone Replacement Therapy</div>
										</div>
										{shwWmnHrt && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Hormone userId={auth.user._id} />
											</div>
										)}
									</>
								)}
							</>
						) : (
							<>
								{menhealth ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Men&apos;s Health</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('men')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Men&apos;s Health</div>
										</div>
										{shwMen && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Men userId={auth.user._id} />
											</div>
										)}
									</>
								)}
								{menprevent ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Preventative Care</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('menprevent')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Preventative Care</div>
										</div>
										{shwMenPrevent && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<MenPrevent userId={auth.user._id} />
											</div>
										)}
									</>
								)}
								{menurinary ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Urinary Function</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('menurinary')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Urinary Function</div>
										</div>
										{shwMenUrinary && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<MenUrinary userId={auth.user._id} />
											</div>
										)}
									</>
								)}
								{mensexual ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Sexual Function</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('mensex')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Sexual Function</div>
										</div>
										{shwMenSexual && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<MenSexual userId={auth.user._id} />
											</div>
										)}
									</>
								)}
								{mentestosterone ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Testosterone Replacement Therapy</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('mentrt')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Testosterone Replacement Therapy</div>
										</div>
										{shwMenTrt && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Testosterone userId={auth.user._id} />
											</div>
										)}
									</>
								)}
							</>
						)}
						{physicalfitness ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Physical Fitness</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('fitness')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Physical Fitness</div>
								</div>
								{shwFitness && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Fitness userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{algmeds ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Allergies &ndash; Medications</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('algmeds')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Allergies &ndash; Medications</div>
								</div>
								{shwAlgMeds && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<AlgMeds userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{algfoods ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Allergies &ndash; Food</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('algfood')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Allergies &ndash; Food</div>
								</div>
								{shwAlgFood && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<AlgFood userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{algenv ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Allergies &ndash; Environment</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('algenv')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Allergies &ndash; Environment</div>
								</div>
								{shwAlgEnv && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<AlgEnv userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{algsymptoms ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Allergies &ndash; Current Symptoms</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('algsym')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Allergies &ndash; Current Symptoms</div>
								</div>
								{shwAlgSym && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<AlgSymptoms userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{algcurmeds ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Allergies &ndash; Current Medications</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('algcurmed')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Allergies &ndash; Current Medications</div>
								</div>
								{shwAlgCurMed && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<AlgCurMeds userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{behavioral ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Behavioral Therapy</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('behavioral')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Behavioral Therapy</div>
								</div>
								{shwBehavioral && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Behavioral userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{chiropractic ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Chiropractic Therapy</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('chiropractic')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Chiropractic Therapy</div>
								</div>
								{shwChiropractic && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Chiropractic userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{massage ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Massage Therapy</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('massage')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Massage Therapy</div>
								</div>
								{shwMassage && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Massage userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{physicaltherapy ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Physical Therapy</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('physicaltherapy')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Physical Therapy</div>
								</div>
								{shwPhysicalTherapy && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<PhysicalTherapy userId={auth.user._id} />
									</div>
								)}
							</>
						)}
						{important ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Important To You</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('important')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Important To You</div>
								</div>
								{shwImportant && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Important userId={auth.user._id} />
									</div>
								)}
							</>
						)}
					</div>
				</div>
				<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
					<div className='w-full py-2 font-semibold text-center text-lg'>Medical History</div>
					<div className='w-5/6 mx-auto py-3 flex flex-col'>
						<div className='mb-3'>
							SN3X Subscribers will enjoy having access to their Medical Records anytime in their NOVA SPHERE. This comprehensive form may be the
							last Medical History Form you ever fill out. Share with licensed SN3X Physicians, Specialists, Hospitals and first responders in
							charge of your care. While it may seem like a lot of information, we&apos;ve made it simple to complete.
						</div>
						<div className='mb-3'>
							Remember, you can always just close this browser at any time and log back in later to finish. Just please have it all completed
							before your first appointment with your SN3X Physician.
						</div>
						<div>
							<strong>Take your time and be thorough, after all, its about you and for the benefit of your future healthcare.</strong>
						</div>
					</div>
				</div>
				<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
					<Checklist />
				</div>
			</div>
		</>
	);
}
