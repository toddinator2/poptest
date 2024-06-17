import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const spnsetupSchema = new Schema(
	{
		type: {
			type: String,
			trim: true,
			required: true,
		},
		profile: {
			type: Boolean,
			default: false,
		},
		location: {
			type: Boolean,
			default: false,
		},
		agreement: {
			type: Boolean,
			default: false,
		},
		bank: {
			type: Boolean,
			default: false,
		},
		spnObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Spnsetup || mongoose.model('Spnsetup', spnsetupSchema);
