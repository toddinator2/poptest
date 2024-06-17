import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const s3xuserSchema = new Schema(
	{
		fname: {
			type: String,
			trim: true,
			required: [true, 'First name is required'],
		},
		lname: {
			type: String,
			trim: true,
			required: [true, 'Last name is required'],
		},
		email: {
			type: String,
			trim: true,
			required: [true, 'Email is required'],
			unique: true,
			lowercase: true,
		},
		phone: {
			type: String,
			trim: true,
			required: [true, 'Phone is required'],
		},
		username: {
			type: String,
			trim: true,
			required: [true, 'Username is required'],
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			min: 6,
			max: 64,
		},
		active: {
			type: Boolean,
			default: true,
		},
		photo: {
			type: String,
			trim: true,
		},
		permission: {
			type: String,
			required: true,
			default: 'admin',
			lowercase: true,
		},
		role: {
			type: String,
			required: true,
			default: 'admin',
			lowercase: true,
		},
		resetcreds: {
			type: Boolean,
			default: true,
		},
		resetcode: {
			type: String,
			min: 5,
			max: 5,
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
	},
	{ timestamps: true }
);

s3xuserSchema.plugin(uniqueValidator);

export default mongoose.models.S3xuser || mongoose.model('S3xuser', s3xuserSchema);
