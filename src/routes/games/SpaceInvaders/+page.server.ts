import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	const url1 = process.env.API_URL + 'spaceInvaders/user?userId=' + locals.user.id;
	const url2 = process.env.API_URL + 'spaceInvaders';
	try {
		const userHighscoreResponse = await fetch(url1);
		const userHighscoreData = await userHighscoreResponse.json();
		const allHighscoresResponse = await fetch(url2);
		const allHighscoresData = await allHighscoresResponse.json();
		return { userHighscoreData, allHighscoresData };
	} catch (err) {
		console.log(err);
	}
}
