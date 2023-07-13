<template>
	<UISection
		section-name="sales"
		section-title="Points of sales"
		:data-url="dataDynamic"
		:data-file="dataStatic"
		:is-filtered="true"
	/>
</template>

<script>
	import dataStatic from "@/assets/data/sales/1.json";
	import UISection from "@/components/UI/Section/UISection";
	export default {
		"name": "SectionSales",
		"components": {
			UISection,
		},
		data() {
			return {
				"dataDynamic": "https://backend.dev.woowbe.com/api/v1/points_of_sales/public/",
				dataStatic,
			};
		},
	};
</script>
