import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const polwaitingSchema = new Schema(
	{
		signertype: {
			type: String,
			trim: true,
			required: true,
		},
		requesttype: {
			type: String,
			trim: true,
			required: true,
		},
		signerObjId: {
			type: String,
			trim: true,
			required: true,
		},
		requestObjId: {
			type: String,
			trim: true,
			required: true,
		},
		policyObjId: {
			type: ObjectId,
			ref: 'policies',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Polwaiting || mongoose.model('Polwaiting', polwaitingSchema);
