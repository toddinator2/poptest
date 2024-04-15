import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const mentrtSchema = new Schema(
	{
		nrt: {
			type: Boolean,
			default: false,
		},
		cur: {
			type: Boolean,
			default: false,
		},
		wct: {
			type: Boolean,
			default: false,
		},
		wkm: {
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
		learnmore: {
			type: String,
			trim: true,
		},
		notes: {
			type: String,
			trim: true,
		},
		patientObjId: {
			type: ObjectId,
			ref: 'patients',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Mentrt || mongoose.model('Mentrt', mentrtSchema);
