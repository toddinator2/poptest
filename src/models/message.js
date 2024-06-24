import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const messageSchema = new Schema(
	{
		to: [
			{
				type: Object,
				required: true,
			},
		],
		from: {
			type: String,
			trim: true,
			required: true,
		},
		subject: {
			type: String,
			trim: true,
			required: true,
		},
		datesent: {
			type: String,
			trim: true,
			required: true,
		},
		timesent: {
			type: String,
			trim: true,
			required: true,
		},
		unixtimesent: {
			type: Number,
			trim: true,
			required: true,
		},
		message: {
			type: String,
			trim: true,
			required: true,
		},
		subcanview: {
			type: Boolean,
			default: false,
		},
		subname: {
			type: String,
			trim: true,
		},
		saved: {
			type: Boolean,
			default: false,
		},
		deleted: {
			type: Boolean,
			default: false,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: false,
		},
		spnObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: false,
		},
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Message || mongoose.model('Message', messageSchema);
