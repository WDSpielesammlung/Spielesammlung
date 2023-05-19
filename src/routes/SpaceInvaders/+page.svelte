<script lang="ts">
	import { Gameloop } from './Gameloop';
	import { onMount } from 'svelte';
	import { canvas, canvasCtx } from '../../Store';
	let c: HTMLCanvasElement;
	let navbar: HTMLElement | null;

	function KeyboardHandler(e: any) {
		if (e.keyCode === 27) {
			if (navbar!.style.display === 'none') {
				navbar!.style.display = 'block';
			} else {
				navbar!.style.display = 'none';
			}
		}
	}

	onMount(() => {
		navbar = document.getElementById('navbar');
		c.width = innerWidth;
		c.height = innerHeight;
		canvas.set(c);
		canvasCtx.set(c.getContext('2d'));
		const game: Gameloop = new Gameloop();
		document.onkeydown = (e) => KeyboardHandler(e);

		//canvas.addEventListener('mousemove', (e) => player.onMouseMove(e, canvas));
	});
</script>

<main
	style="width: 100%; height: 100%; overflow: hidden; margin:0px; padding: 0px; "
	class="game"
	id="game"
>
	<canvas bind:this={c} />
</main>

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
