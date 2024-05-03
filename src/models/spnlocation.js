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
			required: true,
		},
		address2: {
			type: String,
			trim: true,
		},
		city: {
			type: String,
			trim: true,
			required: true,
		},
		state: {
			type: String,
			trim: true,
			required: true,
		},
		zip: {
			type: String,
			trim: true,
			required: true,
		},
		phone: {
			type: String,
			trim: true,
			required: true,
		},
		latitude: {
			type: String,
			trim: true,
		},
		longitude: {
			type: String,
			trim: true,
		},
		sponsorObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Spnlocation || mongoose.model('Spnlocation', spnlocationSchema);
