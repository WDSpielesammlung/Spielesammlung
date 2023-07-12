<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { reduced_motion } from './reduced-motion';

	export let data: PageData;

	export let form: ActionData;

	/** Whether or not the user has won */
	$: won = data.answers.at(-1) === 'xxxxx';

	/** The index of the current guess */
	$: i = won ? -1 : data.answers.length;

	/** Whether the current guess can be submitted */
	$: submittable = data.guesses[i]?.length === 5;

	/**
	 * A map of classnames for all letters that have been guessed,
	 * used for styling the keyboard
	 */
	let classnames: Record<string, 'exact' | 'close' | 'missing'>;

	/**
	 * A map of descriptions for all letters that have been guessed,
	 * used for adding text for assistive technology (e.g. screen readers)
	 */
	let description: Record<string, string>;

	$: {
		classnames = {};
		description = {};

		data.answers.forEach((answer, i) => {
			const guess = data.guesses[i];

			for (let i = 0; i < 5; i += 1) {
				const letter = guess[i];

				if (answer[i] === 'x') {
					classnames[letter] = 'exact';
					description[letter] = 'correct';
				} else if (!classnames[letter]) {
					classnames[letter] = answer[i] === 'c' ? 'close' : 'missing';
					description[letter] = answer[i] === 'c' ? 'present' : 'absent';
				}
			}
		});
	}

	/**
	 * Modify the game state without making a trip to the server,
	 * if client-side JavaScript is enabled
	 */
	function update(event: MouseEvent) {
		const guess = data.guesses[i];
		const key = (event.target as HTMLButtonElement).getAttribute(
			'data-key'
		);

		if (key === 'backspace') {
			data.guesses[i] = guess.slice(0, -1);
			if (form?.badGuess) form.badGuess = false;
		} else if (guess.length < 5) {
			data.guesses[i] += key;
		}
	}

	/**
	 * Trigger form logic in response to a keydown event, so that
	 * desktop users can use the keyboard to play the game
	 */
	function keydown(event: KeyboardEvent) {
		if (event.metaKey) return;

		document
			.querySelector(`[data-key="${event.key}" i]`)
			?.dispatchEvent(new MouseEvent('click', { cancelable: true }));
	}
</script>

<svelte:window on:keydown={keydown} />

