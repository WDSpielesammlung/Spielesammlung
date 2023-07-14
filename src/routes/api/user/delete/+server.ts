import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';
export const DELETE: RequestHandler = async ({ request }) => {
	const body = await request.json();
	try {
		await db.flappybird.deleteMany({
			where: { id: body.userId }
		});

		await db.spaceinvader.deleteMany({
			where: { id: body.userId }
		});

		await db.wordle.deleteMany({
			where: { id: body.userId }
		});

		await db.snake.deleteMany({
			where: { id: body.userId }
		});

		await db.user.deleteMany({
			where: { id: body.userId }
		});
		return json({ message: 'user:' + body.userId + 'deleted', success: true }, { status: 200 });
	} catch (err) {
		console.log(err);
		throw error(500, { message: 'database connection failed, error: ' + err });
	}
};
