<template>
	<div id="app">
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
	#app {
		color: #2c3e50;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}
</style>