<body>
<div class="page">
	<div class="header">
		<h1>Wordle</h1>
	</div>

	<form
		method="POST"
		action="?/enter"
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({ update }) => {
				update({ reset: false });
			};
		}}
	>
		

		<div class="grid" class:playing={!won} class:bad-guess={form?.badGuess}>
			{#each Array.from(Array(6).keys()) as row (row)}
				{@const current = row === i}
				<h2 class="visually-hidden">Row {row + 1}</h2>
				<div class="row" class:current>
					{#each Array.from(Array(5).keys()) as column (column)}
						{@const answer = data.answers[row]?.[column]}
						{@const value = data.guesses[row]?.[column] ?? ''}
						{@const selected = current && column === data.guesses[row].length}
						{@const exact = answer === 'x'}
						{@const close = answer === 'c'}
						{@const missing = answer === '_'}
						<div class="letter" class:exact class:close class:missing class:selected>
							{value}
							<span class="visually-hidden">
								{#if exact}
									(correct)
								{:else if close}
									(present)
								{:else if missing}
									(absent)
								{:else}
									empty
								{/if}
							</span>
							<input name="guess" disabled={!current} type="hidden" {value} />
						</div>
					{/each}
				</div>
			{/each}
		</div>

		<div class="controls">
			{#if won || data.answers.length >= 6}
				{#if !won && data.answer}
					<p>the answer was "{data.answer}"</p>
				{/if}
				<button data-key="enter" class="restart selected" formaction="?/restart">
					{won ? 'you won :)' : `game over :(`} play again?
				</button>
				<div class="score-container">
					<div class="score">Your score: {data.score}</div>
				</div>
			{:else}
				<div class="keyboard">
					<button data-key="enter" class:selected={submittable} disabled={!submittable}>enter</button>

					<button
						on:click|preventDefault={update}
						data-key="backspace"
						formaction="?/update"
						name="key"
						value="backspace"
					>
						back
					</button>

					{#each ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'] as row}
						<div class="row">
							{#each row as letter}
								<button
									on:click|preventDefault={update}
									data-key={letter}
									class={classnames[letter]}
									disabled={data.guesses[i].length === 5}
									formaction="?/update"
									name="key"
									value={letter}
									aria-label="{letter} {description[letter] || ''}"
								>
									{letter}
								</button>
							{/each}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</form>

	{#if won}
		<div
			style="position: absolute; left: 50%; top: 30%"
			use:confetti={{
				particleCount: $reduced_motion ? 0 : undefined,
				force: 0.7,
				stageWidth: window.innerWidth,
				stageHeight: window.innerHeight,
				colors: ['#ff3e00', '#40b3ff', '#676778']
			}}	
		/>
		<div class="score-container">
			<div class="score">Your score: {data.score}</div>
		</div>
	{/if}
</div>
</body>

<style>
	body{
		background-color: var(--color-bg-0);
		margin: 0px;
		padding: 0px;
	}

	form {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex: 1;
		margin-top: 2rem;
		background-color: var(--color-bg-0);
	}

	.page {
		height: 100%;
		margin: 0px;
		padding: 0px;
		background-color: var(--color-bg-0);
	}

	.grid {
		--width: min(100vw, 40vh, 380px);
		max-width: var(--width);
		align-self: center;
		justify-self: center;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.grid .row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 0.2rem;
		margin: 0 0 0.2rem 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.grid.bad-guess .row.current {
			animation: wiggle 0.5s;
		}
	}

	.grid.playing .row.current {
		filter: drop-shadow(3px 3px 10px var(--color-bg-0));
	}

	.header {
    text-align: center;
    margin-top: 2rem;
	background-color: var(--color-bg-0);
	color: white;
  	}

  	.header h1 {
    font-size: 2rem;
  	}

	.letter {
		aspect-ratio: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		text-transform: lowercase;
		border: none;
		font-size: calc(0.08 * var(--width));
		border-radius: 2px;
		background: var(--color-bg-1);
		margin: 0;
		color: var(--color-text);
	}

	.letter.missing {
		background: var(--color-bg-2);
    	color: rgba(255, 255, 255, 0.5);
	}

	.letter.exact {
		background: var(--color-theme-2);
    	color: white;
	}

	.letter.close {
		background: var(--color-theme-3);
    	color: white;
	}

	.selected {
		outline: 2px solid var(--color-theme-1);
	}

	.controls {
		text-align: center;
		justify-content: center;
		height: min(18vh, 10rem);
		background-color: var(--color-bg-0);
		color: white;
	}

	.keyboard {
		--gap: 0.2rem;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		height: 100%;
	}

	.keyboard .row {
		display: flex;
		justify-content: center;
		gap: 0.2rem;
		flex: 1;
	}

	.keyboard button,
	.keyboard button:disabled {
		--size: min(8vw, 4vh, 40px);
		background-color: var(--color-bg-1);
		color: var(--color-text);
		width: var(--size);
		border: none;
		border-radius: 2px;
		font-size: calc(var(--size) * 0.5);
		margin: 0;
	}

	.keyboard button.exact {
		background: var(--color-theme-2);
		color: white;
	}

	.keyboard button.missing {
		opacity: 0.7;
	}

	.keyboard button.close {
		background: var(--color-theme-3);
		color: white;
	}

	.keyboard button:focus {
		background: var(--color-theme-1);
		color: white;
		outline: none;
	}

	.keyboard button[data-key='enter'],
	.keyboard button[data-key='backspace'] {
		position: absolute;
		bottom: 0;
		width: calc(1.5 * var(--size));
		height: calc(1 / 3 * (100% - 2 * var(--gap)));
		text-transform: uppercase;
		font-size: calc(0.3 * var(--size));
		padding-top: calc(0.15 * var(--size));
	}

	.keyboard button[data-key='enter'] {
		right: calc(50% + 3.5 * var(--size) + 0.8rem);
	}

	.keyboard button[data-key='backspace'] {
		left: calc(50% + 3.5 * var(--size) + 0.8rem);
	}

	.keyboard button[data-key='enter']:disabled {
		opacity: 0.5;
	}

	.restart {
		width: 100%;
		padding: 1rem;
		background: var(--color-bg-1);
		border-radius: 2px;
		border: none;
		color: var(--color-text);
		margin-top: 1rem;
	}

	.restart:focus,
	.restart:hover {
		background: var(--color-theme-1);
		color: white;
		outline: none;
	}

	@keyframes wiggle {
		0% {
			transform: translateX(0);
		}
		10% {
			transform: translateX(-2px);
		}
		30% {
			transform: translateX(4px);
		}
		50% {
			transform: translateX(-6px);
		}
		70% {
			transform: translateX(+4px);
		}
		90% {
			transform: translateX(-2px);
		}
		100% {
			transform: translateX(0);
		}
	}

	:root {
		--font-body: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		--font-mono: 'Fira Mono', monospace;
		--color-bg-0: #101419;
		--color-bg-1: #1c222a;
		--color-bg-2: #242b34;
		--color-theme-1: #ff6330;
		--color-theme-2: #3c943c;
		--color-theme-3: #97952b;
		--color-text: rgba(255, 255, 255, 0.9);
		--column-width: 42rem;
		--column-margin-top: 4rem;
		font-family: var(--font-body);
		color: var(--color-text);
	}

	.score-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-color: var(--color-bg-0);
	}

	.score {
		font-size: 2rem;
		font-weight: bold;
		padding: 1rem;
		background-color: var(--color-theme-1);
		color: white;
		border-radius: 2px;
	}

	h1,
	h2,
	p {
		font-weight: 400;
	}

	p {
		line-height: 1.5;
	}


	h1 {
		font-size: 2rem;
		text-align: center;
	}

	h2 {
		font-size: 1rem;
	}

	.text-column {
		display: flex;
		max-width: 48rem;
		flex: 0.6;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
	}
	
	input,
	button {
		font-size: inherit;
		font-family: inherit;
	}

	button:focus:not(:focus-visible) {
		outline: none;
	}

	@media (min-width: 720px) {
		h1 {
			font-size: 2.4rem;
		}
	}

	.visually-hidden {
		border: 0;
		clip: rect(0 0 0 0);
		height: auto;
		margin: 0;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
		white-space: nowrap;
	}
</style>



