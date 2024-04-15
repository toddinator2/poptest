import mongoose from 'mongoose';
const { Schema } = mongoose;

const policySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		displayname: {
			type: String,
			trim: true,
		},
		displayorder: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Policy || mongoose.model('Policy', policySchema);
