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
		taskcatObjId: {
			type: ObjectId,
			ref: 'taskcategories',
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

export default mongoose.models.Taskitem || mongoose.model('Taskitem', taskitemSchema);
