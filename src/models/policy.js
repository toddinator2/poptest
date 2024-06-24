import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const policySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			uppercase: true,
		},
		compname: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		type: {
			type: String,
			trim: true,
			required: true,
		},
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: false,
		},
		spnObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: false,
		},
		ofclocObjId: {
			type: ObjectId,
			ref: 'ofclocations',
			required: false,
		},
		spnlocObjId: {
			type: ObjectId,
			ref: 'spnlocations',
			required: false,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: false,
		},
	},
	{ timestamps: true }
);

policySchema.plugin(uniqueValidator);

export default mongoose.models.Policy || mongoose.model('Policy', policySchema);
