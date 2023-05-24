import { Player } from './Player';
import { Bullet } from './Bullet';
import { Invader } from './Invader';
import { canvas, canvasCtx } from '../../../Store';
let c: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
canvas.subscribe((canvas) => (c = canvas));
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));
let player: Player;
let invader: Invader;
const bullets: Bullet[] = [];
let gameRunning: boolean = false;

export function shoot() {
	bullets.push(new Bullet({ x: player.position.x + player.width / 2, y: player.position.y }, -5));
}

export function startGame() {
	player = new Player();
	invader = new Invader();
	gameRunning = true;
	animate();
}

export function onMouseMove(e: any) {
	if (gameRunning) {
		const bounds = c!.getBoundingClientRect();
		player.position.x = e.x - bounds.left - scrollX;
	}
}

function animate() {
	requestAnimationFrame(animate);
	ctx!.fillStyle = 'black';
	ctx?.fillRect(0, 0, innerWidth, innerHeight);
	player.update();
	invader.update();
	bullets.forEach((bullet, index) => {
		if (bullet.position.y + bullet.radius <= 0) {
			bullets.splice(index, 1);
		} else {
			bullet.update();
		}
	});
}
