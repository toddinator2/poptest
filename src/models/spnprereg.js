import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const spnpreregSchema = new Schema(
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
		company: {
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
		website: {
			type: String,
			trim: true,
		},
		type: {
			type: String,
			trim: true,
			required: true,
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
			min: 6,
			max: 64,
		},
		verifycode: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{ timestamps: true }
);

spnpreregSchema.plugin(uniqueValidator);

export default mongoose.models.Spnprereg || mongoose.model('Spnprereg', spnpreregSchema);
