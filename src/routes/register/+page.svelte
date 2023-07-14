<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import type { ActionData } from './$types';
	export let form: ActionData;
	let usernameInput: string = '';
	let emailInput: string = '';

	let usernameTaken: boolean = false;
	let emailTaken: boolean = false;
	let initialStateUsername: boolean = true;
	let initialStateEmail: boolean = true;

	async function checkUsername(username: string) {
		const url = PUBLIC_API_URL + '/user/username?userName=' + username;

		try {
			const promise = await fetch(url);
			usernameTaken = await promise.json();
		} catch (err) {
			console.log(err);
		}

		if (usernameInput == '') {
			initialStateUsername = true;
		} else {
			initialStateUsername = false;
		}
	}

	async function checkEmail(email: string) {
		const url = PUBLIC_API_URL + '/user/email?email=' + email;
		if (
			email
				.toLowerCase()
				.match(
					/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
				) == null
		) {
			initialStateEmail = true;
		} else {
			try {
				const promise = await fetch(url);
				emailTaken = await promise.json();
			} catch (err) {
				console.log(err);
			}
			if (emailInput == '') {
				initialStateEmail = true;
			} else {
				initialStateEmail = false;
			}
		}
	}

	$: checkUsername(usernameInput);
	$: checkEmail(emailInput);
</script>

<main>
	<div class="w-full h-screen flex items-center justify-center">
		<div class="grid lg:grid-cols-2 lg:grid-rows-none grid-rows-2p">
			<div>
				<div class="h-full flex flex-col justify-center items-center">
					<p class="text-4xl">Register now at</p>
					<p class="text-6xl mt-4 animate-bounce" style="color: #df49a6">Gamebox</p>
				</div>
			</div>

			<form
				class="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white"
				action="?/register"
				method="post"
				novalidate
			>
				<div>
					<label for="username" class="label block text-gray-700 text-sm font-bold mb-2">
						{#if initialStateUsername}
							<span class="">Username</span>
						{:else if usernameTaken}
							<div class="flex">
								<span class="">Username</span>
								<p class="ml-1 text-red-500">already taken!</p>
							</div>
						{:else}
							<div class="flex">
								<span>Username</span>
								<i class="fa-solid fa-check pt-2 ml-2 fa-lg" style="color: #00ff04;" />
							</div>
						{/if}
						<input
							name="username"
							type="text"
							id="username"
							placeholder="Username"
							class="font-medium input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							bind:value={usernameInput}
						/>
					</label>
				</div>

				{#if !form?.usernameSet && form != null}
					<ul class="list">
						<li>
							<span>
								<i class="fa-solid fa-circle-exclamation fa-lg" style="color: #ff0000;" />
							</span>
							<span>
								<p class="ml-2">Please enter a Username!</p>
							</span>
						</li>
					</ul>
				{/if}

				<div class="mt-4">
					<label for="email" class="label block text-gray-700 text-sm font-bold mb-2">
						{#if initialStateEmail}
							<span>E-Mail</span>
						{:else if emailTaken}
							<div class="flex">
								<span>E-Mail</span>
								<p class="ml-2 text-red-500">Seems like you are already registered!</p>
							</div>
						{:else}
							<div class="flex">
								<span>E-Mail</span>
								<i class="fa-solid fa-check pt-2 ml-2 fa-lg" style="color: #00ff04;" />
							</div>
						{/if}
						<input
							name="email"
							type="email"
							id="email"
							placeholder="E-Mail"
							class="font-medium input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							bind:value={emailInput}
						/>
					</label>
				</div>

				{#if !form?.emailSet && form != null}
					<ul class="list">
						<li>
							<span>
								<i class="fa-solid fa-circle-exclamation fa-lg" style="color: #ff0000;" />
							</span>
							<span>
								<p class="ml-2">Please enter a valid E-Mail!</p>
							</span>
						</li>
					</ul>
				{/if}

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

				{#if !form?.passwordSet && form != null}
					<ul class="list">
						<li>
							<span>
								<i class="fa-solid fa-circle-exclamation fa-lg" style="color: #ff0000;" />
							</span>
							<span>
								<p class="ml-2">Please enter a password!</p>
							</span>
						</li>
					</ul>
				{/if}

				<div class="mt-4 w-full">
					<label for="passRepeat" class="label block text-gray-700 text-sm font-bold mb-2">
						<span>Repeat password</span>
						<input
							value={form?.passwordRepeat ?? ''}
							name="passwordRep"
							type="password"
							id="passRepeat"
							placeholder="repeat password"
							class="font-medium input shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</label>
				</div>

				{#if !form?.passwordRepSet && form != null}
					<ul class="list">
						<li>
							<span>
								<i class="fa-solid fa-circle-exclamation fa-lg" style="color: #ff0000;" />
							</span>
							<span>
								<p class="ml-2">Please repeat your password!</p>
							</span>
						</li>
					</ul>
				{/if}

				<div class="flow-root">
					<div class="mt-6 float-left">
						<button type="submit" class="btn variant-filled">Register</button>
					</div>
					<div class="float-right items-center m-4 mt-8 pr-6">
						<p class="text-sm font-light text-gray-500 dark:text-gray-400">
							Already registered? <a
								href="/login"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a
							>
						</p>
					</div>
				</div>
			</form>
		</div>
	</div>
</main>
