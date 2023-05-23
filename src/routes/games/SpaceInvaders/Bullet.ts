import { canvas, canvasCtx } from '../../../Store';
let c: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
canvas.subscribe((canvas) => (c = canvas));
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));
type Position = {
	x: number;
	y: number;
};
export class Bullet {
	position: Position;
	velocity: number;
	radius: number;
	constructor(position: Position, velocity: number) {
		this.position = position;
		this.velocity = velocity;
		this.radius = 3;
	}

	draw() {
		ctx!.beginPath();
		ctx!.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		ctx!.fillStyle = 'red';
		ctx!.fill();
		ctx!.closePath();
	}
	update() {
		this.draw();
		this.position.y += this.velocity;
	}
}
