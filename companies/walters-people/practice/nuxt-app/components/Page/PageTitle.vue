<template>
	<h1
		class="page-title text-3xl leading-7 font-semibold"
		v-html="title"
	/>
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
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
	}
</style>
