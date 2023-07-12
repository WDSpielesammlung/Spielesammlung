import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/database';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	if (!session) {
		return await resolve(event);
	}
	try {
		const user = await db.user.findUnique({
			where: { userAuthToken: session },
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
