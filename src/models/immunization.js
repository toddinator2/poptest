import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const immunizationSchema = new Schema(
	{
		cov: {
			type: Boolean,
			default: false,
		},
		covdate: {
			type: String,
			trim: true,
		},
		dtt: {
			type: Boolean,
			default: false,
		},
		dttdate: {
			type: String,
			trim: true,
		},
		flu: {
			type: Boolean,
			default: false,
		},
		fludate: {
			type: String,
			trim: true,
		},
		hpb: {
			type: Boolean,
			default: false,
		},
		hpbdate: {
			type: String,
			trim: true,
		},
		nun: {
			type: Boolean,
			default: false,
		},
		pne: {
			type: Boolean,
			default: false,
		},
		pnedate: {
			type: String,
			trim: true,
		},
		pre: {
			type: Boolean,
			default: false,
		},
		predate: {
			type: String,
			trim: true,
		},
		shi: {
			type: Boolean,
			default: false,
		},
		shidate: {
			type: String,
			trim: true,
		},
		tdp: {
			type: Boolean,
			default: false,
		},
		tdpdate: {
			type: String,
			trim: true,
		},
		patientObjId: {
			type: ObjectId,
			ref: 'patients',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Immunization || mongoose.model('Immunization', immunizationSchema);
