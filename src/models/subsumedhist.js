import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const subsumedhistSchema = new Schema(
	{
		general: {
			type: Boolean,
			default: false,
		},
		emergency: {
			type: Boolean,
			default: false,
		},
		pharmacy: {
			type: Boolean,
			default: false,
		},
		medications: {
			type: Boolean,
			default: false,
		},
		immunizations: {
			type: Boolean,
			default: false,
		},
		medicalhistory: {
			type: Boolean,
			default: false,
		},
		procedures: {
			type: Boolean,
			default: false,
		},
		social: {
			type: Boolean,
			default: false,
		},
		familyhistory: {
			type: Boolean,
			default: false,
		},
		last30: {
			type: Boolean,
			default: false,
		},
		wmnhealth: {
			type: Boolean,
			default: false,
		},
		wmnobgyn: {
			type: Boolean,
			default: false,
		},
		wmnprevent: {
			type: Boolean,
			default: false,
		},
		wmnsexual: {
			type: Boolean,
			default: false,
		},
		wmnmenopause: {
			type: Boolean,
			default: false,
		},
		wmnhormone: {
			type: Boolean,
			default: false,
		},
		menhealth: {
			type: Boolean,
			default: false,
		},
		menprevent: {
			type: Boolean,
			default: false,
		},
		menurinary: {
			type: Boolean,
			default: false,
		},
		mensexual: {
			type: Boolean,
			default: false,
		},
		mentestosterone: {
			type: Boolean,
			default: false,
		},
		physicalfitness: {
			type: Boolean,
			default: false,
		},
		algmeds: {
			type: Boolean,
			default: false,
		},
		algfoods: {
			type: Boolean,
			default: false,
		},
		algenv: {
			type: Boolean,
			default: false,
		},
		algsymptoms: {
			type: Boolean,
			default: false,
		},
		algcurmeds: {
			type: Boolean,
			default: false,
		},
		behavioral: {
			type: Boolean,
			default: false,
		},
		chiropractic: {
			type: Boolean,
			default: false,
		},
		massage: {
			type: Boolean,
			default: false,
		},
		physicaltherapy: {
			type: Boolean,
			default: false,
		},
		important: {
			type: Boolean,
			default: false,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Subsumedhist || mongoose.model('Subsumedhist', subsumedhistSchema);
