import { Player } from './Player';
import { canvas } from '../../Store';
let c: HTMLCanvasElement | null;
canvas.subscribe((canvas) => (c = canvas));
export class Gameloop {
	score: number;

	constructor() {
		this.score = 0;
		this.startGame();
	}

	startGame() {
		const player: Player = new Player();
		player.draw();
		c!.addEventListener('mousemove', (e) => player.onMouseMove(e));
	}
}
