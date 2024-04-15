import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const serviceSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		price: {
			type: Number,
			trim: true,
			required: true,
		},
		catObjId: {
			type: ObjectId,
			ref: 'categories',
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

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);
