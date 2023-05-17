<body>
	<nav class="navbar">
		<ul class="navbar-nav">
			<li class="logo">
				<a href="/" class="nav-link">
					<span class="link-text logo-text">Gamebox</span>
					<img class="logoImg" src="images/Navbar/double-arrow.png" alt="" />
				</a>
			</li>

			<li class="nav-item">
				<a href="/" class="nav-link">
					<img src="images/Navbar/flappyBird.webp" alt="" />
					<span class="link-text">Flappy Bird</span>
				</a>
			</li>

			<li class="nav-item">
				<a href="/" class="nav-link">
					<img src="images/Navbar/Snake.webp" alt="Problem" />
					<span class="link-text">Snake</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="/SpaceInvaders" class="nav-link">
					<img src="images/Navbar/SpaceInvaders.gif" alt="Problem" />
					<span class="link-text">SpaceInvaders</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="/" class="nav-link">
					<img src="images/Navbar/Contact.gif" alt="Problem" />
					<span class="link-text">Impressum</span>
				</a>
			</li>
		</ul>
	</nav>

	<main>
		<slot />
	</main>
</body>

<style>
	:root {
		font-size: 16px;
		font-family: 'Open Sans';
		--text-primary: #b6b6b6;
		--text-secondary: #ececec;
		--bg-primary: #23232e;
		--bg-secondary: #141418;
		--transition-speed: 600ms;
	}

	body {
		color: black;
		background-color: white;
		margin: 0;
		padding: 0;
	}

	main {
		margin-left: 5rem;
	}

	.navbar {
		position: fixed;
		background-color: var(--bg-primary);
		transition: width 600ms ease;
		overflow: scroll;
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
	}

	.navbar-nav {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}
	.navbar::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}

	.nav-item {
		width: 100%;
	}

	.nav-item:last-child {
		margin-top: auto;
	}

	.nav-link {
		display: flex;
		align-items: center;
		height: 5rem;
		color: var(--text-primary);
		text-decoration: none;
		filter: grayscale(100%) opacity(0.7);
		transition: var(--transition-speed);
	}

	.nav-link:hover {
		filter: grayscale(0%) opacity(1);
		background: var(--bg-secondary);
		color: var(--text-secondary);
	}

	.link-text {
		display: none;
		margin-left: 1rem;
	}

	.nav-link img {
		width: 2rem;
		min-width: 2rem;
		margin: 0 1.5rem;
	}

	.logo {
		font-weight: bold;
		text-transform: uppercase;
		margin-bottom: 1rem;
		text-align: center;
		color: var(--text-secondary);
		background: var(--bg-secondary);
		font-size: 1.5rem;
		letter-spacing: 0.3ch;
		width: 100%;
	}

	.logo img {
		transform: rotate(0deg);
		transition: var(--transition-speed);
	}

	.logo-text {
		display: inline;
		position: absolute;
		left: -999px;
		transition: var(--transition-speed);
	}

	.navbar:hover .logo img {
		transform: rotate(-180deg);
	}

	.nav-item img {
		max-height: 50px;
		max-width: 50px;
		min-width: 50px;
		margin-left: 1vh;
	}
	.nav-item:hover {
		transition: var(--transition-speed);
		transform: scale(1.08);
	}

	/* Small screens */
	@media only screen and (max-width: 600px) {
		.navbar {
			bottom: 0;
			width: 100vw;
			height: 5rem;
		}

		.logo {
			display: none;
		}

		.navbar-nav {
			flex-direction: row;
		}

		.nav-link {
			justify-content: center;
		}

		main {
			margin: 0;
		}
	}

	/* Large screens */
	@media only screen and (min-width: 600px) {
		.navbar {
			top: 0;
			width: 5rem;
			height: 100vh;
		}

		.navbar:hover {
			width: 16rem;
		}

		.navbar:hover .link-text {
			display: inline;
		}

		.navbar:hover .logo img {
			margin-left: 11rem;
		}

		.navbar:hover .logo-text {
			left: 0px;
			color: #df49a6;
		}
	}
</style>
