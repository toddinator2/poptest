import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const last30daySchema = new Schema(
	{
		abd: {
			type: Boolean,
			default: false,
		},
		acn: {
			type: Boolean,
			default: false,
		},
		anx: {
			type: Boolean,
			default: false,
		},
		bac: {
			type: Boolean,
			default: false,
		},
		blo: {
			type: Boolean,
			default: false,
		},
		che: {
			type: Boolean,
			default: false,
		},
		col: {
			type: Boolean,
			default: false,
		},
		con: {
			type: Boolean,
			default: false,
		},
		cou: {
			type: Boolean,
			default: false,
		},
		dep: {
			type: Boolean,
			default: false,
		},
		dbl: {
			type: Boolean,
			default: false,
		},
		dia: {
			type: Boolean,
			default: false,
		},
		diz: {
			type: Boolean,
			default: false,
		},
		esw: {
			type: Boolean,
			default: false,
		},
		fai: {
			type: Boolean,
			default: false,
		},
		fat: {
			type: Boolean,
			default: false,
		},
		gas: {
			type: Boolean,
			default: false,
		},
		hed: {
			type: Boolean,
			default: false,
		},
		her: {
			type: Boolean,
			default: false,
		},
		hei: {
			type: Boolean,
			default: false,
		},
		ins: {
			type: Boolean,
			default: false,
		},
		joi: {
			type: Boolean,
			default: false,
		},
		luc: {
			type: Boolean,
			default: false,
		},
		mem: {
			type: Boolean,
			default: false,
		},
		moo: {
			type: Boolean,
			default: false,
		},
		mua: {
			type: Boolean,
			default: false,
		},
		nau: {
			type: Boolean,
			default: false,
		},
		ner: {
			type: Boolean,
			default: false,
		},
		nun: {
			type: Boolean,
			default: false,
		},
		nur: {
			type: Boolean,
			default: false,
		},
		pal: {
			type: Boolean,
			default: false,
		},
		sob: {
			type: Boolean,
			default: false,
		},
		skr: {
			type: Boolean,
			default: false,
		},
		slu: {
			type: Boolean,
			default: false,
		},
		sno: {
			type: Boolean,
			default: false,
		},
		swa: {
			type: Boolean,
			default: false,
		},
		urf: {
			type: Boolean,
			default: false,
		},
		vom: {
			type: Boolean,
			default: false,
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

export default mongoose.models.Last30day || mongoose.model('Last30day', last30daySchema);
