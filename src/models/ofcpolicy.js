import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ofcpolicySchema = new Schema(
	{
		agreement: {
			type: Boolean,
			default: false,
		},
		agreementdate: {
			type: String,
			trim: true,
		},
		agreementsign: {
			type: String,
			trim: true,
			touppercase: true,
		},
		ofcuserObjId: {
			type: ObjectId,
			ref: 'officeusers',
			required: true,
		},
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Ofcpolicy || mongoose.model('Ofcpolicy', ofcpolicySchema);
