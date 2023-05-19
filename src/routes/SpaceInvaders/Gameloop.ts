import { Player } from './Player';
import { canvas } from '../../Store';
let c: HTMLCanvasElement;
canvas.subscribe((canvas) => (c = canvas));
export class Gameloop {
	score: number;

	constructor() {
		this.score = 0;
		this.startGame();
	}

	startGame() {
		const player: Player = new Player();
		c.addEventListener('mousemove', (e) => player.onMouseMove(e));
	}
}
