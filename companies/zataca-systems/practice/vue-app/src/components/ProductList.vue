<template>
	<ul class="product-list">
		<li
			class="product-list__item"
			v-for="product in getProductList"
			:key="product.id"
		>
			<ProductCard :product="product" />
		</li>
	</ul>
</template>

<script>
import ProductCard from "@/components/ProductCard";

export default {
	name: "ProductList",
	components: {
		ProductCard,
	},
	props: {
		productFilterTitle: {
			type: String,
			default: "",
		},
		productFilterUserId: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			productList: [],
		};
	},
	computed: {
		getProductList() {
			let filteredList = this.productList;
			if (this.productFilterUserId !== 0) {
				filteredList = filteredList.filter(
					product => product.userId === this.productFilterUserId,
				);
			}

			if (this.productFilterTitle !== "") {
				filteredList = filteredList.filter(product =>
					product.title.includes(this.productFilterTitle),
				);
			}

			return filteredList;
		},
		getProductListFilterByTitle() {
			return this.productList.filter(product => {
				return product.title
					.toLowerCase()
					.includes(this.productFilterTitle.toLowerCase());
			});
		},
		getProductListFilterByUserId() {
			return this.productList.filter(product => {
				return product.userId
					.toString()
					.includes(this.productFilterUserId.toString());
			});
		},
	},
	methods: {
		async fetchProductList() {
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/posts",
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				this.productList = data;
			} catch (error) {
				console.error(
					"There was a problem with the fetch operation:",
					error,
				);
			}
		},
		emitProductList() {
			this.$emit("sendProductList", this.productList);
		},
	},
	async mounted() {
		await this.fetchProductList();
		await this.emitProductList();
	},
};
</script>

<style lang="scss" scoped>
.product-list {
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: space-between;

	&__item {
		width: calc(32% - (0.4rem * 2));
		margin-bottom: 2rem;
		border-radius: 0.8rem;
		box-shadow: -0.6rem 0.8rem #2c3e50;

		&:nth-child(3n + 2) {
			margin-left: 2%;
			margin-right: 2%;
			border-width: 0.4rem 0.4rem 0 0;
			border-style: solid;
			border-color: mix(#000000, #42b983, 15%);
			background-color: mix(#000000, #42b983, 15%);
		}

		&:nth-child(3n + 1),
		&:nth-child(3n) {
			border-width: 0.4rem 0.4rem 0 0;
			border-style: solid;
			border-color: mix(#ffffff, #42b983, 15%);
			background-color: mix(#ffffff, #42b983, 15%);
		}

		&:nth-last-child(-n + 3) {
			margin-bottom: 0;
		}
	}
}
</style>
