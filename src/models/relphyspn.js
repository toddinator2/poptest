import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const relphyspnSchema = new Schema(
	{
		spnObjId: {
			type: ObjectId,
			ref: 'sponsors',
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

export default mongoose.models.Relphyspn || mongoose.model('Relphyspn', relphyspnSchema);
