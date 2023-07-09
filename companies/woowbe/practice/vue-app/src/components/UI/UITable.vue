<template>
	<div>
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th
						v-for="tableHeader in getTableHeaderList"
						:key="tableHeader"
					>
						{{ capitalizeFirstLetter(tableHeader) }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(tableRow, tableIndex) in tableData"
					:key="tableIndex"
				>
					<td>{{ tableIndex + 1 }}</td>
					<td
						v-for="(tableCellValue, tableCellName) in tableRow"
						:key="tableCellName"
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

<style lang="scss" scoped></style>
