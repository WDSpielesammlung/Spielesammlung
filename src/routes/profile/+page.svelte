<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { Table } from '@skeletonlabs/skeleton';
	import Cookies from 'js-cookie';
	import { PUBLIC_API_URL } from '$env/static/public';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { redirect } from '@sveltejs/kit';
	export let data;
	let tabSet: number = 0;
</script>

<main>
	<div class="grid grid-rows-2 justify-center">
		<div>
			<div class="grid grid-cols-3 mt-8">
				<div>
					<div class="grid grid-cols-2">
						<div>
							<label class="font-bold text-xl mr-2">Benutzername:</label>
						</div>
						<div>
							<p class="font-medium text-gray-700 text-xl">{data.username}</p>
						</div>
					</div>
					<div class="grid grid-cols-2">
						<div>
							<label class="font-bold text-xl mr-2">Email:</label>
						</div>
						<div>
							<p class="font-medium text-gray-700 text-xl">{data.email}</p>
						</div>
					</div>
				</div>
				<div>
					<div class="flex flex-col items-center">
						<form action="?/signOff" method="POST">
							<button type="submit" class="btn variant-filled">Abmelden</button>
						</form>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<form action="?/deleteAccount" method="POST">
						<button type="submit" class="btn variant-filled">Account löschen</button>
					</form>
				</div>
			</div>
		</div>
		<div class="text-3xl">
			<TabGroup justify="justify-center">
				<Tab class="font-bold" bind:group={tabSet} name="Spaceinvaders" value={0}>
					<span class="">Space Invaders</span>
				</Tab>
				<Tab class="font-bold" bind:group={tabSet} name="Highscores" value={1}>
					<span>FlappyBird</span>
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
						{#if data.spaceinvaders}
							<Table text="text-xl" source={data.spaceinvaders} />
						{/if}
					{:else if tabSet === 1}
						<Tab class="font-bold" bind:group={tabSet} name="Highscores" value={4}>
							<span>Einfach</span>
						</Tab>
						<Tab class="font-bold" bind:group={tabSet} name="Spaceinvaders" value={5}>
							<span class="">Mittel</span>
						</Tab>
						<Tab class="font-bold" bind:group={tabSet} name="snake" value={6}>
							<span class="">Schwer</span>
						</Tab>
					{:else if tabSet === 2}
						{#if data.snake}
							<Table text="text-xl" source={data.snake} />
						{/if}
					{:else if tabSet === 3}
						{#if data.spaceinvaders}
							<Table text="text-xl" source={data.wordle} />
						{/if}
					{:else if tabSet === 4}
						{#if data.spaceinvaders}
							<Table text="text-xl" source={data.easyTable} />
						{/if}
					{:else if tabSet === 5}
						{#if data.spaceinvaders}
							<Table text="text-xl" source={data.middleTable} />
						{/if}
					{:else if tabSet == 6}
						{#if data.spaceinvaders}
							<Table text="text-xl" source={data.hardTable} />
						{/if}
					{/if}
				</svelte:fragment>
			</TabGroup>
		</div>
	</div>
</main>
