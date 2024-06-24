import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const polsignedSchema = new Schema(
	{
		agree: {
			type: Boolean,
			required: true,
		},
		agreedate: {
			type: String,
			trim: true,
			required: true,
		},
		agreesign: {
			type: String,
			trim: true,
			required: true,
		},
		signertype: {
			type: String,
			trim: true,
			required: true,
		},
		requesttype: {
			type: String,
			trim: true,
			required: true,
		},
		signerObjId: {
			type: String,
			trim: true,
			required: true,
		},
		requestObjId: {
			type: String,
			trim: true,
		},
		policyObjId: {
			type: ObjectId,
			ref: 'policies',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Polsigned || mongoose.model('Polsigned', polsignedSchema);
