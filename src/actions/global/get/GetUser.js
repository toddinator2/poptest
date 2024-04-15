'use server';
import axios from 'axios';

export default async function GetUser(encdData) {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const authToken = process.env.AUTH_TOKEN;
	const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
	const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
	const string = `?type=${data.type}&username=${data.username}&token=${authToken}`;

	try {
		const res = await axios.get(`${process.env.API_URL}/public/global/get/getuser${string}`);
		const resObj = {
			user: res.data.user,
			status: res.status,
		};

		const resData = CryptoJS.AES.encrypt(JSON.stringify(resObj), cryptoKey).toString();
		return resData;
	} catch (error) {
		return null;
	}
}
