<template>
	<div class="products">
		<PageTitle :title="pageTitle" />
		<ProductList />
	</div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import ProductList from "@/components/ProductList";

export default {
	name: "Products",
	components: {
		PageTitle,
		ProductList,
	},
	data() {
		return {
			pageTitle: "This is an products page",
		};
	},
};
</script>
