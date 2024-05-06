import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const pharmacySchema = new Schema(
	{
		lclpharm: {
			type: String,
			trim: true,
		},
		lclpharmphone: {
			type: String,
			trim: true,
		},
		lclpharmfax: {
			type: String,
			trim: true,
		},
		lclpharmaddress: {
			type: String,
			trim: true,
		},
		onlpharm: {
			type: String,
			trim: true,
		},
		onlpharmphone: {
			type: String,
			trim: true,
		},
		onlpharmfax: {
			type: String,
			trim: true,
		},
		onlpharmaddress: {
			type: String,
			trim: true,
		},
		patientObjId: {
			type: ObjectId,
			ref: 'patients',
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Pharmacy || mongoose.model('Pharmacy', pharmacySchema);
