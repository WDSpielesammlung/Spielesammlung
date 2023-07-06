import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '../../lib/database';
import bcrypt from 'bcrypt';
import { goto } from '$app/navigation';

export const actions: Actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const username = String(data.get('username'));
		const email = String(data.get('email'));
		const password = String(data.get('password'));
		console.log(email);
		console.log(username);

		if (!username || !email || !password) {
			return fail(400, { message: 'invalid input' });
		}

		try {
			const user = await db.user.findMany({
				where: {
					OR: [{ email }, { username }]
				}
			});

			if (user.length > 0) {
				console.log('user: ' + user);
				return fail(400, { message: 'user already exists' });
			}

			await db.user.create({
				data: {
					email: email,
					username: username,
					password: await bcrypt.hash(password, 10)
				}
			});
			//return { status: 201 };
		} catch (error) {
			console.log('database connection failed \n' + error);
			return fail(500, { message: 'Internal Server Error' });
		}
		throw redirect(303, '/');
	}
};
