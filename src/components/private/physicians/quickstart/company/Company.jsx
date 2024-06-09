import React, { useContext } from 'react';
import { FormatPhoneNumber, IsNumber } from '@/components/global/functions/Functions';
import { AuthContext } from '@/utils/context/global/AuthContext';

export default function Company() {
	const [auth] = useContext(AuthContext);
	const [name, setName] = useState('');
	const [dba, setDba] = useState('');
	const [ein, setEin] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [numphys, setNumPhys] = useState('');
	const [numnpps, setNumNpps] = useState('');
	const [numstaff, setNumStaff] = useState('');
	const [numnonmed, setNumNonMed] = useState('');
	const [currentEhr, setCurrentEhr] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadOffice = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/office/data/get/byid?id=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setName(data.ofc.legalname);
				setEmail(data.ofc.email);
				setPhone(data.ofc.phone);
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
		loadOffice();
	}, [loadOffice]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/office/setup/edit/company`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: auth.user.ofcObjId,
					legalname: name,
					dba,
					ein,
					email,
					phone,
					numphysicians: numphys,
					numnpps: numnpps,
					numstaff,
					numnonmedstaff: numnonmed,
					currentehr: currentEhr,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handlePhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	};

	const handleNumPhys = (e) => {
		const value = e.target.value;
		const num = IsNumber(value);
		setNumPhys(num);
	};

	const handleNumNpps = (e) => {
		const value = e.target.value;
		const num = IsNumber(value);
		setNumNpps(num);
	};

	const handleNumStaff = (e) => {
		const value = e.target.value;
		const num = IsNumber(value);
		setNumStaff(num);
	};

	const handleNumNonMed = (e) => {
		const value = e.target.value;
		const num = IsNumber(value);
		setNumNonMed(num);
	};

	return (
		<div className='w-full pb-5 lg:w-5/6 2xl:w-3/4 lg:mx-auto flex flex-col xl:flex-row xl:justify-center gap-3 2xl:gap-6'>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>OFFICE PROFILE</div>
				<div className='w-5/6 mx-auto px-2 py-3 flex flex-col'>
					<form onSubmit={handleSubmit}>
						<label className='frmLabel'>Legal Name</label>
						<Input type='text' required={true} value={name} setValue={setName} />
						<label className='frmLabel'>DBA</label>
						<Input type='text' required={true} value={dba} setValue={setDba} />
						<label className='frmLabel'>EIN</label>
						<Input type='text' required={true} value={ein} setValue={setEin} />
						<label className='frmLabel'>Email</label>
						<Input type='email' required={true} value={email} setValue={setEmail} />
						<label className='frmLabel'>Phone</label>
						<Input type='tel' required={true} value={phone} funcCall={handlePhone} />
						<label className='frmLabel'># of Physicians</label>
						<Input type='text' required={true} value={numphys} funcCall={handleNumPhys} />
						<label className='frmLabel'># of Non-Physician Providers</label>
						<Input type='text' required={true} value={numnpps} funcCall={handleNumNpps} />
						<label className='frmLabel'># of Medical Staff</label>
						<Input type='text' required={true} value={numstaff} funcCall={handleNumStaff} />
						<label className='frmLabel'># of Non-Medical Staff</label>
						<Input type='text' required={true} value={numnonmed} funcCall={handleNumNonMed} />
						<label className='frmLabel'>Current EHR/EMR</label>
						<Input type='text' required={true} value={currentEhr} setValue={setCurrentEhr} />
						<div className='mt-5 flex justify-center'>
							<Button
								type='submit'
								disabled={!name || !dba || !ein || !email || !phone || !numphys || !numnpps || !numstaff || !numnonmed || !currentEhr}
							>
								Save Changes
							</Button>
						</div>
					</form>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
				<div className='w-5/6 mx-auto py-3 flex flex-col'>
					<div className='mb-3 text-lg font-semibold text-center'>COMPANY PROFILE</div>
					<div className='mb-3'>
						The Applicant and Company Profiles are stored in the NOVA SPHERE by clicking on the PROFILE button and allows for quick access to your
						important information.
					</div>
					<div>It&apos;s also required for SN3X approval, account set up, and your SN3X License.</div>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
				<Checklist />
			</div>
		</div>
	);
}
