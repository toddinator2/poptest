import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const defserviceSchema = new Schema({
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
		ref: 'defcategories',
		required: true,
	},
});

export default mongoose.models.Defservice || mongoose.model('Defservice', defserviceSchema);
