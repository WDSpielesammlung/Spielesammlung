import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';
export const DELETE: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, { message: 'User not logged in' });
	}
	try {
		await db.user.delete({
			where: { id: locals.user.id }
		});
		return json({ message: 'user:' + locals.user.name + 'deleted', success: true }, { status: 200});
	} catch (err) {
		console.log(err)
		throw error(500, { message: 'database connection failed, error: ' + err });
	}
};
