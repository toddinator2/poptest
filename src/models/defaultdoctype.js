import mongoose from 'mongoose';
const { Schema } = mongoose;

const defaultdoctypeSchema = new Schema({
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
	officetype: {
		type: String,
		trim: true,
		required: true,
	},
});

export default mongoose.models.Defaultdoctype || mongoose.model('Defaultdoctype', defaultdoctypeSchema);
