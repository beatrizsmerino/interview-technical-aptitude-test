<template>
	<h1
		class="page-title"
		v-html="title"
	/>
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

	:deep(.page-title__highlight) {
		font-size: 4rem;
		font-weight: 900;
		background-color: #42b983;
		background-image: linear-gradient(45deg, #2c3e50, #42b983, #f3ec78);
		background-size: 100%;
		background-repeat: repeat;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		-moz-background-clip: text;
		-moz-text-fill-color: transparent;
	}
}
</style>
