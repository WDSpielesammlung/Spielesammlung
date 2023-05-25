import { canvas, canvasCtx } from '../../../Store';
let ctx: CanvasRenderingContext2D | null;
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));
type Point2D = {
	x: number;
	y: number;
};
export class InvaderBullet {
	position: Point2D;
	velocity: number;
	width: number;
	height: number;

	constructor(position: Point2D) {
		this.position = position;
		this.velocity = 5;
		this.width = screen.width / 600;
		this.height = screen.height / 75;
	}

	draw() {
		ctx?.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	update() {
		this.draw();
		this.position.y += this.velocity;
	}
}
