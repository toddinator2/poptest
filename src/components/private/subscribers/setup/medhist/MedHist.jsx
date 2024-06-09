'use client';
import React, { useCallback, useEffect, useState } from 'react';
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
			<div className='w-full my-7 font-semibold text-center text-2xl'>Medical History</div>
			<div className='w-full pb-5 lg:w-5/6 lg:mx-auto flex flex-col xl:flex-row xl-justify-center xl:gap-3'>
				<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>MEDICAL HISTORY</div>
					<div className='w-full sm:w-5/6 mx-auto px-2 py-3 flex flex-col'>
						{doneGeneral ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>General Information</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('general')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>General Information</div>
								</div>
								{shwGeneral && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<General userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneEmergency ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Emergency Contact</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('emergency')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Emergency Contact</div>
								</div>
								{shwEmergency && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Emergency userId={user._id} />
									</div>
								)}
							</>
						)}
						{donePharmacy ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Pharmacy</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('pharmacy')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Pharmacy</div>
								</div>
								{shwPharmacy && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Pharmacy userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneMeds ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Medications</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('meds')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Medications</div>
								</div>
								{shwMeds && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Medications userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneImmune ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Immunizations</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('immune')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Immunizations</div>
								</div>
								{shwImmunizations && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Immunizations userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneMedical ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Medical History</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('medical')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Medical History</div>
								</div>
								{shwMedical && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<MedicalHistory userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneProcedures ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Past Medical Procedures</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('procedures')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Past Medical Procedures</div>
								</div>
								{shwProcedures && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Procedures userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneSocial ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Social History</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('social')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Social History</div>
								</div>
								{shwSocial && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Social userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneFamily ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Family History</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('family')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Family History</div>
								</div>
								{shwFamily && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<FamilyHistory userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneLast30 ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Last 30 Days</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('last30')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Last 30 Days</div>
								</div>
								{shwLast30 && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Last30 userId={user._id} />
									</div>
								)}
							</>
						)}
						{user.sex === 'f' ? (
							<>
								{doneWomen ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Women&apos;s Health</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('women')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Women&apos;s Health</div>
										</div>
										{shwWomen && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Women userId={user._id} />
											</div>
										)}
									</>
								)}
								{doneObgyn ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Gynecologic History</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('obgyn')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Gynecologic History</div>
										</div>
										{shwObgyn && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Obgyn userId={user._id} />
											</div>
										)}
									</>
								)}
								{doneWmnPrevent ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Preventative Care</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('wmnprevent')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Preventative Care</div>
										</div>
										{shwWmnPrevent && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<WmnPrevent userId={user._id} />
											</div>
										)}
									</>
								)}
								{doneWmnMen ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Menopause</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('wmnmen')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Menopause</div>
										</div>
										{shwWmnMen && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Menopause userId={user._id} />
											</div>
										)}
									</>
								)}
								{doneWmnSex ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Sexual Function</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('wmnsex')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Sexual Function</div>
										</div>
										{shwWmnSex && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<WmnSexual userId={user._id} />
											</div>
										)}
									</>
								)}
								{doneWmnHrt ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Hormone Replacement Therapy</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('wmnhrt')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Hormone Replacement Therapy</div>
										</div>
										{shwWmnHrt && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Hormone userId={user._id} />
											</div>
										)}
									</>
								)}
							</>
						) : (
							<>
								{doneMen ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Men&apos;s Health</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('men')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Men&apos;s Health</div>
										</div>
										{shwMen && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Men userId={user._id} />
											</div>
										)}
									</>
								)}
								{doneMenPrevent ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Preventative Care</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('menprevent')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Preventative Care</div>
										</div>
										{shwMenPrevent && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<MenPrevent userId={user._id} />
											</div>
										)}
									</>
								)}
								{doneMenUrinary ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Urinary Function</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('menurinary')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Urinary Function</div>
										</div>
										{shwMenUrinary && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<MenUrinary userId={user._id} />
											</div>
										)}
									</>
								)}
								{doneMenSex ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Sexual Function</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('mensex')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Sexual Function</div>
										</div>
										{shwMenSexual && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<MenSexual userId={user._id} />
											</div>
										)}
									</>
								)}
								{doneMenTrt ? (
									<div className='mb-1 font-medium text-sm text-lgtred'>Testosterone Replacement Therapy</div>
								) : (
									<>
										<div className='w-auto mb-1' onClick={() => handleEditDiv('mentrt')}>
											<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Testosterone Replacement Therapy</div>
										</div>
										{shwMenTrt && (
											<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
												<Testosterone userId={user._id} />
											</div>
										)}
									</>
								)}
							</>
						)}
						{doneFitness ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Physical Fitness</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('fitness')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Physical Fitness</div>
								</div>
								{shwFitness && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Fitness userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneAlgMeds ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Allergies &ndash; Medications</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('algmeds')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Allergies &ndash; Medications</div>
								</div>
								{shwAlgMeds && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<AlgMeds userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneAlgFood ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Allergies &ndash; Food</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('algfood')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Allergies &ndash; Food</div>
								</div>
								{shwAlgFood && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<AlgFood userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneAlgEnv ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Allergies &ndash; Environment</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('algenv')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Allergies &ndash; Environment</div>
								</div>
								{shwAlgEnv && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<AlgEnv userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneAlgSym ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Allergies &ndash; Current Symptoms</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('algsym')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Allergies &ndash; Current Symptoms</div>
								</div>
								{shwAlgSym && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<AlgSymptoms userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneAlgCurMed ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Allergies &ndash; Current Medications</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('algcurmed')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Allergies &ndash; Current Medications</div>
								</div>
								{shwAlgCurMed && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<AlgCurMeds userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneBehavioral ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Behavioral Therapy</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('behavioral')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Behavioral Therapy</div>
								</div>
								{shwBehavioral && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Behavioral userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneChiropractic ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Chiropractic Therapy</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('chiropractic')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Chiropractic Therapy</div>
								</div>
								{shwChiropractic && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Chiropractic userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneMassage ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Massage Therapy</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('massage')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Massage Therapy</div>
								</div>
								{shwMassage && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Massage userId={user._id} />
									</div>
								)}
							</>
						)}
						{donePhysicalTherapy ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Physical Therapy</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('physicaltherapy')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Physical Therapy</div>
								</div>
								{shwPhysicalTherapy && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<PhysicalTherapy userId={user._id} />
									</div>
								)}
							</>
						)}
						{doneImportant ? (
							<div className='mb-1 font-medium text-sm text-lgtred'>Important To You</div>
						) : (
							<>
								<div className='w-auto mb-1' onClick={() => handleEditDiv('important')}>
									<div className='font-medium text-sm hover:text-lgtblu cursor-pointer'>Important To You</div>
								</div>
								{shwImportant && (
									<div className='w-full mb-7 p-3 border-2 border-drkgry rounded-2xl'>
										<Important userId={user._id} />
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
					<Checklist progress={user.setupprogress} />
				</div>
			</div>
		</>
	);
}
