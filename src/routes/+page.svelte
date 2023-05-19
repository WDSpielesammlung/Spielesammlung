<script lang="ts">
  let gamecards = [
		{ id: 'flappyBird', title: 'Flappy Birdlogo', path: '', clicked:false, description: 'Der Spieler führt durch das Tippen auf den Bildschirm einen Vogel durch eine von rechts nach links scrollende Spielwelt, wobei der Vogel die paarweise von oben und unten ins Bild ragenden grünen Röhren nicht berühren darf, sondern zwischen ihnen hindurchfliegen muss. Die Position der Flugschneise variiert dabei.', zurOrientierung:'Ab hier ThreeJS', cameraFov : 50, cameraNear :0.1, cameraFar : 2000, cameraX : -6.939, cameraY : 6.838, cameraZ : 18.486, modelpath: 'models/flappyBird/scene.gltf',moveObjectY: -6 },
		{ id: 'snake', title: 'Snakelogo', path: '', clicked:false, description: 'Das Ziel der Snake Spiele ist es, eine Schlange durch ein Spielfeld zu navigieren und einen Futterhappen zu fressen, um die Snake länger werden zu lassen. Dabei müssen Hindernisse wie Wände und der eigene Schwanz auf dem Weg vermieden werden, um nicht zu sterben und das Spiel zu verlieren.', zurOrientierung:'Ab hier ThreeJS', cameraFov : 50, cameraNear : 0.1, cameraFar : 2000, cameraX : 0, cameraY : 0, cameraZ : 17, modelpath: 'models/flappyBird/scene.gltf',moveObjectY: -6 },
		{ id: 'quizDuell', title: 'Quiz Duelllogo', path: '', clicked:false, description: 'Das Quizduell besteht aus einer Hauptrunde und einem Finale. Im Studio stehen sich ein Kandidatenteam und ein Teamkapitän, der das "Team Deutschland" repräsentiert, gegenüber. In der Hauptrunde spielen wir fünf Runden à drei Fragen. In den ersten vier Runden stehen je drei Kategorien zur Auswahl.', zurOrientierung:'Ab hier ThreeJS', cameraFov : 250, cameraNear : 0.1, cameraFar : 1000, cameraX : 0, cameraY : 0, cameraZ : 17, modelpath: 'models/flappyBird/scene.gltf',moveObjectY: -6 }
	];
  
  function handleBeschreibungClick(i:number) {
    gamecards[i].clicked = !gamecards[i].clicked; // Hier wird der "clicked"-Wert der entsprechenden Gamecard geändert
    console.log(gamecards[i].clicked); // Beispielhaft wird die Beschreibung in der Konsole ausgegeben
  }
  /**Three js part*/
  // JS/TS
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  
  function renderModelsThreeJs(containerID:string,cameraFov : number, cameraNear : number, cameraFar : number, cameraX : number, cameraY : number, cameraZ : number, modelpath: string, moveObjectY:number){
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let controls: OrbitControls;
    let baseRotationSpeed = 0.01;
    let rotationSpeed: number;

    const container = document.getElementById(containerID)!;
    console.log(containerID);

    const width = container.clientWidth;
    const height = container.clientHeight;
    scene = new THREE.Scene();
    scene.position.y = 0;

    camera = new THREE.PerspectiveCamera(cameraFov, width / height, cameraNear, cameraFar);
    camera.position.set(cameraX, cameraY, cameraZ); // positioniere die Kamera vor dem Objekt
    camera.lookAt(scene.position); // schaue auf das Zentrum der Szene

    const loader = new GLTFLoader();
    /**load model in scene*/
    loader.load(modelpath, function (gltf) {
      gltf.scene.position.y = moveObjectY;
      
      scene.add(gltf.scene);

      /**Lights*/

       // Lichteinstellungen
      const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Ambient Light mit weißer Farbe und Intensität 1
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional Light mit weißer Farbe und Intensität 1
      directionalLight.position.set(0, 1, 1); // Setze die Position des Directional Lights
      scene.add(directionalLight);

    });


      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0); // Hintergrundfarbe auf transparent setzen
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement); // Maussteuerung hinzufügen
      controls.enableDamping = true; // sanftes Schwingen bei der Rotation aktivieren
      controls.dampingFactor = 0.05; // Schwingungsintensität einstellen
      controls.rotateSpeed = 0.5; // Rotationsgeschwindigkeit einstellen
      
      controls.addEventListener('change', ()=>{
        rotationSpeed = baseRotationSpeed + controls.getAzimuthalAngle() * 0.0001;
      }); // Ereignislistener für Maussteuerung hinzufügen
      controls.update(); // Initialisierung der Maussteuerung

      window.addEventListener('resize', ()=>{
        // Fenstergröße aktualisieren

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }); // Anpassung bei Fenstergrößenänderung
      function animate(){
          requestAnimationFrame(animate);
          // Rotation des Modells um seine eigene Achse
        
          controls.update(); // Maussteuerung aktualisieren
          console.log(scene.rotation.y)
          renderer.render(scene, camera);
      };
      animate(); 
  }

  onMount(() => {
    for (const gamecard of gamecards) {
      renderModelsThreeJs(gamecard.id,gamecard.cameraFov,gamecard.cameraNear,gamecard.cameraFar,gamecard.cameraX,gamecard.cameraY,gamecard.cameraZ,gamecard.modelpath, gamecard.moveObjectY)
    }
  })

