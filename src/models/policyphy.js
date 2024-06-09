import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const policyphySchema = new Schema(
	{
		licensing: {
			type: Boolean,
			default: false,
		},
		licensingdate: {
			type: String,
			trim: true,
		},
		licensinginits: {
			type: String,
			trim: true,
			touppercase: true,
		},
		payment: {
			type: Boolean,
			default: false,
		},
		paymentdate: {
			type: String,
			trim: true,
		},
		paymentinits: {
			type: String,
			trim: true,
			touppercase: true,
		},
		sponsor: {
			type: Boolean,
			default: false,
		},
		sponsordate: {
			type: String,
			trim: true,
		},
		sponsorinits: {
			type: String,
			trim: true,
			touppercase: true,
		},
		directory: {
			type: Boolean,
			default: false,
		},
		directorydate: {
			type: String,
			trim: true,
		},
		directoryinits: {
			type: String,
			trim: true,
			touppercase: true,
		},
		procenter: {
			type: Boolean,
			default: false,
		},
		procenterdate: {
			type: String,
			trim: true,
		},
		procenterinits: {
			type: String,
			trim: true,
			touppercase: true,
		},
		agora: {
			type: Boolean,
			default: false,
		},
		agoradate: {
			type: String,
			trim: true,
		},
		agorainits: {
			type: String,
			trim: true,
			touppercase: true,
		},
		merchant: {
			type: Boolean,
			default: false,
		},
		merchantdate: {
			type: String,
			trim: true,
		},
		merchantinits: {
			type: String,
			trim: true,
			touppercase: true,
		},
		terms: {
			type: Boolean,
			default: false,
		},
		termsdate: {
			type: String,
			trim: true,
		},
		termsinits: {
			type: String,
			trim: true,
			touppercase: true,
		},
		privacy: {
			type: Boolean,
			default: false,
		},
		privacydate: {
			type: String,
			trim: true,
		},
		privacyinits: {
			type: String,
			trim: true,
			touppercase: true,
		},
		comm: {
			type: Boolean,
			default: false,
		},
		commdate: {
			type: String,
			trim: true,
		},
		comminits: {
			type: String,
			trim: true,
			touppercase: true,
		},
		officeuserObjId: {
			type: ObjectId,
			ref: 'officeusers',
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

export default mongoose.models.Policyphy || mongoose.model('Policyphy', policyphySchema);
