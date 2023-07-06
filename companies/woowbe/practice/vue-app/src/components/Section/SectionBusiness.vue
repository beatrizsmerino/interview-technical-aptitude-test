<template>
	<section class="business">
		<h2>Business</h2>

		<UIMessage :message="responseMessage" />

		<template v-if="businessData">
			<nav>
				<ul>
					<li>
						<strong>Results found:</strong>
						<span>{{ businessData.count }}</span>
					</li>
					<li>
						<strong>Current page:</strong>
						<span>{{ getResultPage(businessData.next) }}</span>
					</li>
					<li v-if="businessData.previous || businessData.next">
						<strong>Navigation:</strong>
						<button
							:disabled="!businessData.previous"
							@click="fetchData(businessData.previous)"
						>
							Prev
						</button>
						<button
							:disabled="!businessData.next"
							@click="fetchData(businessData.next)"
						>
							Next
						</button>
					</li>
					<li>
						<strong>Filters:</strong>
						<ul>
							<li>
								<label for="businessSector">
									Select a sector:
								</label>
								<select
									id="businessSector"
									v-model="businessSectorSelected"
									name="businessSector"
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
								<label for="businessFavoriteSelected">
									Select favorites:
								</label>
								<input
									id="businessFavoriteSelected"
									v-model="businessFavoriteSelected"
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
				<details class="business__details">
					<summary class="business__summary">
						<h3 class="business__title">
							<span>#{{ getResultIndex(resultIndex, businessResultPage) }}</span>
							<img
								v-if="isIcon(resultValue.sector.icon)"
								class="business__icon"
								:src="resultValue.sector.icon"
								:alt="resultValue.sector.icon"
							>
							<span>{{ resultValue.name }}</span>
						</h3>
						<label :for="`businessFavorite-${resultValue.id}`">
							<input
								:id="`businessFavorite-${resultValue.id}`"
								v-model="resultValue.is_favorite"
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
											class="business__image"
										>
											<img
												:src="propertyValue"
												:alt="propertyValue"
											>
										</span>
										<span
											v-else-if="isIcon(propertyValue)"
											class="business__icon"
										>
											<img
												:src="propertyValue"
												:alt="propertyValue"
											>
										</span>
										<span
											v-else-if="isLink(propertyValue)"
											class="business__link"
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
											<p>
												<strong>{{ dataIndex }}:</strong>
												<span v-if="isEmpty(dataValue)">
													---
												</span>
												<span
													v-else-if="isImage(dataValue)"
													class="business__image"
												>
													<img
														:src="dataValue"
														:alt="dataValue"
													>
												</span>
												<span
													v-else-if="isIcon(dataValue)"
													class="business__icon"
												>
													<img
														:src="dataValue"
														:alt="dataValue"
													>
												</span>
												<span
													v-else-if="isLink(dataValue)"
													class="business__link"
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
															class="business__image"
														>
															<img
																:src="itemObj"
																:alt="itemObj"
															>
														</span>
														<span
															v-else-if="isIcon(itemObj)"
															class="business__icon"
														>
															<img
																:src="itemObj"
																:alt="itemObj"
															>
														</span>
														<span
															v-else-if="isLink(itemObj)"
															class="business__link"
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
											class="business__image"
										>
											<img
												:src="propertyValue"
												:alt="propertyValue"
											>
										</span>
										<span
											v-else-if="isIcon(propertyValue)"
											class="business__icon"
										>
											<img
												:src="propertyValue"
												:alt="propertyValue"
											>
										</span>
										<span
											v-else-if="isLink(propertyValue)"
											class="business__link"
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
		"name": "SectionBusiness",
		"components": {
			UIMessage,
		},
		"mixins": [
			globalMixins,
		],
		data() {
			return {
				"businessData": { "results": [] },
				"businessResultPage": 1,
				"businessSectorSelected": "0",
				"businessFavoriteSelected": false,
				"responseMessage": "",
			};
		},
		"computed": {
			...mapGetters([
				"getToken",
			]),
			getSectorList() {
				if (this.businessData.results && Array.isArray(this.businessData.results)) {
					const sectorAll = this.businessData.results.map(item => item.sector);
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
				if (this.businessSectorSelected !== "0" && this.businessFavoriteSelected !== false) {
					return this.businessData.results.filter(result => result.sector.id === this.businessSectorSelected && result.is_favorite === this.businessFavoriteSelected);
				} else if (this.businessSectorSelected !== "0") {
					return this.businessData.results.filter(result => result.sector.id === this.businessSectorSelected);
				} else if (this.businessFavoriteSelected !== false) {
					return this.businessData.results.filter(result => result.is_favorite === this.businessFavoriteSelected);
				}

				return this.businessData.results;
			},
		},
		async mounted() {
			await this.fetchData("https://backend.dev.woowbe.com/api/v1/business/public/");
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
						throw new Error("Error in obtaining business data");
					}
				} catch (error) {
					this.responseMessage = error.message;
				}
			},
			async setData(data) {
				this.businessData = await data;
				if (this.businessData.results.length > 0) {
					this.businessSectorSelected = "0";

					this.businessData.results.forEach(item => {
						if (!item.is_favorite) {
							// eslint-disable-next-line camelcase
							item.is_favorite = false;
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
	.business {
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

			.business {
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
