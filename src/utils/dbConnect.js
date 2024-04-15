import mongoose from 'mongoose';

const connect = async () => {
	if (mongoose.connection.readyState >= 1) return;

	try {
		await mongoose.connect(process.env.DATABASE);
	} catch (err) {
		throw new Error('Error connecting to Mongoose');
	}
};

export default connect;
