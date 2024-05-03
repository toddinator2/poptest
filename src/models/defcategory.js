import mongoose from 'mongoose';
const { Schema } = mongoose;

const defcategorySchema = new Schema({
	category: {
		type: String,
		trim: true,
		required: true,
	},
	color: {
		type: String,
		trim: true,
		required: true,
	},
	officetype: {
		type: String,
		trim: true,
		required: true,
	},
});

export default mongoose.models.Defcategory || mongoose.model('Defcategory', defcategorySchema);
