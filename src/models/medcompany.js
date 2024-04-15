import mongoose from 'mongoose';
const { Schema } = mongoose;

const medcompanySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Medcompany || mongoose.model('Medcompany', medcompanySchema);
