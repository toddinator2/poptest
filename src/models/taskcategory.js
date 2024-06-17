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
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
		},
		ofclocObjId: {
			type: ObjectId,
			ref: 'ofclocations',
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Taskcategory || mongoose.model('Taskcategory', taskcategorySchema);
