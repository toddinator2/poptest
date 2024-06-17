import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const categorySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		color: {
			type: String,
			trim: true,
			default: 'cacad9',
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

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
