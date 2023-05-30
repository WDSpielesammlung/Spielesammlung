import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
//get highscore for current user
export async function GET({ locals }) {
	try {
		const highscore = await db.wordle.findUnique({
			where: { userId: locals.user.id }
		});

		if (!highscore) {
			throw error(404, { message: 'user has no highscore' });
		}
		return json(highscore, { status: 200 });
	} catch (error) {
		console.log('database connection failed \n' + error);
	}
}
