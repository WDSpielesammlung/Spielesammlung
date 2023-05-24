import { Invader } from './Invader';
type Point2D = {
	x: number;
	y: number;
};
export class Grid {
	position: Point2D;
	velocity: Point2D;
	invaders: Invader[];
	width: number;
	constructor() {
		this.position = {
			x: 0,
			y: 0
		};
		this.velocity = {
			x: 3,
			y: 0
		};
		this.invaders = [];
		//erzeugt ein zufälliges Gitter an Gegner
		const collumns = Math.floor(Math.random() * 10 + 3);
		const rows = Math.floor(Math.random() * 5 + 1);
		this.width = (collumns * innerWidth) / 30;
		for (let x = 0; x < collumns; x++) {
			for (let y = 0; y < rows; y++) {
				this.invaders.push(new Invader({ x: (x * innerWidth) / 30, y: (y * innerHeight) / 15 }));
			}
		}
	}
	update() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.velocity.y = 0;
		if (this.position.x + this.width >= innerWidth || this.position.x <= 0) {
			this.velocity.x *= -1;
			this.velocity.y = innerWidth / 20;
		}
	}
}
