<template>
	<section class="sales">
		<h2>Points of sales</h2>

		<UIMessage :message="responseMessage" />

		<template v-if="salesData">
			<nav>
				<ul>
					<li>
						<strong>Results found:</strong>
						<span>{{ salesData.count }}</span>
					</li>
					<li>
						<strong>Current page:</strong>
						<span>{{ getResultPage(salesData.next) }}</span>
					</li>
					<li v-if="salesData.previous || salesData.next">
						<strong>Navigation:</strong>
						<button
							:disabled="!salesData.previous"
							@click="fetchData(salesData.previous)"
						>
							Prev
						</button>
						<button
							:disabled="!salesData.next"
							@click="fetchData(salesData.next)"
						>
							Next
						</button>
					</li>
					<li>
						<strong>Filters:</strong>
						<ul>
							<li>
								<label for="salesSector">
									Select a sector:
								</label>
								<select
									id="salesSector"
									v-model="salesSectorSelected"
									name="salesSector"
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
								<label for="salesFavoriteSelected">
									Select favorites:
								</label>
								<input
									id="salesFavoriteSelected"
									v-model="salesFavoriteSelected"
									type="checkbox"
								>
							</li>
						</ul>
					</li>
				</ul>
			</nav>

			<article
				v-for="(resultValue, resultIndex) in filteredResults"
				:key="resultIndex"
			>
				<details class="sales__details">
					<summary class="sales__summary">
						<h3 class="sales__title">
							<span>#{{ getResultIndex(resultIndex, salesResultPage) }}</span>
							<img
								v-if="isIcon(resultValue.business.sector.icon)"
								class="sales__icon"
								:src="resultValue.business.sector.icon"
								:alt="resultValue.business.sector.icon"
							>
							<span>{{ resultValue.business.name }}</span>
						</h3>
						<label :for="`salesFavorite-${resultValue.id}`">
							<input
								:id="`salesFavorite-${resultValue.id}`"
								v-model="resultValue.business.is_favorite"
								type="checkbox"
							>
							Favorite
						</label>
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
											class="sales__image"
										>
											<img
												:src="propertyValue"
												:alt="propertyValue"
											>
										</span>
										<span
											v-else-if="isIcon(propertyValue)"
											class="sales__icon"
										>
											<img
												:src="propertyValue"
												:alt="propertyValue"
											>
										</span>
										<span
											v-else-if="isLink(propertyValue)"
											class="sales__link"
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
																class="sales__image"
															>
																<img
																	:src="itemObj"
																	:alt="itemObj"
																>
															</span>
															<span
																v-else-if="isIcon(itemObj)"
																class="sales__icon"
															>
																<img
																	:src="itemObj"
																	:alt="itemObj"
																>
															</span>
															<span
																v-else-if="isLink(itemObj)"
																class="sales__link"
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
																		class="sales__image"
																	>
																		<img
																			:src="item"
																			:alt="item"
																		>
																	</span>
																	<span
																		v-else-if="isIcon(item)"
																		class="sales__icon"
																	>
																		<img
																			:src="item"
																			:alt="item"
																		>
																	</span>
																	<span
																		v-else-if="isLink(item)"
																		class="sales__link"
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
														class="sales__image"
													>
														<img
															:src="dataValue"
															:alt="dataValue"
														>
													</span>
													<span
														v-else-if="isIcon(dataValue)"
														class="sales__icon"
													>
														<img
															:src="dataValue"
															:alt="dataValue"
														>
													</span>
													<span
														v-else-if="isLink(dataValue)"
														class="sales__link"
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
														<span>{{ itemObj }}</span>
													</p>
												</li>
											</ul>
										</li>
									</ul>
								</template>
								<template v-else>
									<p>
										<strong>{{ propertyName }}:</strong>
										<span>{{ propertyValue }}</span>
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
		"name": "SectionSales",
		"components": {
			UIMessage,
		},
		"mixins": [
			globalMixins,
		],
		data() {
			return {
				"salesData": { "results": [] },
				"salesResultPage": 1,
				"salesSectorSelected": "0",
				"salesFavoriteSelected": false,
				"responseMessage": "",
			};
		},
		"computed": {
			...mapGetters([
				"getToken",
			]),
			getSectorList() {
				if (this.salesData.results && Array.isArray(this.salesData.results)) {
					const sectorAll = this.salesData.results.map(item => item.business.sector);
					const sectorNonDuplicated = Object.values(sectorAll.reduce((uniqueSectors, sector) => {
						if (!uniqueSectors[sector.name]) {
							uniqueSectors[sector.name] = sector;
						}

						return uniqueSectors;
					}, {}));

					return sectorNonDuplicated;
				}

				return [];
			},
			// eslint-disable-next-line complexity
			filteredResults() {
				if (this.salesSectorSelected !== "0" && this.salesFavoriteSelected !== false) {
					return this.salesData.results.filter(result => result.business.sector.id === this.salesSectorSelected && result.business.is_favorite === this.salesFavoriteSelected);
				} else if (this.salesSectorSelected !== "0") {
					return this.salesData.results.filter(result => result.business.sector.id === this.salesSectorSelected);
				} else if (this.salesFavoriteSelected !== false) {
					return this.salesData.results.filter(result => result.business.is_favorite === this.salesFavoriteSelected);
				}

				return this.salesData.results;
			},
		},
		async mounted() {
			await this.fetchData("https://backend.dev.woowbe.com/api/v1/points_of_sales/public/");
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
						throw new Error("Error in obtaining sales points");
					}
				} catch (error) {
					this.responseMessage = error.message;
				}
			},
			async setData(data) {
				this.salesData = await data;
				if (this.salesData.length > 0) {
					this.salesSectorSelected = "0";

					this.salesData.forEach(item => {
						if (!item.business.is_favorite) {
							// eslint-disable-next-line camelcase
							item.business.is_favorite = false;
						}
					});
				}
			},
			getResultPage(url) {
				let pageNumber = 1;

				try {
					if (url) {
						const params = new URLSearchParams(new URL(url).search);
						pageNumber = parseInt(params.get("page")) - 1;
						this.salesResultPage = pageNumber;
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
	.sales {
		text-align: left;

		&__summary {
			cursor: pointer;

			> * {
				display: inline-block !important;
			}
		}

		&__title {
			display: flex;
			align-items: center;
			margin: 0;

			> * {
				display: inline !important;
				vertical-align: middle;
			}

			.sales {
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
