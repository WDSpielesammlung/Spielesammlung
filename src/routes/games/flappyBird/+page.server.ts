import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ locals, cookies, url }) => {
	if (!locals.user) {
		cookies.set('previousPage', url.href, {
			path: '/',
			sameSite: 'strict',
			httpOnly: true,
			secure: true,
			maxAge: 60 * 60
		});
		throw redirect(302, '/login');
	}
	const url1 = PUBLIC_API_URL + '/flappyBird/user?userId=' + locals.user.id;
	const url2 = PUBLIC_API_URL + '/flappyBird';

	try {
		const userHighscoreResponse = await fetch(url1);
		const userHighscoreData = await userHighscoreResponse.json();
		const allHighscoresResponse = await fetch(url2);
		const allHighscoresData = await allHighscoresResponse.json();

		let overallHighscores = new Array(0, 0, 0);
		let userHighscores = new Array(0, 0, 0);
		allHighscoresData.forEach((highscore: any) => {
			if (highscore.difficulty === 0 && highscore.score > overallHighscores[0]) {
				overallHighscores[0] = highscore.score;
			} else if (highscore.difficulty === 1 && highscore.score > overallHighscores[1]) {
				overallHighscores[1] = highscore.score;
			} else if (highscore.difficulty === 2 && highscore.score > overallHighscores[2]) {
				overallHighscores[2] = highscore.score;
			}
		});
		userHighscoreData.forEach((highscore: any) => {
			if (highscore.difficulty === 0) {
				userHighscores[0] = highscore.score;
			} else if (highscore.difficulty === 1) {
				userHighscores[1] = highscore.score;
			} else if (highscore.difficulty === 2) {
				userHighscores[2] = highscore.score;
			}
		});

		return { userHighscores, overallHighscores };
	} catch (err) {
		console.log(err);
	}
};
