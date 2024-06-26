import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ofcuserSchema = new Schema(
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
			min: 6,
			max: 64,
		},
		active: {
			type: Boolean,
			default: true,
		},
		phone: {
			type: String,
			trim: true,
		},
		photo: {
			type: String,
			trim: true,
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
		},
		zip: {
			type: String,
			trim: true,
		},
		permission: {
			type: String,
			required: true,
			default: 'staff',
			lowercase: true,
		},
		role: {
			type: String,
			required: true,
			default: 'staff',
			lowercase: true,
		},
		supervisor: {
			type: ObjectId,
			ref: 'officeusers',
			required: false,
		},
		paid: {
			type: Boolean,
			default: false,
		},
		clockedin: {
			type: Boolean,
			default: false,
		},
		dates: [
			{
				type: Object,
				required: false,
			},
		],
		title: {
			type: String,
			trim: true,
		},
		license: {
			type: String,
			trim: true,
		},
		licensestate: {
			type: String,
			trim: true,
		},
		npi: {
			type: String,
			trim: true,
		},
		gnpi: {
			type: String,
			trim: true,
		},
		specialty: {
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
		ofcs3xid: {
			type: String,
			trim: true,
			required: true,
			index: true,
			lowercase: true,
		},
		ofclocObjId: [
			{
				type: String,
				trim: true,
				required: true,
			},
		],
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

ofcuserSchema.plugin(uniqueValidator);

export default mongoose.models.Ofcuser || mongoose.model('Ofcuser', ofcuserSchema);
