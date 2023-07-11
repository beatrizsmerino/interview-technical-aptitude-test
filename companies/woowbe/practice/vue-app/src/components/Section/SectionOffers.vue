<template>
	<UISection
		section-name="offers"
		section-title="Offers"
		data-api-url="https://backend.dev.woowbe.com/api/v1/offers/public/"
		:is-filtered="false"
	/>
</template>

<script>
	import dataTest from "@/assets/data/offers/1.json";
	import UISection from "@/components/UI/Section/UISection";
	export default {
		"name": "SectionOffers",
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
