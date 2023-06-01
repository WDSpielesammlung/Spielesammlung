import type { PageServerLoad } from './$types';

export async function load({ locals }) {
	try {
		const userHighscoreResponse = await fetch(
			'http://localhost:5173/api/spaceInvaders/user?userId=' + locals.user.id
		);
		const userHighscoreData = await userHighscoreResponse.json();

		const allHighscoresResponse = await fetch('http://localhost:5173/api/spaceInvaders');
		const allHighscoresData = await allHighscoresResponse.json();

		return { userHighscoreData, allHighscoresData };
	} catch (err) {
		console.log(err);
	}
}
