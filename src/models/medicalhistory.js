import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const medicalhistorySchema = new Schema(
	{
		acr: {
			type: Boolean,
			default: false,
		},
		alc: {
			type: Boolean,
			default: false,
		},
		ane: {
			type: Boolean,
			default: false,
		},
		anx: {
			type: Boolean,
			default: false,
		},
		aui: {
			type: Boolean,
			default: false,
		},
		bid: {
			type: Boolean,
			default: false,
		},
		blc: {
			type: Boolean,
			default: false,
		},
		cbr: {
			type: Boolean,
			default: false,
		},
		cco: {
			type: Boolean,
			default: false,
		},
		cle: {
			type: Boolean,
			default: false,
		},
		clu: {
			type: Boolean,
			default: false,
		},
		cly: {
			type: Boolean,
			default: false,
		},
		cov: {
			type: Boolean,
			default: false,
		},
		cpr: {
			type: Boolean,
			default: false,
		},
		cst: {
			type: Boolean,
			default: false,
		},
		cth: {
			type: Boolean,
			default: false,
		},
		cel: {
			type: Boolean,
			default: false,
		},
		chf: {
			type: Boolean,
			default: false,
		},
		dep: {
			type: Boolean,
			default: false,
		},
		dia: {
			type: Boolean,
			default: false,
		},
		drg: {
			type: Boolean,
			default: false,
		},
		eat: {
			type: Boolean,
			default: false,
		},
		gal: {
			type: Boolean,
			default: false,
		},
		gou: {
			type: Boolean,
			default: false,
		},
		hat: {
			type: Boolean,
			default: false,
		},
		hbp: {
			type: Boolean,
			default: false,
		},
		hch: {
			type: Boolean,
			default: false,
		},
		htr: {
			type: Boolean,
			default: false,
		},
		ind: {
			type: Boolean,
			default: false,
		},
		irr: {
			type: Boolean,
			default: false,
		},
		kid: {
			type: Boolean,
			default: false,
		},
		lte: {
			type: Boolean,
			default: false,
		},
		nun: {
			type: Boolean,
			default: false,
		},
		ost: {
			type: Boolean,
			default: false,
		},
		pan: {
			type: Boolean,
			default: false,
		},
		sap: {
			type: Boolean,
			default: false,
		},
		str: {
			type: Boolean,
			default: false,
		},
		thy: {
			type: Boolean,
			default: false,
		},
		oth: {
			type: Boolean,
			default: false,
		},
		other: {
			type: String,
			trim: true,
		},
		notes: {
			type: String,
			trim: true,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Medicalhistory || mongoose.model('Medicalhistory', medicalhistorySchema);
