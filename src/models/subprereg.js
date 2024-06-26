import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const subpreregSchema = new Schema(
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
		phone: {
			type: String,
			trim: true,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 64,
		},
		verifycode: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true }
);

subpreregSchema.plugin(uniqueValidator);

export default mongoose.models.Subprereg || mongoose.model('Subprereg', subpreregSchema);
