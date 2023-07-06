import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { TableSource } from '@skeletonlabs/skeleton';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	const url1 = process.env.API_URL + '/SpaceInvaders/user?userId=' + locals.user.id;
	const url2 = process.env.API_URL + '/SpaceInvaders';

	try {
		const userHighscoreResponse = await fetch(url1);
		const userHighscoreData = await userHighscoreResponse.json();
		const allHighscoresResponse = await fetch(url2);
		const allHighscoresData = await allHighscoresResponse.json();

		const tableBody = [['no score yet', '2']];
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
