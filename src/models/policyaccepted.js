import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const policyacceptedSchema = new Schema(
	{
		accepted: {
			type: Boolean,
			default: false,
		},
		dateaccepted: {
			type: String,
			trim: true,
		},
		typedname: {
			type: String,
			trim: true,
		},
		resname: {
			type: String,
			trim: true,
		},
		restypedname: {
			type: String,
			trim: true,
		},
		resrelation: {
			type: String,
			trim: true,
		},
		resphone: {
			type: String,
			trim: true,
		},
		release1: {
			type: String,
			trim: true,
		},
		release1relation: {
			type: String,
			trim: true,
		},
		release1phone: {
			type: String,
			trim: true,
		},
		release2: {
			type: String,
			trim: true,
		},
		release2relation: {
			type: String,
			trim: true,
		},
		release2phone: {
			type: String,
			trim: true,
		},
		release3: {
			type: String,
			trim: true,
		},
		release3relation: {
			type: String,
			trim: true,
		},
		release3phone: {
			type: String,
			trim: true,
		},
		policyObjId: {
			type: ObjectId,
			ref: 'policies',
			required: true,
		},
		patientObjId: {
			type: ObjectId,
			ref: 'patients',
			required: true,
		},
		officeObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Policyaccepted || mongoose.model('Policyaccepted', policyacceptedSchema);
