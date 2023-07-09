<template>
	<article>
		<details class="section__details">
			<UISectionArticleTitle
				class="section__summary"
				tag-name="summary"
				:result-value="resultValue"
				:result-index="resultIndex"
				:result-page="resultPage"
				:section-name="sectionName"
			/>
			<UISectionArticleContent :result-value="resultValue" />
		</details>
	</article>
</template>

<script>
	import globalMixins from "@/plugins/global-mixins.js";
	import UISectionArticleTitle from "@/components/UI/Section/UISectionArticleTitle";
	import UISectionArticleContent from "@/components/UI/Section/UISectionArticleContent";

	export default {
		"name": "UISectionArticle",
		"components": {
			UISectionArticleTitle,
			UISectionArticleContent,
		},
		"mixins": [
			globalMixins,
		],
		"props": {
			"resultValue": {
				"type": Object,
				"required": true,
			},
			"resultIndex": {
				"type": Number,
				"required": true,
			},
			"resultPage": {
				"type": Object,
				"required": true,
			},
			"sectionName": {
				"type": String,
				"required": true,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.section {
		text-align: left;
	}
</style>
