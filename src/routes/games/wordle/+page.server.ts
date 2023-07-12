import { fail, redirect } from '@sveltejs/kit';
import { Game } from './game';
import type { PageServerLoad, Actions } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

type userHighscoreData = { username: string; score: number };

export const load = (async ({ cookies, locals, url }) => {
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
	const game = new Game(cookies.get('wordle'));

	const fetchUrl = PUBLIC_API_URL + '/wordle/user?userId=' + locals.user.id;
	let userHighscoreData: userHighscoreData;
	userHighscoreData = { username: 'error', score: -1 };

	try {
		const userHighscoreResponse = await fetch(fetchUrl);
		userHighscoreData = await userHighscoreResponse.json();
	} catch (err) {
		console.log(err);
	}

	return {
		/**
		 * The player's guessed words so far
		 */
		guesses: game.guesses,

		/**
		 * An array of strings like '__x_c' corresponding to the guesses, where 'x' means
		 * an exact match, and 'c' means a close match (right letter, wrong place)
		 */
		answers: game.answers,

		/**
		 * The correct answer, revealed if the game is over
		 */
		answer: game.answers.length >= 6 ? game.answer : null,

		/**
		 * The current score
		 */
		score: game.score, // Add the score property

		userHighscore: userHighscoreData.score
	};
}) satisfies PageServerLoad;

export const actions = {
	/**
	 * Modify game state in reaction to a keypress. If client-side JavaScript
	 * is available, this will happen in the browser instead of here
	 */
	update: async ({ request, cookies }) => {
		const game = new Game(cookies.get('wordle'));

		const data = await request.formData();
		const key = data.get('key');

		const i = game.answers.length;

		if (key === 'backspace') {
			game.guesses[i] = game.guesses[i].slice(0, -1);
		} else {
			game.guesses[i] += key;
		}

		cookies.set('wordle', game.toString());
	},

	/**
	 * Modify game state in reaction to a guessed word. This logic always runs on
	 * the server, so that people can't cheat by peeking at the JavaScript
	 */
	enter: async ({ request, cookies }) => {
		const game = new Game(cookies.get('wordle'));

		const data = await request.formData();
		const guess = data.getAll('guess') as string[];

		if (!game.enter(guess)) {
			return fail(400, { badGuess: true });
		}

		cookies.set('wordle', game.toString());
	},

	restart: async ({ cookies }) => {
		cookies.delete('wordle');
	}
} satisfies Actions;
function async(
	arg0: ({ cookies, locals }: { cookies: any; locals: any }) =>
		| {
				/**
				 * The player's guessed words so far
				 */
				guesses: string[];
				/**
				 * An array of strings like '__x_c' corresponding to the guesses, where 'x' means
				 * an exact match, and 'c' means a close match (right letter, wrong place)
				 */
				answers: string[];
				/**
				 * The correct answer, revealed if the game is over
				 */
				answer: string | null;
				/**
				 * The current score
				 */
				score: number; // Add the score property
				userHighscore: any;
		  }
		| undefined
): PageServerLoad {
	throw new Error('Function not implemented.');
}
