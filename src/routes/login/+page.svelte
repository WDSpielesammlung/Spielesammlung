<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<main>
	<div class="w-full h-screen flex items-center justify-center">
		<div class="grid lg:grid-cols-2 lg:grid-rows-none grid-rows-2">
			<div>
				<div class="h-full flex flex-col justify-center items-center">
					<p class="text-4xl">Sign in at</p>
					<p class="text-6xl mt-4 animate-bounce" style="color: #df49a6">Gamebox</p>
				</div>
			</div>
			<form class="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white" action="?/login" method="post">
				<div>
					<label for="username" class="label block text-gray-700 text-sm font-bold mb-2">
						<span>Username</span>
						<input
							value={form?.username ?? ''}
							name="username"
							type="text"
							id="username"
							placeholder="Username"
							class="font-medium input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</label>
					{#if !form?.usernameFilled && form != null}
						<div class="float-left mt-1 mb-6">
							<div class="justify-between flex items-center">
								<i class="fa-solid fa-circle-exclamation fa-lg" style="color: #ff0000;" />
								<p class="ml-2">Bitte gebe einen Usernamen an!</p>
							</div>
						</div>
					{/if}
				</div>

				<div class="mt-4">
					<label for="pass" class="label block text-gray-700 text-sm font-bold mb-2">
						<span>Password</span>
						<input
							value={form?.password ?? ''}
							name="password"
							type="password"
							id="pass"
							placeholder="Password"
							class="font-medium input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</label>
				</div>
				{#if !form?.passwordFilled && form != null}
					<div class="float-left mt-1">
						<div class="justify-between flex items-center">
							<i class="fa-solid fa-circle-exclamation fa-lg" style="color: #ff0000;" />
							<p class="ml-2">Bitte gebe ein Passwort an!</p>
						</div>
					</div>
				{/if}
				<div class="">
					<div class="mt-6 float-left">
						<button type="submit" class="btn variant-filled">Log-In</button>
					</div>
					<div class="float-right items-center m-4 mt-10">
						<p class="text-sm font-light text-gray-500 dark:text-gray-400">
							Don’t have an account yet? <a
								href="/register"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>Sign up</a
							>
						</p>
					</div>
				</div>
			</form>
		</div>
	</div>
</main>
