import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const policyspnSchema = new Schema(
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
		sponsoruserObjId: {
			type: ObjectId,
			ref: 'sponsorusers',
			required: true,
		},
		sponsorObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Policyspn || mongoose.model('Policyspn', policyspnSchema);
