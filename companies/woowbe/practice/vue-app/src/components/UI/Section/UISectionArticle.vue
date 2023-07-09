<template>
	<article>
		<details class="section__details">
			<summary class="section__summary">
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
			</summary>
			<ul>
				<li
					v-for="(propertyValueLevel1, propertyNameLevel1) in resultValueSaved"
					:key="propertyNameLevel1"
				>
					<template v-if="isEmpty(propertyValueLevel1)">
						<p>
							<strong>{{ propertyNameLevel1 }}:</strong>
							<span>---</span>
						</p>
					</template>
					<template v-else>
						<template v-if="isListArray(propertyValueLevel1)">
							<p>
								<strong>{{ propertyNameLevel1 }}:</strong>
								<UISectionProperty
									:property-name="propertyNameLevel1"
									:property-value="propertyValueLevel1"
								/>
							</p>
						</template>
						<template v-else-if="isListObject(propertyValueLevel1)">
							<strong>{{ propertyNameLevel1 }}:</strong>
							<ul>
								<li
									v-for="(propertyValueLevel2, propertyNameLevel2) in propertyValueLevel1"
									:key="propertyNameLevel2"
								>
									<template v-if="isListObject(propertyValueLevel2)">
										<strong>{{ propertyNameLevel2 }}:</strong>
										<ul>
											<li
												v-for="(propertyValueLevel3, propertyNameLevel3) in propertyValueLevel2"
												:key="propertyNameLevel3"
											>
												<UISectionProperty
													:property-name="propertyNameLevel3"
													:property-value="propertyValueLevel3"
												/>
											</li>
										</ul>
									</template>
									<template v-else-if="isListArrayObject(propertyValueLevel2)">
										<strong>{{ propertyNameLevel2 }}:</strong>
										<ul>
											<li
												v-for="(propertyValueLevel3, propertyNameLevel3) in propertyValueLevel2"
												:key="propertyNameLevel3"
											>
												<strong>#{{ propertyNameLevel3 }}:</strong>
												<ul>
													<li
														v-for="(propertyValueLevel4, propertyNameLevel4) in propertyValueLevel3"
														:key="propertyNameLevel4"
													>
														<UISectionProperty
															:property-name="propertyNameLevel4"
															:property-value="propertyValueLevel4"
														/>
													</li>
												</ul>
											</li>
										</ul>
									</template>
									<template v-else>
										<UISectionProperty
											:property-name="propertyNameLevel2"
											:property-value="propertyValueLevel2"
										/>
									</template>
								</li>
							</ul>
						</template>
						<template v-else-if="isListArrayObject(propertyValueLevel1)">
							<strong>{{ propertyNameLevel1 }}:</strong>
							<ul>
								<li
									v-for="(propertyValueLevel2, propertyNameLevel2) in propertyValueLevel1"
									:key="propertyNameLevel2"
								>
									<strong>#{{ propertyNameLevel2 }}:</strong>
									<ul>
										<li
											v-for="(propertyValueLevel3, propertyNameLevel3) in propertyValueLevel2"
											:key="propertyNameLevel3"
										>
											<UISectionProperty
												:property-name="propertyNameLevel3"
												:property-value="propertyValueLevel3"
											/>
										</li>
									</ul>
								</li>
							</ul>
						</template>
						<template v-else>
							<UISectionProperty
								:property-name="propertyNameLevel1"
								:property-value="propertyValueLevel1"
							/>
						</template>
					</template>
				</li>
			</ul>
		</details>
	</article>
</template>

<script>
	import globalMixins from "@/plugins/global-mixins.js";
	import UISectionProperty from "@/components/UI/Section/UISectionProperty";

	export default {
		"name": "UISectionArticle",
		"components": {
			UISectionProperty,
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
		data() {
			return {
				"resultValueSaved": this.resultValue,
			};
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
		text-align: left;

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
