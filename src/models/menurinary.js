import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const menurinarySchema = new Schema(
	{
		empty: {
			type: String,
			trim: true,
		},
		again: {
			type: String,
			trim: true,
		},
		stop: {
			type: String,
			trim: true,
		},
		hold: {
			type: String,
			trim: true,
		},
		weak: {
			type: String,
			trim: true,
		},
		push: {
			type: String,
			trim: true,
		},
		nite: {
			type: String,
			trim: true,
		},
		life: {
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

export default mongoose.models.Menurinary || mongoose.model('Menurinary', menurinarySchema);
