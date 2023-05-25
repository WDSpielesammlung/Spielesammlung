import { canvasCtx } from '../../../Store';
let ctx: CanvasRenderingContext2D | null;
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));

type Point2D = {
	x: number;
	y: number;
};
export class Player {
	position: Point2D;
	width: number;
	height: number;
	image: HTMLImageElement;

	constructor() {
		this.width = screen.width / 12;
		this.height = screen.height / 6;
		this.position = {
			x: screen.width / 2,
			y: screen.height - this.height
		};
		this.image = new Image();
		this.image.src = '/images/SpaceInvaders/spaceship.png';
		this.image.translate;
	}

	update() {
		ctx!.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
}
