import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ownerSchema = new Schema(
	{
		fname: {
			type: String,
			trim: true,
			required: true,
		},
		lname: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
		},
		phone: {
			type: String,
			trim: true,
			required: true,
		},
		companyObjId: {
			type: ObjectId,
			ref: 'companies',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Owner || mongoose.model('Owner', ownerSchema);
