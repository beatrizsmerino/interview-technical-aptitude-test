<template>
	<section class="section">
		<h2>{{ sectionTitle }}</h2>

		<UIMessage :message="responseMessage" />

		<template v-if="resultData">
			<nav>
				<ul>
					<li>
						<strong>Results found:</strong>
						<span>{{ resultData.count }}</span>
					</li>
					<li>
						<strong>Current page:</strong>
						<span>{{ getResultPage(resultData.next) }}</span>
					</li>
					<li v-if="resultData.previous || resultData.next">
						<strong>Navigation:</strong>
						<button
							:disabled="!resultData.previous"
							@click="fetchData(resultData.previous)"
						>
							Prev
						</button>
						<button
							:disabled="!resultData.next"
							@click="fetchData(resultData.next)"
						>
							Next
						</button>
					</li>
					<li v-if="isFiltered">
						<strong>Filters:</strong>
						<ul>
							<li>
								<label :for="`${sectionName}Sector`">
									Select a sector:
								</label>
								<select
									:id="`${sectionName}Sector`"
									v-model="sectorSelected"
									:name="`${sectionName}Sector`"
								>
									<option value="0">
										All sectors
									</option>
									<option
										v-for="sector in getSectorList"
										:key="sector.id"
										:value="sector.id"
									>
										{{ sector.name }}
									</option>
								</select>
							</li>
							<li>
								<label :for="`${sectionName}Favorite`">
									Select favorites:
								</label>
								<input
									:id="`${sectionName}Favorite`"
									v-model="favoriteSelected"
									type="checkbox"
								>
							</li>
						</ul>
					</li>
				</ul>
			</nav>

			<article
				v-for="(resultValue, resultIndex) in filteredResults"
				:key="resultValue.id"
			>
				<details class="section__details">
					<summary class="section__summary">
						<h3 class="section__title">
							<span>#{{ getResultIndex(resultIndex, resultPage) }}</span>
							<template v-if="sectionName === 'sales'">
								<img
									v-if="
										resultValue && resultValue.business && resultValue.business.sector && isIcon(resultValue.business.sector.icon)
									"
									class="section__icon"
									:src="resultValue.business.sector.icon"
									:alt="resultValue.business.sector.icon"
								>
								<span>{{ resultValue && resultValue.business && resultValue.business.name }}</span>
							</template>

							<img
								v-if="sectionName === 'business' && resultValue && resultValue.sector && isIcon(resultValue.sector.icon)"
								class="section__icon"
								:src="resultValue.sector.icon"
								:alt="resultValue.sector.icon"
							>
							<span>{{ resultValue && resultValue.name }}</span>
						</h3>
						<template v-if="sectionName === 'business'">
							<label :for="`${sectionName}Favorite-${resultValue.id}`">
								<input
									:id="`${sectionName}Favorite-${resultValue.id}`"
									v-model="resultValue.is_favorite"
									type="checkbox"
								>
								Favorite
							</label>
						</template>
						<template v-if="sectionName === 'sales'">
							<label :for="`${sectionName}Favorite-${resultValue.id}`">
								<input
									:id="`${sectionName}Favorite-${resultValue.id}`"
									v-model="resultValue.business.is_favorite"
									type="checkbox"
								>
								Favorite
							</label>
						</template>
					</summary>
					<ul>
						<li
							v-for="(propertyValue, propertyName) in resultValue"
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
	</section>
</template>

