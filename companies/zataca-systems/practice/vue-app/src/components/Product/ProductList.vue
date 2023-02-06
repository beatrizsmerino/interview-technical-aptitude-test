<template>
	<Loader :is-loading="loader.isLoading">
		<ul class="product-list">
			<li
				v-for="product in getProductList"
				:key="product.id"
				class="product-list__item"
			>
				<ProductCard :product="product" />
			</li>
		</ul>
	</Loader>
</template>

<script>
	import Loader from "@/components/UI/Loader";
	import ProductCard from "@/components/Product/ProductCard";

	export default {
		"name": "ProductList",
		"components": {
			Loader,
			ProductCard,
		},
		"props": {
			"productFilterTitle": {
				"type": String,
				"default": "",
			},
			"productFilterUserId": {
				"type": Number,
				"default": 0,
			},
		},
		data() {
			return {
				"loader": {
					"isLoading": false,
					"timeDelay": 2000,
				},
				"productList": [],
			};
		},
		"computed": {
			getProductList() {
				let filteredList = this.productList;
				if (this.productFilterUserId !== 0) {
					filteredList = filteredList.filter(product => product.userId === this.productFilterUserId);
				}

				if (this.productFilterTitle !== "") {
					filteredList = filteredList.filter(product => product.title.includes(this.productFilterTitle));
				}

				return filteredList;
			},
			getProductListFilterByTitle() {
				return this.productList.filter(product => product.title.toLowerCase().includes(this.productFilterTitle.toLowerCase()));
			},
			getProductListFilterByUserId() {
				return this.productList.filter(product => product.userId.toString().includes(this.productFilterUserId.toString()));
			},
		},
		async mounted() {
			await this.fetchProductList();
			await this.emitProductList();
		},
		"methods": {
			async fetchProductList() {
				this.loader.isLoading = true;
				const currentThis = this;

				try {
					const response = await fetch("https://jsonplaceholder.typicode.com/posts");

					if (!response.ok) {
						throw new Error("Network response was not ok");
					}

					const data = await response.json();

					setTimeout(function() {
						currentThis.productList = data;
						currentThis.loader.isLoading = false;
					}, currentThis.loader.timeDelay);
				} catch (error) {
					console.error("There was a problem with the fetch operation:", error);

					setTimeout(function() {
						currentThis.loader.isLoading = false;
					}, currentThis.loader.timeDelay);
				}
			},
			emitProductList() {
				this.$emit("sendProductList", this.productList);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.product-list {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
		margin: 0;
		padding: 0;
		transition: all 0.5s ease-in-out;
		list-style: none;

		@include media('md') {
			flex-direction: column;
		}

		&__item {
			width: calc(32% - (0.4rem * 2));
			margin-bottom: 2rem;
			transition: all 0.5s ease-in-out;
			border-radius: 0.8rem;
			box-shadow: -0.6rem 0.8rem $color-brand-2;

			@include media('lg') {
				width: calc(49% - (0.4rem * 2));
			}

			@include media('md') {
				width: calc(100% - (0.4rem * 2));
			}

			&:nth-child(3n + 2) {
				margin-right: 2%;
				margin-left: 2%;
				border-width: 0.4rem 0.4rem 0 0;
				border-style: solid;
				border-color: mix($color-black, $color-brand-1, 15%);
				background-color: mix($color-black, $color-brand-1, 15%);

				@include media('lg') {
					margin-right: 0;
					margin-left: 0;
				}

				@include media('md') {
					margin-right: 0;
					margin-left: 0;
				}
			}

			&:nth-child(odd) {
				@include media('lg') {
					margin-right: 1%;
				}
			}

			&:nth-child(3n + 1),
			&:nth-child(3n) {
				border-width: 0.4rem 0.4rem 0 0;
				border-style: solid;
				border-color: mix($color-white, $color-brand-1, 15%);
				background-color: mix($color-white, $color-brand-1, 15%);
			}

			&:nth-last-child(-n + 3) {
				margin-bottom: 0;

				@include media('md') {
					margin-bottom: 2rem;
				}
			}
		}
	}
</style>
