<script lang="ts">
	import * as Game from './Game';
	import { onMount } from 'svelte';
	import { canvas, canvasCtx } from '../../../Store';
	let mainWindow: HTMLElement | null;
	let fullscreen = false;

	function onFullscreenChange() {
		fullscreen = document.fullscreenElement ? true : false;
		if (fullscreen) {
			mainWindow!.style.cursor = 'none';
		} else {
			$canvas!.hidden = true;
			Game.leaveGame();
			mainWindow!.style.cursor = 'auto';
		}
	}

	function enterFullScreen(element: any) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen(); // Firefox
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen(); // Safari
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen(); // IE/Edge
		}
	}

	function start() {
		$canvas!.hidden = false;
		enterFullScreen(mainWindow);
		Game.startGame();
	}

	onMount(() => {
		mainWindow = document.getElementById('game');
		document.onkeydown = (e) => Game.KeyboardHandler(e);
		$canvas!.width = screen.width;
		$canvas!.height = screen.height;
		canvasCtx.set($canvas!.getContext('2d'));
	});
</script>

<main
	style="width: 100%; height: 100%; overflow: hidden; margin:0px; padding: 0px; "
	class="game"
	id="game"
>
	<canvas id="canvas" hidden bind:this={$canvas} />

	{#if !fullscreen}
		<section id="init-screen">
			<h1>Space Invaders</h1>
			<div class="flex">
				<span>
					<button class="button" on:click={start}>Play</button>
				</span>
			</div>
			<h2>Your Personal Highscore:</h2>
			<h2>Overall Highscore:</h2>
		</section>
	{/if}
</main>
<svelte:window on:fullscreenchange={onFullscreenChange} on:mousemove={Game.onMouseMove} />

<style>
	/* canvas {
		background-color: aqua;
	} */
	canvas {
		background-color: blueviolet;
		width: 100vw;
		height: 100vh;
	}
</style>
