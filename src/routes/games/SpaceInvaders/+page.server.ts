import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { TableSource } from '@skeletonlabs/skeleton';
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

	const url1 = PUBLIC_API_URL + '/SpaceInvaders/user?userId=' + locals.user.id;
	const url2 = PUBLIC_API_URL + '/SpaceInvaders';

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

		const tableBody = [['', '']];
		for (let i = 0; i < allHighscoresData.length; i++) {
			tableBody[i] = [
				String(allHighscoresData[i].user.username),
				String(allHighscoresData[i].score)
			];
		}
		const table: TableSource = {
			head: ['Username', 'Score'],
			body: tableBody
		};

		return { userHighscoreData, table };
	} catch (err) {
		console.log(err);
	}
};
