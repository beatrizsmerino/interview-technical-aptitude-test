<template>
	<div class="navigation">
		<strong>Navigation:</strong>
		<span class="navigation__buttons">
			<button
				class="button button--xs"
				:disabled="!resultPage.prev"
				@click="fetchData(resultData.previous)"
			>
				Prev
			</button>
			<button
				class="button button--xs"
				:disabled="!resultPage.next"
				@click="fetchData(resultData.next)"
			>
				Next
			</button>
		</span>
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

<style lang="scss" scoped>
	.navigation {
		display: flex;
		align-items: center;

		&__buttons {
			display: flex;
			margin-left: 0.5rem;
			gap: 0.4rem;
		}
	}
</style>
