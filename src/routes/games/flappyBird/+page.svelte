<script lang="ts">
    import { GameController } from "../components/game";
    import Pipe from '../components/Pipe.svelte';
    import Bird from '../components/Bird.svelte';
    const game = new GameController();
    let fullscreen = false;
    let frame = game.newGame();

    function enterFullscreen(element : any) {
    if(element.requestFullscreen) {
    element.requestFullscreen();
     } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
  }

    function jump() {
        game.jump();
    }
  
    function startGame() {
      enterFullscreen(document.getElementById("game"));
      frame = game.start();
    }
  
    setInterval(() => {
        frame = game.nextFrame();
    }, 1000 / 60);
  </script>
  
  <style>
   
    #ground {
      background: linear-gradient(
        -45deg,
        rgba(255, 0, 0, 1) 0%,
        rgba(255, 154, 0, 1) 7%,
        rgba(208, 222, 33, 1) 15%,
        rgba(79, 220, 74, 1) 25%,
        rgba(63, 218, 216, 1) 30%,
        rgba(47, 201, 226, 1) 40%,
        rgba(28, 127, 238, 1) 47%,
        rgba(95, 21, 242, 1) 55%,
        rgba(186, 12, 248, 1) 62%,
        rgba(251, 7, 217, 1) 70%,
        rgba(255, 0, 0, 1) 78%,
        rgba(255, 154, 0, 1) 85%,
        rgba(208, 222, 33, 1) 95%,
        rgba(63, 218, 216, 1) 100%
    );
    background-size: 350% 350%;
    background-repeat: repeat 0 0; 
    animation: gradient linear infinite 5s;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
      }
      @keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  
  100% {
    background-position: 100% 100%;
  }}
      #init-screen {
      user-select: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-family: monospace;
    }
    #init-screen h2 {
      text-align: center;
      color: white;
    }
    #init-screen button {
      font-family: monospace;
      font-size: 16px;
      border: none;
      border-radius: none;
      background-color: ghostwhite;
      padding: 10px;
      cursor: pointer;
      outline: none;
      transition: ease-in-out 0.2s font-size;
      display: block;
      margin: 0 auto;
    }
  
    #init-screen button:active,
    #init-screen button:focus {
      outline: none;
      font-size: 15px;
    }
  
    #score {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 20px;
      z-index: 10;
      padding: 5px;
      font-family: cursive;
      background-color: white;
      user-select: none;
    }
    
  
  
  .stars,
  .twinkleMask,
  .twinkleMask2,
  .clouds {
    z-index: -10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
  
  .stars {
    background: #000 url('https://wolf.drjm.co.uk/nightsky/stars.jpg') repeat top center;
  }
  
  .twinkleMask {
    background: transparent url('https://wolf.drjm.co.uk/nightsky/twinklemask.png') repeat top center;
    z-index: -9;
    animation: twinkleFrames 700s linear infinite;
  }
  
  .twinkleMask2 {
    background: transparent url('https://wolf.drjm.co.uk/nightsky/twinkleMask2.png') repeat top center;
    z-index: -8;
    height: 100%;
    animation: twinkleFrames2 300s linear infinite;
  }
  
  .clouds {
    background: transparent url('https://wolf.drjm.co.uk/nightsky/clouds.png') repeat top center;
    z-index: -7;
    height: 100%;
    animation: cloudsFrames 300s linear infinite;
  }
  
  .fogContainer {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: -6;
  }
  
  .fog {
    position: absolute;
    z-index: -10;
    left: -50%;
    top: -30%;
    width: 200%;
    height: 100%;
    animation-name: fogFrames;
    animation-duration: 60s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    background: linear-gradient(-5deg, "#00000000 0%, #ffffff15 40%, #74590121 45%, #8b845b21 55%, #00000000 70%");
  }
  
  @keyframes fogFrames {
    0% {
        transform: none;
    }
  
    10% {
        transform: scaleY(.75) translate(5%, -2%) rotate(15deg);
    }
  
    25% {
        transform: scaleY(1) translate(10%, 7%);
    }
  
    50% {
        transform: scaleY(0.5) rotate(-15deg);
    }
  
    75% {
        transform: scaleY(0.2) translate(7%, -2%);
    }
  
    100% {
        transform: none;
    }
  
  }
  
  @keyframes twinkleFrames {
    from {
        background-position: 0 0;
    }
  
    to {
        background-position: -10000px 5000px;
    }
  }
  
  @keyframes twinkleFrames2 {
    from {
        background-position: 0 0;
    }
  
    to {
        background-position: 10000px 5000px;
    }
  }
  
  @keyframes cloudsFrames {
    from {
        background-position: 0 0;
    }
  
    to {
        background-position: 10000px 0;
    }
  }
  
  </style>
  <body>
  <main
    style="width: 100%; height: 100%; overflow: hidden; margin:0px; padding: 0px; "
    class="game" id="game">
  
    <div class="stars"></div>
    <div class="twinkleMask"></div>
    <div class="twinkleMask2"></div>
    <div class="clouds"></div>
    <div class="fogContainer">
      <div class="fog"></div>
    </div>
  
    {#if fullscreen}
    <section id="score">{frame.score}</section>
    <Bird bird={frame.bird} />
    <Pipe pipePair="{frame.firstPipe}" />
    <Pipe pipePair="{frame.secondPipe}" />
    <section style="height: {frame.ground.height}vh;" id="ground" ></section>
    {/if}
    {#if frame.gameOver || !frame.gameStarted}
    <section id="init-screen">
      {#if frame.gameOver}
        <h2>Game Over</h2>
        <h2>Score {frame.score}</h2>
      {/if}
      <button on:click="{startGame}">Start Game</button>
    </section>
    {/if}
  
  </main>
  </body>
  
  <svelte:window on:click="{jump}" on:keydown|preventDefault={(e)=> {  
   if(e.code === "Space")
    {
      jump();
    }
  }} on:fullscreenchange ={ (e) => {fullscreen = document.fullscreenElement ? true : false;}} />