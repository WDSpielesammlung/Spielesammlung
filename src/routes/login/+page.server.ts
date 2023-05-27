import type { Actions } from '../api/wordle/$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '../../lib/database';
import bcrypt from 'bcrypt';

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = String(data.get('username'));
		const password = String(data.get('password'));

		if (!username || !password) {
			return fail(400, { message: 'invalid input' });
		}

		try {
			const user = await db.user.findUnique({
				where: {
					username: username
				}
			});
			if (!user) {
				return fail(400, { message: 'user does not  exists' });
			}
			const userPassword = await bcrypt.compare(password, user.password);
			if (!userPassword) {
				return fail(400, { message: 'password incorrect' });
			}
			const authenticatedUser = await db.user.update({
				where: { username: user.username },
				data: { userAuthToken: crypto.randomUUID() }
			});

			if (authenticatedUser.userAuthToken) {
				cookies.set('session', authenticatedUser.userAuthToken, {
					path: '/',
					sameSite: 'strict',
					maxAge: 60 * 60 * 24
				});
				throw redirect;
			}
		} catch (error) {
			console.log('database connection failed \n' + error);
		}
	}
};
