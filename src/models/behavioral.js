import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const behavioralSchema = new Schema(
	{
		not: {
			type: Boolean,
			default: false,
		},
		nvr: {
			type: Boolean,
			default: false,
		},
		iwc: {
			type: Boolean,
			default: false,
		},
		may: {
			type: Boolean,
			default: false,
		},
		ned: {
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

export default mongoose.models.Behavioral || mongoose.model('Behavioral', behavioralSchema);
