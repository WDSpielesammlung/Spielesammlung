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
     } else if(element.msRequestFullscreen) {     
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  
    element.webkitRequestFullscreen();
  }
  }

    function jump() {
        game.jump();
    }
  
    function startGame() {
      frame = game.start();
    }

    function play() {
      enterFullscreen(document.getElementById("game"));
    }
  
    setInterval(() => {
        if(frame.gameStarted&&!frame.gameOver)
          {frame = game.nextFrame();}
    }, 1000 / 90);

    let difficulties = [
		{ id: 0, text: `Hard` },
		{ id: 1, text: `Medium` },
		{ id: 2, text: `Easy` }
	];
  let selected = difficulties[1];
  

	function updateDifficulty() {
		game.setDifficulty(selected.id)
	}


	function leave() {
		document.exitFullscreen();
	}
</script>
  
  <style>
   @font-face {
  font-family:"Minecraft";
  src: url("fonts/Minecraft.ttf") format("truetype");
  }
    #ground {
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    z-index:-1;
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
      #start-screen {
      position: absolute;
      top:20vh;
      left:0vh;
      width:100vw; 
      z-index:5;     
    }
    #start-screen h2 {
      text-align: center;
      color: white;
      font-family: Minecraft;
      font-size: calc(20px + 2vh);

    }
    .button {
      font-size: calc(20px + 2vh);
      font-weight: bold;
      z-index: 2;
      border: white;
      color:white;
      padding:10px;
      border-style: solid;
      border-width: 0.15vh;
      font-family: Minecraft;
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
     background-size: 400% 400%;
      animation: gradient 15s ease infinite;
      margin: 1vw;

    }
  
    .flex{
      display: flex;
      flex-direction:row;
      justify-content:center;
    }

    #init-screen {
      position: absolute;
      top:10vh;
      left:0vh;
      width:100vw; 
    }
    #init-screen h2 {
      text-align: center;
      color: white;
      font-family: Minecraft;
      font-size: calc(20px + 2vh);
    }

    #init-screen h1 {
      text-align: center;
      font-family: Minecraft;
      font-size: calc(20px + 5vh);
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
}

    

    /* The container must be positioned relative: */
.custom-select {
  font-size: calc(20px + 2vh);
    font-weight: bold;
    margin-right: 1vw;

}

.custom-select select{
  font-size: calc(20px + 2vh);
    font-weight: bold;
    font-family: Minecraft;
      border: white;
      color:white;
      padding:10px;
      border-style: solid;
      border-width: 0.15vh;
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
     background-size: 400% 400%;
      animation: gradient 15s ease infinite;
      margin: 1vw;


  
}

.custom-select option {
  font-size: calc(20px + 2vh);
    font-weight: bold;
    font-family: Minecraft;
      color:white;
      padding:5px;
      background-color:  black;
      margin: 1vw;

}




    #score {
      position: absolute;
      right: 1vh;
      top: 1vh;
      font-size: calc(20px + 2vh);
      font-weight: bold;
      z-index: 2;
      border: white;
      color:white;
      padding:10px;
      border-style: solid;
      border-width: 0.15vh;
      font-family: Minecraft;
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 1000% 1000%;
    background-repeat: repeat 0 0; 
    animation: gradient linear infinite 30s;
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
    <section id="score">{frame.score }</section>
    <Bird bird={frame.bird} />
      {#each frame.pipes as pipe}
      <Pipe pipePair="{pipe}"></Pipe>
	    {/each}
    <section style="height: {frame.ground.height}vh;" id="ground" ></section>
    {#if frame.gameOver || !frame.gameStarted}
    <section id="start-screen">
      {#if frame.newHighscore}
      <h2>New Highscore!!</h2>
    {/if}
      {#if frame.gameOver}
        <h2>Game Over</h2>
        <h2>Score: {frame.score}</h2>
      {/if}
      <div class="flex">
        <span>
      <button class="button" on:click="{startGame}">Start Game</button>
    </span>
    <span>
      <button class="button" on:click="{leave}">Leave Game</button>
    </span>
    </div>
    </section>
    {/if}
    {:else}
    <section id="init-screen">
      <h1>Flappy Bird</h1>
      <div class="flex">
        <div class="custom-select">
          <select bind:value={selected} on:change="{updateDifficulty}">
            {#each difficulties as diff}
              <option value={diff}>
                {diff.text}
              </option>
            {/each}
          </select>
        </div>
    <span>
      <button class="button" on:click="{play}">Play</button>
    </span>
    </div>
    <h2>Your Personal Highscore: </h2>
    <h2>Overall Highscore: </h2>
    </section>
    {/if}
  </main>
  </body>
  
  <svelte:window on:click="{jump}" on:keydown|preventDefault={(e)=> {  
   if(e.code === "Space")
    {
      jump();
    }
  }} on:fullscreenchange ={ (e) => {
    fullscreen = document.fullscreenElement ? true : false;
  }} />