import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const algcurmedSchema = new Schema(
	{
		any: {
			type: String,
			trim: true,
		},
		ant: {
			type: String,
			trim: true,
		},
		ast: {
			type: String,
			trim: true,
		},
		eye: {
			type: String,
			trim: true,
		},
		nas: {
			type: String,
			trim: true,
		},
		orl: {
			type: String,
			trim: true,
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

export default mongoose.models.Algcurmed || mongoose.model('Algcurmed', algcurmedSchema);
