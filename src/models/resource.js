import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const resourceSchema = new Schema(
	{
		id: {
			type: Number,
			trim: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		order: {
			type: Number,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
		},
		photo: {
			type: String,
			trim: true,
		},
		officeuserObjId: {
			type: ObjectId,
			ref: 'users',
			required: true,
		},
		locationObjId: {
			type: ObjectId,
			ref: 'locations',
			required: true,
		},
		officeObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
