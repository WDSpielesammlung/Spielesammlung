import { canvasCtx } from '../../../Store';
let ctx: CanvasRenderingContext2D | null;
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));
type Point2D = {
	x: number;
	y: number;
};
export class Bullet {
	position: Point2D;
	velocity: number;
	radius: number;
	constructor(position: Point2D, velocity: number) {
		this.position = position;
		this.velocity = velocity;
		this.radius = 3;
	}

	draw() {
		ctx!.beginPath();
		ctx!.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		ctx!.fillStyle = '#00FF00';
		ctx!.fill();
		ctx!.closePath();
	}
	update() {
		this.draw();
		this.position.y += this.velocity;
	}
}
