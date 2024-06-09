import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const officesetupSchema = new Schema(
	{
		profile: {
			type: Boolean,
			default: false,
		},
		company: {
			type: Boolean,
			default: false,
		},
		location: {
			type: Boolean,
			default: false,
		},
		licensing: {
			type: Boolean,
			default: false,
		},
		payment: {
			type: Boolean,
			default: false,
		},
		sponsor: {
			type: Boolean,
			default: false,
		},
		directory: {
			type: Boolean,
			default: false,
		},
		procenter: {
			type: Boolean,
			default: false,
		},
		agora: {
			type: Boolean,
			default: false,
		},
		merchant: {
			type: Boolean,
			default: false,
		},
		terms: {
			type: Boolean,
			default: false,
		},
		privacy: {
			type: Boolean,
			default: false,
		},
		comm: {
			type: Boolean,
			default: false,
		},
		officeObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Officesetup || mongoose.model('Officesetup', officesetupSchema);
