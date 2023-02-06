<template>
	<header class="page-header">
		<PageNav />
	</header>
</template>

<script>
	import PageNav from "@/components/Page/PageNav";
	export default {
		"name": "PageHeader",
		"components": {
			PageNav,
		},
	};
</script>

<style lang="scss" scoped>
	.page-header {
		padding: 30px;
	}
</style>
