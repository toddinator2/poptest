import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ofcownerSchema = new Schema(
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
		phone: {
			type: String,
			trim: true,
			required: true,
		},
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
		},
	},
	{ timestamps: true }
);

ofcownerSchema.plugin(uniqueValidator);

export default mongoose.models.Ofcowner || mongoose.model('Ofcowner', ofcownerSchema);
