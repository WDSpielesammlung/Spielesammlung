import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { RequestHandler } from './$types';
//save new highscore for current user
export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		throw error(401, { message: 'User not logged in' });
	}
	const body = await request.json();
	const highscore = await db.wordle.findUnique({
		where: { userId: locals.user.id }
	});

	if (highscore) {
		if (highscore.score < body.score) {
			try {
				await db.wordle.update({
					where: { id: highscore.id },
					data: { score: body.score }
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
			await db.wordle.create({
				data: {
					score: body.score,
					userId: locals.user.id
				}
			});
			return json({ message: 'new highscore added' }, { status: 201 });
		} catch (err) {
			throw error(500, { message: 'database connection failed, error: ' + err });
		}
	}
};
//get all user highscores
export const GET: RequestHandler = async () => {
	try {
		const highscores = await db.wordle.findMany({
			select: {
				score: true,
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
