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
		ofcuserObjId: {
			type: ObjectId,
			ref: 'ofcusers',
			required: true,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Diary || mongoose.model('Diary', diarySchema);
