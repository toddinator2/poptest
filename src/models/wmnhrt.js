import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const wmnhrtSchema = new Schema(
	{
		nrt: {
			type: Boolean,
			default: false,
		},
		wct: {
			type: Boolean,
			default: false,
		},
		may: {
			type: Boolean,
			default: false,
		},
		int: {
			type: Boolean,
			default: false,
		},
		cur: {
			type: Boolean,
			default: false,
		},
		learnmore: {
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

export default mongoose.models.Wmnhrt || mongoose.model('Wmnhrt', wmnhrtSchema);
