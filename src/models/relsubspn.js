import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const relsubspnSchema = new Schema(
	{
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
			index: true,
		},
		spnObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: true,
			index: true,
		},
		spnlocObjId: {
			type: ObjectId,
			ref: 'spnlocations',
			required: false,
			index: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Relsubspn || mongoose.model('Relsubspn', relsubspnSchema);
