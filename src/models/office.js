import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const officeSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		officeid: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		mainphone: {
			type: String,
			trim: true,
		},
		patients: [
			{
				type: String,
				trim: true,
			},
		],
		medcompanyObjId: {
			type: ObjectId,
			ref: 'medcompanies',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Office || mongoose.model('Office', officeSchema);
