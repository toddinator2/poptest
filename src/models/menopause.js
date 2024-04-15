import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const menopauseSchema = new Schema(
	{
		anx: {
			type: String,
			trim: true,
		},
		bla: {
			type: String,
			trim: true,
		},
		dep: {
			type: String,
			trim: true,
		},
		dry: {
			type: String,
			trim: true,
		},
		hot: {
			type: String,
			trim: true,
		},
		hed: {
			type: String,
			trim: true,
		},
		irr: {
			type: String,
			trim: true,
		},
		joi: {
			type: String,
			trim: true,
		},
		phy: {
			type: String,
			trim: true,
		},
		sex: {
			type: String,
			trim: true,
		},
		slp: {
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

export default mongoose.models.Menopause || mongoose.model('Menopause', menopauseSchema);
