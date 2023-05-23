import { canvas, canvasCtx } from '../../Store';
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
		this.position = {
			x: innerWidth / 2,
			y: innerHeight / 1.2
		};
		this.width = innerWidth / 15;
		this.height = innerHeight / 7;
		this.image = new Image();
		this.image.src = 'images/SpaceInvaders/player.png';
		ctx!.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}

	onMouseMove(e: any) {
		const bounds = c!.getBoundingClientRect();
		ctx!.clearRect(this.position.x, this.position.y, this.width, this.height);
		this.position.x = e.x - bounds.left - scrollX;
		this.draw();
	}

	draw() {
		console.log('drawing' + ctx);
		ctx!.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}
}
