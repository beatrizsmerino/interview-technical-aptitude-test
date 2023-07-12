<template>
	<UISection
		section-name="offers"
		section-title="Offers"
		:data-url="dataDynamic"
		:data-file="dataStatic"
		:is-filtered="false"
	/>
</template>

<script>
	import dataStatic from "@/assets/data/offers/1.json";
	import UISection from "@/components/UI/Section/UISection";
	export default {
		"name": "SectionOffers",
		"components": {
			UISection,
		},
		data() {
			return {
				"dataDynamic": "https://backend.dev.woowbe.com/api/v1/offers/public/",
				dataStatic,
			};
		},
	};
</script>
