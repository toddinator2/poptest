import mongoose from 'mongoose';
const { Schema } = mongoose;

const defdoctypeSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	subcanview: {
		type: Boolean,
		required: true,
		default: false,
	},
	officetype: {
		type: String,
		trim: true,
		required: true,
	},
});

export default mongoose.models.Defdoctype || mongoose.model('Defdoctype', defdoctypeSchema);
