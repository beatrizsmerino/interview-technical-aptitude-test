<template>
	<UISection
		section-name="business"
		section-title="Business"
		data-api-url="https://backend.dev.woowbe.com/api/v1/business/public/"
		:data-file-test="dataTest"
		:is-filtered="true"
	/>
</template>

<script>
	import dataTest from "@/assets/data/business.json";
	import UISection from "@/components/UI/Section/UISection";
	export default {
		"name": "SectionBusiness",
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
