import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const menhealthSchema = new Schema(
	{
		erd: {
			type: Boolean,
			default: false,
		},
		sex: {
			type: Boolean,
			default: false,
		},
		mus: {
			type: Boolean,
			default: false,
		},
		nun: {
			type: Boolean,
			default: false,
		},
		tst: {
			type: Boolean,
			default: false,
		},
		exc: {
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

export default mongoose.models.Menhealth || mongoose.model('Menhealth', menhealthSchema);
