<template>
	<UISection
		section-name="offers"
		section-title="Offers"
		url-data="https://backend.dev.woowbe.com/api/v1/offers/public/"
		:is-filtered="false"
	/>
</template>

<script>
	import UISection from "@/components/UI/Section/UISection";
	export default {
		"name": "SectionOffers",
		"components": {
			UISection,
		},
	};
</script>
