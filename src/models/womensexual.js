import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const womensexualSchema = new Schema(
	{
		desire: {
			type: String,
			trim: true,
		},
		lubrication: {
			type: String,
			trim: true,
		},
		overall: {
			type: String,
			trim: true,
		},
		discomfort: {
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

export default mongoose.models.Womensexual || mongoose.model('Womensexual', womensexualSchema);
