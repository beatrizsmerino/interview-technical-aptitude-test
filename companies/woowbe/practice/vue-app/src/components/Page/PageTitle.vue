<template>
	<h1 class="page-title">
		{{ title }}
	</h1>
</template>

<script>
	export default {
		"name": "PageTitle",
		"props": {
			"title": {
				"type": String,
				"required": true,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page-title {
		margin-top: 0;
		text-align: center;
	}
</style>
