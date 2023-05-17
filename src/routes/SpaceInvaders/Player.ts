type Position = {
	x: number;
	y: number;
};
export class Player {
	position: Position;
	velocity: number;
	width: number;
	height: number;
	constructor() {
		this.position = {
			x: innerWidth / 10,
			y: innerHeight / 10
		};
		this.velocity = 0;
		this.width = 100;
		this.height = 100;
	}

	draw(c: any) {
		console.log(this.position.x, this.position.y, this.width, this.height);
		c!.fillStyle = 'red';
		c!.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}
