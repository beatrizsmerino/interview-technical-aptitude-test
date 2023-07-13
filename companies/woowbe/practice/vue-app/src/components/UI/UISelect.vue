<template>
	<div :class="getSelectClass">
		<label
			class="select__label"
			:for="selectName"
		>
			<strong>{{ selectLabel }}</strong>
		</label>
		<div class="select__container">
			<select
				:id="selectName"
				v-model="selectSelected"
				class="select__field"
				@change="$emit('update:select-selected', selectSelected)"
			>
				<option :value="0">
					All selected
				</option>
				<option
					v-for="option in selectOptions"
					:key="option.id"
					:value="option.id"
				>
					{{ option.name }}
				</option>
			</select>
			<div class="select__arrow" />
		</div>
	</div>
</template>

<script>
	export default {
		"name": "UISelect",
		"props": {
			"selectSection": {
				"type": String,
				"default": null,
			},
			"selectName": {
				"type": String,
				"required": true,
			},
			"selectLabel": {
				"type": String,
				"required": true,
			},
			"selectOptions": {
				"type": Array,
				"required": true,
			},
			"selectValue": {
				"type": [
					String,
					Number,
				],
				"required": true,
			},
			"selectSize": {
				"type": String,
				"default": "",
			},
		},
		data() {
			return {
				"selectSelected": this.selectValue,
			};
		},
		"computed": {
			getSelectClass() {
				return {
					"select": true,
					"select--xs": this.selectSize === "xs",
					"select--business": this.selectSection === "business",
					"select--offers": this.selectSection === "offers",
					"select--sales": this.selectSection === "sales",
				};
			},
		},
		"watch": {
			selectValue(newValue) {
				this.selectSelected = newValue;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.select {
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		&__label {
			display: flex;
			margin-right: 0.5rem;
			color: $color-silver;
			font-weight: 700;
			white-space: nowrap;
		}

		&__container {
			position: relative;
		}

		&__field {
			display: flex;
			position: relative;
			z-index: 1;
			padding: 0.5rem 2rem 0.5rem 0.8rem;
			border: 0.15rem solid $color-silver;
			border-radius: 0.5rem;
			background-color: transparent;
			color: $color-brand-2;
			font-size: 1rem;
			font-weight: 700;
			cursor: pointer;
			appearance: none;

			&::-ms-expand {
				display: none;
			}

			&:focus {
				outline: none;
			}
		}

		&__arrow {
			position: absolute;
			z-index: 1;
			top: 50%;
			right: 0.8rem;
			width: 0;
			height: 0;
			transform: translateY(calc(-50% + 0.4rem / 2));
			border-width: 0.4rem;
			border-style: solid;
			border-color: $color-silver transparent transparent transparent;
			pointer-events: none;
		}

		&--xs {
			.select {
				&__arrow {
					right: 0.5rem;
				}

				&__field {
					padding: 0.2rem 1.8rem 0.2rem 0.5rem;
					border-radius: 0.2rem;
					font-size: 0.9rem;
				}
			}
		}
	}
</style>
