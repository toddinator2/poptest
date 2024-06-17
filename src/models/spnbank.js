import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const spnbankSchema = new Schema(
	{
		routingnum: {
			type: String,
			trim: true,
		},
		accountnum: {
			type: String,
			trim: true,
		},
		name: {
			type: String,
			trim: true,
		},
		ccnum: {
			type: String,
			trim: true,
		},
		ccexpmo: {
			type: String,
			trim: true,
		},
		ccexpyr: {
			type: String,
			trim: true,
		},
		cvv: {
			type: String,
			trim: true,
		},
		cczip: {
			type: String,
			trim: true,
		},
		spnObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Spnbank || mongoose.model('Spnbank', spnbankSchema);
