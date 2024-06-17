import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const algenvSchema = new Schema(
	{
		any: {
			type: String,
			trim: true,
		},
		dmwhen: {
			type: String,
			trim: true,
		},
		dmtype: {
			type: String,
			trim: true,
		},
		ivwhen: {
			type: String,
			trim: true,
		},
		ivtype: {
			type: String,
			trim: true,
		},
		lxwhen: {
			type: String,
			trim: true,
		},
		lxtype: {
			type: String,
			trim: true,
		},
		mdwhen: {
			type: String,
			trim: true,
		},
		mdtype: {
			type: String,
			trim: true,
		},
		pswhen: {
			type: String,
			trim: true,
		},
		pstype: {
			type: String,
			trim: true,
		},
		ptwhen: {
			type: String,
			trim: true,
		},
		pttype: {
			type: String,
			trim: true,
		},
		plwhen: {
			type: String,
			trim: true,
		},
		pltype: {
			type: String,
			trim: true,
		},
		oth: {
			type: Boolean,
			default: false,
		},
		other: {
			type: String,
			trim: true,
		},
		notes: {
			type: String,
			trim: true,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Algenv || mongoose.model('Algenv', algenvSchema);
