import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
//get highscore for current user at a certain difficulty
export async function GET({ locals, url }) {
	const difficulty = url.searchParams.get('difficulty');
	if (!difficulty) {
		throw error(400, { message: 'no difficulty parameter' });
	}
	try {
		const highscore = await db.flappybird.findUnique({
			where: {
				AND: [{ userId: locals.user.id }, { difficulty: difficulty }]
			}
		});

		if (!highscore) {
			throw error(404, { message: 'user has no highscore at this difficulty' });
		}
		return json(highscore, { status: 200 });
	} catch (error) {
		console.log('database connection failed \n' + error);
	}
}
