import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const subsetupSchema = new Schema(
	{
		profile: {
			type: Boolean,
			default: false,
		},
		docform: {
			type: Boolean,
			default: false,
		},
		empform: {
			type: Boolean,
			default: false,
		},
		medhist: {
			type: Boolean,
			default: false,
		},
		agreement: {
			type: Boolean,
			default: false,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Subsetup || mongoose.model('Subsetup', subsetupSchema);
