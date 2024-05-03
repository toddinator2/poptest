'use server';
import axios from 'axios';

export default async function GetPtUname(encdData) {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const authToken = process.env.AUTH_TOKEN;
	const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
	const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
	const string = `?verifycode=${data.verifycode}&token=${authToken}`;

	try {
		const res = await axios.get(`${process.env.API_URL_PUB}/subscribers/get/byverifycode${string}`);
		const resObj = {
			uname: res.data.uname,
			status: res.status,
		};

		const resData = CryptoJS.AES.encrypt(JSON.stringify(resObj), cryptoKey).toString();
		return resData;
	} catch (error) {
		return null;
	}
}
