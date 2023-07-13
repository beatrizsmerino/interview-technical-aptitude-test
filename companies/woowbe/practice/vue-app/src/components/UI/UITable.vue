<template>
	<div :class="getPropertyClass">
		<table class="table__inner">
			<thead class="table__header">
				<tr class="table__row table__row--header">
					<th class="table__cell table__cell--header">
						#
					</th>
					<th
						v-for="tableHeader in getTableHeaderList"
						:key="tableHeader"
						class="table__cell table__cell--header"
					>
						{{ capitalizeFirstLetter(tableHeader) }}
					</th>
				</tr>
			</thead>
			<tbody class="table__body">
				<tr
					v-for="(tableRow, tableIndex) in getTableRowList"
					:key="getRowKey(tableRow, tableIndex)"
					class="table__row table__row--body"
				>
					<td class="table__cell table__cell--body">
						{{ tableIndex + 1 }}
					</td>
					<template v-for="tableHeader in getTableHeaderList">
						<td
							:key="tableHeader"
							class="table__cell table__cell--body"
						>
							<UIProperty
								:property-section="tableSection"
								:property-value="tableRow[tableHeader]"
							/>
						</td>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import UIProperty from "@/components/UI/UIProperty";

	export default {
		"name": "UITable",
		"components": {
			UIProperty,
		},
		"props": {
			"tableSection": {
				"type": String,
				"default": null,
			},
			"tableData": {
				"type": [
					Array,
					Object,
				],
				"required": true,
			},
		},
		"computed": {
			getTableHeaderList() {
				if (Array.isArray(this.tableData) && this.tableData.length > 0) {
					return Object.keys(this.tableData[0]);
				} else if (typeof this.tableData === "object" && this.tableData !== null) {
					return Object.keys(this.tableData);
				}

				return [];
			},
			getTableRowList() {
				return Array.isArray(this.tableData) ? this.tableData : [
					this.tableData,
				];
			},
			getPropertyClass() {
				return {
					"table": true,
					"table--business": this.tableSection === "business",
					"table--offers": this.tableSection === "offers",
					"table--sales": this.tableSection === "sales",
				};
			},
		},
		"methods": {
			getRowKey(row, index) {
				return Array.isArray(this.tableData) ? index : JSON.stringify(row);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.table {
		max-width: fit-content;
		overflow-x: scroll;
		border-radius: 0.5rem;
		white-space: nowrap;

		&__inner {
			border-collapse: collapse;
			border-bottom: 0.3rem solid $color-brand-2;
		}

		&__cell {
			margin: 0;
			padding: 0.2rem 0.8rem;
		}

		&__row {
			&--header {
				&:nth-child(odd) {
					background-color: $color-brand-2;
					color: $color-white;
				}
			}

			&--body {
				&:nth-child(even) {
					background-color: $color-ghost;

					&:hover {
						background-color: mix($color-white, $color-brand-1, 10%);
					}
				}

				&:nth-child(odd) {
					background-color: $color-white;

					&:hover {
						background-color: mix($color-white, $color-brand-1, 10%);
					}
				}
			}
		}
	}
</style>
