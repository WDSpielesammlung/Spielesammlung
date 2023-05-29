import { fail, json } from '@sveltejs/kit';
export function GET({ request, locals }) {
	if (!locals.user) {
		return fail(401, { message: 'User not logged in' });
	}
	return json({ userid: locals.user.id }, { status: 201 });
}
