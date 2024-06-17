import React, { useContext, useState } from 'react';
import './Bank.css';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { FixCreditCard, FormatCreditCard, FormatZip, IsNumber } from '@/components/global/functions/Functions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Checklist from '../checklist/Checklist';
import visa from '@/assets/images/ccVisa.png';
import mc from '@/assets/images/ccMC.png';
import amex from '@/assets/images/ccAmEx.png';
import disc from '@/assets/images/ccDisc.png';

export default function Bank() {
	const d = new Date();
	const curYr = d.getFullYear();
	const router = useRouter();
	const [auth] = useContext(AuthContext);
	const [monthly, setMonthly] = useState('');
	const [routing, setRouting] = useState('');
	const [acctnum, setAcctNum] = useState('');
	const [acctcnf, setAcctCnf] = useState('');
	const [name, setName] = useState('');
	const [ccnum, setCcNum] = useState('');
	const [cctype, setCcType] = useState('');
	const [ccexpmo, setCcExpMo] = useState('');
	const [ccexpyr, setCcExpYr] = useState('');
	const [cvv, setCvv] = useState('');
	const [cczip, setCcZip] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		let data;

		try {
			if (monthly === 'ach') {
				//compare account numbers to make sure they match
				if (acctnum !== acctcnf) {
					toast.error('Account Numbers do not match, please re-enter both');
					setAcctNum('');
					setAcctCnf('');
					document.getElementById('acctnum').focus();
					return;
				}

				const response = await fetch(`${process.env.API_URL}/sponsors/setup/add/bank/ach`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						routingnum: routing,
						accountnum: acctnum,
						spnid: auth.user.spnObjId,
					}),
				});
				data = await response.json();

				if (data.status === 200) {
					toast.success(data.msg);
					router.push('/sponsors/sphere');
				} else {
					toast.error(data.msg);
				}
			} else {
				const response = await fetch(`${process.env.API_URL}/sponsors/setup/add/bank/cc`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name,
						ccnum: FixCreditCard(ccnum),
						ccexpmo,
						ccexpyr,
						cvv,
						cczip,
						spnid: auth.user.spnObjId,
					}),
				});
				data = await response.json();

				if (data.status === 200) {
					toast.success(data.msg);
					router.push('/sponsors/sphere');
				} else {
					toast.error(data.msg);
				}
			}
		} catch (err) {
			toast.error(err);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleRouteNum = (e) => {
		const value = e.target.value;
		const chkVal = IsNumber(value);
		setRouting(chkVal);
	};
	const handleAcctNum = (e) => {
		const value = e.target.value;
		const chkVal = IsNumber(value);
		setAcctNum(chkVal);
	};
	const handleAcctCnf = (e) => {
		const value = e.target.value;
		const chkVal = IsNumber(value);
		setAcctCnf(chkVal);
	};
	const handleCCNum = (e) => {
		const value = e.target.value;
		const formattedCC = FormatCreditCard(value);
		setCcNum(formattedCC);
		if (formattedCC.length >= 2) {
			const ccGet = formattedCC.charAt(0);
			if (ccGet === '3') {
				setCcType('amex');
			} else if (ccGet === '4') {
				setCcType('visa');
			} else if (ccGet === '5') {
				setCcType('mc');
			} else if (ccGet === '6') {
				setCcType('disc');
			} else {
				setCcType('');
			}
		} else {
			setCcType('');
		}
	};
	const handleCvv = (e) => {
		const value = e.target.value;
		const chkVal = IsNumber(value);
		setCvv(chkVal);
	};
	const handleZip = (e) => {
		const value = e.target.value;
		const formattedZip = FormatZip(value);
		setCcZip(formattedZip);
	};

	return (
		<div className='w-full pb-5 lg:w-5/6 2xl:w-3/4 lg:mx-auto flex flex-col xl:flex-row xl:justify-center gap-3 2xl:gap-6'>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>PAYMENT INFORMATION</div>
				<div className='w-5/6 mx-auto px-2 py-3 flex flex-col'>
					<label className='frmLabel'>Make monthly payments by</label>
					<div className='mb-2'>
						<select className='inpBorder form-control' required={true} value={monthly} onChange={(e) => setMonthly(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='ach'>ACH (Preferred)</option>
							<option value='cc'>Credit Card</option>
						</select>
					</div>
					{monthly === 'ach' && (
						<form onSubmit={handleSubmit}>
							<label className='frmLabel'>Bank Routing Number</label>
							<Input type='text' required={true} value={routing} funcCall={handleRouteNum} />
							<label className='frmLabel'>Bank Account Number</label>
							<Input type='text' required={true} id='acctnum' value={acctnum} funcCall={handleAcctNum} />
							<label className='frmLabel'>Confirm Account Number</label>
							<Input type='text' required={true} value={acctcnf} funcCall={handleAcctCnf} />
							<div className='mt-5 flex justify-center'>
								<Button type='submit' disabled={!routing || !acctnum || !acctcnf}>
									Make Payment
								</Button>
							</div>
						</form>
					)}
					{monthly === 'cc' && (
						<form onSubmit={handleSubmit}>
							<label className='frmLabel'>Cardholder Name</label>
							<Input type='text' required={true} value={name} setValue={setName} />
							<label className='frmLabel'>Card #</label>
							<div className='mb-2 flex flex-row items-center'>
								<div className='w-3/4'>
									<input className='inpBorder form-control' type='tel' required value={ccnum} onChange={(e) => handleCCNum(e)} />
								</div>
								<div className='w-1/4'>
									<div className='flex justify-center'>
										{cctype === 'amex' && <Image className='ccImg' src={amex} alt='AmEx' />}
										{cctype === 'visa' && <Image className='ccImg' src={visa} alt='Visa' />}
										{cctype === 'mc' && <Image className='ccImg' src={mc} alt='MC' />}
										{cctype === 'disc' && <Image className='ccImg' src={disc} alt='Disc' />}
									</div>
								</div>
							</div>
							<div className='frmLabel'>Expiration Month</div>
							<div className='mb-2'>
								<select className='inpBorder form-control' required={true} value={ccexpmo} onChange={(e) => setCcExpMo(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='01'>01 - Jan</option>
									<option value='02'>02 - Feb</option>
									<option value='03'>03 - Mar</option>
									<option value='04'>04 - Apr</option>
									<option value='05'>05 - May</option>
									<option value='06'>06 - Jun</option>
									<option value='07'>07 - Jul</option>
									<option value='08'>08 - Aug</option>
									<option value='09'>09 - Sep</option>
									<option value='10'>10 - Oct</option>
									<option value='11'>11 - Nov</option>
									<option value='12'>12 - Dec</option>
								</select>
							</div>
							<div className='frmLabel me-2'>Expiration Year</div>
							<div className='mb-2'>
								<select className='inpBorder form-control' required={true} value={ccexpyr} onChange={(e) => setCcExpYr(e.target.value)}>
									<option value=''>Select One...</option>
									<option value={curYr}>{curYr}</option>
									<option value={curYr + 1}>{curYr + 1}</option>
									<option value={curYr + 2}>{curYr + 2}</option>
									<option value={curYr + 3}>{curYr + 3}</option>
									<option value={curYr + 4}>{curYr + 4}</option>
									<option value={curYr + 5}>{curYr + 5}</option>
									<option value={curYr + 6}>{curYr + 6}</option>
									<option value={curYr + 7}>{curYr + 7}</option>
									<option value={curYr + 8}>{curYr + 8}</option>
								</select>
							</div>
							<label className='frmLabel'>CVV</label>
							<Input type='tel' required={true} max={4} value={cvv} funcCall={handleCvv} />
							<label className='frmLabel'>Billing Zip Code</label>
							<Input type='text' required={true} max={5} value={cczip} funcCall={handleZip} />
							<div className='mt-5 flex justify-center'>
								<Button type='submit' disabled={!name || !ccnum || !ccexpmo || !ccexpyr || !cvv || !cczip}>
									Make Payment
								</Button>
							</div>
						</form>
					)}
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
				<div className='w-5/6 mx-auto py-3 flex flex-col'>
					<div className='mb-3 text-lg font-semibold text-center'>PAYMENT INFORMATION</div>
					<div className='mb-3'>
						Please setup how you would like to make your monthly payments to your physicians. The SN3X preferred method is ACH, which helps keep our
						costs down and bring better improvements to the software faster.
					</div>
					<div className='mb-3'>
						Once you have saved your information you will immediately have access to the Supernova3X software, and can begin adding your roster
						list. You can always change and update your method of payment in the Sponsor Sphere. You will not be charged anything until you add your
						roster list and have members with physician memberships.
					</div>
					<div>Thank you for completing the Account Setup process!</div>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
				<Checklist />
			</div>
		</div>
	);
}
