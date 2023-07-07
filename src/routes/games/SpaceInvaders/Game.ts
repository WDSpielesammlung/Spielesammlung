import { Player } from './Player';
import { Bullet } from './Bullet';
import { Grid } from './Grid';
import { canvas, canvasCtx } from '../../../Store';
import { InvaderBullet } from './InvaderBullet';
import { Particle } from './Particle';

let c: HTMLCanvasElement | null;
canvas.subscribe((canvas) => (c = canvas));
let ctx: CanvasRenderingContext2D | null;
canvasCtx.subscribe((canvasCtx) => (ctx = canvasCtx));

type Playerattributes = {
	score: number;
	money: number;
	bulletVelocity: number;
	firerate: number;
};
type UpgradeCost = {
	bulletvelocityUpgrade: number;
	firerateUpgrade: number;
};

export class Game {
	spawnIntervall: number;
	player: Player;
	grids: Grid[];
	bullets: Bullet[];
	invaderBullets: InvaderBullet[];
	timeoutIDs: any[];
	intervallIDs: any[];
	particles: Particle[];
	playerattributes: Playerattributes;
	upgradeCost: UpgradeCost;
	ambientSound: HTMLAudioElement;
	highscore: boolean;
	colorChange: number;
	animationFrame: number;
	gameRunning: boolean;

	constructor() {
		this.spawnIntervall = 15000;
		this.player = new Player();
		this.grids = [new Grid()];
		this.bullets = [];
		this.invaderBullets = [];
		this.timeoutIDs = [];
		this.intervallIDs = [];
		this.particles = [];
		this.playerattributes = {
			score: 0,
			money: 0,
			bulletVelocity: -5,
			firerate: 500
		};
		this.upgradeCost = {
			bulletvelocityUpgrade: 10,
			firerateUpgrade: 10
		};
		this.ambientSound = new Audio('/sounds/background.mp3');
		this.ambientSound.loop = true;
		this.highscore = false;
		this.colorChange = 0;
		this.animationFrame = 0;
		this.gameRunning = false;
	}

	resetAttributes() {
		this.spawnIntervall = 15000;
		this.player = new Player();
		this.grids = [new Grid()];
		this.bullets = [];
		this.invaderBullets = [];
		this.timeoutIDs = [];
		this.intervallIDs = [];
		this.particles = [];
		this.playerattributes = {
			score: 0,
			money: 0,
			bulletVelocity: -5,
			firerate: 500
		};
		this.upgradeCost = {
			bulletvelocityUpgrade: 10,
			firerateUpgrade: 10
		};
		this.ambientSound = new Audio('/sounds/background.mp3');
		this.ambientSound.loop = true;
		this.highscore = false;
		this.colorChange = 0;
	}

	leaveGame() {
		this.ambientSound.pause();
		this.resetTimer();
		this.resetAttributes();
		document.exitFullscreen();
	}

	startGame() {
		this.gameRunning = true;
		this.background();
		this.spawnInvader();
		this.increaseDifficulty();
		this.shoot();
		this.invadershoot();
		this.animate();
		this.ambientSound.play();
	}

	resetTimer() {
		cancelAnimationFrame(this.animationFrame);
		this.intervallIDs?.forEach((intervallID, index) => {
			clearInterval(intervallID);
		});
		this.timeoutIDs?.forEach((timeoutID, index) => {
			clearTimeout(timeoutID);
		});
	}

