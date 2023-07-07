import type { RequestHandler } from './$types';
import { db } from '$lib/database';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const userName = url.searchParams.get('userName');
	if (!userName) {
		return json(false, { status: 200 });
	}
	try {
		const user = await db.user.findUnique({
			where: { username: userName }
		});
		if (!user) {
			return json(false, { status: 200 });
		} else {
			return json(true, { status: 200 });
		}
	} catch (err) {
		throw error(500, { message: 'database connection failed, error: ' + err });
	}
};
