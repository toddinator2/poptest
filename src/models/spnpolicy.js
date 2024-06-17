import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const spnpolicySchema = new Schema(
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
		spnuserObjId: {
			type: ObjectId,
			ref: 'spnusers',
			required: true,
		},
		spnObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Spnpolicy || mongoose.model('Spnpolicy', spnpolicySchema);
