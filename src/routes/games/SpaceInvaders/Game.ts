import { Player } from './Player';
import { Bullet } from './Bullet';
import { Invader } from './Invader';
import { Grid } from './Grid';
import { canvas, canvasCtx } from '../../../Store';
let c: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
canvas.subscribe((canvas) => (c = canvas));
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));

let player: Player;
let grids: Grid[];
let spawnIntervall: number;
let score: number;
let money: number;

let playerattributes = {
	bulletVelocity: -5,
	firerate: 500
};
let upgradeCost = {
	bulletvelocityUpgrade: 10,
	firerateUpgrade: 10
};
const bullets: Bullet[] = [];
let gameRunning: boolean = false;

export function startGame() {
	spawnIntervall = 10000;
	player = new Player();
	grids = [new Grid()];
	gameRunning = true;
	score = 0;
	money = 0;
	spawnInvader();
	increaseDifficulty();
	shoot();
	animate();
}
function shoot() {
	if (gameRunning) {
		setTimeout(() => {
			bullets.push(
				new Bullet(
					{ x: player.position.x + player.width / 2, y: player.position.y },
					playerattributes.bulletVelocity
				)
			);
			shoot();
		}, playerattributes.firerate);
	}
}

function spawnInvader() {
	if (gameRunning) {
		setTimeout(() => {
			grids.push(new Grid());
			spawnInvader();
		}, spawnIntervall);
	}
}

function increaseDifficulty() {
	setInterval(() => {
		spawnIntervall /= 1.1; //Geschwindigkeit alle 10 sek um 10% erhöhen um Schwierigkeit zu erhöhen
	}, 10000);
}

export function firerateUpgrade() {
	if (money >= upgradeCost.firerateUpgrade) {
		money -= upgradeCost.firerateUpgrade;
		playerattributes.firerate /= 1.1;
		upgradeCost.firerateUpgrade = Math.floor(upgradeCost.firerateUpgrade * 1.25);
	}
}

export function bulletVelocityUpgrade() {
	if (money >= upgradeCost.firerateUpgrade) {
		money -= upgradeCost.firerateUpgrade;
		playerattributes.bulletVelocity *= 1.1;
		upgradeCost.bulletvelocityUpgrade = Math.floor(upgradeCost.bulletvelocityUpgrade * 1.25);
	}
}

export function onMouseMove(e: any) {
	if (gameRunning) {
		const bounds = c!.getBoundingClientRect();
		player.position.x = e.x - bounds.left - scrollX;
	}
}

function animate() {
	requestAnimationFrame(animate);
	ctx!.fillStyle = 'black';
	ctx?.fillRect(0, 0, innerWidth, innerHeight);
	player.update();
	update();
	bullets.forEach((bullet, index) => {
		//falls bullets den Bildschirm verlassen werden sie gelöscht
		if (bullet.position.y + bullet.radius <= 0) {
			bullets.splice(index, 1);
		} else {
			bullet.update();
		}
	});
	grids.forEach((grid, g) => {
		grid.update();
		grid.invaders.forEach((invader, i) => {
			invader.update({ x: grid.velocity.x, y: grid.velocity.y });
			bullets.forEach((bullet, b) => {
				//Kollisions Abfrage
				if (
					bullet.position.y - bullet.radius <= invader.position.y + invader.height &&
					bullet.position.x + bullet.radius >= invader.position.x &&
					bullet.position.x - bullet.radius <= invader.position.x + invader.width &&
					bullet.position.y + bullet.radius >= invader.position.y
				) {
					//Überprüfen ob es die Objekte noch gibt, um die  Genaugikeit der Kollisions Abfrage zu steigern
					const invaderFound = grid.invaders.find((invaderSearch) => invaderSearch === invader);
					const bulletFound = bullets.find((bulletSearch) => bulletSearch === bullet);
					//Invader und Bullet entfernen
					if (invaderFound && bulletFound) {
						grid.invaders.splice(i, 1);
						bullets.splice(b, 1);
					}
					//Größe und Position des Grids an entfernte Invader anpassen
					if (grid.invaders.length > 0) {
						const firstInvader = grid.invaders[0];
						const lastInvader = grid.invaders[grid.invaders.length - 1];
						grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
						grid.position.x = firstInvader.position.x;
					} else {
						//falls alle Gegner eines Grids zerstört wurden, Grid ebenfalls entfernen
						grids.splice(g, 1);
					}
					score++;
					money++;
				}
			});
		});
	});
}

function update() {
	draw();
}
function draw() {
	const firerateText: string = '[r] +10% firerate (' + upgradeCost.firerateUpgrade + '$)';
	const scoreText: string = 'Score: ' + score;
	const moneyText: string = money + '$';
	const bulletvelocityText: string =
		'[s] +10% bullet speed  (' + upgradeCost.bulletvelocityUpgrade + '$)';

	ctx!.fillStyle = 'white';
	ctx!.font = '30px Arial';

	ctx!.fillText(
		moneyText,
		innerWidth - ctx!.measureText(moneyText).width - 10,
		(innerHeight / 10) * 5.5
	);

	ctx!.fillText(
		firerateText,
		innerWidth - ctx!.measureText(firerateText).width - 10,
		(innerHeight / 10) * 6
	);

	ctx!.fillText(
		bulletvelocityText,
		innerWidth - ctx!.measureText(bulletvelocityText).width - 10,
		(innerHeight / 10) * 6.5
	);

	ctx!.fillText(scoreText, 0, (innerHeight / 10) * 6.5);
}
