<script lang="ts">
	import * as Game from './Game';
	import { onMount } from 'svelte';
	import { canvas, canvasCtx } from '../../../Store';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import type { Test } from 'vitest';
	import type { Data } from '@skeletonlabs/skeleton/dist/utilities/DataTable/types';
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
	// data.allHighscoresData.forEach((score: any) => {
	// 	tableBody.push([String(score.user.username), String(score.score)]);
	// });
	for (let i = 0; i < data.allHighscoresData.length; i++) {
		tableBody[i] = [
			String(data.allHighscoresData[i].user.username),
			String(data.allHighscoresData[i].score)
		];
	}
	console.log(tableBody);

	const table: TableSource = {
		// A list of heading labels.
		head: ['Username', 'Score'],
		// The data visibly shown in your table body UI.
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
		<div class="flex">
			<span>
				<button class="button" on:click={start}>Play</button>
			</span>
		</div>
		<Table source={table} />
	{/if}
</main>
<svelte:window on:fullscreenchange={onFullscreenChange} on:mousemove={Game.onMouseMove} />
