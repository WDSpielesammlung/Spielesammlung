import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
//get highscore for current user at a certain difficulty
export async function GET({ url }) {
	const userId = url.searchParams.get('userId');
	const difficulty = url.searchParams.get('difficulty');
	if (!difficulty || !userId) {
		throw error(400, { message: 'parameter not set' });
	}
	try {
		const highscore = await db.flappybird.findUnique({
			where: {
				AND: [{ userId: userId }, { difficulty: difficulty }]
			}
		});

		if (!highscore) {
			throw error(404, { message: 'user has no highscore at this difficulty' });
		}
		return json(highscore, { status: 200 });
	} catch (err) {
		throw error(500, { message: 'database connection failed, error: ' + err });
	}
}
