<template>
	<div id="app">
		<PageHeader />
		<router-view class="page-main" />
	</div>
</template>

<script>
import PageHeader from "@/components/PageHeader";

export default {
	name: "app",
	components: {
		PageHeader,
	},
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

.page-main {
	margin: 0 5% 4rem;
}
</style>
