import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const familyhistorySchema = new Schema(
	{
		alc: {
			type: Boolean,
			default: false,
		},
		anx: {
			type: Boolean,
			default: false,
		},
		bip: {
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
		clu: {
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
		cot: {
			type: Boolean,
			default: false,
		},
		dem: {
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
		hed: {
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
		leu: {
			type: Boolean,
			default: false,
		},
		lym: {
			type: Boolean,
			default: false,
		},
		nun: {
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
		patientObjId: {
			type: ObjectId,
			ref: 'patients',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Familyhistory || mongoose.model('Familyhistory', familyhistorySchema);
