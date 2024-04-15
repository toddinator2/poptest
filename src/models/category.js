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

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
