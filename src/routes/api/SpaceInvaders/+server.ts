import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
//save new highscore for current user
export async function POST({ request, locals }) {
	if (!locals.user) {
		throw error(401, { message: 'User not logged in' });
	}
	const body = await request.json();
	const highscore = await db.spaceinvader.findUnique({
		where: { userId: locals.user.id }
	});

	if (highscore) {
		if (highscore.score < body.score) {
			try {
				await db.spaceinvader.update({
					where: { id: highscore.id },
					data: { score: body.score }
				});
				return json({ message: 'new highscore added' }, { status: 201 });
			} catch (err) {
				throw error(500, { message: 'database connection failed, error: ' + err });
			}
		} else {
			return json({ message: 'old highscore greater than current sore' }, { status: 200 });
		}
	} else {
		try {
			await db.spaceinvader.create({
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
}
//get all user highscores
export async function GET() {
	try {
		const highscores = await db.spaceinvader.findMany({});
		return json(highscores, { status: 200 });
	} catch (err) {
		throw error(500, { message: 'database connection failed, error: ' + err });
	}
}
