<template>
	<div class="app">
		<PageHeader />

		<router-view />
	</div>
</template>
<script>
	import PageHeader from "@/components/Page/PageHeader";

	export default {
		"name": "App",
		"components": {
			PageHeader,
		},
	};
</script>

<style lang="scss">
	.app {
		color: $color-brand-vue-2;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}
</style>
