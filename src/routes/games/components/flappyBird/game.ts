export type Frame = {
	newHighscore: boolean;
	pipes: PipePair[];
	height: number;
	width: number;
	bird: Bird;
	gameOver: boolean;
	gameStarted: boolean;
	score: number;
	ground: Ground;
};

export type Bird = {
	top: number;
	left: number;
	size: number;
	rotate: number;
};

export type Ground = {
	height: number;
};

export type PipePair = {
	topPipe: Pipe;
	bottomPipe: Pipe;
	show: boolean;
	left: number;
	width: number;
};

export type Pipe = {
	top: number;
	height: number;
};

export class GameController {
	private difficulty = 1;
	getDifficulty() {
		return this.difficulty;
	}
	setDifficulty(selected: number) {
		this.difficulty = selected;
		if (this.difficulty === 0) {
			(this.pipeGap = 18),
				(this.generateNewPipePercent = 0.5),
				(this.speed = 0.45),
				(this.minTopForTopPipe = 15),
				(this.maxTopForTopPipe = 65);
		} else if (this.difficulty === 1) {
			(this.pipeGap = 20),
				(this.generateNewPipePercent = 0.6),
				(this.speed = 0.4),
				(this.minTopForTopPipe = 15),
				(this.maxTopForTopPipe = 60);
		} else if (this.difficulty === 2) {
			(this.pipeGap = 22),
				(this.generateNewPipePercent = 0.7),
				(this.speed = 0.3),
				(this.minTopForTopPipe = 20),
				(this.maxTopForTopPipe = 55);
		}
	}

	public setHighscores(overallScore: number[] | undefined, userScore: number[] | undefined) {
		this.highscoreOverall = overallScore;
		this.highscoreUser = userScore;
	}

	private frame!: Frame;
	private velocity = 0;
	public highscoreUser = [];
	public highscoreOverall = [];
	constructor(
		public pipeGap = 20,
		public generateNewPipePercent = 0.4,
		public speed = 0.4,
		public minTopForTopPipe = 15,
		public maxTopForTopPipe = 60,
		public readonly height = 100,
		public readonly width = 100,
		public readonly pipeWidth = 5,
		public readonly groundHeight = 2,
		public readonly birdX = 4,
		public readonly birdSize = 5,
		public readonly gravity = 0.6,
		public readonly jumpVelocity = 0.7,
		public readonly slowVelocityBy = 0.02
	) {}

	public newGame() {
		let pipes: PipePair[] = [this.createPipe(true)];
		this.frame = {
			newHighscore: false,
			pipes,
			score: 0,
			width: this.width,
			height: this.height,
			gameOver: false,
			gameStarted: false,
			bird: {
				left: this.birdX,
				top: this.height / 2 - this.birdSize / 2,
				size: this.birdSize,
				rotate: 0
			},
			ground: {
				height: this.groundHeight
			}
		};
		return this.frame;
	}

	public nextFrame() {
		if (this.frame.gameOver || !this.frame.gameStarted) {
			return this.frame;
		}
		this.movePipes(this.frame.pipes);
		this.moveBird(this.frame.bird);
		if (this.checkScore(this.frame.bird, this.frame.pipes, this.speed)) {
			this.frame.score += 1;
		}
		this.frame.gameOver = this.checkGameOver(
			this.frame.bird,
			this.frame.height,
			this.frame.ground.height,
			this.frame.pipes
		);
		if (this.frame.gameOver && this.highscoreUser[this.difficulty] < this.frame.score) {
			this.frame.newHighscore = true;
			this.highscoreUser[this.difficulty] = this.frame.score;
			if (this.highscoreOverall[this.difficulty] < this.frame.score) {
				this.highscoreOverall[this.difficulty] = this.frame.score;
			}
			this.newHighscore(this.frame.score, this.difficulty);
		}
		return this.frame;
	}

	//check if scored
	private checkScore(bird: Bird, pipes: PipePair[], speed: number) {
		for (let i = 0; i < pipes.length; i++) {
			if (
				pipes[i].left < bird.left - pipes[i].width &&
				pipes[i].left >= bird.left - pipes[i].width - speed
			) {
				var score = new Audio('/sounds/score1.mp3');

				score.play();
				return true;
			}
		}
	}

	//function check gameOver
	private checkGameOver(
		bird: Bird,
		height: number,
		groundHeight: number,
		pipes: PipePair[]
	): boolean {
		if (this.hasCollidedWithPipe(bird, pipes) || this.checkHitGround(bird, height, groundHeight)) {
			var gameOverSound = new Audio('/sounds/gameOver.mp3');

			gameOverSound.play();

			return true;
		}
		return false;
	}

	private checkHitGround(bird: Bird, height: number, groundHeight: number): boolean {
		if (bird.top >= height - groundHeight - bird.size) {
			bird.top = height - groundHeight - bird.size;
			bird.rotate = 0;
			return true;
		}
		return false;
	}

	private hasCollidedWithPipe(bird: Bird, pipes: PipePair[]) {
		for (let i = 0; i < pipes.length; i++) {
			if (this.checkPipe(pipes[i].left, bird)) {
				if (bird.top < pipes[i].topPipe.height || bird.top + bird.size > pipes[i].bottomPipe.top) {
					return true;
				}
			}
		}
		return false;
	}

	private checkPipe(left: number, bird: Bird) {
		return left <= bird.left + bird.size && left + this.pipeWidth >= this.birdX;
	}

	//Move bird up and down
	private moveBird(bird: Bird) {
		if (this.velocity > 0) {
			this.velocity -= this.slowVelocityBy;
			bird.rotate = -30 * (this.velocity / this.jumpVelocity);
		} else if (this.velocity === 0) {
			bird.rotate = 0;
		} else {
			bird.rotate = 40 * this.gravity;
		}
		bird.top += this.gravity - this.velocity;
		if (bird.top < 0) {
			bird.top = 0;
			this.velocity = 0;
		}
	}

	//move pipes to the left
	private movePipes(pipes: PipePair[]) {
		let lastPipeLeft = 0;
		pipes.forEach((pipe, index) => {
			if (lastPipeLeft < pipe.left) {
				lastPipeLeft = pipe.left;
			}
			if (pipe.left <= this.pipeWidth * -1) {
				pipes.splice(index, 1);
			} else {
				pipe.left -= this.speed;
			}
		});
		if (lastPipeLeft < this.width * (1 - this.generateNewPipePercent)) {
			pipes.push(this.createPipe(true));
		}
	}

	private randomYForTopPipe(): number {
		return this.minTopForTopPipe + (this.maxTopForTopPipe - this.minTopForTopPipe) * Math.random();
	}

	private createPipe(show: boolean): PipePair {
		const height = this.randomYForTopPipe();
		return {
			topPipe: {
				top: 0,
				height
			},
			bottomPipe: {
				top: height + this.pipeGap,
				height: this.height - height - this.pipeGap
			},
			left: this.width - this.pipeWidth,
			width: this.pipeWidth,
			show
		};
	}

	public start() {
		this.newGame();
		this.frame.gameStarted = true;
		this.frame.newHighscore = false;
		return this.frame;
	}

	public jump() {
		if (this.velocity <= 1.3) {
			this.velocity += this.jumpVelocity;
		}
		if (this.velocity > 2) {
			this.velocity = 2;
		}
	}

	async newHighscore(s: number, diff: number) {
		try {
			const reponse = await fetch('/api/flappyBird', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ score: s, difficulty: diff })
			});
			if (response.status === 201) {
				console.log('new highscore created');
			}
		} catch (err) {
			console.log(err);
		}
	}
}
