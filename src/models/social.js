import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const socialSchema = new Schema(
	{
		alc: {
			type: String,
			trim: true,
		},
		alccur: {
			type: String,
			trim: true,
		},
		alcquit: {
			type: String,
			trim: true,
		},
		coffee: {
			type: String,
			trim: true,
		},
		tea: {
			type: String,
			trim: true,
		},
		soda: {
			type: String,
			trim: true,
		},
		tob: {
			type: String,
			trim: true,
		},
		tobday: {
			type: String,
			trim: true,
		},
		tobweek: {
			type: String,
			trim: true,
		},
		tobquit: {
			type: String,
			trim: true,
		},
		thc: {
			type: String,
			trim: true,
		},
		thcday: {
			type: String,
			trim: true,
		},
		thcweek: {
			type: String,
			trim: true,
		},
		thcmonth: {
			type: String,
			trim: true,
		},
		thcquit: {
			type: String,
			trim: true,
		},
		hd: {
			type: String,
			trim: true,
		},
		hdtypes: {
			type: String,
			trim: true,
		},
		hdday: {
			type: String,
			trim: true,
		},
		hdweek: {
			type: String,
			trim: true,
		},
		hdmonth: {
			type: String,
			trim: true,
		},
		hdquit: {
			type: String,
			trim: true,
		},
		notes: {
			type: String,
			trim: true,
		},
		subObjId: {
			type: ObjectId,
			ref: 'subscribers',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Social || mongoose.model('Social', socialSchema);
