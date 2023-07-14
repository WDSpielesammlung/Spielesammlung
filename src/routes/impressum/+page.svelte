<script>
</script>

<svelte:head>
	<title>New Page | Velzon - Svelte Admin & Dashboard Template</title>
</svelte:head>

<div class="backgroundRainbow" />
<div class="container">
	<div class="impressumBox">
		<h1 class="heading1">Impressum</h1>
		<h2 class="heading2">Angaben gemäß § 5 TMG</h2>
		<p class="normaltext">
			Marcel Eitel<br />
			Jenaer Straße 15<br />
			69214 Eppelheim<br />
		</p>

		<h2 class="heading2">Kontakt</h2>
		<p class="normaltext">
			Telefon: +49 176 41159248<br />
			E-Mail: marcel.eitel@sap.com
		</p>
	</div>
</div>

<style>
	.backgroundRainbow {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: 400% 400%;
		animation: gradient 15s ease infinite;
		z-index: -1;
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.impressumBox {
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 10px;
		padding: 30px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		margin-left: 20vw;
	}

	.heading1 {
		font-size: 3em;
		text-align: center;
		margin-top: 0;
		margin-bottom: 20px;
		font-family: 'Press Start 2P', cursive;
		color: #fff;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.heading2 {
		font-size: 1.8em;
		text-align: center;
		margin-top: 30px;
		margin-bottom: 10px;
		font-family: 'Press Start 2P', cursive;
		color: #fff;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.normaltext {
		font-size: 1.2em;
		text-align: center;
		margin-top: 10px;
		margin-bottom: 10px;
		font-family: 'Press Start 2P', cursive;
		color: #fff;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}
</style>
