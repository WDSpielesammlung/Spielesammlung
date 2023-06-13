import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	const url1 = process.env.API_URL + '/flappyBird/user?userId=' + locals.user.id + '&difficulty=2';
	const url2 = process.env.API_URL + '/flappyBird?difficulty=2';
	const url3 = process.env.API_URL + '/flappyBird/user?userId=' + locals.user.id + '&difficulty=1';
	const url4 = process.env.API_URL + '/flappyBird?difficulty=1';
	const url5 = process.env.API_URL + '/flappyBird/user?userId=' + locals.user.id + '&difficulty=0';
	const url6 = process.env.API_URL + '/flappyBird?difficulty=0';
	try {
		const userHighscoreResponse2 = await fetch(url1);
		const userHighscoreData2 = await userHighscoreResponse2.json();
		const allHighscoresResponse2 = await fetch(url2);
		const allHighscoresData2 = await allHighscoresResponse2.json();
		const userHighscoreResponse1 = await fetch(url3);
		const userHighscoreData1 = await userHighscoreResponse1.json();
		const allHighscoresResponse1 = await fetch(url4);
		const allHighscoresData1 = await allHighscoresResponse1.json();
		const userHighscoreResponse0 = await fetch(url5);
		const userHighscoreData0 = await userHighscoreResponse0.json();
		const allHighscoresResponse0 = await fetch(url6);
		const allHighscoresData0 = await allHighscoresResponse0.json();

		const user = new Array(0, 0, 0);
		const overall = new Array(0, 0, 0);

		if (userHighscoreData0) {
			user[0] = userHighscoreData0[0].score;
		}
		if (userHighscoreData1) {
			user[1] = userHighscoreData1[0].score;
		}
		if (userHighscoreData2) {
			user[2] = userHighscoreData2[0].score;
		}
		if (allHighscoresData0) {
			overall[0] = allHighscoresData0[0].score;
		}
		if (allHighscoresData1) {
			overall[1] = allHighscoresData1[0].score;
		}
		if (allHighscoresData2) {
			overall[2] = allHighscoresData2[0].score;
		}

		return { user, overall };
	} catch (err) {
		console.log(err);
	}
};
