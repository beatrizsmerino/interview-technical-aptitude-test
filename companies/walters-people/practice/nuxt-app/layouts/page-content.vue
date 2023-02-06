<template>
	<div class="common-layout">
		<el-container>
			<PageHeader />
			<el-main class="page-main">
				<PageTitle :title="getPageTitle" />
				<Nuxt />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import PageHeader from "@/components/Page/PageHeader";

	export default {
		"name": "PageContent",
		"components": {
			PageHeader,
		},
		"computed": {
			getPageTitle() {
				return this.formatPageTitle(this.$route.name);
			},
		},
		"methods": {
			formatPageTitle(text) {
				const title = text.replace("-", " ");
				const firstLetter = title.charAt(0);
				const firstLetterCap = firstLetter.toUpperCase();
				const remainingLetters = title.slice(1);
				const capitalizedWord = firstLetterCap + remainingLetters;

				return capitalizedWord;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page-main {
		margin-bottom: 4rem;
		padding: 6rem 2rem 0;
	}
</style>
