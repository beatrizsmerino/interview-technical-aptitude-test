<template>
	<div class="loader">
		<div v-if="isLoading">
			<div class="loader__overlay" />
			<p class="loader__text">
				Loading...
			</p>
		</div>
		<div v-else>
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		"name": "Loader",
		"props": {
			"isLoading": {
				"type": Boolean,
				"required": true,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.loader {
		&__overlay {
			position: absolute;
			z-index: 99;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			transition: all 0.5s ease-in-out;
			background-color: rgba($color-white, 0.5);
			backdrop-filter: blur(0.05rem);
		}
	}
</style>
