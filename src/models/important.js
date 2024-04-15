import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const importantSchema = new Schema(
	{
		time: {
			type: String,
			trim: true,
		},
		cost: {
			type: String,
			trim: true,
		},
		opts: {
			type: String,
			trim: true,
		},
		appt: {
			type: String,
			trim: true,
		},
		tech: {
			type: String,
			trim: true,
		},
		services: {
			type: String,
			trim: true,
		},
		foods: {
			type: String,
			trim: true,
		},
		exercise: {
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

export default mongoose.models.Important || mongoose.model('Important', importantSchema);
