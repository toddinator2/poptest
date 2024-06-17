import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const menpreventSchema = new Schema(
	{
		clg: {
			type: Boolean,
			default: false,
		},
		clgdate: {
			type: String,
			trim: true,
		},
		cls: {
			type: Boolean,
			default: false,
		},
		clsdate: {
			type: String,
			trim: true,
		},
		eye: {
			type: Boolean,
			default: false,
		},
		eyedate: {
			type: String,
			trim: true,
		},
		psa: {
			type: Boolean,
			default: false,
		},
		psadate: {
			type: String,
			trim: true,
		},
		notes: {
			type: String,
			trim: true,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Menprevent || mongoose.model('Menprevent', menpreventSchema);
