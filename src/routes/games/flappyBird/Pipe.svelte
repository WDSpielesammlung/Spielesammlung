<script lang="ts">
	import type { PipePair } from './game';
	export let pipePair: PipePair;
</script>

{#if pipePair.show}
	<div
		style="left: {pipePair.left}vw; top: {pipePair.topPipe
			.top}vh; width: {pipePair.width}vw; height: {pipePair.topPipe.height}vh;"
		class="pipeTop"
	/>
	<div
		style="left: {pipePair.left}vw; top: {pipePair.bottomPipe
			.top}vh; width: {pipePair.width}vw; height: {pipePair.bottomPipe.height}vh;"
		class="pipeBottom"
	/>
{/if}

<style>
	.pipeBottom {
		position: absolute;
		box-shadow: 0 0.8vh 1vh rgba(0, 0, 0, 0.5);
		background: linear-gradient(
			90deg,
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 154, 0, 1) 7%,
			rgba(208, 222, 33, 1) 15%,
			rgba(79, 220, 74, 1) 25%,
			rgba(63, 218, 216, 1) 30%,
			rgba(47, 201, 226, 1) 40%,
			rgba(28, 127, 238, 1) 47%,
			rgba(95, 21, 242, 1) 55%,
			rgba(186, 12, 248, 1) 62%,
			rgba(251, 7, 217, 1) 70%,
			rgba(255, 0, 0, 1) 78%,
			rgba(255, 154, 0, 1) 85%,
			rgba(208, 222, 33, 1) 95%,
			rgba(63, 218, 216, 1) 100%
		);
		background-size: 350% 350%;
		background-repeat: repeat 0 0;
		animation: gradient linear infinite 5s;
	}

	.pipeBottom::before {
		content: '';
		position: absolute;
		z-index: 1;
		left: -0.5vw;
		height: 0.5vh;
		width: 6vw;
		border-radius: 0.6vh 0.6vh 0 0;
		background: linear-gradient(
			90deg,
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 154, 0, 1) 7%,
			rgba(208, 222, 33, 1) 15%,
			rgba(79, 220, 74, 1) 25%,
			rgba(63, 218, 216, 1) 30%,
			rgba(47, 201, 226, 1) 40%,
			rgba(28, 127, 238, 1) 47%,
			rgba(95, 21, 242, 1) 55%,
			rgba(186, 12, 248, 1) 62%,
			rgba(251, 7, 217, 1) 70%,
			rgba(255, 0, 0, 1) 78%,
			rgba(255, 154, 0, 1) 85%,
			rgba(208, 222, 33, 1) 95%,
			rgba(63, 218, 216, 1) 100%
		);
		background-size: 350% 350%;
		background-repeat: repeat 0 0;
		animation: gradient linear infinite 5s;
	}
	.pipeBottom::after {
		content: '';
		position: absolute;
		left: -0.5vw;
		height: 2vh;
		width: 6vw;
		border-radius: 0.6vh;
		border-bottom: solid 0.7vh rgba(0, 0, 0, 0.4);
		box-shadow: 0 0.4vh 0.05vh rgba(0, 0, 0, 0.5);
		border-radius: 1vh;
		background: linear-gradient(
			90deg,
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 154, 0, 1) 7%,
			rgba(208, 222, 33, 1) 15%,
			rgba(79, 220, 74, 1) 25%,
			rgba(63, 218, 216, 1) 30%,
			rgba(47, 201, 226, 1) 40%,
			rgba(28, 127, 238, 1) 47%,
			rgba(95, 21, 242, 1) 55%,
			rgba(186, 12, 248, 1) 62%,
			rgba(251, 7, 217, 1) 70%,
			rgba(255, 0, 0, 1) 78%,
			rgba(255, 154, 0, 1) 85%,
			rgba(208, 222, 33, 1) 95%,
			rgba(63, 218, 216, 1) 100%
		);
		background-size: 350% 350%;
		background-repeat: repeat 0 0;
		animation: gradient linear infinite 5s;
	}

	.pipeTop {
		position: absolute;
		background: linear-gradient(
			90deg,
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 154, 0, 1) 7%,
			rgba(208, 222, 33, 1) 15%,
			rgba(79, 220, 74, 1) 25%,
			rgba(63, 218, 216, 1) 30%,
			rgba(47, 201, 226, 1) 40%,
			rgba(28, 127, 238, 1) 47%,
			rgba(95, 21, 242, 1) 55%,
			rgba(186, 12, 248, 1) 62%,
			rgba(251, 7, 217, 1) 70%,
			rgba(255, 0, 0, 1) 78%,
			rgba(255, 154, 0, 1) 85%,
			rgba(208, 222, 33, 1) 95%,
			rgba(63, 218, 216, 1) 100%
		);
		background-size: 350% 350%;
		background-repeat: repeat 0 0;
		animation: gradient linear infinite 5s;
	}

	@keyframes gradient {
		0% {
			background-position: 0% 0%;
		}

		100% {
			background-position: 100% 100%;
		}
	}

	.pipeTop::before {
		content: '';
		position: absolute;
		top: calc(100% - (0.5 * 1vh));
		z-index: 0.5;
		left: -0.5vw;
		height: 0.5vh;
		width: 6vw;
		border-radius: 0.6vh 0.6vh 0 0;
		background: linear-gradient(
			90deg,
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 154, 0, 1) 7%,
			rgba(208, 222, 33, 1) 15%,
			rgba(79, 220, 74, 1) 25%,
			rgba(63, 218, 216, 1) 30%,
			rgba(47, 201, 226, 1) 40%,
			rgba(28, 127, 238, 1) 47%,
			rgba(95, 21, 242, 1) 55%,
			rgba(186, 12, 248, 1) 62%,
			rgba(251, 7, 217, 1) 70%,
			rgba(255, 0, 0, 1) 78%,
			rgba(255, 154, 0, 1) 85%,
			rgba(208, 222, 33, 1) 95%,
			rgba(63, 218, 216, 1) 100%
		);
		background-size: 350% 350%;
		background-repeat: repeat 0 0;
		animation: gradient linear infinite 5s;
	}
	.pipeTop::after {
		content: '';
		position: absolute;
		top: calc(100% - (2 * 1vh));
		left: -0.5vw;
		height: 2vh;
		width: 6vw;
		border-radius: 0.6vh;
		border-bottom: solid 0.7vh rgba(0, 0, 0, 0.4);
		box-shadow: 0 0.4vh 0.05vh rgba(0, 0, 0, 0.5);
		border-radius: 1vh;
		background: linear-gradient(
			90deg,
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 154, 0, 1) 7%,
			rgba(208, 222, 33, 1) 15%,
			rgba(79, 220, 74, 1) 25%,
			rgba(63, 218, 216, 1) 30%,
			rgba(47, 201, 226, 1) 40%,
			rgba(28, 127, 238, 1) 47%,
			rgba(95, 21, 242, 1) 55%,
			rgba(186, 12, 248, 1) 62%,
			rgba(251, 7, 217, 1) 70%,
			rgba(255, 0, 0, 1) 78%,
			rgba(255, 154, 0, 1) 85%,
			rgba(208, 222, 33, 1) 95%,
			rgba(63, 218, 216, 1) 100%
		);
		background-size: 350% 350%;
		background-repeat: repeat 0 0;
		animation: gradient linear infinite 5s;
	}
</style>
