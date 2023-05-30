import { canvasCtx } from '../../../Store';
let ctx: CanvasRenderingContext2D | null;
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));
type Point2D = {
	x: number;
	y: number;
};
export class Particle {
	position: Point2D;
	velocity: Point2D;
	radius: number;
	color: string;
	opacity: number;
	fades: boolean;
	constructor(position: Point2D, velocity: Point2D, radius: number, color: string, fades: boolean) {
		this.position = position;
		this.velocity = velocity;
		this.radius = radius;
		this.color = color;
		this.opacity = 1;
		this.fades = fades;
	}

	draw() {
		ctx!.save();
		ctx!.globalAlpha = this.opacity;
		ctx!.beginPath();
		ctx!.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		ctx!.fillStyle = this.color;
		ctx!.fill();
		ctx!.closePath();
		ctx!.restore();
	}
	update() {
		this.draw();
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		if (this.fades) {
			this.opacity -= 0.01;
		}
	}
}
