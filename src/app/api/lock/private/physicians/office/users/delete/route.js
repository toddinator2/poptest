import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';
import Resource from '@/models/resource';
import Chatuser from '@/models/chatuser';
import Taskdaily from '@/models/taskdaily';

export const DELETE = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const userid = searchParams.get('userid');

	try {
		//Delete Resources
		await Resource.deleteMany({ officeuserObjId: userid });

		//Delete Chat Users
		await Chatuser.deleteMany({ officeuserObjId: userid });

		//Delete Daily Tasks
		await Taskdaily.deleteMany({ officeuserObjId: userid });

		const user = await Officeuser.findByIdAndDelete(userid);
		if (user) {
			return NextResponse.json({ msg: 'User deleted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'User not found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
