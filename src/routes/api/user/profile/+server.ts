import type { RequestHandler } from '../$types';
import { db } from '$lib/database';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		throw error(500, { message: 'UserId is missing!' });
	}
	const userId = locals.user.id;

	let user = db.user.findUnique({
		where: { id: userId },
		select: {
			username: true,
			email: true
		}
	});
	console.log('halloooo');
	console.log(user);
	return json({ user });
};
