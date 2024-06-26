import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const chatuserSchema = new Schema(
	{
		roomId: {
			type: String,
			trim: true,
			required: true,
		},
		username: {
			type: String,
			trim: true,
			required: true,
		},
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
		photo: {
			type: String,
			trim: true,
		},
		ofcuserObjId: {
			type: String,
			trim: true,
			required: true,
		},
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
		},
		ofclocObjId: {
			type: ObjectId,
			ref: 'ofclocations',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Chatuser || mongoose.model('Chatuser', chatuserSchema);
