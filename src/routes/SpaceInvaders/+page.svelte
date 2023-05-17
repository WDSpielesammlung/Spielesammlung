<script lang="ts">
	import { Player } from './Player';
	import { onMount } from 'svelte';
	let canvas: HTMLCanvasElement;

	onMount(() => {
		const player: Player = new Player();
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		console.log('mounted');
		let c = canvas.getContext('2d');
		player.draw(c);
	});
</script>

<canvas bind:this={canvas}>
	<h1>test</h1>
</canvas>

<style>
	/* canvas {
		width: 100vw;
		height: 100vh;
	} */
</style>
