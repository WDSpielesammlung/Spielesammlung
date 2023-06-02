<script lang="ts">
	type Gamecard = {
		id: string;
		cameraFov: number;
		cameraNear: number;
		cameraFar: number;
		cameraX: number;
		cameraY: number;
		cameraZ: number;
		modelpath: string;
		moveObjectY: number;
		moveSceneX: number;
		requestAnimationFrame: number;
	};

	let gamecards = [
		{
			id: 'flappyBird',
			title: 'Flappy Bird',
			path: '/games/flappyBird',
			clicked: false,
			description:
				'Der Spieler führt durch das Tippen auf den Bildschirm einen Vogel durch eine von rechts nach links scrollende Spielwelt, wobei der Vogel die paarweise von oben und unten ins Bild ragenden grünen Röhren nicht berühren darf, sondern zwischen ihnen hindurchfliegen muss. Die Position der Flugschneise variiert dabei.',
			cameraFov: 50,
			cameraNear: 0.1,
			cameraFar: 2000,
			cameraX: -6.939,
			cameraY: 6.838,
			cameraZ: 25.486,
			modelpath: 'models/flappyBird/scene.gltf',
			moveObjectY: -6,
			moveSceneX: 0,
			requestAnimationFrame: 0
		},
		{
			id: 'snake',
			title: 'Snake',
			path: '/games/snake',
			clicked: false,
			description:
				'Das Ziel der Snake Spiele ist es, eine Schlange durch ein Spielfeld zu navigieren und einen Futterhappen zu fressen, um die Snake länger werden zu lassen. Dabei müssen Hindernisse wie Wände und der eigene Schwanz auf dem Weg vermieden werden, um nicht zu sterben und das Spiel zu verlieren.',
			cameraFov: 50,
			cameraNear: 0.1,
			cameraFar: 2000,
			cameraX: 0,
			cameraY: 0,
			cameraZ: 25.1,
			modelpath: '/models/snake/scene.gltf',
			moveObjectY: 0,
			moveSceneX: 0,
			requestAnimationFrame: 0
		},
		{
			id: 'spaceInvader',
			title: 'Space Invaders',
			path: '/games/SpaceInvaders',
			clicked: false,
			description:
				'Das Retro-Spiel Space Invaders ist ein Shoot-`em-up-Computerspiel. Es wurde von Tomohiro Nishikado, einem japanischer Videospielentwickler, entworfen und programmiert. 1978 wurde es dann von Taito, einem japanischen Unternehmen mit ihrem Sitz in Tokio, vertrieben.',
			cameraFov: 50,
			cameraNear: 0.1,
			cameraFar: 2000,
			cameraX: 0,
			cameraY: 70.5,
			cameraZ: 657.877,
			modelpath: '/models/spaceInvader/scene.gltf',
			moveObjectY: 0,
			moveSceneX: 0,
			requestAnimationFrame: 0
		},
		{
			id: 'wordle',
			title: 'Wordle',
			path: '/games/wordle',
			clicked: false,
			description:
				'Das Wordle-Spiel ist ein tägliches Worträtsel, das in Großbritannien entwickelt wurde, bei dem Benutzer ein Wort mit 5 Buchstaben in sechs oder weniger Raten erraten müssen. Wenn ein Spieler den richtigen Buchstaben an der richtigen Stelle errät, wird das Quadrat grün.',
			cameraFov: 50,
			cameraNear: 0.1,
			cameraFar: 2000,
			cameraX: 0,
			cameraY: 10,
			cameraZ: 35,
			modelpath: '/models/wordle/scene.gltf',
			moveObjectY: -6,
			moveSceneX: 0,
			requestAnimationFrame: 0
		},
		{
			id: 'quizDuell',
			title: 'Quiz',
			path: '/games/quiz',
			clicked: false,
			description:
				'Das Quizduell besteht aus einer Hauptrunde und einem Finale. Im Studio stehen sich ein Kandidatenteam und ein Teamkapitän, der das "Team Deutschland" repräsentiert, gegenüber. In der Hauptrunde spielen wir fünf Runden à drei Fragen. In den ersten vier Runden stehen je drei Kategorien zur Auswahl.',
			cameraFov: 50,
			cameraNear: 0.1,
			cameraFar: 1000,
			cameraX: 0,
			cameraY: 0.32,
			cameraZ: 1.383,
			modelpath: '/models/quiz/scene.gltf',
			moveObjectY: -0.1,
			moveSceneX: 0,
			requestAnimationFrame: 0
		}
	];

	function cancelAnimations() {
		gamecards.forEach((gamecard) => cancelAnimationFrame(gamecard.requestAnimationFrame));
	}

	function handleBeschreibungClick(i: number) {
		gamecards[i].clicked = !gamecards[i].clicked; // Hier wird der "clicked"-Wert der entsprechenden Gamecard geändert

		//console.log(gamecards[i].clicked); // Beispielhaft wird die Beschreibung in der Konsole ausgegeben
	}
	/**Three js part*/
	// JS/TS
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	function renderModelsThreeJs(gamecard: Gamecard) {
		let renderer: THREE.WebGLRenderer;
		let scene: THREE.Scene;
		let camera: THREE.PerspectiveCamera;
		let controls: OrbitControls;
		let baseRotationSpeed = 0.01;
		let rotationSpeed: number;

		const container = document.getElementById(gamecard.id)!;

		let width = container.clientWidth;
		let height = container.clientHeight;
		scene = new THREE.Scene();

		scene.position.y = 0;

		camera = new THREE.PerspectiveCamera(
			gamecard.cameraFov,
			width / height,
			gamecard.cameraNear,
			gamecard.cameraFar
		);
		camera.position.set(gamecard.cameraX, gamecard.cameraY, gamecard.cameraZ); // positioniere die Kamera vor dem Objekt
		camera.lookAt(scene.position); // schaue auf das Zentrum der Szene

		const loader = new GLTFLoader();
		/**load model in scene*/
		loader.load(gamecard.modelpath, function (gltf) {
			gltf.scene.position.y = gamecard.moveObjectY;
			scene.add(gltf.scene);

			/**Lights*/

			// Lichteinstellungen
			const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Ambient Light mit weißer Farbe und Intensität 1
			scene.add(ambientLight);

			const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional Light mit weißer Farbe und Intensität 1
			directionalLight.position.set(0, 1, 1); // Setze die Position des Directional Lights
			scene.add(directionalLight);

			// Animation für das Erscheinen des Modells beim Scrollen
			gsap.registerPlugin(ScrollTrigger);
			gsap.to(gltf.scene.rotation, {
				scrollTrigger: {
					trigger: document.getElementById(gamecard.id),
					start: 'bottom 100%',
					end: 'top 0%',
					// markers: true,
					scrub: true,
					toggleActions: 'restart pause resume pause'
				},
				y: Math.PI
			});
		});

		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(width, height);
		renderer.setClearColor(0x000000, 0); // Hintergrundfarbe auf transparent setzen
		container.appendChild(renderer.domElement);

		//Deaktiviere Mausrad
		container.addEventListener(
			'wheel',
			function (event) {
				event.preventDefault();
			},
			{ passive: false }
		);
		//

		controls = new OrbitControls(camera, renderer.domElement); // Maussteuerung hinzufügen
		controls.enableDamping = true; // sanftes Schwingen bei der Rotation aktivieren
		controls.dampingFactor = 0.05; // Schwingungsintensität einstellen
		controls.rotateSpeed = 0.5; // Rotationsgeschwindigkeit einstellen
		controls.enableZoom = false;

		controls.addEventListener('change', () => {
			rotationSpeed = baseRotationSpeed + controls.getAzimuthalAngle() * 0.0001;
		}); // Ereignislistener für Maussteuerung hinzufügen
		controls.update(); // Initialisierung der Maussteuerung

		window.addEventListener('resize', () => {
			// Fenstergröße aktualisieren
			width = container.clientWidth;
			height = container.clientHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		}); // Anpassung bei Fenstergrößenänderung

		function animate() {
			gamecard.requestAnimationFrame = requestAnimationFrame(animate);
			// Rotation des Modells um seine eigene Achse
			controls.update(); // Maussteuerung aktualisieren
			renderer.render(scene, camera);
		}
		animate();
	}
	function renderTextOnMouseposition(gamecard: Gamecard) {
		const containerhülle = document.getElementById((gamecard.id+'containerhülle'))!;
		const containerfield1 = document.getElementById((gamecard.id+'field1'))!;
		containerhülle.addEventListener('mousemove', function(event) {
			const rect = containerhülle.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			
			const xRotation = (x - rect.width / 2) / rect.width * 50;
			const yRotation = (y - rect.height / 2) / rect.height * 50;
			containerfield1.style.transform = 'rotateX(' + yRotation + 'deg) rotateY(' + xRotation + 'deg)';
		});
		containerhülle.addEventListener("mouseleave", function() {
			containerfield1.style.transform = "none";
		});
	}

	function animationGamecardContainer(gamecard: Gamecard){
		// Ziel-DIV-Container
		const targetElement = document.getElementById(gamecard.id+'containerhülle')!;

		// Optionen für den Intersection Observer
		const options = {
		root: null, // Das gesmate Viewport-Fenster muss überwacht werden
		rootMargin: '0px',
		threshold: 0.5 //threshold-Option legt fest, ab welchem sichtbaren Anteil des Elements die Ein- bzw. Ausblendung erfolgt
		};

		// Funktion, die aufgerufen wird, wenn das Ziel-DIV-Container in den sichtbaren Bereich kommt
		function fadeInElement(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					// Ziel-DIV-Container ist sichtbar
					targetElement.style.opacity = '1';
					targetElement.style.transition = 'opacity 1.2s ease-in-out'; // Hier kannst du die Übergangszeit anpassen
					observer.unobserve(entry.target); // Beobachtung beenden, sobald das Ziel-DIV-Container sichtbar ist
				}else{
					targetElement.style.opacity = '0.1';
					        targetElement.style.transition = "opacity 0.3s ease-in-out"; // Hier kannst du die Übergangszeit anpassen

				}
			});
		}

		// Intersection Observer erstellen
		const observer = new IntersectionObserver(fadeInElement, options);

		// Ziel-DIV-Container beobachten
		observer.observe(targetElement);
	}

	onMount(() => {
		for (const gamecard of gamecards) {
			renderModelsThreeJs(gamecard);
			renderTextOnMouseposition(gamecard);
			animationGamecardContainer(gamecard);
		}
		
	});
	
