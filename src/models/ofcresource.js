import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ofcresourceSchema = new Schema(
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
		ofcuserObjId: {
			type: ObjectId,
			ref: 'ofcusers',
			required: true,
		},
		ofclocObjId: {
			type: ObjectId,
			ref: 'ofclocations',
			required: true,
		},
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Ofcresource || mongoose.model('Ofcresource', ofcresourceSchema);
