<template>
	<button
		:class="getButtonClass"
		:disabled="disabled"
		@click="handleClick"
	>
		{{ buttonText }}
	</button>
</template>

<script>
	export default {
		"name": "UIButton",
		"props": {
			"buttonSection": {
				"type": String,
				"default": null,
			},
			"buttonText": {
				"type": String,
				"required": true,
			},
			"buttonSize": {
				"type": String,
				"default": "",
			},
			"disabled": {
				"type": Boolean,
				"default": false,
			},
		},
		"computed": {
			getButtonClass() {
				return {
					"button": true,
					"button--xs": this.buttonSize === "xs",
					"button--business": this.buttonSection === "business",
					"button--offers": this.buttonSection === "offers",
					"button--sales": this.buttonSection === "sales",
				};
			},
		},
		"methods": {
			handleClick() {
				this.$emit("click");
			},
		},
	};
</script>

<style lang="scss" scoped>
	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.8rem 2rem;
		transition: box-shadow 0.2s;
		transition: transform 0.2s;
		border: 0.2rem solid transparent;
		border-radius: 0.5rem;
		outline: none;
		background-color: $color-brand-2;
		box-shadow: 0 0 0 rgba($color-black, 0.2);
		color: $color-white;
		font-size: 1.2rem;
		font-weight: bold;
		font-weight: 700;
		text-align: center;
		text-decoration: none;
		cursor: pointer;

		&:hover {
			background-color: mix($color-black, $color-brand-2, 15%);
		}

		&:active {
			transform: translateY(0.1rem);
			box-shadow: inset 0 0.3rem 0.5rem rgba($color-black, 0.2);
		}

		&:disabled {
			background-color: mix($color-white, $color-brand-2, 50%);
			pointer-events: none;
		}

		&--xs {
			padding: 0.2rem 0.5rem;
			border-radius: 0.2rem;
			font-size: 0.9rem;
		}
	}
</style>
