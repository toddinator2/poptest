import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const sponsorSchema = new Schema(
	{
		type: {
			type: String,
			required: true,
			lowercase: true,
		},
		legalname: {
			type: String,
			trim: true,
			required: true,
		},
		dba: {
			type: String,
			trim: true,
		},
		ein: {
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
		numlocs: {
			type: String,
			trim: true,
		},
		numemps: {
			type: String,
			trim: true,
		},
		nummgnt: {
			type: String,
			trim: true,
		},
		curpayins: {
			type: Boolean,
			default: false,
		},
		curselffund: {
			type: Boolean,
			default: false,
		},
		setupcomplete: {
			type: Boolean,
			required: true,
			default: false,
		},
		sponsorid: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
	},
	{ timestamps: true }
);

sponsorSchema.plugin(uniqueValidator);

export default mongoose.models.Sponsor || mongoose.model('Sponsor', sponsorSchema);
