<template>
	<div>
		<pre>{{ getProductList }}</pre>
	</div>
</template>

<script>
export default {
	name: "ProductList",
	data() {
		return {
			productList: [],
		};
	},
	computed: {
		getProductList() {
			return this.productList;
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
	},
	mounted() {
		this.fetchProductList();
	},
};
</script>

<style lang="scss" scoped></style>
