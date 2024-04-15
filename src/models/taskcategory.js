import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const taskcategorySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		type: {
			type: String,
			trim: true,
			required: true,
		},
		displayorder: {
			type: Number,
			trim: true,
			required: true,
		},
		officeObjId: {
			type: ObjectId,
			ref: 'offices',
		},
		locationObjId: {
			type: ObjectId,
			ref: 'locations',
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Taskcategory || mongoose.model('Taskcategory', taskcategorySchema);
