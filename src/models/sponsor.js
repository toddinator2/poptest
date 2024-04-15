import mongoose from 'mongoose';
const { Schema } = mongoose;

const sponsorSchema = new Schema(
	{
		type: {
			type: String,
			required: true,
			lowercase: true,
		},
		sponsorid: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		companyname: {
			type: String,
			trim: true,
		},
		fname: {
			type: String,
			trim: true,
			required: true,
		},
		lname: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		phone: {
			type: String,
			trim: true,
			required: true,
		},
		phoneext: {
			type: String,
			trim: true,
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		website: {
			type: String,
			trim: true,
		},
		legalname: {
			type: String,
			trim: true,
		},
		eid: {
			type: String,
			trim: true,
		},
		industry: {
			type: String,
			trim: true,
		},
		numemps: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Sponsor || mongoose.model('Sponsor', sponsorSchema);
