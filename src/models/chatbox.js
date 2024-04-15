import mongoose from 'mongoose';
const { Schema } = mongoose;

const chatboxSchema = new Schema(
	{
		chatboxId: {
			type: String,
			trim: true,
			required: true,
		},
		user1Id: {
			type: String,
			trim: true,
			required: true,
		},
		user2Id: {
			type: String,
			trim: true,
			required: true,
		},
		user1open: {
			type: Boolean,
			default: false,
		},
		user2open: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Chatbox || mongoose.model('Chatbox', chatboxSchema);
