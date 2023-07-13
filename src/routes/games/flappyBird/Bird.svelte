<script lang="ts">
	import type { Bird } from './game';
	export let bird: Bird;
</script>

<img
	class="bird"
	style="transform: rotate({bird.rotate}deg); width: {bird.size}vw; height: {bird.size}vh; top: {bird.top}vh; left: {bird.left}vw"
	src="/images/Navbar/FlappyBirdAnimated.gif"
	alt=""
/>

<style>
	.bird {
		position: absolute;
	}
</style>
