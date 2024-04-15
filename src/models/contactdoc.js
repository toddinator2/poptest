import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const contactdocSchema = new Schema(
	{
		companyname: {
			type: String,
			trim: true,
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		phone: {
			type: String,
			trim: true,
			required: true,
		},
		city: {
			type: String,
			trim: true,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		zip: {
			type: String,
			trim: true,
			required: true,
		},
		patientObjId: {
			type: ObjectId,
			ref: 'patients',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Contactdoc || mongoose.model('Contactdoc', contactdocSchema);
