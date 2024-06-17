import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Spnprereg from '@/models/spnprereg';

export async function GET(request) {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const { searchParams } = new URL(request.url);
	const vcode = searchParams.get('vcode');
	const token = searchParams.get('token');

	if (token === authToken) {
		try {
			const user = await Spnprereg.findOne({ verifycode: vcode });
			if (!user || user === null) {
				return NextResponse.json({ status: 400 });
			} else {
				return NextResponse.json({ username: user.username, status: 200 });
			}
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
}
