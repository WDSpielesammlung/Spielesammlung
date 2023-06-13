<script lang="ts">
	import * as Game from './Game';
	import { onMount } from 'svelte';
	import { canvas, canvasCtx } from '../../../Store';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	let mainWindow: HTMLElement | null;
	let fullscreen = false;
	export let data;

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
	const tableBody = [['no score yet', '2']];
	for (let i = 0; i < data.allHighscoresData.length; i++) {
		tableBody[i] = [
			String(data.allHighscoresData[i].user.username),
			String(data.allHighscoresData[i].score)
		];
	}
	const table: TableSource = {
		head: ['Username', 'Score'],
		body: tableBody
	};
</script>

<main
	style="width: 100%; height: 100%; overflow: hidden; margin:0px; padding: 0px; "
	class="game"
	id="game"
>
	<canvas id="canvas" hidden bind:this={$canvas} />

	{#if !fullscreen}
		<div class="w-full h-screen flex flex-col items-center justify-center p-10">
			<button type="button" class="btn btn-xl variant-filled" on:click={start}>Play</button>
			<h1 class="m-10 text-4xl">
				Your Highscore: {data.userHighscoreData.score ? data.userHighscoreData.score : '0'}
			</h1>
			<Table class="table-comfortable w-auto min-w-[25vw]" source={table} />
		</div>
	{/if}
</main>
<svelte:window on:fullscreenchange={onFullscreenChange} on:mousemove={Game.onMouseMove} />
