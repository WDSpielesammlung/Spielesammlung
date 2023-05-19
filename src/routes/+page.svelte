<body>
	<div class="container">
		<div class="left-column">
			<div class="field">
				<span>Feld 1</span><br />
				<span>Lorem ipsum dolor sit amet.</span>
			</div>
			<div class="field">
				<span>Feld 2</span><br />
				<span>Lorem ipsum dolor sit amet.</span>
			</div>
			<div class="field">
				<span>Feld 3</span><br />
				<span>Lorem ipsum dolor sit amet.</span>
			</div>
		</div>
		<div class="right-column">
			<button class="field field-4">
				<span>Feld 4</span><br />
				<span>Lorem ipsum dolor sit amet.</span>
			</button>
		</div>
		<div class="field field-5">
			<span>Feld 5</span><br />
			<span>Lorem ipsum dolor sit amet.</span>
		</div>
	</div>
</body>

<style>
	body {
		margin: 0;
		padding: 0;
		font-family: Arial, sans-serif;
	}
	.container {
		display: flex;
		height: 100vh;
		flex-wrap: wrap;
	}
	.left-column {
		width: 66.66%;
		background-color: #f2f2f2;
		padding: 20px;
		display: flex;
		flex-direction: column;
		order: 1;
		height: 100%;
	}
	.right-column {
		width: 33.33%;
		background-color: #e0e0e0;
		padding: 20px;
		order: 2;
		height: 100%;
	}
	.field {
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.field-5 {
		display: none;
	}
	.field-2:focus ~ .field-5 {
		display: block;
	}
	.field-4:focus {
		display: none;
	}

	@media (max-width: 600px) {
		.container {
			flex-direction: column;
		}
		.left-column,
		.right-column {
			width: 100%;
			order: 0;
		}
		.left-column {
			height: auto;
		}
		.field-4 {
			margin-top: 10px;
		}
		.field {
			height: auto;
		}
	}
</style>
