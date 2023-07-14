import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import type { TableSource } from '@skeletonlabs/skeleton';
import { redirect, type Actions } from '@sveltejs/kit';
type flappyTable = { username: string; score: number };

export const load: PageServerLoad = async ({ locals }) => {
	const spaceinvadersURL = PUBLIC_API_URL + '/SpaceInvaders';
	const wordleURL = PUBLIC_API_URL + '/wordle';
	const snakeURL = PUBLIC_API_URL + '/snake';
	const FlappyBirdURL = PUBLIC_API_URL + '/flappyBird';

	if (!locals.user) {
		throw redirect(303, '/');
	}

	try {
		const spaceinvaderPromise = await fetch(spaceinvadersURL);
		const spaceinvaderHighscores = await spaceinvaderPromise.json();

		spaceinvaderHighscores.sort((a: any, b: any) => {
			if (a.score > b.score) {
				return -1;
			}
		});

		const tableBody = [['', '']];
		for (let i = 0; i < spaceinvaderHighscores.length; i++) {
			tableBody[i] = [
				String(spaceinvaderHighscores[i].user.username),
				String(spaceinvaderHighscores[i].score)
			];
		}

		const spaceinvaders: TableSource = {
			head: ['Username', 'Score'],
			body: tableBody
		};

		const wordlePromise = await fetch(wordleURL);
		const wordleHighscores = await wordlePromise.json();

		wordleHighscores.sort((a: any, b: any) => {
			if (a.score > b.score) {
				return -1;
			}
		});

		const wordleBody = [['', '']];
		for (let i = 0; i < wordleHighscores.length; i++) {
			wordleBody[i] = [
				String(wordleHighscores[i].user.username),
				String(wordleHighscores[i].score)
			];
		}
		const wordle: TableSource = {
			head: ['Username', 'Score'],
			body: wordleBody
		};

		const flappyBirdPromise = await fetch(FlappyBirdURL);
		const flappyBirdHighscores = await flappyBirdPromise.json();

		let flappyEasy: flappyTable[] = [];

		for (let i = 0; i < flappyBirdHighscores.length; i++) {
			if (flappyBirdHighscores[i].difficulty == 2) {
				flappyEasy.push({
					username: flappyBirdHighscores[i].user.username,
					score: flappyBirdHighscores[i].score
				});
			}
		}

		flappyEasy.sort((a: any, b: any) => a - b);

		let flappyMiddle: flappyTable[] = [];
		for (let i = 0; i < flappyBirdHighscores.length; i++) {
			if (flappyBirdHighscores[i].difficulty == 1) {
				flappyMiddle.push({
					username: flappyBirdHighscores[i].user.username,
					score: flappyBirdHighscores[i].score
				});
			}
		}

		flappyMiddle.sort((a: any, b: any) => a - b);

		let flappyHard: flappyTable[] = [];
		for (let i = 0; i < flappyBirdHighscores.length; i++) {
			if (flappyBirdHighscores[i].difficulty == 0) {
				flappyHard.push({
					username: flappyBirdHighscores[i].user.username,
					score: flappyBirdHighscores[i].score
				});
			}
		}

		flappyHard.sort((a: any, b: any) => a - b);

		const easyBody = [['', '']];
		for (let i = 0; i < flappyEasy.length; i++) {
			easyBody[i] = [String(flappyEasy[i].username), String(flappyEasy[i].score)];
		}

		const middleBody = [['', '']];
		for (let i = 0; i < flappyMiddle.length; i++) {
			middleBody[i] = [String(flappyMiddle[i].username), String(flappyMiddle[i].score)];
		}

		const hardBody = [['', '']];
		for (let i = 0; i < flappyHard.length; i++) {
			hardBody[i] = [String(flappyHard[i].username), String(flappyHard[i].score)];
		}

		const easyTable: TableSource = {
			head: ['Username', 'Score'],
			body: easyBody
		};

		const middleTable: TableSource = {
			head: ['Username', 'Score'],
			body: middleBody
		};

		const hardTable: TableSource = {
			head: ['Username', 'Score'],
			body: hardBody
		};

		const snakePromise = await fetch(snakeURL);
		const snakeHighscores = await snakePromise.json();

		snakeHighscores.sort((a: any, b: any) => {
			if (a.score > b.score) {
				return -1;
			}
		});

		const snakeBody = [['', '']];
		for (let i = 0; i < snakeHighscores.length; i++) {
			snakeBody[i] = [String(snakeHighscores[i].user.username), String(snakeHighscores[i].score)];
		}
		const snake: TableSource = {
			head: ['Username', 'Score'],
			body: snakeBody
		};

		const username = locals.user.name;
		const email = locals.user.email;

		return { spaceinvaders, wordle, snake, easyTable, middleTable, hardTable, username, email };
	} catch (err) {
		console.log(err);
	}
};

export const actions: Actions = {
	signOff: async ({ cookies }) => {
		cookies.delete('Token');
	},
	deleteAccount: async ({ cookies, locals }) => {
		const promise = await fetch(PUBLIC_API_URL + '/user/delete', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId: locals.user.id })
		});
		console.log(locals.user.id);
		const response = await promise.json();
		console.log(response.message);
		if (response.success) {
			cookies.delete('Token');
			throw redirect(303, '/');
		}
	}
};
