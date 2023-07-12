import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '../../lib/database';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import { PUBLIC_AES_KEY } from '$env/static/public';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = String(data.get('username'));
		const password = String(data.get('password'));

		if (!username && !password) {
			return fail(400, {
				message: 'No values filled!',
				usernameFilled: false,
				passwordFilled: false,
				userNotExisting: false,
				passwordIncorrect: false
			});
		}

		if (!username) {
			return fail(400, {
				message: 'Please enter your Username!',
				usernameFilled: false,
				passwordFilled: true,
				userNotExisting: false,
				passwordIncorrect: false
			});
		}

		if (!password) {
			return fail(400, {
				message: 'Please enter your Password!',
				usernameFilled: true,
				passwordFilled: false,
				userNotExisting: false,
				passwordIncorrect: false
			});
		}

		try {
			const user = await db.user.findUnique({
				where: {
					username: username
				}
			});
			if (!user) {
				return fail(400, {
					message: 'user does not  exist',
					userNotExisting: true,
					passwordIncorrect: false,
					usernameFilled: true,
					passwordFilled: true
				});
			}
			const userPassword = await bcrypt.compare(password, user.password);
			if (!userPassword) {
				return fail(400, {
					message: 'password incorrect',
					userNotExisting: false,
					paswordIncorrect: true,
					usernameFilled: true,
					passwordFilled: true
				});
			}
			const authenticatedUser = await db.user.update({
				where: { username: user.username },
				data: { userAuthToken: crypto.randomUUID() }
			});

			if (authenticatedUser.userAuthToken) {
				const encryptedAuthToken: string = CryptoJS.AES.encrypt(
					authenticatedUser.userAuthToken,
					PUBLIC_AES_KEY
				).toString();

				cookies.set('Token', encryptedAuthToken, {
					path: '/',
					sameSite: 'strict',
					httpOnly: true,
					secure: true,
					maxAge: 60 * 60 * 24
				});
			}
			throw redirect(303, cookies.get('previousPage')!);
		} catch (error) {
			console.log('database connection failed \n' + error);
		}
	}
};
