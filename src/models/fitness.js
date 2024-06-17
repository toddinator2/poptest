import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const fitnessSchema = new Schema(
	{
		days: {
			type: String,
			trim: true,
		},
		time: {
			type: String,
			trim: true,
		},
		where: {
			type: String,
			trim: true,
		},
		when: {
			type: String,
			trim: true,
		},
		bkg: {
			type: Boolean,
			default: false,
		},
		bbg: {
			type: Boolean,
			default: false,
		},
		car: {
			type: Boolean,
			default: false,
		},
		cro: {
			type: Boolean,
			default: false,
		},
		int: {
			type: Boolean,
			default: false,
		},
		hit: {
			type: Boolean,
			default: false,
		},
		hkg: {
			type: Boolean,
			default: false,
		},
		pwr: {
			type: Boolean,
			default: false,
		},
		run: {
			type: Boolean,
			default: false,
		},
		spo: {
			type: Boolean,
			default: false,
		},
		swm: {
			type: Boolean,
			default: false,
		},
		wlk: {
			type: Boolean,
			default: false,
		},
		goal: {
			type: String,
			trim: true,
		},
		explan: {
			type: String,
			trim: true,
		},
		alone: {
			type: String,
			trim: true,
		},
		nuplan: {
			type: String,
			trim: true,
		},
		tech: {
			type: String,
			trim: true,
		},
		yoga: {
			type: String,
			trim: true,
		},
		pil: {
			type: String,
			trim: true,
		},
		learnmore: {
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

export default mongoose.models.Fitness || mongoose.model('Fitness', fitnessSchema);
