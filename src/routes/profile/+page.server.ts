import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async () => {
	const url = PUBLIC_API_URL + '/user/profile/';
	try {
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log('leg mich');
	}
};
