import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const patientSchema = new Schema(
	{
		fname: {
			type: String,
			trim: true,
			required: true,
			index: true,
		},
		lname: {
			type: String,
			trim: true,
			required: true,
			index: true,
		},
		dob: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			index: true,
			lowercase: true,
		},
		username: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
		photo: {
			type: String,
			trim: true,
		},
		mphone: {
			type: String,
			trim: true,
			required: true,
			index: true,
		},
		address: {
			type: String,
			trim: true,
		},
		address2: {
			type: String,
			trim: true,
		},
		city: {
			type: String,
			trim: true,
		},
		state: {
			type: String,
			trim: true,
			min: 2,
			max: 2,
		},
		zip: {
			type: String,
			trim: true,
		},
		sex: {
			type: String,
			min: 1,
			max: 1,
		},
		marital: {
			type: String,
			trim: true,
		},
		referredby: {
			type: String,
			trim: true,
		},
		hearabout: {
			type: String,
			trim: true,
		},
		pcpname: {
			type: String,
			trim: true,
		},
		pcpphone: {
			type: String,
			trim: true,
		},
		employer: {
			type: String,
			trim: true,
		},
		employerphone: {
			type: String,
			trim: true,
		},
		memberid: {
			type: String,
			trim: true,
			lowercase: true,
		},
		s3xid: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
		},
		emergencycontact: {
			type: String,
			trim: true,
		},
		emergencyphone: {
			type: String,
			trim: true,
		},
		emergencyrelation: {
			type: String,
			trim: true,
		},
		resetcreds: {
			type: Boolean,
			required: true,
			default: false,
		},
		resetcode: {
			type: String,
			trim: true,
		},
		permission: {
			type: String,
			required: true,
			default: 'patient',
			lowercase: true,
		},
		role: {
			type: String,
			required: true,
			default: 'patient',
			lowercase: true,
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
		setupprogress: [
			{
				type: Object,
				required: false,
			},
		],
		historyprogress: [
			{
				type: Object,
				required: false,
			},
		],
		policyprogress: [
			{
				type: Object,
				required: false,
			},
		],
		historydone: {
			type: Boolean,
			required: true,
			default: false,
		},
		setupdone: {
			type: Boolean,
			required: true,
			default: false,
		},
		latitude: {
			type: String,
			trim: true,
		},
		longitude: {
			type: String,
			trim: true,
		},
		weightloss: {
			type: Boolean,
			default: false,
		},
		offices: [
			{
				type: Object,
			},
		],
		mainproviderObjId: {
			type: ObjectId,
			ref: 'users',
		},
		sponsorObjId: [
			{
				type: ObjectId,
				ref: 'sponsors',
				required: false,
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.models.Patient || mongoose.model('Patient', patientSchema);
