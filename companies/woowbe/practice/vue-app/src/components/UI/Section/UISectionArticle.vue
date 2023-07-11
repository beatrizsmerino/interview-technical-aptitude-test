<template>
	<article>
		<details class="details">
			<UISectionArticleTitle
				class="details__summary"
				tag-name="summary"
				:result-value="resultValue"
				:result-index="resultIndex"
				:result-page="resultPage"
				:section-name="sectionName"
			/>
			<UISectionArticleContent
				class="details__content"
				:result-value="resultValue"
			/>
		</details>
	</article>
</template>

<script>
	import UISectionArticleTitle from "@/components/UI/Section/UISectionArticleTitle";
	import UISectionArticleContent from "@/components/UI/Section/UISectionArticleContent";

	export default {
		"name": "UISectionArticle",
		"components": {
			UISectionArticleTitle,
			UISectionArticleContent,
		},
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
