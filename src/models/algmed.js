import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const algmedSchema = new Schema(
	{
		any: {
			type: String,
			trim: true,
		},
		bio: {
			type: Boolean,
			default: false,
		},
		con: {
			type: Boolean,
			default: false,
		},
		asp: {
			type: Boolean,
			default: false,
		},
		bpm: {
			type: Boolean,
			default: false,
		},
		che: {
			type: Boolean,
			default: false,
		},
		pen: {
			type: Boolean,
			default: false,
		},
		udd: {
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

export default mongoose.models.Algmed || mongoose.model('Algmed', algmedSchema);
