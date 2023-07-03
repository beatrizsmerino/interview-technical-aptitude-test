<template>
	<h1 class="page-title">
		{{ title }}
	</h1>
</template>

<script>
export default {
	name: "PageTitle",
	props: {
		title: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.page-title {
	text-align: center;
}
</style>
