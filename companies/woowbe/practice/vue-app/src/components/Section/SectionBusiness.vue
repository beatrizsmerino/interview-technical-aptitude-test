<template>
	<UISection
		section-name="business"
		section-title="Business"
		data-url="https://backend.dev.woowbe.com/api/v1/business/public/"
		:data-file="dataStatic"
		:is-filtered="true"
	/>
</template>

<script>
	import dataStatic from "@/assets/data/business/1.json";
	import UISection from "@/components/UI/Section/UISection";
	export default {
		"name": "SectionBusiness",
		"components": {
			UISection,
		},
		data() {
			return {
				dataStatic,
			};
		},
	};
</script>
