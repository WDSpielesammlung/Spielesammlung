import { canvas, canvasCtx } from '../../../Store';
let c: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
canvas.subscribe((canvas) => (c = canvas));
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));

type Position = {
	x: number;
	y: number;
};
export class Invader {
	position: Position;

	width: number;
	height: number;
	image: HTMLImageElement;

	constructor(position: Position) {
		this.width = innerWidth / 30;
		this.height = innerHeight / 15;

		this.position = position;
		this.image = new Image();
		this.image.src = '/images/SpaceInvaders/invader.png';
	}

	draw() {
		ctx!.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
	update(velocity: Position) {
		this.draw();
		this.position.x += velocity.x;
		this.position.y += velocity.y;
	}
}
