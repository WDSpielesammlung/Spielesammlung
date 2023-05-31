<main>
	<div class="w-full h-screen flex items-center justify-center">
		<div class="grid grid-cols-2 ">
			<div>
				<div class="h-full flex flex-col justify-center items-center">
					<p class="text-4xl">Register now at</p>
					<p class="text-6xl mt-4 animate-bounce" style="color: #df49a6">Gamebox</p>
				</div>
			</div>
			
			<form class="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white" action="?/register" method="post"> 
				<div>
					<label for="username" class="label block text-gray-700 text-sm font-bold mb-2">
						<span>Username</span>
						<input name="username" type="text" id="username" placeholder="Username" class="font-medium input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
					</label>
				</div>
				<div class="mt-4">
					<label for="email" class="label block text-gray-700 text-sm font-bold mb-2">
						<span>E-Mail</span>
						<input name="email" type="email" id="email" placeholder="E-Mail" class="font-medium input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> 
					</label>
				</div>
				<div class="mt-4">
					<label for="pass" class="label block text-gray-700 text-sm font-bold mb-2">
						<span>Password</span>
						<input name="password" type="password" id="pass" placeholder="Password" class="font-medium input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> 
					</label>
				</div>
				<div class="mt-4 w-full">
					<label for="passRepeat" class="label block text-gray-700 text-sm font-bold mb-2">
						<span>Repeat password</span>
						<input name="passwordRep" type="password" id="passRepeat" placeholder="repeat password" class="font-medium input shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> 
					</label>
				</div>
				<div class="mt-6">
					<button type="submit" class="btn variant-filled">Register</button>	
				</div>
			</form>
		</div>
	</div>
	</main>