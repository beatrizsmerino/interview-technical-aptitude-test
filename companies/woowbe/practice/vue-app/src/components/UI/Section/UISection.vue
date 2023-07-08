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
						<UISectionPagination :result-page="resultPage" />
					</li>
					<li v-if="resultData.previous || resultData.next">
						<UISectionNavigation
							:result-data="resultData"
							:result-page="resultPage"
							@fetch-data="fetchData"
						/>
					</li>
					<li v-if="isFiltered">
						<UISectionFilter
							:section-name="sectionName"
							:is-filtered="isFiltered"
							:sector-selected="sectorSelected"
							:favorite-selected="favoriteSelected"
							:result-data="resultData"
							:result-page="resultPage"
							@update:sector-selected="sectorSelected = $event"
							@update:favorite-selected="favoriteSelected = $event"
						/>
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
	import UISectionPagination from "@/components/UI/Section/UISectionPagination";
	import UISectionNavigation from "@/components/UI/Section/UISectionNavigation";
	import UISectionFilter from "@/components/UI/Section/UISectionFilter";

	export default {
		"name": "UISection",
		"components": {
			UIMessage,
			UISectionArticle,
			UISectionPagination,
			UISectionNavigation,
			UISectionFilter,
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
		"watch": {
			sectorSelected(newSectorSelected) {
				this.sectorSelected = newSectorSelected;
			},
			favoriteSelected(newFavoriteSelected) {
				this.favoriteSelected = newFavoriteSelected;
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
			async setResultPage(data) {
				const resultsPerPage = 10;
				const urlPrevPage = await data.previous;
				const urlNextPage = await data.next;
				const count = parseInt(data.count);

				this.resultPage.current = 1;
				this.resultPage.next = 2;
				this.resultPage.total = Math.round(count / resultsPerPage);
				this.resultPage.prev = urlPrevPage ? new URL(urlPrevPage).searchParams.get("page") || 1 : null;
				this.resultPage.next = urlNextPage ? new URL(urlNextPage).searchParams.get("page") || this.resultPage.total : null;
				this.resultPage.current = this.resultPage.prev ? parseInt(this.resultPage.prev) + 1 : 1;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.section {
		text-align: left;
	}
</style>
