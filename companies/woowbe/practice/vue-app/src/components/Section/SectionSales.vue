<template>
	<UISection
		section-name="sales"
		section-title="Points of sales"
		data-api-url="https://backend.dev.woowbe.com/api/v1/points_of_sales/public/"
		:is-filtered="true"
	/>
</template>

<script>
	import dataTest from "@/assets/data/sales/1.json";
	import UISection from "@/components/UI/Section/UISection";
	export default {
		"name": "SectionSales",
		"components": {
			UISection,
		},
		data() {
			return {
				dataTest,
			};
		},
	};
</script>
