import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import Subscriber from '@/models/subscriber';
import Spnuser from '@/models/spnuser';
import S3xuser from '@/models/s3xuser';
import Ofcuser from '@/models/ofcuser';
import connect from './dbConnect';

export const authOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				let lwrUname = '';
				let user;
				const { type, username, password } = credentials;

				if (username) {
					lwrUname = username.toLowerCase();
				}

				try {
					connect();
					if (type === 'subscriber') {
						user = await Subscriber.findOne({ username: lwrUname, emailconfirmed: true, active: true });
					} else if (type === 'sponsor') {
						user = await Spnuser.findOne({ username: lwrUname, emailconfirmed: true, active: true });
					} else if (type === 'physician') {
						user = await Ofcuser.findOne({ username: lwrUname, emailconfirmed: true, active: true });
					} else if (type === 's3x') {
						user = await S3xuser.findOne({ username: lwrUname, emailconfirmed: true, active: true });
					}

					if (!user || user === null) {
						throw new Error('Invalid username, password, email not verified, or user is inactive');
					} else {
						const isPasswordMatched = await bcrypt.compare(password, user.password);
						if (!isPasswordMatched) {
							throw new Error('Invalid username or password');
						} else {
							delete user.password;
							user['id'] = user._id;
							user['name'] = user.username;
							return user;
						}
					}
				} catch (err) {
					console.log(err);
				}

				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/',
	},
};
