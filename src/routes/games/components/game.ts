export type Frame = {
    firstPipe: PipePair;
    secondPipe: PipePair;
    height: number,
    width:number,
    bird: Bird;
    gameOver: boolean;
    gameStarted: boolean;
    score: number;
    ground: Ground;
  }
  
  export type Bird = {
    top: number;
    left: number;
    size: number;
    rotate: number;
  }
  
  export type Ground = {
    height: number;
  }
  
  export type PipePair = {
    topPipe: Pipe;
    bottomPipe: Pipe;
    show: boolean;
    left: number;
    width: number;
  }
  
  export type Pipe = {
    top: number;
    height: number;
  }
  
  export class GameController {
    private frame!: Frame;
    private velocity = 0;
  
    constructor(
      public readonly height = 100,
      public readonly width = 100,
      public readonly pipeWidth = 5,
      public readonly pipeGap = 20,
      public readonly minTopForTopPipe = 7,
      public readonly maxTopForTopPipe = 35,
      public readonly generateNewPipePercent = 0.7,
      public readonly speed = 0.5,
      public readonly groundHeight = 2,
      public readonly birdX = 4,
      public readonly birdSize = 5,
      public readonly gravity = 0.5,
      public readonly jumpVelocity = 1,
      public readonly slowVelocityBy = 0.03
    ) {}
  
    public newGame() {
      let firstPipe = this.createPipe(true);
      let secondPipe = this.createPipe(false);
      this.frame = {
        firstPipe,
        secondPipe,
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
          height: this.groundHeight,
        },
      };
  
      return this.frame;
    }
  
    public nextFrame() {
      if (this.frame.gameOver || !this.frame.gameStarted) {
        return this.frame;
      }
      //eine function move pipes
      this.frame.firstPipe = this.movePipe(
        this.frame.firstPipe,
        this.frame.secondPipe
      );
      this.frame.secondPipe = this.movePipe(
        this.frame.secondPipe,
        this.frame.firstPipe
      );
      
      //function check gameOver
      if (this.frame.bird.top >=this.height - this.groundHeight - this.birdSize
      ) {
        this.frame.bird.top = this.height - this.groundHeight - this.birdSize;
        this.frame.gameOver = true;
        return this.frame;
      }
  
      if (this.hasCollidedWithPipe()) {
        this.frame.gameOver = true;
        return this.frame;
      }
  
      //Move bird function
      if (this.velocity > 0) {
        this.velocity -= this.slowVelocityBy;
      }
      if(this.velocity> 0)
      {
        this.frame.bird.rotate = -20;
      }
      else if(this.velocity === 0)
      {
        this.frame.bird.rotate = 0
      }
      else{ 
        this.frame.bird.rotate=20} 
      this.frame.bird.top += Math.pow(this.gravity, 2) - this.velocity;
  
      //check score funtion
      if (this.frame.firstPipe.left + this.pipeWidth == this.birdX - this.speed) {
        this.frame.score += 1;
      }
  
      
      if (
        this.frame.secondPipe.left + this.pipeWidth ==
        this.birdX - this.speed
      ) {
        this.frame.score += 1;
      }
  
      return this.frame;
    }
  
    public start() {
      this.newGame();
      this.frame.gameStarted = true;
      return this.frame;
    }
  
    public jump() {
      //evtl <0.5 ??
      if (this.velocity <= 0.5) {
        this.velocity += this.jumpVelocity;
      }
    }
    
    //Hilfe fü check game over
    private hasCollidedWithPipe() {
      if (
        this.frame.firstPipe.show &&
        this.checkPipe(this.frame.firstPipe.left)
      ) {
        return !(
          this.frame.bird.top > this.frame.firstPipe.topPipe.height+2.5 &&
          this.frame.bird.top + this.birdSize <
            this.frame.firstPipe.bottomPipe.top-2.5
        );
      }
  
      if (
        this.frame.secondPipe.show &&
        this.checkPipe(this.frame.secondPipe.left)
      ) {
        return !(
          this.frame.bird.top > this.frame.secondPipe.topPipe.height+2.5 &&
          this.frame.bird.top + this.birdSize <
            this.frame.secondPipe.bottomPipe.top-2.5
        );
      }
  
      return false;
    }
  
    private checkPipe(left: number) {
      return (
        left <= this.birdX + this.birdSize && left + this.pipeWidth >= this.birdX
      );
    }
    
    //bei move pipe
    private randomYForTopPipe(): number {
      return (
        this.minTopForTopPipe +
        (this.maxTopForTopPipe - this.minTopForTopPipe) * Math.random()
      );
    }
  
    private createPipe(show: boolean): PipePair {
      const height = this.randomYForTopPipe();
  
      return {
        topPipe: {
          top: 0,
          height,
        },
        bottomPipe: {
          top: height + this.pipeGap,
          height: this.height-height - this.pipeGap,
        },
        left: this.width - this.pipeWidth-5,
        width: this.pipeWidth,
        show,
      };
    }
  
    private movePipe(pipe: PipePair, otherPipe: PipePair) {
      if (pipe.show && pipe.left <= this.pipeWidth * -1) {
        pipe.show = false;
        return pipe;
      }
  
      if (pipe.show) {
        pipe.left -= this.speed;
      }
  
      if (
        otherPipe.left < this.width * (1 - this.generateNewPipePercent) &&
        otherPipe.show &&
        !pipe.show
      ) {
        return this.createPipe(true);
      }
  
      return pipe;
    }
  }