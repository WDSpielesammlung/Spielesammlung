import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { TableSource } from '@skeletonlabs/skeleton';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ locals, url, cookies }) => {
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
	const url1 = PUBLIC_API_URL + '/snake/user?userId=' + locals.user.id;
	const url2 = PUBLIC_API_URL + '/snake';

	try {
		
		const userHighscoreResponse = await fetch(url1);
		const userHighscoreData = await userHighscoreResponse.json();
		const allHighscoresResponse = await fetch(url2);
		const allHighscoresData = await allHighscoresResponse.json();


		allHighscoresData.sort((a: any, b: any) => {
			if (a.score > b.score) {
				return -1;
			}
		});

		return { userHighscoreData};
	} catch (err) {
		console.log(err);
	}
};
