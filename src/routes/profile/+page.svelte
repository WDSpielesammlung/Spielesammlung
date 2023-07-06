<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	let tabSet: number = 0;
</script>

<main>
	<div>
		<TabGroup>
			<Tab bind:group={tabSet} name="Highscores" value={0}>
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<span>Highscores</span>
			</Tab>
			<Tab bind:group={tabSet} name="Rankings" value={1}>Friends</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					(tab panel 1 contents)
				{:else if tabSet === 1}
					(tab panel 2 contents)
				{:else if tabSet === 2}
					(tab panel 3 contents)
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</main>
