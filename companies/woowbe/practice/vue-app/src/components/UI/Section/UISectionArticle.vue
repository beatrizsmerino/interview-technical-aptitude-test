<template>
	<article>
		<details class="section__details">
			<summary class="section__summary">
				<h3 class="section__title">
					<span>#{{ getResultIndex(resultIndex, resultPage) }}</span>
					<template v-if="sectionName === 'sales' && resultValueSaved?.business?.sector">
						<img
							v-if="isIcon(resultValueSaved.business.sector.icon)"
							class="section__icon"
							:src="resultValueSaved.business.sector.icon"
							:alt="resultValueSaved.business.sector.icon"
						>
						<span>{{ resultValueSaved?.business?.name }}</span>
					</template>

					<template v-if="sectionName === 'business' && resultValueSaved?.sector">
						<img
							v-if="isIcon(resultValueSaved.sector.icon)"
							class="section__icon"
							:src="resultValueSaved.sector.icon"
							:alt="resultValueSaved.sector.icon"
						>
						<span>
							{{ resultValueSaved?.name }}
						</span>
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
								<span v-if="isEmpty(propertyValue)">
									---
								</span>
								<span
									v-else-if="isImage(propertyValue)"
									class="section__image"
								>
									<img
										:src="propertyValue"
										:alt="propertyValue"
									>
								</span>
								<span
									v-else-if="isIcon(propertyValue)"
									class="section__icon"
								>
									<img
										:src="propertyValue"
										:alt="propertyValue"
									>
								</span>
								<span
									v-else-if="isLink(propertyValue)"
									class="section__link"
								>
									<a
										:href="propertyValue"
										target="_blank"
										rel="noopener noreferrer"
									>
										{{ propertyValue }}
									</a>
								</span>
								<span v-else-if="propertyValue.length > 1">
									{{ propertyValue.slice(0, -1).join(", ") }}
									y
									{{ propertyValue[propertyValue.length - 1] }}
								</span>
								<span v-else>
									{{ propertyValue[0] }}
								</span>
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
												<p>
													<strong>{{ indexObj }}:</strong>
													<span v-if="isEmpty(itemObj)">
														---
													</span>
													<span
														v-else-if="isImage(itemObj)"
														class="section__image"
													>
														<img
															:src="itemObj"
															:alt="itemObj"
														>
													</span>
													<span
														v-else-if="isIcon(itemObj)"
														class="section__icon"
													>
														<img
															:src="itemObj"
															:alt="itemObj"
														>
													</span>
													<span
														v-else-if="isLink(itemObj)"
														class="section__link"
													>
														<a
															:href="itemObj"
															target="_blank"
															rel="noopener noreferrer"
														>
															{{ itemObj }}
														</a>
													</span>
													<span v-else>
														{{ itemObj }}
													</span>
												</p>
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
														<p>
															<strong>{{ index }}:</strong>
															<span v-if="isEmpty(item)">
																---
															</span>
															<span
																v-else-if="isImage(item)"
																class="section__image"
															>
																<img
																	:src="item"
																	:alt="item"
																>
															</span>
															<span
																v-else-if="isIcon(item)"
																class="section__icon"
															>
																<img
																	:src="item"
																	:alt="item"
																>
															</span>
															<span
																v-else-if="isLink(item)"
																class="section__link"
															>
																<a
																	:href="item"
																	target="_blank"
																	rel="noopener noreferrer"
																>
																	{{ item }}
																</a>
															</span>
															<span v-else>
																{{ item }}
															</span>
														</p>
													</li>
												</ul>
											</li>
										</ul>
									</template>
									<template v-else>
										<p>
											<strong>{{ dataIndex }}:</strong>
											<span v-if="isEmpty(dataValue)">
												---
											</span>
											<span
												v-else-if="isImage(dataValue)"
												class="section__image"
											>
												<img
													:src="dataValue"
													:alt="dataValue"
												>
											</span>
											<span
												v-else-if="isIcon(dataValue)"
												class="section__icon"
											>
												<img
													:src="dataValue"
													:alt="dataValue"
												>
											</span>
											<span
												v-else-if="isLink(dataValue)"
												class="section__link"
											>
												<a
													:href="dataValue"
													target="_blank"
													rel="noopener noreferrer"
												>
													{{ dataValue }}
												</a>
											</span>
											<span v-else>
												{{ dataValue }}
											</span>
										</p>
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
											<p>
												<strong>{{ indexObj }}:</strong>
												<span v-if="isEmpty(itemObj)">
													---
												</span>
												<span
													v-else-if="isImage(itemObj)"
													class="section__image"
												>
													<img
														:src="itemObj"
														:alt="itemObj"
													>
												</span>
												<span
													v-else-if="isIcon(itemObj)"
													class="section__icon"
												>
													<img
														:src="itemObj"
														:alt="itemObj"
													>
												</span>
												<span
													v-else-if="isLink(itemObj)"
													class="section__link"
												>
													<a
														:href="itemObj"
														target="_blank"
														rel="noopener noreferrer"
													>
														{{ itemObj }}
													</a>
												</span>
												<span v-else>
													{{ itemObj }}
												</span>
											</p>
										</li>
									</ul>
								</li>
							</ul>
						</template>
						<template v-else>
							<p>
								<strong>{{ propertyName }}:</strong>
								<span v-if="isEmpty(propertyValue)">
									---
								</span>
								<span
									v-else-if="isImage(propertyValue)"
									class="section__image"
								>
									<img
										:src="propertyValue"
										:alt="propertyValue"
									>
								</span>
								<span
									v-else-if="isIcon(propertyValue)"
									class="section__icon"
								>
									<img
										:src="propertyValue"
										:alt="propertyValue"
									>
								</span>
								<span
									v-else-if="isLink(propertyValue)"
									class="section__link"
								>
									<a
										:href="propertyValue"
										target="_blank"
										rel="noopener noreferrer"
									>
										{{ propertyValue }}
									</a>
								</span>
								<span v-else>
									{{ propertyValue }}
								</span>
							</p>
						</template>
					</template>
				</li>
			</ul>
		</details>
	</article>
</template>

<script>
	import globalMixins from "@/plugins/global-mixins.js";

	export default {
		"name": "UISectionArticle",
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

			> * {
				display: inline !important;
				vertical-align: middle;
			}

			.section {
				&__icon {
					max-width: 2rem;
				}
			}
		}

		&__image,
		&__icon {
			display: flex;
			width: 100%;

			img {
				display: flex;
				width: 100%;
			}
		}

		&__image {
			max-width: 15rem;
		}

		&__icon {
			max-width: 3rem;
		}

		p {
			margin: 0;
		}
	}
</style>
