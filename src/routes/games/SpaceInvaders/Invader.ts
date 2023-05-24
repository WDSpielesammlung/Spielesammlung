import { canvas, canvasCtx } from '../../../Store';
let c: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
canvas.subscribe((canvas) => (c = canvas));
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));

type Point2D = {
	x: number;
	y: number;
};
export class Invader {
	position: Point2D;
	velocity: Point2D;
	width: number;
	height: number;
	image: HTMLImageElement;

	constructor() {
		this.width = innerWidth / 25;
		this.height = innerHeight / 12;
		this.velocity = {
			x: 2,
			y: 2
		};
		this.position = {
			x: innerWidth / 2,
			y: innerHeight - this.height
		};
		this.image = new Image();
		this.image.src = '/images/SpaceInvaders/invader.png';
	}

	draw() {
		ctx!.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}
