import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
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
			await db.spaceinvader.update({
				where: { id: highscore.id },
				data: { score: body.score }
			});
			return json({ message: 'new highscore added' }, { status: 201 });
		} else {
			return json({ message: 'old highscore greater than current sore' }, { status: 200 });
		}
	} else {
		await db.spaceinvader.create({
			data: {
				score: body.score,
				userId: locals.user.id
			}
		});
		return json({ message: 'new highscore added' }, { status: 201 });
	}
}
