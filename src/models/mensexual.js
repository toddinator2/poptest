import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const mensexualSchema = new Schema(
	{
		keep: {
			type: String,
			trim: true,
		},
		hard: {
			type: String,
			trim: true,
		},
		after: {
			type: String,
			trim: true,
		},
		comp: {
			type: String,
			trim: true,
		},
		satfy: {
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

export default mongoose.models.Mensexual || mongoose.model('Mensexual', mensexualSchema);
