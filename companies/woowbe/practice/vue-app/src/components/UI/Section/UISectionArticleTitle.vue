<template>
	<component :is="getPropertyHtmlTag">
		<h3 class="section__title">
			<span>#{{ getResultIndex(resultIndex, resultPage) }}</span>
			<template v-if="sectionName === 'sales'">
				<UISectionProperty
					:property-paragraph="false"
					property-index="icon"
					:property-name="resultValueSaved?.business?.sector?.name"
					:property-value="resultValueSaved?.business?.sector?.icon"
				/>
			</template>
			<template v-if="sectionName === 'business'">
				<UISectionProperty
					:property-paragraph="false"
					property-index="icon"
					:property-name="resultValueSaved?.name"
					:property-value="resultValueSaved?.sector?.icon"
				/>
			</template>
			<span v-else>
				{{ resultValueSaved?.name }}
			</span>
		</h3>
		<template v-if="sectionName === 'business'">
			<label :for="`${sectionName}Favorite-${resultValueSaved.id}`">
				<input
					:id="`${sectionName}Favorite-${resultValueSaved.id}`"
					v-model="resultValueSaved.is_favorite"
					type="checkbox"
				>
				Favorite
			</label>
		</template>
		<template v-if="sectionName === 'sales'">
			<label :for="`${sectionName}Favorite-${resultValueSaved.id}`">
				<input
					:id="`${sectionName}Favorite-${resultValueSaved.id}`"
					v-model="resultValueSaved.business.is_favorite"
					type="checkbox"
				>
				Favorite
			</label>
		</template>
	</component>
</template>

<script>
	import UISectionProperty from "@/components/UI/Section/UISectionProperty";

	export default {
		"name": "UISectionArticleTitle",
		"components": {
			UISectionProperty,
		},
		"props": {
			"tagName": {
				"type": String,
				"required": true,
			},
			"sectionName": {
				"type": String,
				"required": true,
			},
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
		},
		data() {
			return {
				"resultValueSaved": this.resultValue,
			};
		},
		"computed": {
			getPropertyHtmlTag() {
				return this.tagName;
			},
		},
		"methods": {
			getResultIndex(index, page) {
				const currentPage = page.current - 1;
				const resultsPerPage = 10;
				const indexCounter = index + 1;
				const firstPageIndex = currentPage * resultsPerPage;
				const resultIndex = (firstPageIndex + indexCounter).toString().padStart(2, "0");

				return resultIndex;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.section {
		&__summary {
			cursor: pointer;

			> * {
				display: inline-block !important;
			}
		}

		&__title {
			margin: 0;
		}
	}
</style>
