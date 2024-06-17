import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const wmnhealthSchema = new Schema(
	{
		bhc: {
			type: Boolean,
			default: false,
		},
		dgp: {
			type: Boolean,
			default: false,
		},
		fhr: {
			type: Boolean,
			default: false,
		},
		hot: {
			type: Boolean,
			default: false,
		},
		irr: {
			type: Boolean,
			default: false,
		},
		lsx: {
			type: Boolean,
			default: false,
		},
		nun: {
			type: Boolean,
			default: false,
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

export default mongoose.models.Wmnhealth || mongoose.model('Wmnhealth', wmnhealthSchema);
