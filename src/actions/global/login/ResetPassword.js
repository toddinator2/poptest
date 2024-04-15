'use server';
export default async function ResetPassword(encdData) {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
	const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

	const res = await fetch(`${process.env.API_URL}/public/global/login/resetpassword`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			data,
		}),
	});

	const resObj = {
		status: res.status,
	};

	const resData = CryptoJS.AES.encrypt(JSON.stringify(resObj), cryptoKey).toString();
	return resData;
}
