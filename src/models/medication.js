import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const medicationSchema = new Schema(
	{
		type: {
			type: String,
			trim: true,
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		dosage: {
			type: String,
			trim: true,
		},
		frequency: {
			type: String,
			trim: true,
		},
		reason: {
			type: String,
			trim: true,
		},
		historic: {
			type: Boolean,
			default: false,
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

export default mongoose.models.Medication || mongoose.model('Medication', medicationSchema);
