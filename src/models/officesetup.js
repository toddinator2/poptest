import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const officesetupSchema = new Schema(
	{
		basic: {
			type: Boolean,
			default: false,
		},
		locations: {
			type: Boolean,
			default: false,
		},
		users: {
			type: Boolean,
			default: false,
		},
		calcols: {
			type: Boolean,
			default: false,
		},
		complete: {
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
