<template>
	<div class="products">
		<PageTitle :title="pageTitle" />
		<section>
			<ProductFilter
				:product-list="getProductList"
				@sendProductFilterTitle="setProductFilterTitle"
				@sendProductFilterUserId="setProductFilterUserId"
			/>
			<ProductList
				:product-filter-title="productFilter.title"
				:product-filter-user-id="productFilter.userId"
				@sendProductList="setProductList"
			/>
		</section>
	</div>
</template>

<script>
	import PageTitle from "@/components/Page/PageTitle";
	import ProductFilter from "@/components/Product/ProductFilter";
	import ProductList from "@/components/Product/ProductList";

	export default {
		"name": "Products",
		"components": {
			PageTitle,
			ProductFilter,
			ProductList,
		},
		data() {
			return {
				"pageTitle": `This is an <span class="page-title__highlight">${this.$route.name}</span> page`,
				"productList": [],
				"productFilter": {
					"title": "",
					"userId": 0,
				},
			};
		},
		"computed": {
			getProductList() {
				return this.productList;
			},
		},
		"methods": {
			setProductList(data) {
				this.productList = data;
			},
			setProductFilterTitle(data) {
				this.productFilter.title = data;
			},
			setProductFilterUserId(data) {
				this.productFilter.userId = data;
			},
		},
	};
</script>
