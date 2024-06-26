import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const spnlocationSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		address: {
			type: String,
			trim: true,
		},
		address2: {
			type: String,
			trim: true,
		},
		city: {
			type: String,
			trim: true,
		},
		state: {
			type: String,
			trim: true,
		},
		zip: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
		},
		latitude: {
			type: String,
			trim: true,
		},
		longitude: {
			type: String,
			trim: true,
		},
		spnObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Spnlocation || mongoose.model('Spnlocation', spnlocationSchema);
