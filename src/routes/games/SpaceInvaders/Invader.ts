import { canvasCtx } from '../../../Store';
let ctx: CanvasRenderingContext2D | null;
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));

type Point2D = {
	x: number;
	y: number;
};
export class Invader {
	position: Point2D;

	width: number;
	height: number;
	image: HTMLImageElement;

	constructor(position: Point2D) {
		this.width = screen.width / 30;
		this.height = screen.height / 15;

		this.position = position;
		this.image = new Image();
		this.image.src = '/images/SpaceInvaders/invader.png';
	}

	draw() {
		ctx!.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
	update(velocity: Point2D) {
		this.draw();
		this.position.x += velocity.x;
		this.position.y += velocity.y;
	}
}
