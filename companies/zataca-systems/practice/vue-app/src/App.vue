<template>
	<div id="app">
		<PageHeader />
		<router-view class="page-main" />
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
	#app {
		color: $color-brand-2;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.page-main {
		margin: 0 5% 4rem;
	}

	a {
		color: $color-brand-1;
		font-weight: bold;
	}
</style>
