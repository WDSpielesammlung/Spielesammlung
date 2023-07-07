<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	let tabSet: number = 0;
</script>

<main>
	<div class="grid lg:grid-cols-2 lg:grid-rows-none grid-rows-2">
		<div>
			<p>userdata</p>
		</div>
		<div class="bg-white">
			<TabGroup>
				<Tab class="font-bold" bind:group={tabSet} name="Highscores" value={0}>
					<svelte:fragment slot="lead">
						<img class="static-image h-20 w-20" src="/images/Navbar/FlappyBirdStatic.png" alt="" />
					</svelte:fragment>
					<span>Flappybird</span>
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
	</div>
</main>
