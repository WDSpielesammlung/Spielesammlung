import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { RequestHandler } from '../$types';
//get highscore for current user
export const GET: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('userId');
	if (!userId) {
		throw error(400, { message: 'userId not set' });
	}
	try {
		const highscore = await db.spaceinvader.findUnique({
			where: { userId: userId }
		});

		if (!highscore) {
			throw error(404, { message: 'user has no highscore' });
		}
		return json(highscore, { status: 200 });
	} catch (err) {
		throw error(500, { message: 'database connection failed, error: ' + err });
	}
};
