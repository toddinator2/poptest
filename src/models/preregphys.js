import mongoose from 'mongoose';
const { Schema } = mongoose;

const preregphysSchema = new Schema(
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
			unique: true,
			lowercase: true,
		},
		phone: {
			type: String,
			trim: true,
			required: true,
		},
		username: {
			type: String,
			trim: true,
			required: true,
			lowercase: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		license: {
			type: String,
			trim: true,
			required: true,
		},
		state: {
			type: String,
			trim: true,
			required: true,
			min: 2,
			max: 2,
		},
		npi: {
			type: String,
			trim: true,
			required: true,
		},
		specialty: {
			type: String,
			trim: true,
			required: true,
		},
		isphysician: {
			type: Boolean,
			required: true,
			default: false,
		},
		verifycode: {
			type: String,
			trim: true,
		},
		emailconfirmed: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Preregphys || mongoose.model('Preregphys', preregphysSchema);
