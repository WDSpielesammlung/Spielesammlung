import { Player } from './Player';
import { Bullet } from './Bullet';
import { canvas, canvasCtx } from '../../../Store';
let c: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
canvas.subscribe((canvas) => (c = canvas));
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));
let player: Player;
const bullets: Bullet[] = [];

export function shoot() {
	bullets.push(new Bullet({ x: player.position.x + player.width / 2, y: player.position.y }, -5));
}

export function startGame() {
	player = new Player();
	c!.addEventListener('mousemove', (e) => player.onMouseMove(e));
	animate();
}
function animate() {
	requestAnimationFrame(animate);
	ctx!.fillStyle = 'black';
	ctx?.fillRect(0, 0, innerWidth, innerHeight);
	player.update();
	bullets.forEach((bullet, index) => {
		if (bullet.position.y + bullet.radius <= 0) {
			bullets.splice(index, 1);
		} else {
			bullet.update();
		}
	});
}
