<template>
	<div class="product-filter">
		<div class="product-filter__item">
			<label
				class="product-filter__label"
				for="productUserId"
			>
				Search by title:
			</label>
			<div class="product-filter__field-wrapper">
				<input
					v-model="productFilter.title"
					class="product-filter__field"
					type="text"
					@input="emitProductFilterTitle"
				>
				<span class="product-filter__icon">
					<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
				</span>
			</div>
		</div>
		<div class="product-filter__item">
			<label
				class="product-filter__label"
				for="productUserId"
			>
				User Id:
			</label>
			<div class="product-filter__field-wrapper">
				<select
					id="productUserId"
					v-model="productFilter.userId"
					class="product-filter__field product-filter__select"
					name="productUserId"
					@change="emitProductFilterUserId"
				>
					<option :value="0">
						Select one
					</option>
					<option
						v-for="userId in getUserIdList"
						:key="userId"
						:value="userId"
					>
						{{ userId }}
					</option>
				</select>
				<span class="product-filter__icon">
					<font-awesome-icon icon="fa-solid fa-chevron-down" />
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		"name": "ProductFilter",
		"props": {
			"productList": {
				"type": Array,
				"required": true,
			},
		},
		data() {
			return {
				"productFilter": {
					"title": "",
					"userId": 0,
				},
			};
		},
		"computed": {
			getUserIdList() {
				const list = this.productList.map(item => item.userId);

				return [
					...new Set(list),
				];
			},
		},
		"methods": {
			emitProductFilterTitle() {
				this.$emit("sendProductFilterTitle", this.productFilter.title);
			},
			emitProductFilterUserId() {
				this.$emit("sendProductFilterUserId", this.productFilter.userId);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.product-filter {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 2rem;

		&__item {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			transition: all 0.5s ease-in-out;

			@include media('md') {
				flex: 1;
			}

			&:not(:last-child) {
				margin-right: 2rem;

				@include media('md') {
					margin-right: 1rem;
				}
			}

			> * {
				transition: all 0.5s ease-in-out;

				@include media('md') {
					width: 100%;
				}
			}
		}

		&__label {
			font-weight: 900;
		}

		&__field {
			min-width: 5rem;
			min-height: 1rem;
			margin: 0;
			padding: 0.5rem 2.5rem 0.5rem 0.5rem;
			transition: all 0.5s ease-in-out;
			border: 0.15rem solid $color-brand-2;
			border-radius: 0.5rem;
			outline: none;
			box-shadow: -0.1rem 0.1rem $color-brand-2;
			appearance: none;

			@include media('md') {
				width: 100%;
			}
		}

		&__field-wrapper {
			display: flex;
			position: relative;
		}

		&__icon {
			display: flex;
			position: absolute;
			top: calc(50% - 1rem / 2);
			right: 0.8rem;
			pointer-events: none;
		}

		&__search {
			min-width: 15rem;
		}
	}
</style>
