import mongoose from 'mongoose';
const { Schema } = mongoose;

const chatmessageSchema = new Schema(
	{
		chatboxId: {
			type: String,
			trim: true,
			required: true,
		},
		message: {
			type: String,
			trim: true,
			required: true,
		},
		senderId: {
			type: String,
			trim: true,
			required: true,
		},
		sentdate: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Chatmessage || mongoose.model('Chatmessage', chatmessageSchema);
