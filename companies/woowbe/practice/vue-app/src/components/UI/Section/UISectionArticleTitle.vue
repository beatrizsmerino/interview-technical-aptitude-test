<template>
	<component :is="getPropertyHtmlTag">
		<h3 class="section__title">
			<span>#{{ getResultIndex(resultIndex, resultPage) }}</span>
			<template v-if="sectionName === 'sales'">
				<UIProperty
					:property-paragraph="false"
					property-index="icon"
					:property-name="resultValueSaved?.business?.sector?.name"
					:property-value="resultValueSaved?.business?.sector?.icon"
				/>
			</template>
			<template v-if="sectionName === 'business'">
				<UIProperty
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
			<UICheckbox
				:checkbox-name="`${sectionName}Favorite-${resultValueSaved.id}`"
				checkbox-label="Favorite"
				:checkbox-value="resultValueSaved.is_favorite"
				@update:checkbox-selected="resultValueSaved.is_favorite = $event"
			/>
		</template>
		<template v-if="sectionName === 'sales'">
			<UICheckbox
				:checkbox-name="`${sectionName}Favorite-${resultValueSaved.id}`"
				checkbox-label="Favorite"
				:checkbox-value="resultValueSaved.business.is_favorite"
				@update:checkbox-selected="resultValueSaved.business.is_favorite = $event"
			/>
		</template>
	</component>
</template>

<script>
	import UIProperty from "@/components/UI/UIProperty";
	import UICheckbox from "@/components/UI/UICheckbox";

	export default {
		"name": "UISectionArticleTitle",
		"components": {
			UIProperty,
			UICheckbox,
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
		"watch": {
			resultValue(newValue) {
				this.resultValueSaved = newValue;
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
			margin: 0 1rem 0 0;
		}
	}
</style>
