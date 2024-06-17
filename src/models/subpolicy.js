import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const subpolicySchema = new Schema(
	{
		agreement: {
			type: Boolean,
			default: false,
		},
		agreementdate: {
			type: String,
			trim: true,
		},
		agreementsign: {
			type: String,
			trim: true,
			touppercase: true,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Subpolicy || mongoose.model('Subpolicy', subpolicySchema);
