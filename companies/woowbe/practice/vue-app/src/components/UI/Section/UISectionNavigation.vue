<template>
	<div>
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
	</div>
</template>

<script>
	export default {
		"name": "UISectionNavigation",
		"props": {
			"resultData": {
				"type": Object,
				"required": true,
			},
			"resultPage": {
				"type": Object,
				"required": true,
			},
		},
		"methods": {
			fetchData(url) {
				this.$emit("fetch-data", url);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
