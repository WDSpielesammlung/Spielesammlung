import { canvas, canvasCtx } from '../../../Store';
let c: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
canvas.subscribe((canvas) => (c = canvas));
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));

type Position = {
	x: number;
	y: number;
};
export class Player {
	position: Position;
	width: number;
	height: number;
	image: HTMLImageElement;

	constructor() {
		this.width = innerWidth / 12;
		this.height = innerHeight / 6;
		this.position = {
			x: innerWidth / 2,
			y: innerHeight - this.height
		};
		this.image = new Image();
		this.image.src = '/images/SpaceInvaders/spaceship.png';
		this.image.translate;
	}

	draw() {
		ctx!.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
	update() {
		this.draw();
	}
}
