import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const pharmacySchema = new Schema(
	{
		lclpharmacy: {
			type: String,
			trim: true,
		},
		lclpharmacyphone: {
			type: String,
			trim: true,
		},
		lclpharmacyfax: {
			type: String,
			trim: true,
		},
		lclpharmacyaddress: {
			type: String,
			trim: true,
		},
		onlpharmacy: {
			type: String,
			trim: true,
		},
		onlpharmacyphone: {
			type: String,
			trim: true,
		},
		onlpharmacyfax: {
			type: String,
			trim: true,
		},
		onlpharmacyaddress: {
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
