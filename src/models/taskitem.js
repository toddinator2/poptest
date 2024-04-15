import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const taskitemSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		displayorder: {
			type: Number,
			trim: true,
			required: true,
		},
		taskcategoryObjId: {
			type: ObjectId,
			ref: 'taskcategories',
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

export default mongoose.models.Taskitem || mongoose.model('Taskitem', taskitemSchema);
