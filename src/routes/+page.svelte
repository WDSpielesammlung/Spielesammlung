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
		const containerhülle = document.getElementById(gamecard.id + 'containerhülle')!;
		const containerfield1 = document.getElementById(gamecard.id + 'field1')!;
		containerhülle.addEventListener('mousemove', function (event) {
			const rect = containerhülle.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			const xRotation = ((x - rect.width / 2) / rect.width) * 50;
			const yRotation = ((y - rect.height / 2) / rect.height) * 50;
			containerfield1.style.transform =
				'rotateX(' + yRotation + 'deg) rotateY(' + xRotation + 'deg)';
		});
		containerhülle.addEventListener('mouseleave', function () {
			containerfield1.style.transform = 'none';
		});
	}

	function animationGamecardContainer(gamecard: Gamecard) {
		// Ziel-DIV-Container
		const targetElement = document.getElementById(gamecard.id + 'containerhülle')!;

		// Optionen für den Intersection Observer
		const options = {
			root: null, // Das gesmate Viewport-Fenster muss überwacht werden
			rootMargin: '0px',
			threshold: 0.5 //threshold-Option legt fest, ab welchem sichtbaren Anteil des Elements die Ein- bzw. Ausblendung erfolgt
		};

		// Funktion, die aufgerufen wird, wenn das Ziel-DIV-Container in den sichtbaren Bereich kommt
		function fadeInElement(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					// Ziel-DIV-Container ist sichtbar
					targetElement.style.opacity = '1';
					targetElement.style.transition = 'opacity 1.2s ease-in-out'; // Hier kannst du die Übergangszeit anpassen
					observer.unobserve(entry.target); // Beobachtung beenden, sobald das Ziel-DIV-Container sichtbar ist
				} else {
					targetElement.style.opacity = '0.1';
					targetElement.style.transition = 'opacity 0.3s ease-in-out'; // Hier kannst du die Übergangszeit anpassen
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
<content class="contentClass" id="content">
	<div class="container">
		<h1 class="animated-text">The Gamebox</h1>
	</div>
	{#each gamecards as gamecard, i}
		<div class="containerhülle" id={gamecard.id + 'containerhülle'}>
			<div class="containerCard" id={gamecard.id + 'objectreact'}>
				<div class="left-column">
					<div class="field1" id={gamecard.id + 'field1'}>{gamecard.title}</div>
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
	<footer class="footerContainer">
		<div class="footerDivContainer">
			<svg viewBox="0 0 120 28">
				<defs>
					<mask id="xxx">
						<circle cx="7" cy="12" r="40" fill="#fff" />
					</mask>

					<filter id="goo">
						<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="
				   1 0 0 0 0  
				   0 1 0 0 0  
				   0 0 1 0 0  
				   0 0 0 13 -9"
							result="goo"
						/>
						<feBlend in="SourceGraphic" in2="goo" />
					</filter>

					<icons id="twitter">
						<twitter x="250" y="145" xlink:href="https://img.icons8.com/ios/50/twitter--v1.png" />
					</icons>
					<path
						id="wave"
						d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
					/>
					<g id="g"
						><text font-size="1.5" text-anchor="middle"
							>©Spielewebsite DHBW | All Rights Reserved</text
						></g
					>
					<g id="twitterIcon">
						<a class="twitter" href="https://r.mtdv.me/lGtwhWwQxa">
							<rect width="2.5" height="2.5" style="fill-opacity:0; stroke-opacity:0" />
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="2.5"
								height="2.5"
								fill="currentColor"
								class="bi bi-twitter"
								viewBox="0 0 16 16"
							>
								<path
									d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
								/>
							</svg>
						</a>
					</g>
					<g id="facebookIcon">
						<a class="facebook" href="https://r.mtdv.me/lGtwhWwQxa">
							<rect width="2.5" height="2.5" style="fill-opacity:0; stroke-opacity:0" />
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="2.5"
								height="2.5"
								fill="white"
								class="bi bi-facebook"
								viewBox="0 0 16 16"
							>
								<path
									d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
								/>
							</svg>
						</a>
					</g>
					<g id="instagramIcon">
						<a class="instagram" href="https://r.mtdv.me/lGtwhWwQxa">
							<radialGradient id="rg" r="150%" cx="30%" cy="107%">
								<stop stop-color="#fdf497" offset="0" />
								<stop stop-color="#fdf497" offset="0.05" />
								<stop stop-color="#fd5949" offset="0.45" />
								<stop stop-color="#d6249f" offset="0.6" />
								<stop stop-color="#285AEB" offset="0.9" />
							</radialGradient>
							<rect width="2.5" height="2.5" style="fill-opacity:0; stroke-opacity:0" />
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="2.5"
								height="2.5"
								fill="white"
								class="bi bi-instagram"
								viewBox="0 0 16 16"
							>
								<path
									d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
								/>
							</svg>
						</a>
					</g>
					<g id="impressumText">
						<text font-size="1.3" text-anchor="middle">
							<a href="/impressum">Impressum</a>
						</text>
					</g>
				</defs>
				<use id="wave3" class="wave" xlink:href="#wave" x="0" y="-2" width="100" />
				<use id="wave2" class="wave" xlink:href="#wave" x="0" y="0" width="100" />

				<circle class="drop drop1" cx="20" cy="2" r="1.8" />
				<circle class="drop drop2" cx="55" cy="2.5" r="1.5" />
				<circle class="drop drop3" cx="80" cy="2.8" r="1.2" />
				<use id="wave1" class="wave" xlink:href="#wave" x="0" y="1" width="100" />
				<use id="text" xlink:href="#g" class="text" x="50%" y="27" />
				<use id="iconTwitter" xlink:href="#twitterIcon" class="text" x="50%" y="17.5" />
				<use id="iconFacebook" xlink:href="#facebookIcon" class="text" x="55%" y="17.5" />
				<use id="iconInsta" xlink:href="#instagramIcon" class="text" x="45%" y="17.5" />
				<use id="impressum" xlink:href="#impressumText" class="text" x="50.75%" y="23.5" />
			</svg>

			<!--<div class="impressum">
			<p class="copyrightText">©Spielewebsite DHBW | All Rights Reserved</p>
		</div>-->
		</div>
	</footer>
</content>

<style>
	@import url('https://fonts.googleapis.com/css?family=Lato:400,400i,700');

	.backgroundRainbow {
		position: fixed; /* Festlegung der Positionierung */
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: 400% 400%;
		animation: gradient 15s ease infinite;
		z-index: -1;
		z-index: -1;
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
	.field1 {
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

	footer {
		width: 100vw;
		position: relative;
		bottom: 0px;
	}
	footer div {
		background-color: black;
		margin: -5px 0px 0px 0px;
		padding: 0px;
		color: #fff;
		text-align: center;
	}

	.footerContainer {
		background-color: transparent;
		overflow: hidden;
		width: 100%;
	}

	.footerDivContainer {
		background-color: transparent;
	}

	.facebook:hover svg {
		fill: #4267b2;
	}

	.twitter:hover svg {
		fill: #1da1f2;
	}

	.instagram:hover svg {
		fill: url(#rg);
	}

	.drop {
		fill: transparent;
		animation: drop 5s ease infinite normal;
		stroke: black;
		stroke-width: 0.5;
		opacity: 0.6;
		transform: translateY(80%);
	}
	.drop1 {
		transform-origin: 20px 3px;
		position: relative;
	}
	.drop2 {
		animation-delay: 3s;
		animation-duration: 3s;
		transform-origin: 55px 3px;
		position: relative;
	}
	.drop3 {
		animation-delay: -2s;
		animation-duration: 3.4s;
		transform-origin: 80px 3px;
		position: relative;
	}

	.text {
		fill: white;
	}
	.wave {
		animation: wave 8s linear;
		animation-iteration-count: infinite;
		fill: black;
	}
	#wave2 {
		animation-duration: 10s;
		animation-direction: reverse;
		opacity: 0.6;
		position: relative;
	}
	#wave3 {
		animation-duration: 13s;
		opacity: 0.3;
		position: relative;
	}
	@keyframes drop {
		0% {
			transform: translateY(80%);
			opacity: 0.6;
		}
		80% {
			transform: translateY(80%);
			opacity: 0.6;
		}
		90% {
			transform: translateY(10%);
			opacity: 0.6;
		}
		100% {
			transform: translateY(0%) scale(1.5);
			stroke-width: 0.2;
			opacity: 0;
		}
	}
	@keyframes wave {
		to {
			transform: translateX(-100%);
		}
	}
	@keyframes ball {
		to {
			transform: translateY(20%);
		}
	}
</style>
