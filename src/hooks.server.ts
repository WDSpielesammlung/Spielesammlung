import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/database';
import CryptoJS from 'crypto-js';
import { PUBLIC_AES_KEY } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	const AuthToken = event.cookies.get('Token');
	if (!AuthToken) {
		return await resolve(event);
	}
	const decryptedAuthToken: string = CryptoJS.AES.decrypt(AuthToken, PUBLIC_AES_KEY).toString(
		CryptoJS.enc.Utf8
	);

	try {
		const user = await db.user.findUnique({
			where: { userAuthToken: decryptedAuthToken },
			select: { id: true, username: true }
		});
		if (user) {
			event.locals.user = {
				id: user.id,
				name: user.username
			};
		}
	} catch (error) {
		console.log('db connection failed \n' + error);
	}

	return await resolve(event);
};
