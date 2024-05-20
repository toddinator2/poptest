'use server';
import axios from 'axios';

export default async function GetSponsor(encdData) {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const authToken = process.env.AUTH_TOKEN;
	const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
	const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
	const string = `?vcode=${data.verifycode}&token=${authToken}`;

	try {
		const res = await axios.get(`${process.env.API_URL_PUB}/get/getspnbyvcode${string}`);
		const resObj = {
			username: res.data.username,
			status: res.status,
		};

		const resData = CryptoJS.AES.encrypt(JSON.stringify(resObj), cryptoKey).toString();
		return resData;
	} catch (error) {
		return null;
	}
}
