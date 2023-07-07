<script lang="ts">
	import { Game } from './Game';
	import { onMount } from 'svelte';
	import { canvas, canvasCtx } from '../../../Store';
	import { Table } from '@skeletonlabs/skeleton';
	import { invalidateAll } from '$app/navigation';
	let mainWindow: HTMLElement | null;
	let fullscreen = false;
	export let data;
	let game: Game;

	function onFullscreenChange() {
		fullscreen = document.fullscreenElement ? true : false;
		if (fullscreen) {
			mainWindow!.style.cursor = 'none';
		} else {
			invalidateAll();
			$canvas!.hidden = true;
			game.leaveGame();
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
		game.startGame();
	}

	function onMouseMove(e: any) {
		game.onMouseMove(e);
	}

	onMount(() => {
		mainWindow = document.getElementById('game');
		document.onkeydown = (e) => game.KeyboardHandler(e);
		$canvas!.width = screen.width;
		$canvas!.height = screen.height;
		canvasCtx.set($canvas!.getContext('2d'));
		game = new Game();
	});
</script>

<main
	style="width: 100%; height: 100%; overflow: hidden; margin:0px; padding: 0px; "
	class="game"
	id="game"
>
	<canvas id="canvas" hidden bind:this={$canvas} />

	{#if !fullscreen}
		<div class="w-full h-screen flex flex-col items-center justify-center p-10">
			<h1 class="m-10 text-5xl">Space Invaders</h1>
			<button type="button" class="btn btn-xl variant-filled" on:click={start}>Play</button>
			<h1 class="m-10 text-4xl">
				Your Highscore: {data.userHighscoreData.score ? data.userHighscoreData.score : '0'}
			</h1>
			{#if data.table}
				<Table class="table-comfortable w-auto min-w-[25vw]" source={data.table} />
			{/if}
		</div>
	{/if}
</main>
<svelte:window on:fullscreenchange={onFullscreenChange} on:mousemove={onMouseMove} />
