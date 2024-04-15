import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const shoppingcartSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		price: {
			type: Number,
			trim: true,
			required: true,
		},
		quantity: {
			type: Number,
			trim: true,
			default: 1,
		},
		servicecloverId: {
			type: String,
			trim: true,
			required: true,
		},
		serviceObjId: {
			type: ObjectId,
			ref: 'services',
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

export default mongoose.models.Shoppingcart || mongoose.model('Shoppingcart', shoppingcartSchema);
