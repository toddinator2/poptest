import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const chiropracticSchema = new Schema(
	{
		cur: {
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
		knw: {
			type: Boolean,
			default: false,
		},
		not: {
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

export default mongoose.models.Chiropractic || mongoose.model('Chiropractic', chiropracticSchema);
