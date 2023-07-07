<template>
	<UISection
		section-name="sales"
		section-title="Points of sales"
		url-data="https://backend.dev.woowbe.com/api/v1/points_of_sales/public/"
		:is-filtered="true"
	/>
</template>

<script>
	import UISection from "@/components/UI/UISection";
	export default {
		"name": "SectionSales",
		"components": {
			UISection,
		},
	};
</script>
