import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const taskdailySchema = new Schema(
	{
		date: {
			type: String,
			trim: true,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
			required: true,
		},
		initials: {
			type: String,
			trim: true,
		},
		taskitemObjId: {
			type: ObjectId,
			ref: 'taskitems',
		},
		officeuserObjId: {
			type: ObjectId,
			ref: 'users',
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

export default mongoose.models.Taskdaily || mongoose.model('Taskdaily', taskdailySchema);
