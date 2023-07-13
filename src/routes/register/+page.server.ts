import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '../../lib/database';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import { PUBLIC_AES_KEY } from '$env/static/public';

export const actions: Actions = {
	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = String(data.get('username'));
		const email = String(data.get('email'));
		const password = String(data.get('password'));
		const passwordRepeat = String(data.get('passwordRep'))

		let usernameSet = true;
		let emailSet = true;
		let passwordSet = true;
		let passwordRepSet = true;


		console.log(email);
		console.log(username);

		if (!username){
			usernameSet = false;
		}
		if(!password){
			passwordSet = false;
		}

		if(!email){
			emailSet = false;
		}

		if(!passwordRepeat){
			passwordRepSet = false;
		}

		if(!usernameSet || !passwordSet || !emailSet || !passwordRepSet){
			return fail(400, {
				message: "Please fill out all fields!",
				usernameSet: usernameSet,
				passwordSet: passwordSet,
				emailSet: emailSet,
				passwordRepSet: passwordRepSet,
				username: username,
				password: password,
				email: email,
				passwordRepeat: passwordRepeat,
				userAlreadyExists: false
			})
		}

		try {
			const user = await db.user.findMany({
				where: {
					OR: [{ email }, { username }]
				}
			});

			if (user.length > 0) {
				console.log('user: ' + user);
				return fail(400, { 
					message: 'user already exists',
					usernameSet: usernameSet,
					passwordSet: passwordSet,
					emailSet: emailSet,
					passwordRepSet: passwordRepSet,
					username: username,
					password: password,
					email: email,
					passwordRepeat: passwordRepeat,
					userAlreadyExists: true
				 });
			}

			await db.user.create({
				data: {
					email: email,
					username: username,
					password: await bcrypt.hash(password, 10)
				}
			});

			const authenticatedUser = await db.user.update({
				where: { username: username },
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
				cookies.set('hasRegistered', 'true', {
					path: '/',
					sameSite: 'strict',
					httpOnly: true,
					secure: true,
					maxAge: 60 * 60
				});
			}
		} catch (error) {
			console.log('database connection failed \n' + error);
			return fail(500, { 
				message: 'Internal Server Error',
				usernameSet: usernameSet,
				passwordSet: passwordSet,
				emailSet: emailSet,
				passwordRepSet: passwordRepSet,
				username: username,
				password: password,
				email: email,
				passwordRepeat: passwordRepeat,
				userAlreadyExists: false
			 });
		}
		let previousPage = cookies.get('previousPage');
		if(!previousPage){
			previousPage = "/";
		}
		throw redirect(303, previousPage);
	}
};
