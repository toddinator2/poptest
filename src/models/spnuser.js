import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const spnuserSchema = new Schema(
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
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
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
		photo: {
			type: String,
			trim: true,
		},
		permission: {
			type: String,
			required: true,
			default: 'sponsor',
			lowercase: true,
		},
		role: {
			type: String,
			required: true,
			default: 'sponsor',
			lowercase: true,
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
		verifycode: {
			type: String,
			trim: true,
		},
		emailconfirmed: {
			type: Boolean,
			required: true,
			default: false,
		},
		spns3xid: {
			type: String,
			trim: true,
			required: true,
			index: true,
			lowercase: true,
		},
		spnlocObjId: [
			{
				type: String,
				trim: true,
				required: true,
			},
		],
		spnObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: true,
		},
	},
	{ timestamps: true }
);

spnuserSchema.plugin(uniqueValidator);

export default mongoose.models.Spnuser || mongoose.model('Spnuser', spnuserSchema);
