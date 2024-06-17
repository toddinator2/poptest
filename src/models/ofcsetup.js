import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ofcsetupSchema = new Schema(
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
		agreement: {
			type: Boolean,
			default: false,
		},
		bank: {
			type: Boolean,
			default: false,
		},
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Ofcsetup || mongoose.model('Ofcsetup', ofcsetupSchema);
