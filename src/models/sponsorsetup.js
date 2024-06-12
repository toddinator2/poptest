import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const sponsorsetupSchema = new Schema(
	{
		profile: {
			type: Boolean,
			default: false,
		},
		location: {
			type: Boolean,
			default: false,
		},
		agreement: {
			type: Boolean,
			default: false,
		},
		bank: {
			type: Boolean,
			default: false,
		},
		sponsorObjId: {
			type: ObjectId,
			ref: 'sponsors',
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Sponsorsetup || mongoose.model('Sponsorsetup', sponsorsetupSchema);
