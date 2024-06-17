import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const algsymptomSchema = new Schema(
	{
		any: {
			type: String,
			trim: true,
		},
		cou: {
			type: String,
			trim: true,
		},
		dbr: {
			type: String,
			trim: true,
		},
		ecz: {
			type: String,
			trim: true,
		},
		ein: {
			type: String,
			trim: true,
		},
		eit: {
			type: String,
			trim: true,
		},
		eyg: {
			type: String,
			trim: true,
		},
		eyi: {
			type: String,
			trim: true,
		},
		eyw: {
			type: String,
			trim: true,
		},
		fre: {
			type: String,
			trim: true,
		},
		hed: {
			type: String,
			trim: true,
		},
		hiv: {
			type: String,
			trim: true,
		},
		nit: {
			type: String,
			trim: true,
		},
		nru: {
			type: String,
			trim: true,
		},
		nst: {
			type: String,
			trim: true,
		},
		sin: {
			type: String,
			trim: true,
		},
		spr: {
			type: String,
			trim: true,
		},
		spa: {
			type: String,
			trim: true,
		},
		snz: {
			type: String,
			trim: true,
		},
		whz: {
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

export default mongoose.models.Algsymptom || mongoose.model('Algsymptom', algsymptomSchema);
