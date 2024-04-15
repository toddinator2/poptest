import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const documentSchema = new Schema(
	{
		fileurl: {
			type: String,
			trim: true,
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		proceduredate: {
			type: String,
			trim: true,
			required: true,
		},
		uploaddate: {
			type: String,
			trim: true,
			required: true,
		},
		uploadedby: [
			{
				type: Object,
				required: true,
			},
		],
		patientObjId: {
			type: ObjectId,
			ref: 'patients',
			required: true,
		},
		patientname: {
			type: String,
			trim: true,
		},
		provider: [
			{
				type: Object,
				required: true,
			},
		],
		signed: {
			type: Boolean,
			default: false,
		},
		signedby: {
			type: String,
			trim: true,
		},
		signedbyId: {
			type: ObjectId,
			ref: 'users',
			required: false,
		},
		signeddate: {
			type: String,
			trim: true,
		},
		doctypeObjId: {
			type: ObjectId,
			ref: 'doctypes',
		},
		officeObjId: {
			type: ObjectId,
			ref: 'offices',
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Document || mongoose.model('Document', documentSchema);
