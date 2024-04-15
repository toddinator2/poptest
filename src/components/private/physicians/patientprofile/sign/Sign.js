import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { Today } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';
import CheckBox from '@/components/global/forms/checkbox/Checkbox';

export default function Sign(apptId) {
	const id = apptId.apptId;
	const today = Today();
	const router = useRouter();
	const [appts, _setAppts] = useContext(ApptContext);
	const [auth, _setAuth] = useContext(AuthContext);
	const [appt, setAppt] = useState({});
	const [paSignReqId, setPaSignReqId] = useState('');
	const [prSignReqId, setPrSignReqId] = useState('');
	const [paSignReqName, setPaSignReqName] = useState('');
	const [prSignReqName, setPrSignReqName] = useState('');
	const [paSigned, setPaSigned] = useState(false);
	const [prSigned, setPrSigned] = useState(false);
	const [paSignedBy, setPaSignedBy] = useState('');
	const [prSignedBy, setPrSignedBy] = useState('');
	const [_paSignedById, setPaSignedById] = useState('');
	const [_prSignedById, setPrSignedById] = useState('');
	const [paSignedDate, setPaSignedDate] = useState('');
	const [prSignedDate, setPrSignedDate] = useState('');
	const [paChecked, setPaChecked] = useState(false);
	const [prChecked, setPrChecked] = useState(false);
	const [stop, setStop] = useState(false);
	const [curId, setCurId] = useState('');

	useEffect(() => {
		//get appointment from context
		if (Object.keys(appt).length === 0 || curId !== id) {
			setAppt(appts.all.find((x) => x._id === id));
		}
	}, [appt, appts, curId, id]);

	useEffect(() => {
		if (Object.keys(appt).length !== 0 && curId !== id) {
			//set PA values
			setPaSignReqId(appt.pasignreqId);
			setPaSignReqName(appt.pasignreqname);
			setPaSigned(appt.pasigned);
			setPaSignedBy(appt.pasignedby);
			setPaSignedById(appt.pasignedbyId);
			setPaSignedDate(appt.pasigneddate);
			//set PR values
			setPrSignReqId(appt.prsignreqId);
			setPrSignReqName(appt.prsignreqname);
			setPrSigned(appt.prsigned);
			setPrSignedBy(appt.prsignedby);
			setPrSignedById(appt.prsignedbyId);
			setPrSignedDate(appt.prsigneddate);
			setStop(true);
			setCurId(id);
		}
	}, [appt, curId, id, prSignReqId, prSigned, stop]);

	const handlePaSign = async (e) => {
		e.preventDefault();
		const value = e.target.checked;
		if (value) {
			//check it's the person supposed to be signing
			if (auth.user._id === paSignReqId) {
				appt.pasigned = true;
				appt.pasignedby = auth.user.title;
				appt.pasignedbyId = auth.user._id;
				appt.pasigneddate = today;
				setPaSigned(true);
				setPaSignedBy(auth.user.title);
				setPaSignedById(auth.user._id);
				setPaSignedDate(today);
				//update the appointment context
				const idx = appts.all.findIndex((x) => x._id === id);
				appts.all.splice(idx, 1, appt);

				//update in the database
				const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/sign/pa`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						_id: id,
						pasigned: true,
						pasignedby: auth.user.title,
						pasignedbyId: auth.user._id,
						pasigneddate: today,
					}),
				});
				const data = await response.json();

				if (data.status === 200) {
					toast.success(data.msg);
					router.push('/physicians/schedule');
				} else {
					toast.error(data.msg);
				}
			} else {
				setPaChecked(false);
			}
		}
	};

	const handlePrSign = async (e) => {
		e.preventDefault();
		const value = e.target.checked;
		if (value) {
			//check it's the person supposed to be signing
			if (auth.user._id === prSignReqId) {
				appt.prsigned = true;
				appt.prsignedby = auth.user.title;
				appt.prsignedbyId = auth.user._id;
				appt.prsigneddate = today;
				setPrSigned(true);
				setPrSignedBy(auth.user.title);
				setPrSignedById(auth.user._id);
				setPrSignedDate(today);
				//update the appointment context
				const idxAll = appts.all.findIndex((x) => x._id === id);
				const idxTdy = appts.todays.findIndex((x) => x._id === id);
				appts.all.splice(idxAll, 1, appt);
				appts.todays.splice(idxTdy, 1, appt);

				//update in the database
				const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/sign/pr`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						_id: id,
						prsigned: true,
						prsignedby: auth.user.title,
						prsignedbyId: auth.user._id,
						prsigneddate: today,
					}),
				});
				const data = await response.json();

				if (data.status === 200) {
					toast.success(data.msg);
					router.push('/physicians/schedule');
				} else {
					toast.error(data.msg);
				}
			} else {
				setPrChecked(false);
			}
		}
	};

	return (
		<div className='ppDivData mb-3 py-3'>
			<div className='row mb-2'>
				<div className='col-12 d-flex justify-content-center'>
					<div className='ppCompHdng'>SIGN VISIT</div>
				</div>
			</div>
			{paSigned ? (
				<div className='row d-flex align-items-center'>
					<div className='col-6 offset-1'>
						<div className='signedText'>{paSignedBy}</div>
					</div>
					<div className='col-4 d-flex justify-content-end'>
						<div className='signedDate'>{paSignedDate}</div>
					</div>
				</div>
			) : (
				<>
					{paSignReqId && (
						<div className='row d-flex align-items-center'>
							<div className='row'>
								<div className='chkCol col-2 d-flex justify-content-end'>
									<CheckBox check={paChecked} funcCall={handlePaSign} />
								</div>
								<div className='col-10 ps-0'>{paSignReqName}</div>
							</div>
						</div>
					)}
				</>
			)}
			{prSigned ? (
				<div className='row d-flex align-items-center'>
					<div className='col-6 offset-1'>
						<div className='signedText'>{prSignedBy}</div>
					</div>
					<div className='col-4 d-flex justify-content-end'>
						<div className='signedDate'>{prSignedDate}</div>
					</div>
				</div>
			) : (
				<>
					{prSignReqId && (
						<div className='row d-flex align-items-center'>
							<div className='row'>
								<div className='chkCol col-2 d-flex justify-content-end'>
									<CheckBox check={prChecked} funcCall={handlePrSign} />
								</div>
								<div className='col-10 ps-0'>{prSignReqName}</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
