import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { Today } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';
import CheckBox from '@/components/global/forms/checkbox/Checkbox';

export default function Sign({ props }) {
	const newApptId = props._id;
	const today = Today();
	const router = useRouter();
	const [auth] = useContext(AuthContext);
	const [curApptId, setCurApptId] = useState('');
	const [id, setId] = useState('');
	const [paSignReqId, setPaSignReqId] = useState('');
	const [paSignReqName, setPaSignReqName] = useState('');
	const [paSignedDate, setPaSignedDate] = useState('');
	const [paSignedBy, setPaSignedBy] = useState('');
	const [paSigned, setPaSigned] = useState(false);
	const [prSignReqId, setPrSignReqId] = useState('');
	const [prSignReqName, setPrSignReqName] = useState('');
	const [prSignedDate, setPrSignedDate] = useState('');
	const [prSignedBy, setPrSignedBy] = useState('');
	const [prSigned, setPrSigned] = useState(false);
	const [paChecked, setPaChecked] = useState(false);
	const [prChecked, setPrChecked] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET STATE VALUES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (curApptId !== newApptId) {
			setId(props._id);
			setPaSignReqId(props.paSignReqId);
			setPaSignReqName(props.paSignReqName);
			setPaSignedDate(props.paSignDate);
			setPaSignedBy(props.paSignBy);
			setPaSigned(props.pa);
			setPrSignReqId(props.prSignReqId);
			setPrSignReqName(props.prSignReqName);
			setPrSignedDate(props.prSignDate);
			setPrSignedBy(props.prSignBy);
			setPrSigned(props.pr);
			setCurApptId(newApptId);
		}
	}, [props, curApptId, newApptId]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handlePaSign = async (e) => {
		e.preventDefault();
		const value = e.target.checked;
		if (value) {
			//check it's the person supposed to be signing
			if (auth.user._id === paSignReqId) {
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
