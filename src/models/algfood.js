import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const algfoodSchema = new Schema(
	{
		any: {
			type: String,
			trim: true,
		},
		dai: {
			type: Boolean,
			default: false,
		},
		egg: {
			type: Boolean,
			default: false,
		},
		fsh: {
			type: Boolean,
			default: false,
		},
		glu: {
			type: Boolean,
			default: false,
		},
		pea: {
			type: Boolean,
			default: false,
		},
		shl: {
			type: Boolean,
			default: false,
		},
		soy: {
			type: Boolean,
			default: false,
		},
		trn: {
			type: Boolean,
			default: false,
		},
		whe: {
			type: Boolean,
			default: false,
		},
		oth: {
			type: Boolean,
			default: false,
		},
		other: {
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

export default mongoose.models.Algfood || mongoose.model('Algfood', algfoodSchema);
