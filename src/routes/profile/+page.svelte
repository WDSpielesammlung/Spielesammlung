<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	export let data;
	let tabSet: number = 0;
</script>

<main>
	<div class="grid grid-rows-2">
		<div>
			<p>userdata</p>
		</div>
		<div>
			<TabGroup>
				<Tab class="font-bold" bind:group={tabSet} name="Highscores" value={0}>
					<span>FlappyBird</span>
				</Tab>
				<Tab class="font-bold" bind:group={tabSet} name="Spaceinvaders" value={1}>
					<span class="">Space Invaders</span>
				</Tab>
				<Tab class="font-bold" bind:group={tabSet} name="snake" value={2}>
					<span class="">Snake</span>
				</Tab>
				<Tab class="font-bold" bind:group={tabSet} name="wordle" value={3}>
					<span class="">Wordle</span>
				</Tab>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					{#if tabSet === 0}
						(tab panel 1 contents)
					{:else if tabSet === 1}
						{#if data.spaceinvaders}
							<Table source={data.spaceinvaders} />
						{/if}
					{:else if tabSet === 2}
						{#if data.snake}
							<Table source={data.snake} />
						{/if}
					{:else if tabSet === 3}
						{#if data.spaceinvaders}
							<Table source={data.spaceinvaders} />
						{/if}
					{/if}
				</svelte:fragment>
			</TabGroup>
		</div>
	</div>
</main>
