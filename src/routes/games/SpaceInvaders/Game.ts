import { Player } from './Player';
import { Bullet } from './Bullet';
import { Grid } from './Grid';
import { canvas, canvasCtx } from '../../../Store';
import { InvaderBullet } from './InvaderBullet';

let c: HTMLCanvasElement | null;
canvas.subscribe((canvas) => (c = canvas));
let ctx: CanvasRenderingContext2D | null;
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));

let animationFrame: number;
let player: Player;
let grids: Grid[];
let spawnIntervall: number;
let timeoutIDs: any[];
let intervallIDs: any[];

let playerattributes = {
	score: 0,
	money: 0,
	bulletVelocity: -5,
	firerate: 500
};
let upgradeCost = {
	bulletvelocityUpgrade: 10,
	firerateUpgrade: 10
};
let bullets: Bullet[];
let invaderBullets: InvaderBullet[];
let gameRunning: boolean = false;

export function startGame() {
	//alle Variablen auf Anfangszustand setzen
	resetTimer();
	cancelAnimationFrame(animationFrame);
	gameRunning = true;
	spawnIntervall = 10000;
	player = new Player();
	grids = [new Grid()];
	bullets = [];
	invaderBullets = [];
	timeoutIDs = [];
	intervallIDs = [];
	playerattributes.score = 0;
	playerattributes.money = 0;
	playerattributes.bulletVelocity = -5;
	playerattributes.firerate = 500;
	upgradeCost.bulletvelocityUpgrade = 10;
	spawnInvader();
	increaseDifficulty();
	shoot();
	invadershoot();
	animate();
}

function resetTimer() {
	intervallIDs?.forEach((intervallID, index) => {
		clearInterval(intervallID);
	});
	timeoutIDs?.forEach((timeoutID, index) => {
		clearTimeout(timeoutID);
	});
}

export function leaveGame() {
	resetTimer();
	cancelAnimationFrame(animationFrame);
	document.exitFullscreen();
}

function shoot() {
	//Timeout statt Intervall, da die Frequenz im Laufe des Spiels erhöht wird
	const id = setTimeout(() => {
		bullets.push(
			new Bullet(
				{ x: player.position.x + player.width / 2, y: player.position.y },
				playerattributes.bulletVelocity
			)
		);
		shoot();
	}, playerattributes.firerate);
	timeoutIDs[0] = id;
}

function invadershoot() {
	intervallIDs.push(
		setInterval(() => {
			grids.forEach((grid) => {
				const shootingInvader = grid.invaders[Math.floor(Math.random() * grid.invaders.length)];
				invaderBullets.push(
					new InvaderBullet({
						x: shootingInvader.position.x + shootingInvader.width / 2,
						y: shootingInvader.position.y + shootingInvader.height / 2
					})
				);
			});
		}, 2000)
	);
}

//Timeout statt Intervall, da die Frequenz im Laufe des Spiels erhöht wird
function spawnInvader() {
	const id = setTimeout(() => {
		grids.push(new Grid());
		spawnInvader();
	}, spawnIntervall);
	timeoutIDs[1] = id;
}

function increaseDifficulty() {
	intervallIDs.push(
		setInterval(() => {
			spawnIntervall *= 0.9; //Geschwindigkeit alle 10 sek um 10% erhöhen um Schwierigkeit zu erhöhen
		}, 10000)
	);
}

export function firerateUpgrade() {
	if (playerattributes.money >= upgradeCost.firerateUpgrade) {
		playerattributes.money -= upgradeCost.firerateUpgrade;
		playerattributes.firerate *= 0.9;
		upgradeCost.firerateUpgrade = Math.floor(upgradeCost.firerateUpgrade * 1.25);
	}
}

export function bulletVelocityUpgrade() {
	if (playerattributes.money >= upgradeCost.firerateUpgrade) {
		playerattributes.money -= upgradeCost.firerateUpgrade;
		playerattributes.bulletVelocity *= 1.1;
		upgradeCost.bulletvelocityUpgrade = Math.floor(upgradeCost.bulletvelocityUpgrade * 1.25);
	}
}

export function KeyboardHandler(e: any) {
	switch (e.key) {
		case 's':
			bulletVelocityUpgrade();
			break;
		case 'r':
			firerateUpgrade();
			break;
		case 'a':
			if (!gameRunning) {
				startGame();
			}
			break;
		case 'e':
			if (!gameRunning) {
				leaveGame();
			}
			break;
	}
}

export function onMouseMove(e: any) {
	if (gameRunning) {
		const bounds = c!.getBoundingClientRect();
		player.position.x = e.x - bounds.left - scrollX;
	}
}

function animate() {
	animationFrame = requestAnimationFrame(animate);
	ctx!.fillStyle = 'black';
	ctx?.fillRect(0, 0, screen.width, screen.height);
	update();
	if (gameRunning) {
		player.update();
		invaderBullets.forEach((invaderBullet, iBIndex) => {
			if (invaderBullet.position.y - invaderBullet.height >= screen.height) {
				invaderBullets.splice(iBIndex, 1);
			} else {
				invaderBullet.update();
			}
			if (
				invaderBullet.position.y + invaderBullet.height >= player.position.y &&
				invaderBullet.position.x + invaderBullet.width >= player.position.x &&
				invaderBullet.position.x <= player.position.x + player.width &&
				invaderBullet.position.y <= player.position.y + player.height
			) {
				gameRunning = false;
			}
		});
		bullets.forEach((bullet, bIndex) => {
			//falls bullets den Bildschirm verlassen werden sie gelöscht
			if (bullet.position.y + bullet.radius <= 0) {
				bullets.splice(bIndex, 1);
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
						playerattributes.score++;
						playerattributes.money++;
					}
				});
			});
		});
	}
}

function update() {
	const firerateText: string = '[r] +10% firerate (' + upgradeCost.firerateUpgrade + '$)';
	const scoreText: string = 'Score: ' + playerattributes.score;
	const moneyText: string = playerattributes.money + '$';
	const bulletvelocityText: string =
		'[s] +10% bullet speed  (' + upgradeCost.bulletvelocityUpgrade + '$)';
	const gameoverText = 'Game Over!';
	const playAgainText = 'press [a] to play again';
	const exitText = 'press [e] to exit';

	ctx!.fillStyle = 'white';
	ctx!.font = '30px Arial';
	if (gameRunning) {
		ctx!.fillText(
			moneyText,
			screen.width - ctx!.measureText(moneyText).width - 10,
			(screen.height / 10) * 5.5
		);

		ctx!.fillText(
			firerateText,
			screen.width - ctx!.measureText(firerateText).width - 10,
			(screen.height / 10) * 6
		);

		ctx!.fillText(
			bulletvelocityText,
			screen.width - ctx!.measureText(bulletvelocityText).width - 10,
			(screen.height / 10) * 6.5
		);

		ctx!.fillText(scoreText, 0, (screen.height / 10) * 6.5);
	} else {
		ctx!.fillText(
			gameoverText,
			screen.width / 2 - ctx!.measureText(gameoverText).width / 2,
			(screen.height / 10) * 4
		);

		ctx!.fillText(
			playAgainText,
			screen.width / 2 - ctx!.measureText(playAgainText).width / 2,
			(screen.height / 10) * 4.5
		);

		ctx!.fillText(
			exitText,
			screen.width / 2 - ctx!.measureText(exitText).width / 2,
			(screen.height / 10) * 5
		);
	}
}
