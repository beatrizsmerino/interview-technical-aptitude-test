<template>
	<label
		class="checkbox"
		:for="checkboxName"
	>
		<input
			:id="checkboxName"
			v-model="checkboxSelected"
			type="checkbox"
			class="checkbox__field"
			@change="$emit('update:checkbox-selected', checkboxSelected)"
		>
		<span
			v-if="checkboxLabel"
			class="checkbox__label"
		>
			{{ checkboxLabel }}
		</span>
	</label>
</template>

<script>
	export default {
		"name": "UICheckbox",
		"props": {
			"checkboxName": {
				"type": String,
				"required": true,
			},
			"checkboxLabel": {
				"type": String,
				"default": null,
			},
			"checkboxValue": {
				"type": Boolean,
				"default": false,
			},
		},
		data() {
			return {
				"checkboxSelected": this.checkboxValue,
			};
		},
		"watch": {
			checkboxValue(newValue) {
				this.checkboxSelected = newValue;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.checkbox {
		display: flex;
		position: relative;

		&__field {
			position: absolute;
			top: 50%;
			left: 0;
			width: 1.25rem;
			height: 1.25rem;
			margin: 0;
			overflow: hidden;
			clip: rect(0 0 0 0);
			transform: translate(0, -50%) scale(1);
			white-space: nowrap;
			clip-path: inset(100%);

			&:checked {
				+ .checkbox {
					&__label {
						color: $color-brand-1;

						&:before {
							transform: translate(0, -50%) scale(1);
							border-color: $color-brand-1;
							background-color: $color-brand-1;
						}

						&:hover {
							&:before {
								transform: translate(0, -50%) scale(1.2);
							}
						}
					}
				}
			}

			&:focus {
				+ .checkbox {
					&__label {
						&:before {
							transform: translate(0, -50%) scale(1);
						}
					}
				}
			}
		}

		&__label {
			display: flex;
			position: relative;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-left: 1.5rem;
			transition: 0.15s ease;
			color: $color-silver;
			font-weight: 700;
			text-align: center;
			cursor: pointer;

			&:before {
				content: "";
				display: inline-block;
				position: absolute;
				top: 50%;
				left: 0;
				width: 1.25rem;
				height: 1.25rem;
				transform: translate(0, -50%) scale(1);
				transition: 0.25s ease;
				border: 0.15rem solid $color-silver;
				border-radius: 50%;
				background-color: transparent;
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
				background-repeat: no-repeat;
				background-position: 50% 50%;
				background-size: 1.2rem;
			}

			&:hover {
				border-color: $color-brand-1;

				&:before {
					transform: translate(0, -50%) scale(1.2);
				}
			}
		}
	}
</style>
