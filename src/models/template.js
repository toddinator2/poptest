import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const templateSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		category: {
			type: String,
			trim: true,
			required: true,
		},
		body: {
			type: String,
			trim: true,
			required: true,
		},
		officeuserObjId: {
			type: ObjectId,
			ref: 'users',
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Template || mongoose.model('Template', templateSchema);
