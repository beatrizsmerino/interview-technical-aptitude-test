<template>
	<div class="navigation">
		<strong>Navigation:</strong>
		<span class="navigation__buttons">
			<UIButton
				button-text="Prev"
				button-size="xs"
				:disabled="!resultPage.prev"
				@click="fetchData(resultData.previous)"
			/>
			<UIButton
				button-text="Next"
				button-size="xs"
				:disabled="!resultPage.next"
				@click="fetchData(resultData.next)"
			/>
		</span>
	</div>
</template>

<script>
	import UIButton from "@/components/UI/UIButton";

	export default {
		"name": "UISectionNavigation",
		"components": {
			UIButton,
		},
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
