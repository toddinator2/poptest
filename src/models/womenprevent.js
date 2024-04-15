import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const womenpreventSchema = new Schema(
	{
		clg: {
			type: Boolean,
			default: false,
		},
		clgdate: {
			type: String,
			trim: true,
		},
		cls: {
			type: Boolean,
			default: false,
		},
		clsdate: {
			type: String,
			trim: true,
		},
		dex: {
			type: Boolean,
			default: false,
		},
		dexdate: {
			type: String,
			trim: true,
		},
		eye: {
			type: Boolean,
			default: false,
		},
		eyedate: {
			type: String,
			trim: true,
		},
		mam: {
			type: Boolean,
			default: false,
		},
		mamdate: {
			type: String,
			trim: true,
		},
		pap: {
			type: Boolean,
			default: false,
		},
		papdate: {
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

export default mongoose.models.Womenprevent || mongoose.model('Womenprevent', womenpreventSchema);
