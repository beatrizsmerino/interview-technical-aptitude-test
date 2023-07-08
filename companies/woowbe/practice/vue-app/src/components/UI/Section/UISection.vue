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
						<strong>Pagination:</strong>
						<ul>
							<li>
								<strong>Total page:</strong>
								<span>{{ resultPage.total }}</span>
							</li>
							<li>
								<strong>Previous page:</strong>
								<span>{{ resultPage.prev }}</span>
							</li>
							<li>
								<strong>Current page:</strong>
								<span>{{ resultPage.current }}</span>
							</li>
							<li>
								<strong>Next page:</strong>
								<span>{{ resultPage.next }}</span>
							</li>
						</ul>
					</li>
					<li v-if="resultData.previous || resultData.next">
						<strong>Navigation:</strong>
						<button
							:disabled="!resultPage.prev"
							@click="fetchData(resultData.previous)"
						>
							Prev
						</button>
						<button
							:disabled="!resultPage.next"
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
									<strong>Select a sector:</strong>
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
									<strong>Select favorites:</strong>
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

			<UISectionArticle
				v-for="(resultValue, resultIndex) in filteredResults"
				:key="resultValue.id"
				:result-value="resultValue"
				:result-index="resultIndex"
				:result-page="resultPage"
				:section-name="sectionName"
			/>
		</template>
	</section>
</template>

<script>
	import { mapGetters } from "vuex";
	import UIMessage from "@/components/UI/UIMessage.vue";
	import UISectionArticle from "@/components/UI/Section/UISectionArticle";

	export default {
		"name": "UISection",
		"components": {
			UIMessage,
			UISectionArticle,
		},
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
				"resultData": null,
				"resultPage": {
					"total": null,
					"prev": null,
					"current": null,
					"next": null,
				},
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
						// eslint-disable-next-line max-lines
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
						throw new Error(`Error in obtaining ${this.sectionTitle.toLowerCase()} data`);
					}
				} catch (error) {
					this.responseMessage = error.message;
				}
			},
			async setData(data) {
				this.resultData = await data;
				await this.setResultPage(this.resultData);

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
				const sectorAll = results.filter(item => item.sector?.id && item.sector?.name).map(item => item.sector);

				const sectorNonDuplicated = this.getUniqueSectors(sectorAll) || [];

				return sectorNonDuplicated;
			},
			getSectorListSales(results) {
				const sectorAll = results.filter(item => item.business.sector?.id && item.business.sector?.name).map(item => item.business.sector);

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
			// eslint-disable-next-line complexity, max-statements
			async setResultPage(data) {
				const resultsPerPage = 10;
				const urlPrevPage = await data.previous;
				const urlNextPage = await data.next;

				this.resultPage.current = 1;
				this.resultPage.next = 2;
				this.resultPage.total = await Math.round(parseInt(data.count) / resultsPerPage);

				if (urlPrevPage === null) {
					this.resultPage.prev = null;
				} else {
					const numPrevPage = new URL(urlPrevPage).searchParams.get("page");
					this.resultPage.prev = numPrevPage ? numPrevPage : 1;
				}

				if (urlNextPage === null) {
					this.resultPage.next = null;
				} else {
					const numNextPage = new URL(urlNextPage).searchParams.get("page");
					this.resultPage.next = numNextPage ? numNextPage : this.resultPage.total;
				}

				if (this.resultPage.prev === null) {
					this.resultPage.current = 1;
				} else {
					this.resultPage.current = parseInt(this.resultPage.prev) + 1;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.section {
		text-align: left;
	}
</style>
