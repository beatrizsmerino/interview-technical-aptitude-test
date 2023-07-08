<template>
	<article>
		<details class="section__details">
			<summary class="section__summary">
				<h3 class="section__title">
					<span>#{{ getResultIndex(resultIndex, resultPage) }}</span>
					<template v-if="sectionName === 'sales'">
						<UISectionProperty
							:property-paragraph="false"
							:property-key="resultValueSaved?.business?.sector?.name"
							:property-value="resultValueSaved?.business?.sector?.icon"
						/>
					</template>
					<template v-if="sectionName === 'business'">
						<UISectionProperty
							:property-paragraph="false"
							:property-key="resultValueSaved?.name"
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
					v-for="(propertyValue, propertyName) in resultValueSaved"
					:key="propertyName"
				>
					<template v-if="isEmpty(propertyValue)">
						<p>
							<strong>{{ propertyName }}:</strong>
							<span>---</span>
						</p>
					</template>
					<template v-else>
						<template v-if="isListArray(propertyValue)">
							<p>
								<strong>{{ propertyName }}:</strong>
								<UISectionProperty
									:property-key="propertyName"
									:property-value="propertyValue"
								/>
							</p>
						</template>
						<template v-else-if="isListObject(propertyValue)">
							<strong>{{ propertyName }}:</strong>
							<ul>
								<li
									v-for="(dataValue, dataIndex) in propertyValue"
									:key="dataIndex"
								>
									<template v-if="isListObject(dataValue)">
										<strong>{{ dataIndex }}:</strong>
										<ul>
											<li
												v-for="(itemObj, indexObj) in dataValue"
												:key="indexObj"
											>
												<UISectionProperty
													:property-key="indexObj"
													:property-value="itemObj"
												/>
											</li>
										</ul>
									</template>
									<template v-else-if="isListArrayObject(dataValue)">
										<strong>{{ dataIndex }}:</strong>
										<ul>
											<li
												v-for="(itemObj, indexObj) in dataValue"
												:key="indexObj"
											>
												<strong>#{{ indexObj }}:</strong>
												<ul>
													<li
														v-for="(item, index) in itemObj"
														:key="index"
													>
														<UISectionProperty
															:property-key="index"
															:property-value="item"
														/>
													</li>
												</ul>
											</li>
										</ul>
									</template>
									<template v-else>
										<UISectionProperty
											:property-key="dataIndex"
											:property-value="dataValue"
										/>
									</template>
								</li>
							</ul>
						</template>
						<template v-else-if="isListArrayObject(propertyValue)">
							<strong>{{ propertyName }}:</strong>
							<ul>
								<li
									v-for="(dataValue, dataIndex) in propertyValue"
									:key="dataIndex"
								>
									<strong>#{{ dataIndex }}:</strong>
									<ul>
										<li
											v-for="(itemObj, indexObj) in dataValue"
											:key="indexObj"
										>
											<UISectionProperty
												:property-key="indexObj"
												:property-value="itemObj"
											/>
										</li>
									</ul>
								</li>
							</ul>
						</template>
						<template v-else>
							<UISectionProperty
								:property-key="propertyName"
								:property-value="propertyValue"
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
