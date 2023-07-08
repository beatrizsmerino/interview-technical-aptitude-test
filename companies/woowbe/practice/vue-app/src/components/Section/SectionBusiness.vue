<template>
	<UISection
		section-name="business"
		section-title="Business"
		url-data="https://backend.dev.woowbe.com/api/v1/business/public/"
		:is-filtered="true"
	/>
</template>

<script>
	import UISection from "@/components/UI/Section/UISection";
	export default {
		"name": "SectionBusiness",
		"components": {
			UISection,
		},
	};
</script>
