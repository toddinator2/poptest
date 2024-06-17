import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ofclocationSchema = new Schema(
	{
		name: {
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
		phone: {
			type: String,
			trim: true,
		},
		startday: {
			type: Number,
			default: 1,
		},
		endday: {
			type: Number,
			default: 5,
		},
		sametimes: {
			type: Boolean,
			default: false,
		},
		starttime0: {
			type: String,
			trim: true,
		},
		endtime0: {
			type: String,
			trim: true,
		},
		startlunch0: {
			type: String,
			trim: true,
		},
		endlunch0: {
			type: String,
			trim: true,
		},
		starttime1: {
			type: String,
			trim: true,
		},
		endtime1: {
			type: String,
			trim: true,
		},
		startlunch1: {
			type: String,
			trim: true,
		},
		endlunch1: {
			type: String,
			trim: true,
		},
		starttime2: {
			type: String,
			trim: true,
		},
		endtime2: {
			type: String,
			trim: true,
		},
		startlunch2: {
			type: String,
			trim: true,
		},
		endlunch2: {
			type: String,
			trim: true,
		},
		starttime3: {
			type: String,
			trim: true,
		},
		endtime3: {
			type: String,
			trim: true,
		},
		startlunch3: {
			type: String,
			trim: true,
		},
		endlunch3: {
			type: String,
			trim: true,
		},
		starttime4: {
			type: String,
			trim: true,
		},
		endtime4: {
			type: String,
			trim: true,
		},
		startlunch4: {
			type: String,
			trim: true,
		},
		endlunch4: {
			type: String,
			trim: true,
		},
		starttime5: {
			type: String,
			trim: true,
		},
		endtime5: {
			type: String,
			trim: true,
		},
		startlunch5: {
			type: String,
			trim: true,
		},
		endlunch5: {
			type: String,
			trim: true,
		},
		starttime6: {
			type: String,
			trim: true,
		},
		endtime6: {
			type: String,
			trim: true,
		},
		startlunch6: {
			type: String,
			trim: true,
		},
		endlunch6: {
			type: String,
			trim: true,
		},
		latitude: {
			type: String,
			trim: true,
		},
		longitude: {
			type: String,
			trim: true,
		},
		patients: [
			{
				type: String,
				trim: true,
			},
		],
		locs3xid: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

ofclocationSchema.plugin(uniqueValidator);

export default mongoose.models.Ofclocation || mongoose.model('Ofclocation', ofclocationSchema);
