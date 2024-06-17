import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const appointmentSchema = new Schema(
	{
		date: {
			type: String,
			trim: true,
			required: true,
		},
		title: {
			type: String,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		start: {
			type: String,
			trim: true,
			required: true,
		},
		end: {
			type: String,
			trim: true,
			required: true,
		},
		status: {
			type: String,
			trim: true,
		},
		color: {
			type: String,
			trim: true,
		},
		weight: {
			type: Number,
			trim: true,
		},
		feet: {
			type: Number,
			trim: true,
		},
		inches: {
			type: Number,
			trim: true,
		},
		pulse: {
			type: Number,
			trim: true,
		},
		respiration: {
			type: Number,
			trim: true,
		},
		bloodpressure: {
			type: String,
			trim: true,
		},
		temperature: {
			type: String,
			trim: true,
		},
		oxygen: {
			type: Number,
			trim: true,
		},
		neck: {
			type: Number,
			trim: true,
		},
		waist: {
			type: Number,
			trim: true,
		},
		bfat: {
			type: String,
			trim: true,
		},
		goal: {
			type: String,
			trim: true,
		},
		comment: {
			type: String,
			trim: true,
		},
		reason: {
			type: String,
			trim: true,
		},
		subjective: {
			type: String,
			trim: true,
		},
		objective: {
			type: String,
			trim: true,
		},
		assessment: {
			type: String,
			trim: true,
		},
		plan: {
			type: String,
			trim: true,
		},
		addendum: {
			type: String,
			trim: true,
		},
		unixstart: {
			type: Number,
			trim: true,
			required: true,
		},
		unixend: {
			type: Number,
			trim: true,
			required: true,
		},
		pasignreqId: {
			type: ObjectId,
			ref: 'users',
			required: false,
		},
		pasignreqname: {
			type: String,
			trim: true,
		},
		pasigned: {
			type: Boolean,
			default: false,
		},
		pasignedby: {
			type: String,
			trim: true,
		},
		pasignedbyId: {
			type: ObjectId,
			ref: 'users',
			required: false,
		},
		pasigneddate: {
			type: String,
			trim: true,
		},
		prsignreqId: {
			type: ObjectId,
			ref: 'users',
			required: true,
		},
		prsignreqname: {
			type: String,
			trim: true,
		},
		prsigned: {
			type: Boolean,
			default: false,
		},
		prsignedby: {
			type: String,
			trim: true,
		},
		prsignedbyId: {
			type: ObjectId,
			ref: 'users',
			required: false,
		},
		prsigneddate: {
			type: String,
			trim: true,
		},
		resource: [
			{
				type: ObjectId,
				ref: 'users',
				required: true,
			},
		],
		catObjId: {
			type: ObjectId,
			ref: 'categories',
			required: true,
		},
		svcObjId: {
			type: ObjectId,
			ref: 'services',
			required: true,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
		},
		ofclocObjId: {
			type: ObjectId,
			ref: 'ofclocations',
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

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
