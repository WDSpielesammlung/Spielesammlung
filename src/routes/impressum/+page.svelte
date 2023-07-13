<script>
</script>

<svelte:head>
	<title>New Page | Velzon - Svelte Admin & Dashboard Template</title>
</svelte:head>

<div class="backgroundRainbow" />
<div class=container>
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

<style>
	.backgroundRainbow {
		position: fixed; /* Festlegung der Positionierung */
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: 400% 400%;
		animation: gradient 15s ease infinite;
		z-index: -1;
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
		justify-content: center;
		align-items: center;
	}
	.heading1 {
		font-size: 2.5em;
		text-align: center;
		margin-top: 20px;
		font-family: 'Arial', sans-serif;
	}
	.heading2 {
		font-size: 1.5em;
		text-align: center;
		margin-top: 20px;
		font-family: 'Arial', sans-serif;
	}

	.normaltext {
		font-size: 1em;
		text-align: center;
		margin-top: 5px;
		font-family: 'Arial', sans-serif;
	}
</style>
