import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const doctypeSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		patientview: {
			type: Boolean,
			required: true,
			default: false,
		},
		officeObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Doctype || mongoose.model('Doctype', doctypeSchema);
