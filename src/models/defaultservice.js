import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const defaultserviceSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	price: {
		type: Number,
		trim: true,
	},
	catObjId: {
		type: ObjectId,
		ref: 'defaultcategories',
		required: true,
	},
});

export default mongoose.models.Defaultservice || mongoose.model('Defaultservice', defaultserviceSchema);
