import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const diarySchema = new Schema(
	{
		note: {
			type: String,
			trim: true,
			required: true,
		},
		officeuserObjId: {
			type: ObjectId,
			ref: 'users',
			required: true,
		},
		patientObjId: {
			type: ObjectId,
			ref: 'patients',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Diary || mongoose.model('Diary', diarySchema);
