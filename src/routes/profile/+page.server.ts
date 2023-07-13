import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';	
import type { TableSource } from '@skeletonlabs/skeleton';

export const load: PageServerLoad = async () => {
	const spaceinvadersURL = PUBLIC_API_URL + '/SpaceInvaders';
	const wordleURL = PUBLIC_API_URL + '/wordle';
	const snakeURL = PUBLIC_API_URL + '/snake';
	const FlappyBirdURL = PUBLIC_API_URL + '/flappyBird'


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
			if (a.score > b.score){
				return -1;
			}
		});

		const wordleBody = [['','']];
		for(let i = 0; i < wordleHighscores.length; i++){
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

		flappyBirdHighscores.sort((a: any, b: any) => {
			if (a.score > b.score){
				return -1;
			}
		});

		const flappyBirdBody = [['','']];
		for(let i = 0; i < flappyBirdHighscores.length; i++){
			flappyBirdBody[i] = [
				String(flappyBirdHighscores[i].user.username),
				String(flappyBirdHighscores[i].score)
			];
		}
		const flappyBird: TableSource = {
			head: ['Username', 'Score'],
			body: flappyBirdBody
		};

		const snakePromise = await fetch(snakeURL);
		const snakeHighscores = await snakePromise.json();

		snakeHighscores.sort((a: any, b: any) => {
			if (a.score > b.score){
				return -1;
			}
		});

		const snakeBody = [['','']];
		for(let i = 0; i < snakeHighscores.length; i++){
			snakeBody[i] = [
				String(snakeHighscores[i].user.username),
				String(snakeHighscores[i].score)
			];
		}
		const snake: TableSource = {
			head: ['Username', 'Score'],
			body: snakeBody
		};

		return {spaceinvaders, wordle, snake, flappyBird};

	} catch (err) {
		console.log(err);
	}
	


};
