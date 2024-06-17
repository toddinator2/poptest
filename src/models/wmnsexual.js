import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const wmnsexualSchema = new Schema(
	{
		desire: {
			type: String,
			trim: true,
		},
		lubrication: {
			type: String,
			trim: true,
		},
		overall: {
			type: String,
			trim: true,
		},
		discomfort: {
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

export default mongoose.models.Wmnsexual || mongoose.model('Wmnsexual', wmnsexualSchema);
