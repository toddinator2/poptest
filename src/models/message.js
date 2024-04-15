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
		from: [
			{
				type: Object,
				required: true,
			},
		],
		subject: {
			type: String,
			trim: true,
		},
		patientObjId: {
			type: ObjectId,
			ref: 'patients',
			required: false,
		},
		patientname: {
			type: String,
			trim: true,
		},
		patientview: {
			type: Boolean,
			default: false,
		},
		message: {
			type: String,
			trim: true,
		},
		datesent: {
			type: String,
			trim: true,
		},
		timesent: {
			type: String,
			trim: true,
		},
		unixtimesent: {
			type: Number,
			trim: true,
			required: true,
		},
		archived: {
			type: Boolean,
			default: false,
		},
		deleted: {
			type: Boolean,
			default: false,
		},
		officeObjId: {
			type: ObjectId,
			ref: 'offices',
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Message || mongoose.model('Message', messageSchema);
