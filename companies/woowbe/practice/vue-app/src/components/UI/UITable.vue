<template>
	<div class="table__wrapper">
		<table class="table">
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
					v-for="(tableRow, tableIndex) in tableData"
					:key="tableIndex"
					class="table__row table__row--body"
				>
					<td class="table__cell table__cell--body">
						{{ tableIndex + 1 }}
					</td>
					<td
						v-for="(tableCellValue, tableCellName) in tableRow"
						:key="tableCellName"
						class="table__cell table__cell--body"
					>
						{{ tableCellValue || "---" }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		"name": "UITable",
		"props": {
			"tableData": {
				"type": Array,
				"required": true,
			},
		},
		"computed": {
			getTableHeaderList() {
				if (this.tableData.length === 0) {
					return [];
				}

				return Object.keys(this.tableData[0]);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.table {
		border-collapse: collapse;

		&__wrapper {
			max-width: fit-content;
			overflow-x: scroll;
			border-radius: 0.5rem;
			white-space: nowrap;
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
						color: $color-white;
					}
				}

				&:nth-child(odd) {
					background-color: $color-light;

					&:hover {
						background-color: mix($color-white, $color-brand-1, 10%);
						color: $color-white;
					}
				}
			}
		}
	}
</style>
