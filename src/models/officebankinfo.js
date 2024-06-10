import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const officebankinfoSchema = new Schema(
	{
		routingnum: {
			type: String,
			trim: true,
		},
		accountnum: {
			type: String,
			trim: true,
		},
		ccnum: {
			type: String,
			trim: true,
		},
		ccexpmo: {
			type: String,
			trim: true,
		},
		ccexpyr: {
			type: Boolean,
			trim: true,
		},
		cvv: {
			type: String,
			trim: true,
		},
		cczip: {
			type: String,
			trim: true,
		},
		officeObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Officebankinfo || mongoose.model('Officebankinfo', officebankinfoSchema);