<script>
	import { mapGetters } from "vuex";
	import globalMixins from "@/plugins/global-mixins.js";
	import UIMessage from "@/components/UI/UIMessage.vue";

	export default {
		"name": "UISection",
		"components": {
			UIMessage,
		},
		"mixins": [
			globalMixins,
		],
		"props": {
			"sectionName": {
				"type": String,
				"required": true,
			},
			"sectionTitle": {
				"type": String,
				"required": true,
			},
			"urlData": {
				"type": String,
				"required": true,
			},
			"isFiltered": {
				"type": Boolean,
				"required": true,
			},
		},
		data() {
			return {
				"resultData": { "results": [] },
				"resultPage": 1,
				"sectorSelected": "0",
				"favoriteSelected": false,
				"responseMessage": "",
			};
		},
		"computed": {
			...mapGetters([
				"getToken",
			]),
			// eslint-disable-next-line complexity
			getSectorList() {
				if (this.resultData.results && Array.isArray(this.resultData.results)) {
					if (this.sectionName === "business") {
						return this.getSectorListBusiness(this.resultData.results);
					} else if (this.sectionName === "sales") {
						return this.getSectorListSales(this.resultData.results);
					}
				}

				return [];
			},
			filteredResults() {
				if (this.sectionName === "business") {
					return this.filterResultsBusiness(this.resultData.results);
				}

				if (this.sectionName === "sales") {
					return this.filterResultsSales(this.resultData.results);
				}

				return this.resultData.results;
			},
		},
		// eslint-disable-next-line max-lines
		async mounted() {
			await this.fetchData(this.urlData);
		},
		"methods": {
			async fetchData(url) {
				try {
					const response = await fetch(url, {
						"headers": {
							"Authorization": `Bearer ${this.getToken}`,
						},
					});

					if (response.ok) {
						const data = await response.json();
						await this.setData(data);
					} else {
						throw new Error(`Error in obtaining ${this.sectionTitle.toLowercase()} data`);
					}
				} catch (error) {
					this.responseMessage = error.message;
				}
			},
			async setData(data) {
				this.resultData = await data;
				const results = this.resultData.results;
				if (results.length > 0) {
					this.sectorSelected = "0";

					if (this.sectionName === "business") {
						this.setBusinessFavorite(results);
					} else if (this.sectionName === "sales") {
						this.setSalesFavorite(results);
					}
				}
			},
			setBusinessFavorite(results) {
				results.forEach(item => {
					if (!item.is_favorite) {
						// eslint-disable-next-line camelcase
						item.is_favorite = false;
					}
				});
			},
			setSalesFavorite(results) {
				results.forEach(item => {
					if (!item.business.is_favorite) {
						// eslint-disable-next-line camelcase
						item.business.is_favorite = false;
					}
				});
			},
			getSectorListBusiness(results) {
				const sectorAll = results.map(item => item.sector);
				const sectorNonDuplicated = this.getUniqueSectors(sectorAll) || [];

				return sectorNonDuplicated;
			},
			getSectorListSales(results) {
				const sectorAll = results.map(item => item.business.sector);
				const sectorNonDuplicated = this.getUniqueSectors(sectorAll) || [];

				return sectorNonDuplicated;
			},
			getUniqueSectors(sectors) {
				return Object.values(sectors.reduce((uniqueSectors, sector) => {
					if (!uniqueSectors[sector.name]) {
						uniqueSectors[sector.name] = sector;
					}

					return uniqueSectors;
				}, {}));
			},
			// eslint-disable-next-line complexity
			filterResultsBusiness(results) {
				if (this.sectorSelected !== "0" && this.favoriteSelected !== false) {
					return results.filter(result => result.sector.id === this.sectorSelected && result.is_favorite === this.favoriteSelected);
				} else if (this.sectorSelected !== "0") {
					return results.filter(result => result.sector.id === this.sectorSelected);
				} else if (this.favoriteSelected !== false) {
					return results.filter(result => result.is_favorite === this.favoriteSelected);
				}

				return results;
			},
			// eslint-disable-next-line complexity
			filterResultsSales(results) {
				if (this.sectorSelected !== "0" && this.favoriteSelected !== false) {
					return results.filter(result => result.business.sector.id === this.sectorSelected && result.business.is_favorite === this.favoriteSelected);
				} else if (this.sectorSelected !== "0") {
					return results.filter(result => result.business.sector.id === this.sectorSelected);
				} else if (this.favoriteSelected !== false) {
					return results.filter(result => result.business.is_favorite === this.favoriteSelected);
				}

				return results;
			},
			getResultPage(url) {
				let pageNumber = 1;

				try {
					if (url) {
						const params = new URLSearchParams(new URL(url).search);
						pageNumber = parseInt(params.get("page")) - 1;
						this.resultPage = pageNumber;
					}

					return pageNumber;
				} catch (error) {
					console.error("Invalid URL:", error);

					return pageNumber;
				}
			},
			getResultIndex(index, nextPage) {
				const currentPage = nextPage - 1;
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
			max-width: 20rem;
		}

		&__icon {
			max-width: 3rem;
		}
	}
</style>
