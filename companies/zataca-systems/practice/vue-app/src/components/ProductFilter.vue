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
					class="product-filter__field"
					type="text"
					v-model="productFilter.title"
					@input="emitProductFilterTitle"
				/>
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
					class="product-filter__field product-filter__select"
					name="productUserId"
					id="productUserId"
					v-model="productFilter.userId"
					@change="emitProductFilterUserId"
				>
					<option :value="0">Select one</option>
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
	name: "ProductFilter",
	props: {
		productList: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			productFilter: {
				title: "",
				userId: 0,
			},
		};
	},
	computed: {
		getUserIdList() {
			const list = this.productList.map(item => item.userId);

			return [...new Set(list)];
		},
	},
	methods: {
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
	margin-bottom: 2rem;
	display: flex;
	justify-content: flex-end;

	&__item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		&:not(:last-child) {
			margin-right: 2rem;
		}
	}

	&__label {
		font-weight: 900;
	}

	&__field {
		margin: 0;
		appearance: none;
		outline: none;
		min-width: 5rem;
		min-height: 1rem;
		padding: 0.5rem 2rem 0.5rem 0.5rem;
		border: 0.15rem solid #2c3e50;
		border-radius: 0.5rem;
		box-shadow: -0.1rem 0.1rem #2c3e50;
	}

	&__field-wrapper {
		position: relative;
	}

	&__icon {
		display: flex;
		position: absolute;
		right: 0.5rem;
		top: calc(50% - 1rem / 2);
		pointer-events: none;
	}

	&__search {
		width: 15rem;
	}

	&__select {
	}
}
</style>
