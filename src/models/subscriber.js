import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const subscriberSchema = new Schema(
	{
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
		dob: {
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
		username: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		photo: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
			required: true,
		},
		address: {
			type: String,
			trim: true,
		},
		address2: {
			type: String,
			trim: true,
		},
		city: {
			type: String,
			trim: true,
		},
		state: {
			type: String,
			trim: true,
			min: 2,
			max: 2,
		},
		zip: {
			type: String,
			trim: true,
		},
		sex: {
			type: String,
			min: 1,
			max: 1,
		},
		marital: {
			type: String,
			trim: true,
		},
		referredby: {
			type: String,
			trim: true,
		},
		hearabout: {
			type: String,
			trim: true,
		},
		pcpname: {
			type: String,
			trim: true,
		},
		pcpphone: {
			type: String,
			trim: true,
		},
		employer: {
			type: String,
			trim: true,
		},
		employerphone: {
			type: String,
			trim: true,
		},
		emergencycontact: {
			type: String,
			trim: true,
		},
		emergencyphone: {
			type: String,
			trim: true,
		},
		emergencyrelation: {
			type: String,
			trim: true,
		},
		resetcreds: {
			type: Boolean,
			required: true,
			default: false,
		},
		resetcode: {
			type: String,
			trim: true,
		},
		permission: {
			type: String,
			required: true,
			default: 'subscriber',
			lowercase: true,
		},
		role: {
			type: String,
			required: true,
			default: 'subscriber',
			lowercase: true,
		},
		verifycode: {
			type: String,
			trim: true,
		},
		emailconfirmed: {
			type: Boolean,
			required: true,
			default: false,
		},
		setupcomplete: {
			type: Boolean,
			required: true,
			default: false,
		},
		latitude: {
			type: String,
			trim: true,
		},
		longitude: {
			type: String,
			trim: true,
		},
		weightloss: {
			type: Boolean,
			default: false,
		},
		subs3xid: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
	},
	{ timestamps: true }
);

subscriberSchema.plugin(uniqueValidator);

export default mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);
