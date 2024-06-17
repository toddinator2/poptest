import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ofcbankSchema = new Schema(
	{
		routingnum: {
			type: String,
			trim: true,
		},
		accountnum: {
			type: String,
			trim: true,
		},
		name: {
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
			type: String,
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
		ofcObjId: {
			type: ObjectId,
			ref: 'offices',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Ofcbank || mongoose.model('Ofcbank', ofcbankSchema);
