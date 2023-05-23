import { Player } from './Player';
import { canvas } from '../../Store';
import { request } from '@playwright/test';
let c: HTMLCanvasElement | null;
canvas.subscribe((canvas) => (c = canvas));
export class Game {
	score: number;
	player: Player;

	constructor() {
		this.score = 0;
		this.startGame();
		this.player = new Player();
	}

	startGame() {
		c!.addEventListener('mousemove', (e) => this.player.onMouseMove(e));
		this.animate();
	}
	animate() {
		requestAnimationFrame(this.animate);
		this.player.draw();
	}
}
