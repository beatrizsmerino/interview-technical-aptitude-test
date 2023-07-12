<template>
	<section class="section">
		<h2 class="section__title">
			{{ sectionTitle }}
		</h2>

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

		<UIMessage
			:message-text="messageText"
			:message-status="messageStatus"
		/>
	</section>
</template>

<script>
	import { saveAs } from "file-saver";
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
			"dataUrl": {
				"type": String,
				"required": true,
			},
			"dataFile": {
				"type": Object,
				"default": null,
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
				"sectorSelected": 0,
				"favoriteSelected": false,
				"messageText": "",
				"messageStatus": "",
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
			sectorSelected(newValue) {
				this.sectorSelected = newValue;
			},
			favoriteSelected(newValue) {
				this.favoriteSelected = newValue;
			},
		},
		async mounted() {
			if (this.dataFile !== null) {
				await this.setData(this.dataFile);
			} else {
				await this.fetchData(this.dataUrl);
			}
		},
		"methods": {
			// eslint-disable-next-line max-statements
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

						// await this.downloadData(data);
					} else {
						if (this.dataFile !== null) {
							const page = new URL(url).searchParams.get("page") || 1;
							const jsonFileName = `${page}.json`;
							const { "default": jsonData } = await import(`@/assets/data/${this.sectionName}/${jsonFileName}`);
							await this.setData(jsonData);
							console.warn("Data is being obtained from static files");
						}
						throw new Error(`Error in obtaining ${this.sectionTitle.toLowerCase()} data`);
					}
				} catch (error) {
					this.messageText = error.message;
					this.messageStatus = "error";
				}
			},
			async downloadData(data) {
				this.resultData = await data;
				const jsonData = JSON.stringify(this.resultData);

				const blob = new Blob([
					jsonData,
				], { "type": "text/plain;charset=utf-8" });
				saveAs(blob, `${this.resultPage.current}.json`);
			},
			async setData(data) {
				this.resultData = await data;
				await this.setResultPage(this.resultData);

				const results = this.resultData.results;
				if (results.length > 0) {
					this.sectorSelected = 0;
					this.favoriteSelected = false;

					if (this.sectionName === "business") {
						this.setBusinessFavorite(results);
					} else if (this.sectionName === "sales") {
						this.setSalesFavorite(results);
					}
				}
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
				if (this.sectorSelected !== 0 && this.favoriteSelected !== false) {
					return results.filter(result => result?.sector?.id === this.sectorSelected && result?.is_favorite === this.favoriteSelected);
				} else if (this.sectorSelected !== 0) {
					return results.filter(result => result?.sector?.id === this.sectorSelected);
				} else if (this.favoriteSelected !== false) {
					return results.filter(result => result?.is_favorite === this.favoriteSelected);
				}

				return results;
			},
			filterResultsSales(results) {
				if (this.sectorSelected !== 0 && this.favoriteSelected !== false) {
					return results.filter(result => result.business?.sector?.id === this.sectorSelected && result.business?.is_favorite === this.favoriteSelected);
				} else if (this.sectorSelected !== 0) {
					return results.filter(result => result.business?.sector?.id === this.sectorSelected);
				} else if (this.favoriteSelected !== false) {
					return results.filter(result => result.business?.is_favorite === this.favoriteSelected);
				}

				return results;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.section {
		text-align: left;

		&__title {
			margin-top: 0;
			font-size: 2rem;
			font-weight: 900;
		}
	}
</style>