</script>

	<div class="backgroundRainbow" />
	<content class="contentClass" id='content'>
		<div class="container">
			<h1 class="animated-text">The Gamebox</h1>
		</div>
		{#each gamecards as gamecard, i}
			<div class="containerhülle" id={gamecard.id+'containerhülle'}>
				<div class="containerCard" id={gamecard.id + 'objectreact'}>
					<div class="left-column">
						<div class="field1" id={gamecard.id+'field1'}>{gamecard.title}</div>
						<div class="field2">
							<div class="wrap">
								<button on:click={() => handleBeschreibungClick(i)} class="beschreibung">
									Beschreibung
								</button>
							</div>
						</div>
						<div class="field3">
							<div class="wrap">
								<button class="buttonSpielen" 
									><a class="pagelink" on:click={cancelAnimations} href={gamecard.path}>Spielen</a
									></button
								>
							</div>
						</div>
					</div>
					<div class="right-column">
						<div class="field4">
							<div id={gamecard.id + 'description'} hidden={!gamecard.clicked}>
								{gamecard.description}
							</div>
							<div class="renderObject" hidden={gamecard.clicked} id={gamecard.id} />
						</div>
					</div>
				</div>
			</div>
		{/each}
	</content>


<style>
	.backgroundRainbow {
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
	
	.contentClass {
		background-color: transparent; /* Hintergrundfarbe auf transparent setzen */
		color: white;
		margin: 0;
		padding: 0;
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

	.containerhülle {
		width: 100%;
		min-height: 40vh;
		display: flex;
		justify-content: space-around;
		margin-bottom: 10vh;
		transform: 0.3s;
		transform-style: preserve-3d;
  		transform: translateZ(0);
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
	.field1{
		font-size: 3rem;
  		text-align: center;
	}
	.renderObject {
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
		color: #ffffff;
		background: #ff6384;
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
		border-radius: 1000px;
		min-width: calc(200px + 12px);
		min-height: calc(40px + 12px);
		border: 6px solid #ff6384;
		box-shadow: 0 0 60px rgba(255, 99, 132, 0.64);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
	}

	.beschreibung:hover,
	.beschreibung:focus {
		color: #ffffff;
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
		background: #4fd1c5;
		background: linear-gradient(90deg, rgba(129, 230, 217, 1) 0%, rgba(79, 209, 197, 1) 100%);
		border: none;
		border-radius: 1000px;
		box-shadow: 12px 12px 24px rgba(79, 209, 197, 0.64);
		transition: all 0.3s ease-in-out 0s;
		outline: none;
		position: relative;
		padding: 10px;
		animation: pulse 2s infinite;
	}

	.buttonSpielen::before {
		border-radius: 1000px;
		min-width: calc(200px + 12px);
		min-height: calc(40px + 12px);
		border: 6px solid #00ffcb;
		box-shadow: 0 0 60px rgba(0, 255, 203, 0.64);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
	}

	.buttonSpielen:hover {
		color: #313133;
		scale: 105%;
	}

	.buttonSpielen:hover::before {
		opacity: 1;
	}
	.pagelink {
		text-decoration: none; /* Entfernt die Unterstreichung */
		color: white; /* Vererbt die Farbe des umgebenden Elements */
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
