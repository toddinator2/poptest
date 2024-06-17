import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const wmnobgynSchema = new Schema(
	{
		pregnant: {
			type: String,
			trim: true,
		},
		pregtest: {
			type: String,
			trim: true,
		},
		ageperstart: {
			type: String,
			trim: true,
		},
		ageperend: {
			type: String,
			trim: true,
		},
		agefirstpreg: {
			type: String,
			trim: true,
		},
		agelastpreg: {
			type: String,
			trim: true,
		},
		agelastmenses: {
			type: String,
			trim: true,
		},
		periods: {
			type: String,
			trim: true,
		},
		numpregs: {
			type: String,
			trim: true,
		},
		numkids: {
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

export default mongoose.models.Wmnobgyn || mongoose.model('Wmnobgyn', wmnobgynSchema);
