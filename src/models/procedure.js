import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const procedureSchema = new Schema(
	{
		app: {
			type: Boolean,
			default: false,
		},
		csn: {
			type: Boolean,
			default: false,
		},
		cor: {
			type: Boolean,
			default: false,
		},
		gal: {
			type: Boolean,
			default: false,
		},
		hes: {
			type: Boolean,
			default: false,
		},
		her: {
			type: Boolean,
			default: false,
		},
		hip: {
			type: Boolean,
			default: false,
		},
		hys: {
			type: Boolean,
			default: false,
		},
		kne: {
			type: Boolean,
			default: false,
		},
		nun: {
			type: Boolean,
			default: false,
		},
		sps: {
			type: Boolean,
			default: false,
		},
		ste: {
			type: Boolean,
			default: false,
		},
		ton: {
			type: Boolean,
			default: false,
		},
		wls: {
			type: Boolean,
			default: false,
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

export default mongoose.models.Procedure || mongoose.model('Procedure', procedureSchema);