	async gameOver() {
		if (this.gameRunning) {
			this.gameRunning = false;
			const response = await fetch('/api/SpaceInvaders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ score: this.playerattributes.score })
			});
			if (response.status === 201) {
				this.highscore = true;
			}
			const gameOverSound = new Audio('/sounds/gameOver.mp3');
			gameOverSound.play();
		}
	}

	shoot() {
		//Timeout statt Intervall, da die Frequenz im Laufe des Spiels erhöht wird
		const id = setTimeout(() => {
			this.bullets.push(
				new Bullet(
					{ x: this.player.position.x + this.player.width / 2, y: this.player.position.y },
					this.playerattributes.bulletVelocity
				)
			);
			this.shoot();
		}, this.playerattributes.firerate);
		this.timeoutIDs[0] = id;
	}

	invadershoot() {
		this.intervallIDs.push(
			setInterval(() => {
				this.grids.forEach((grid) => {
					const shootingInvader = grid.invaders[Math.floor(Math.random() * grid.invaders.length)];
					this.invaderBullets.push(
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
	spawnInvader() {
		const id = setTimeout(() => {
			this.grids.push(new Grid());
			this.spawnInvader();
		}, this.spawnIntervall);
		this.timeoutIDs[1] = id;
	}

	increaseDifficulty() {
		this.intervallIDs.push(
			setInterval(() => {
				this.spawnIntervall *= 0.9; //Geschwindigkeit alle 10 sek um 10% erhöhen um Schwierigkeit zu erhöhen
			}, 10000)
		);
	}

	firerateUpgrade() {
		const upgradeSound = new Audio('/sounds/cash.mp3');
		if (this.playerattributes.money >= this.upgradeCost.firerateUpgrade) {
			upgradeSound.play();
			this.playerattributes.money -= this.upgradeCost.firerateUpgrade;
			this.playerattributes.firerate *= 0.9;
			this.upgradeCost.firerateUpgrade = Math.floor(this.upgradeCost.firerateUpgrade * 1.25);
		}
	}

	bulletVelocityUpgrade() {
		const upgradeSound = new Audio('/sounds/cash.mp3');
		if (this.playerattributes.money >= this.upgradeCost.firerateUpgrade) {
			upgradeSound.play();
			this.playerattributes.money -= this.upgradeCost.firerateUpgrade;
			this.playerattributes.bulletVelocity *= 1.1;
			this.upgradeCost.bulletvelocityUpgrade = Math.floor(
				this.upgradeCost.bulletvelocityUpgrade * 1.25
			);
		}
	}

	KeyboardHandler(e: any) {
		switch (e.key) {
			case 's':
				this.bulletVelocityUpgrade();
				break;
			case 'r':
				this.firerateUpgrade();
				break;
			case 'a':
				if (!this.gameRunning) {
					this.ambientSound.pause();
					this.resetTimer();
					this.resetAttributes();
					this.startGame();
				}
				break;
			case 'e':
				if (!this.gameRunning) {
					this.leaveGame();
				}
				break;
		}
	}

	background() {
		for (let i = 0; i < 100; i++) {
			this.particles.push(
				new Particle(
					{
						x: Math.random() * screen.width,
						y: Math.random() * screen.height
					},
					{ x: 0, y: 0.5 },
					Math.random() * (screen.height / 300),
					'white',
					false
				)
			);
		}
	}

	onMouseMove(e: any) {
		if (this.gameRunning) {
			const bounds = c!.getBoundingClientRect();
			this.player.position.x = e.x - bounds.left - scrollX;
		}
	}

	animate() {
		this.animationFrame = requestAnimationFrame(() => this.animate());
		ctx!.fillStyle = 'black';
		ctx?.fillRect(0, 0, screen.width, screen.height);
		this.update();
		this.particles.forEach((particle, pIndex) => {
			//Position der Sterne nach oben setzen, wenn sie denn Bildschirm verlassen
			if (particle.position.y - particle.radius >= screen.height) {
				particle.position.x = Math.random() * screen.width;
				particle.position.y = -particle.radius;
			}
			if (particle.opacity <= 0) {
				this.particles.splice(pIndex, 1);
			} else {
				particle.update();
			}
		});
		if (this.gameRunning) {
			this.player.update();
			this.invaderBullets.forEach((invaderBullet, iBIndex) => {
				if (invaderBullet.position.y - invaderBullet.height >= screen.height) {
					this.invaderBullets.splice(iBIndex, 1);
				} else {
					invaderBullet.update();
				}
				if (
					invaderBullet.position.y + invaderBullet.height >= this.player.position.y &&
					invaderBullet.position.x + invaderBullet.width >= this.player.position.x &&
					invaderBullet.position.x <= this.player.position.x + this.player.width &&
					invaderBullet.position.y <= this.player.position.y + this.player.height
				) {
					this.gameOver();
				}
			});
			this.bullets.forEach((bullet, bIndex) => {
				//falls bullets den Bildschirm verlassen werden sie gelöscht
				if (bullet.position.y + bullet.radius <= 0) {
					this.bullets.splice(bIndex, 1);
				} else {
					bullet.update();
				}
			});
			this.grids.forEach((grid, g) => {
				grid.update();
				grid.invaders.forEach((invader, i) => {
					if (
						invader.position.y + invader.height >= this.player.position.y &&
						invader.position.x + invader.width >= this.player.position.x &&
						invader.position.x <= this.player.position.x + this.player.width
					) {
						this.gameOver();
					}
					invader.update({ x: grid.velocity.x, y: grid.velocity.y });
					this.bullets.forEach((bullet, b) => {
						//Kollisions Abfrage
						if (
							bullet.position.y - bullet.radius <= invader.position.y + invader.height &&
							bullet.position.x + bullet.radius >= invader.position.x &&
							bullet.position.x - bullet.radius <= invader.position.x + invader.width &&
							bullet.position.y + bullet.radius >= invader.position.y
						) {
							//Überprüfen ob es die Objekte noch gibt, um die  Genaugikeit der Kollisions Abfrage zu steigern
							const invaderFound = grid.invaders.find((invaderSearch) => invaderSearch === invader);
							const bulletFound = this.bullets.find((bulletSearch) => bulletSearch === bullet);
							//Invader und Bullet entfernen
							if (invaderFound && bulletFound) {
								grid.invaders.splice(i, 1);
								this.bullets.splice(b, 1);
								const hitSound = new Audio('/sounds/hitmarker.mp3');
								hitSound.play();

								for (let i = 0; i < 15; i++) {
									this.particles.push(
										new Particle(
											{
												x: invader.position.x + invader.width / 2,
												y: invader.position.y + invader.height / 2
											},
											{ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 },
											Math.random() * (screen.height / 150),
											'#BAA0DE',
											true
										)
									);
								}
							}
							//Größe und Position des Grids an entfernte Invader anpassen
							if (grid.invaders.length > 0) {
								const firstInvader = grid.invaders[0];
								const lastInvader = grid.invaders[grid.invaders.length - 1];
								grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
								grid.position.x = firstInvader.position.x;
							} else {
								//falls alle Gegner eines Grids zerstört wurden, Grid ebenfalls entfernen
								this.grids.splice(g, 1);
							}
							this.playerattributes.score++;
							this.playerattributes.money++;
						}
					});
				});
			});
		}
	}

	update() {
		const firerateText: string = '[r] +10% firerate (' + this.upgradeCost.firerateUpgrade + '$)';
		const scoreText: string = 'Score: ' + this.playerattributes.score;
		const moneyText: string = this.playerattributes.money + '$';
		const bulletvelocityText: string =
			'[s] +10% bullet speed  (' + this.upgradeCost.bulletvelocityUpgrade + '$)';
		const gameoverText = 'Game Over!';
		const endScoreText = 'Score: ' + this.playerattributes.score;
		const playAgainText = 'press [a] to play again';
		const exitText = 'press [e] to exit';
		const highscoreText = 'NEW HIGHSCORE!';
		const fontSize = screen.width / 60;

		ctx!.fillStyle = 'white';
		ctx!.font = fontSize + 'px Arial';
		if (this.gameRunning) {
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
			if (this.highscore) {
				const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
				ctx!.fillStyle = colors[this.colorChange];
				this.colorChange = (this.colorChange + 1) % colors.length;
				ctx!.fillText(
					highscoreText,
					screen.width / 2 - ctx!.measureText(highscoreText).width / 2,
					(screen.height / 10) * 3.5
				);
			}
			ctx!.fillStyle = 'white';
			ctx!.fillText(
				gameoverText,
				screen.width / 2 - ctx!.measureText(gameoverText).width / 2,
				(screen.height / 10) * 4
			);

			ctx!.fillText(
				endScoreText,
				screen.width / 2 - ctx!.measureText(endScoreText).width / 2,
				(screen.height / 10) * 4.5
			);

			ctx!.fillText(
				playAgainText,
				screen.width / 2 - ctx!.measureText(playAgainText).width / 2,
				(screen.height / 10) * 5
			);

			ctx!.fillText(
				exitText,
				screen.width / 2 - ctx!.measureText(exitText).width / 2,
				(screen.height / 10) * 5.5
			);
		}
	}
}