</script>
<body>
  <div class="backgroundRainbow"></div>
  <content class="contentClass">
    <div class="container">
      <h1 class="animated-text">The Gamebox</h1>
    </div>
    {#each gamecards as gamecard, i}
    <div class = "containerhülle">
      <div class="containerCard">
        <div class="left-column">
          <div class="field1">{gamecard.title} HIER MUSS NOCH EIN IMG HIN</div>
          <div class="field2">
            <div class="wrap">
              <button  on:click={() => handleBeschreibungClick(i)} class="beschreibung">Beschreibung</button>
            </div>
          </div>
          <div class="field3">
            <div class="wrap">
              <button class="buttonSpielen">Spielen</button>
            </div>
          </div>
        </div>
        <div class="right-column">
          <div class="field4">
            {#if gamecard.clicked}
              {gamecard.description}
            {:else}
              <div class="renderObject" id={gamecard.id}></div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    {/each}
  </content>
</body>

<style>
body {
  color:white;
  margin: 0;
  padding: 0;
}
.backgroundRainbow{
  position: fixed; /* Festlegung der Positionierung */
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  z-index: -999999999;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.contentClass{
  background-color: transparent; /* Hintergrundfarbe auf transparent setzen */
}
.container {
  background-color: transparent; /* Hintergrundfarbe auf transparent setzen */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.animated-text {
  font-family: 'Arial', sans-serif;
  font-size: 48px;
  color: #fff;
  animation: slide-in 1s cubic-bezier(0.42, 0, 0.58, 1) forwards;
  opacity: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

@keyframes slide-in {
  0% {
    transform: translateY(-50px) scale(0.8) skewX(15deg);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1) skewX(0deg);
    opacity: 1;
  }
}


/* Gamecard */


.containerhülle{
  width:100%;
  min-height: 40vh;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10vh;

}
.containerCard {
      display: flex;
      width: 80%;
    }
    
    .left-column {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .right-column {
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
    }
    
    .field1,
    .field2,
    .field3,
    .field4 {
      padding: 10px;
      flex-grow: 1;
      z-index: 1;
    }
    .renderObject{
      height: 100%;
      width: 100%;
      
    }
    /*Button Beschreibung*/
    .beschreibung {
  min-width: 200px;
  min-height: 40px;
  font-family: 'Nunito', sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-weight: 700;
  color: #FFFFFF;
  background: #FF6384;
  background: linear-gradient(90deg, rgba(255, 99, 132, 1) 0%, rgba(255, 157, 167, 1) 100%);
  border: none;
  border-radius: 1000px;
  box-shadow: 12px 12px 24px rgba(255, 157, 167, 0.64);
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 10px;
  animation: pulseRed 2s infinite;
}

.beschreibung::before {
  content: '';
  border-radius: 1000px;
  min-width: calc(200px + 12px);
  min-height: calc(40px + 12px);
  border: 6px solid #FF6384;
  box-shadow: 0 0 60px rgba(255, 99, 132, 0.64);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.beschreibung:hover,
.beschreibung:focus {
  color: #FFFFFF;
  scale: 105%;
}

.beschreibung:hover::before,
.beschreibung:focus::before {
  opacity: 1;
}

@keyframes pulseRed {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 99, 132, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(255, 99, 132, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 99, 132, 0);
  }
}
    /*Button Spielen*/
    .wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buttonSpielen {
  min-width: 200px;
  min-height: 40px;
  font-family: 'Nunito', sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-weight: 700;
  color: #313133;
  background: #4FD1C5;
  background: linear-gradient(90deg, rgba(129, 230, 217, 1) 0%, rgba(79, 209, 197, 1) 100%);
  border: none;
  border-radius: 1000px;
  box-shadow: 12px 12px 24px rgba(79, 209, 197, 0.64);
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 10px;
  animation: pulse 2s infinite;
}

.buttonSpielen::before {
  content: '';
  border-radius: 1000px;
  min-width: calc(200px + 12px);
  min-height: calc(40px + 12px);
  border: 6px solid #00FFCB;
  box-shadow: 0 0 60px rgba(0, 255, 203, 0.64);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.buttonSpielen:hover,
.buttonSpielen:focus {
  color: #313133;
  scale: 105%;
}

.buttonSpielen:hover::before,
.buttonSpielen:focus::before {
  opacity: 1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 255, 203, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(0, 255, 203, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 255, 203, 0);
  }
}

    /* Small screens */
    @media only screen and (max-width: 600px) {
      .containerCard {
        flex-direction: column;
        transition: 1s;
      }
    
      .left-column,
      .right-column {
        flex-basis: auto;
        height: 50vh;
        transition: 1s;
      }
    }
</style>