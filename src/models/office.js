import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const officeSchema = new Schema(
	{
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
		active: {
			type: Boolean,
			default: true,
		},
		numphysicians: {
			type: String,
			trim: true,
		},
		numnpps: {
			type: String,
			trim: true,
		},
		numstaff: {
			type: String,
			trim: true,
		},
		numnonmedstaff: {
			type: String,
			trim: true,
		},
		currentehr: {
			type: String,
			trim: true,
		},
		setupcomplete: {
			type: Boolean,
			default: false,
		},
		ofcs3xid: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
	},
	{ timestamps: true }
);

officeSchema.plugin(uniqueValidator);

export default mongoose.models.Office || mongoose.model('Office', officeSchema);
