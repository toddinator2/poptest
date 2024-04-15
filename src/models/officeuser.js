import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const officeuserSchema = new Schema(
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
			index: true,
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
		npi: {
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
		officeid: {
			type: String,
			trim: true,
			index: true,
			required: true,
			lowercase: true,
		},
		locationObjId: [
			{
				type: ObjectId,
				ref: 'officelocations',
			},
		],
		officeObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Officeuser || mongoose.model('Officeuser', officeuserSchema);
