import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
export async function POST({ request, locals }) {
	if (!locals.user) {
		throw error(401, { message: 'User not logged in' });
	}
	const body = await request.json();
	const highscore = await db.flappybird.findUnique({
		where: { userId: locals.user.id }
	});

	if (highscore) {
		if (highscore.score < body.score) {
			try {
				await db.flappybird.update({
					where: { id: highscore.id },
					data: { score: body.score, difficulty: body.difficulty }
				});
				return json({ message: 'new highscore added' }, { status: 201 });
			} catch (err) {
				throw error(500, { message: 'database connection failed, error: ' + err });
			}
		} else {
			return json({ message: 'old highscore greater than current score' }, { status: 200 });
		}
	} else {
		try {
			await db.flappybird.create({
				data: {
					score: body.score,
					difficulty: body.difficulty,
					userId: locals.user.id
				}
			});
			return json({ message: 'new highscore added' }, { status: 201 });
		} catch (err) {
			throw error(500, { message: 'database connection failed, error: ' + err });
		}
	}
}
export async function GET({ url }) {
	const difficulty = url.searchParams.get('difficulty');
	if (!difficulty) {
		throw error(400, { message: 'no difficulty parameter' });
	}
	try {
		const highscores = await db.flappybird.findMany({
			where: { difficulty: difficulty }
		});
		return json(highscores, { status: 200 });
	} catch (err) {
		throw error(500, { message: 'database connection failed, error: ' + err });
	}
}
