import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const relphysubSchema = new Schema(
	{
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
			index: true,
		},
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
			index: true,
		},
		ofclocObjId: {
			type: ObjectId,
			ref: 'ofclocations',
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Relphysub || mongoose.model('Relphysub', relphysubSchema);
