import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { RequestHandler } from './$types.js';
export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		throw error(401, { message: 'User not logged in' });
	}
	const body = await request.json();
	try {
		const highscore = await db.flappybird.findFirst({
			where: { userId: locals.user.id, difficulty: body.difficulty }
		});

		if (highscore) {
			if (highscore.score < body.score) {
				await db.flappybird.update({
					where: { id: highscore.id },
					data: { score: body.score, difficulty: body.difficulty }
				});
				return json({ message: 'new highscore added' }, { status: 201 });
			} else {
				return json({ message: 'old highscore greater than current score' }, { status: 200 });
			}
		} else {
			await db.flappybird.create({
				data: {
					score: body.score,
					difficulty: body.difficulty,
					userId: locals.user.id
				}
			});
			return json({ message: 'new highscore added' }, { status: 201 });
		}
	} catch (err) {
		throw error(500, { message: 'database connection failed, error: ' + err });
	}
};
export const GET = async () => {
	try {
		const highscores = await db.flappybird.findMany({
			select: {
				score: true,
				difficulty: true,
				user: {
					select: {
						username: true
					}
				}
			}
		});
		return json(highscores, { status: 200 });
	} catch (err) {
		throw error(500, { message: 'database connection failed, error: ' + err });
	}
};
