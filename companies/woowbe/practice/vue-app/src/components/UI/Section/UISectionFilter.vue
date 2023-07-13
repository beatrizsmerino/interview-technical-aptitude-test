<template>
	<div>
		<strong>Filters:</strong>
		<ul>
			<li>
				<UISelect
					:select-name="`${sectionName}Sector`"
					:select-label="`Select a sector:`"
					:select-options="getSectorList"
					:select-value="sectorSelectedSaved"
					select-size="xs"
					@update:select-selected="$emit('update:sector-selected', (sectorSelectedSaved = $event))"
				/>
			</li>
			<li>
				<UICheckbox
					:checkbox-name="`${sectionName}Favorite`"
					checkbox-label="Select favorites"
					:checkbox-value="favoriteSelectedSaved"
					@update:checkbox-selected="$emit('update:favorite-selected', (favoriteSelectedSaved = $event))"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
	import UICheckbox from "@/components/UI/UICheckbox";
	import UISelect from "@/components/UI/UISelect";

	export default {
		"name": "UISectionFilter",
		"components": {
			UICheckbox,
			UISelect,
		},
		"props": {
			"sectionName": {
				"type": String,
				"required": true,
			},
			"isFiltered": {
				"type": Boolean,
				"required": true,
			},
			"sectorSelected": {
				"type": Number,
				"required": true,
			},
			"favoriteSelected": {
				"type": Boolean,
				"required": true,
			},
			"resultData": {
				"type": Object,
				"required": true,
			},
			"resultPage": {
				"type": Object,
				"required": true,
			},
		},
		data() {
			return {
				"sectorSelectedSaved": this.sectorSelected,
				"favoriteSelectedSaved": this.favoriteSelected,
			};
		},
		"computed": {
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
		},
		"watch": {
			sectorSelected(newValue) {
				this.sectorSelectedSaved = newValue;
			},
			favoriteSelected(newValue) {
				this.favoriteSelectedSaved = newValue;
			},
		},
		"methods": {
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
		},
	};
</script>

<style lang="scss" scoped></style>
