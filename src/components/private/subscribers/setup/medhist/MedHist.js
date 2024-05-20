'use client';
import React, { useCallback, useEffect, useState } from 'react';
import './MedHist.css';
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
	const [doneAlgMeds, setDoneAlgMeds] = useState(false);
	const [doneAlgFood, setDoneAlgFood] = useState(false);
	const [doneAlgEnv, setDoneAlgEnv] = useState(false);
	const [doneAlgSym, setDoneAlgSym] = useState(false);
	const [doneAlgCurMed, setDoneAlgCurMed] = useState(false);
	const [doneBehavioral, setDoneBehavioral] = useState(false);
	const [doneChiropractic, setDoneChiropractic] = useState(false);
	const [doneMassage, setDoneMassage] = useState(false);
	const [donePhysicalTherapy, setDonePhysicalTherapy] = useState(false);
	const [doneImportant, setDoneImportant] = useState(false);

	const historyDone = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL_PUB}/subscribers/setup/medhistdone`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					ptId: user._id,
				}),
			});
			const data = await response.json();

			if (data.status === '200') {
				toast.success(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [user]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET PROGRESS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (user !== undefined) {
			if (Object.keys(user).length !== 0) {
				if (user.historyprogress.length === 0 || user.historyprogress === undefined) {
					setDoneGeneral(false);
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
					historyDone();
				}
			}
			if (user.sex === 'm') {
				if (doneMen && doneMenPrevent && doneMenUrinary && doneMenSex && doneMenTrt) {
					historyDone();
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
			<div className='row mt-3 mt-xl-5 d-flex justify-content-center'>
				<div className='suDiv red order-last order-xl-first'>
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
					{doneProcedures ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Past Medical Procedures</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('procedures')}>
										Past Medical Procedures
									</div>
								</div>
							</div>
							{shwProcedures && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Procedures userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneSocial ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Social History</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('social')}>
										Social History
									</div>
								</div>
							</div>
							{shwSocial && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Social userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneFamily ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Family History</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('family')}>
										Family History
									</div>
								</div>
							</div>
							{shwFamily && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<FamilyHistory userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneLast30 ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Last 30 Days</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('last30')}>
										Last 30 Days
									</div>
								</div>
							</div>
							{shwLast30 && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Last30 userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{user.sex === 'f' ? (
						<>
							{doneWomen ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Women&apos;s Health</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('women')}>
												Women&apos;s Health
											</div>
										</div>
									</div>
									{shwWomen && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<Women userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
							{doneObgyn ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Gynecologic History</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('obgyn')}>
												Gynecologic History
											</div>
										</div>
									</div>
									{shwObgyn && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<Obgyn userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
							{doneWmnPrevent ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Preventative Care</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('wmnprevent')}>
												Preventative Care
											</div>
										</div>
									</div>
									{shwWmnPrevent && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<WmnPrevent userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
							{doneWmnSex ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Sexual Function</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('wmnsex')}>
												Sexual Function
											</div>
										</div>
									</div>
									{shwWmnSex && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<WmnSexual userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
							{doneWmnMen ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Menopause</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('wmnmen')}>
												Menopause
											</div>
										</div>
									</div>
									{shwWmnMen && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<Menopause userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
							{doneWmnHrt ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Hormone Replacement Therapy</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('wmnhrt')}>
												Hormone Replacement Therapy
											</div>
										</div>
									</div>
									{shwWmnHrt && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<Hormone userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
						</>
					) : (
						<>
							{doneMen ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Men&apos;s Health</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('men')}>
												Men&apos;s Health
											</div>
										</div>
									</div>
									{shwMen && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<Men userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
							{doneMenPrevent ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Preventative Care</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('menprevent')}>
												Preventative Care
											</div>
										</div>
									</div>
									{shwMenPrevent && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<MenPrevent userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
							{doneMenUrinary ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Urinary Function</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('menurinary')}>
												Urinary Function
											</div>
										</div>
									</div>
									{shwMenUrinary && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<MenUrinary userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
							{doneMenSex ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Sexual Function</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('mensex')}>
												Sexual Function
											</div>
										</div>
									</div>
									{shwMenSexual && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<MenSexual userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
							{doneMenTrt ? (
								<div className='row mb-2 ps-3'>
									<div className='col-12'>
										<div className='histHdng'>Testosterone Replacement Therapy</div>
									</div>
								</div>
							) : (
								<>
									<div className='row mb-2 ps-3'>
										<div className='col-12'>
											<div className='histHdng wht' onClick={() => handleEditDiv('mentrt')}>
												Testosterone Replacement Therapy
											</div>
										</div>
									</div>
									{shwMenTrt && (
										<div className='row mb-4'>
											<div className='histBox col-10 offset-1 p-3'>
												<Testosterone userId={user._id} />
											</div>
										</div>
									)}
								</>
							)}
						</>
					)}
					{doneFitness ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Physical Fitness</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('fitness')}>
										Physical Fitness
									</div>
								</div>
							</div>
							{shwFitness && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Fitness userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneAlgMeds ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Allergies &ndash; Medications</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('algmeds')}>
										Allergies &ndash; Medications
									</div>
								</div>
							</div>
							{shwAlgMeds && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<AlgMeds userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneAlgFood ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Allergies &ndash; Food</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('algfood')}>
										Allergies &ndash; Food
									</div>
								</div>
							</div>
							{shwAlgFood && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<AlgFood userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneAlgEnv ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Allergies &ndash; Environment</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('algenv')}>
										Allergies &ndash; Environment
									</div>
								</div>
							</div>
							{shwAlgEnv && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<AlgEnv userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneAlgSym ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Allergies &ndash; Current Symptoms</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('algsym')}>
										Allergies &ndash; Current Symptoms
									</div>
								</div>
							</div>
							{shwAlgSym && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<AlgSymptoms userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneAlgCurMed ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Allergies &ndash; Current Medications</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('algcurmed')}>
										Allergies &ndash; Current Medications
									</div>
								</div>
							</div>
							{shwAlgCurMed && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<AlgCurMeds userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneBehavioral ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Behavioral Therapy</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('behavioral')}>
										Behavioral Therapy
									</div>
								</div>
							</div>
							{shwBehavioral && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Behavioral userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneChiropractic ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Chiropractic Therapy</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('chiropractic')}>
										Chiropractic Therapy
									</div>
								</div>
							</div>
							{shwChiropractic && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Chiropractic userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneMassage ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Massage Therapy</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('massage')}>
										Massage Therapy
									</div>
								</div>
							</div>
							{shwMassage && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Massage userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{donePhysicalTherapy ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Physical Therapy</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('physicaltherapy')}>
										Physical Therapy
									</div>
								</div>
							</div>
							{shwPhysicalTherapy && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<PhysicalTherapy userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
					{doneImportant ? (
						<div className='row mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Important To You</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('important')}>
										Important To You
									</div>
								</div>
							</div>
							{shwImportant && (
								<div className='row mb-4'>
									<div className='histBox col-10 offset-1 p-3'>
										<Important userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
				</div>
				<div className='suDiv blu mx-4 mb-3 mb-xl-0 order-2'>
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
				<div className='suDiv ppl mb-3 mb-xl-0 order-first order-xl-last'>
					<div className='suHdrDiv ppl'>SETUP CHECKLIST</div>
					<Checklist progress={user.setupprogress} />
				</div>
			</div>
		</>
	);
}
