'use client';
import React, { useEffect, useState } from 'react';
import './MedHist.css';
import Checklist from '../checklist/Checklist';
import General from './general/General';
import Emergency from './emergency/Emergency';
import Pharmacy from './pharmacy/Pharmacy';
import Medications from './medications/Medications';
import Immunizations from './immunizations/Immunizations';
import MedicalHistory from './medicalhistory/MedicalHistory';

export default function MedHist({ user }) {
	//Edit Divs
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
	const [shwCompMed, setShwCompMed] = useState(false);
	const [shwAllergy, setShwAllergy] = useState(false);
	const [shwAlgMeds, setShwAlgMeds] = useState(false);
	const [shwAlgFood, setShwAlgFood] = useState(false);
	const [shwAlgEnv, setShwAlgEnv] = useState(false);
	const [shwAlgSym, setShwAlgSym] = useState(false);
	const [shwAlgCurMed, setShwAlgCurMed] = useState(false);
	const [shwBehavioral, setShwBehavioral] = useState(false);
	const [shwChiropractic, setShwChiropractic] = useState(false);
	const [shwMassage, setShwMassage] = useState(false);
	const [shwPhysicalTherapy, setShwPhysicalTherapy] = useState(false);
	const [shwPolReg, setShwPolReg] = useState(false);
	const [shwPolMed, setShwPolMed] = useState(false);
	const [shwPolPro, setShwPolPro] = useState(false);
	const [shwPolPrv, setShwPolPrv] = useState(false);
	const [shwPolSph, setShwPolSph] = useState(false);
	const [shwPolPer, setShwPolPer] = useState(false);
	const [shwPolSec, setShwPolSec] = useState(false);
	const [shwPolFin, setShwPolFin] = useState(false);
	const [shwPolChg, setShwPolChg] = useState(false);
	const [shwImportant, setShwImportant] = useState(false);
	//Done Data
	const [doneGeneral, setDoneGeneral] = useState(false);
	const [doneEmergency, setDoneEmergency] = useState(false);
	const [donePharmacy, setDonePharmacy] = useState(false);
	const [doneMeds, setDoneMeds] = useState(false);
	const [doneImmune, setDoneImmune] = useState(false);
	const [doneMedical, setDoneMedical] = useState(false);
	const [doneProcedures, setDoneProcedures] = useState(false);
	const [doneSocial, setDoneSocial] = useState(false);
	const [doneFamily, setDoneFamily] = useState(false);
	const [doneLast30, setDoneLast30] = useState(false);
	const [doneWomen, setDoneWomen] = useState(false);
	const [doneObgyn, setDoneObgyn] = useState(false);
	const [doneWmnPrevent, setDoneWmnPrevent] = useState(false);
	const [doneWmnSex, setDoneWmnSex] = useState(false);
	const [doneWmnMen, setDoneWmnMen] = useState(false);
	const [doneWmnHrt, setDoneWmnHrt] = useState(false);
	const [doneMen, setDoneMen] = useState(false);
	const [doneMenPrevent, setDoneMenPrevent] = useState(false);
	const [doneMenUrinary, setDoneMenUrinary] = useState(false);
	const [doneMenSex, setDoneMenSex] = useState(false);
	const [doneMenTrt, setDoneMenTrt] = useState(false);
	const [doneFitness, setDoneFitness] = useState(false);
	const [doneCompMed, setDoneCompMed] = useState(false);
	const [doneAllergy, setDoneAllergy] = useState(false);
	const [doneAlgMeds, setDoneAlgMeds] = useState(false);
	const [doneAlgFood, setDoneAlgFood] = useState(false);
	const [doneAlgEnv, setDoneAlgEnv] = useState(false);
	const [doneAlgSym, setDoneAlgSym] = useState(false);
	const [doneAlgCurMed, setDoneAlgCurMed] = useState(false);
	const [doneBehavioral, setDoneBehavioral] = useState(false);
	const [doneChiropractic, setDoneChiropractic] = useState(false);
	const [doneMassage, setDoneMassage] = useState(false);
	const [donePhysicalTherapy, setDonePhysicalTherapy] = useState(false);
	const [donePolReg, setDonePolReg] = useState(false);
	const [donePolMed, setDonePolMed] = useState(false);
	const [donePolPro, setDonePolPro] = useState(false);
	const [donePolPrv, setDonePolPrv] = useState(false);
	const [donePolSph, setDonePolSph] = useState(false);
	const [donePolPer, setDonePolPer] = useState(false);
	const [donePolSec, setDonePolSec] = useState(false);
	const [donePolFin, setDonePolFin] = useState(false);
	const [donePolChg, setDonePolChg] = useState(false);
	const [doneConsent, setDoneConsent] = useState(false);
	const [doneImportant, setDoneImportant] = useState(false);
	const [finished, setFinished] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET PROGRESS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (user !== undefined) {
			if (Object.keys(user).length !== 0) {
				if (user.historyprogress.length === 0 || user.historyprogress === undefined) {
					setFinished(false);
				} else {
					for (let i = 0; i < user.historyprogress.length; i++) {
						const hist = user.historyprogress[i];
						if (hist === 'general') {
							setDoneGeneral(true);
						}
						if (hist === 'emergency') {
							setDoneEmergency(true);
						}
						if (hist === 'pharmacy') {
							setDonePharmacy(true);
						}
						if (hist === 'medications') {
							setDoneMeds(true);
						}
						if (hist === 'immune') {
							setDoneImmune(true);
						}
						if (hist === 'medical') {
							setDoneMedical(true);
						}
						if (hist === 'procedures') {
							setDoneProcedures(true);
						}
						if (hist === 'social') {
							setDoneSocial(true);
						}
						if (hist === 'family') {
							setDoneFamily(true);
						}
						if (hist === 'last30') {
							setDoneLast30(true);
						}
						if (hist === 'women') {
							setDoneWomen(true);
						}
						if (hist === 'obgyn') {
							setDoneObgyn(true);
						}
						if (hist === 'wmnprevent') {
							setDoneWmnPrevent(true);
						}
						if (hist === 'wmnsex') {
							setDoneWmnSex(true);
						}
						if (hist === 'wmnmen') {
							setDoneWmnMen(true);
						}
						if (hist === 'wmnhrt') {
							setDoneWmnHrt(true);
						}
						if (hist === 'men') {
							setDoneMen(true);
						}
						if (hist === 'menprevent') {
							setDoneMenPrevent(true);
						}
						if (hist === 'menurinary') {
							setDoneMenUrinary(true);
						}
						if (hist === 'mensex') {
							setDoneMenSex(true);
						}
						if (hist === 'mentrt') {
							setDoneMenTrt(true);
						}
						if (hist === 'fitness') {
							setDoneFitness(true);
						}
						if (hist === 'compmed') {
							setDoneCompMed(true);
						}
						if (hist === 'allergy') {
							setDoneAllergy(true);
						}
						if (hist === 'algmeds') {
							setDoneAlgMeds(true);
						}
						if (hist === 'algfood') {
							setDoneAlgFood(true);
						}
						if (hist === 'algenv') {
							setDoneAlgEnv(true);
						}
						if (hist === 'algsym') {
							setDoneAlgSym(true);
						}
						if (hist === 'algcurmed') {
							setDoneAlgCurMed(true);
						}
						if (hist === 'behavioral') {
							setDoneBehavioral(true);
						}
						if (hist === 'chiropractic') {
							setDoneChiropractic(true);
						}
						if (hist === 'massage') {
							setDoneMassage(true);
						}
						if (hist === 'physicaltherapy') {
							setDonePhysicalTherapy(true);
						}
						if (hist === 'important') {
							setDoneImportant(true);
						}
					}
				}
			}
		}
	}, [user]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHECK PROGRESS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (
			doneGeneral &&
			doneEmergency &&
			donePharmacy &&
			doneMeds &&
			doneImmune &&
			doneMedical &&
			doneProcedures &&
			doneSocial &&
			doneFamily &&
			doneLast30 &&
			doneFitness &&
			doneCompMed &&
			doneAllergy &&
			doneAlgMeds &&
			doneAlgFood &&
			doneAlgEnv &&
			doneAlgSym &&
			doneAlgCurMed &&
			doneBehavioral &&
			doneChiropractic &&
			doneMassage &&
			donePhysicalTherapy &&
			doneImportant
		) {
			if (user.sex === 'f') {
				if (doneWomen && doneObgyn && doneWmnPrevent && doneWmnSex && doneWmnMen && doneWmnHrt) {
					//need to set patient historydone true in database
				}
			}
			if (user.sex === 'm') {
				if (doneMen && doneMenPrevent && doneMenUrinary && doneMenSex && doneMenTrt) {
					//need to set patient historydone true in database
				}
			}
		}
	}, [
		user,
		doneGeneral,
		doneEmergency,
		donePharmacy,
		doneMeds,
		doneImmune,
		doneMedical,
		doneProcedures,
		doneSocial,
		doneFamily,
		doneLast30,
		doneWomen,
		doneObgyn,
		doneWmnPrevent,
		doneWmnSex,
		doneWmnMen,
		doneWmnHrt,
		doneMen,
		doneMenPrevent,
		doneMenUrinary,
		doneMenSex,
		doneMenTrt,
		doneFitness,
		doneCompMed,
		doneAllergy,
		doneAlgMeds,
		doneAlgFood,
		doneAlgEnv,
		doneAlgSym,
		doneAlgCurMed,
		doneBehavioral,
		doneChiropractic,
		doneMassage,
		donePhysicalTherapy,
		doneImportant,
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
		}
		if (value === 'emergency') {
			setShwGeneral(false);
			setShwEmergency(!shwEmergency);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
		}
		if (value === 'pharmacy') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(!shwPharmacy);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(false);
		}
		if (value === 'meds') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(!shwMeds);
			setShwImmunizations(false);
			setShwMedical(false);
		}
		if (value === 'immune') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(!shwImmunizations);
			setShwMedical(false);
		}
		if (value === 'medical') {
			setShwGeneral(false);
			setShwEmergency(false);
			setShwPharmacy(false);
			setShwMeds(false);
			setShwImmunizations(false);
			setShwMedical(!shwMedical);
		}
	};

	return (
		<>
			<div className='row mt-5 mb-3 mb-xl-0 d-flex justify-content-center'>
				<div className='suDiv red'>
					<div className='suHdrDiv red'>MEDICAL HISTORY</div>
					{doneGeneral ? (
						<div className='row mt-3 mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>General Information</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mt-3 mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('general')}>
										General Information
									</div>
								</div>
							</div>
							{shwGeneral && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<General userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneEmergency ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Emergency Contact</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('emergency')}>
										Emergency Contact
									</div>
								</div>
							</div>
							{shwEmergency && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Emergency userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{donePharmacy ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Pharmacy</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('pharmacy')}>
										Pharmacy
									</div>
								</div>
							</div>
							{shwPharmacy && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Pharmacy userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneMeds ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Medications</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('meds')}>
										Medications
									</div>
								</div>
							</div>
							{shwMeds && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Medications userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneImmune ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Immunizations</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('immune')}>
										Immunizations
									</div>
								</div>
							</div>
							{shwImmunizations && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Immunizations userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneMedical ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Medical History</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('medical')}>
										Medical History
									</div>
								</div>
							</div>
							{shwMedical && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<MedicalHistory userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
				</div>
				<div className='suDiv blu mx-4'>
					<div className='suHdrDiv blu'>DETAILS</div>
					<div className='row mt-3 mb-4'>
						<div className='col-12'>
							<div className='suHdng'>Medical History</div>
						</div>
					</div>
					<div className='px-2 px-xl-4'>
						<p>
							SN3X Subscribers will enjoy having access to their Medical Records anytime in their NOVA SPHERE. This comprehensive form may be the
							last Medical History Form you ever fill out. Share with licensed SN3X Physicians, Specialists, Hospitals and first responders in
							charge of your care. While it may seem like a lot of information, we&apos;ve made it simple to complete.
						</p>
						<p>
							Remember, you can always just close this browser at any time and log back in later to finish. Just please have it all completed
							before your first appointment with your SN3X Physician.
						</p>
						<p>
							<strong>Take your time and be thorough, after all, its about you and for the benefit of your future healthcare.</strong>
						</p>
					</div>
				</div>
				<div className='suDiv ppl'>
					<div className='suHdrDiv ppl'>SETUP CHECKLIST</div>
					<Checklist progress={user.setupprogress} />
				</div>
			</div>
		</>
	);
}
