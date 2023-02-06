<template>
	<el-header class="page-header">
		<a
			href="https://nuxtjs.org/"
			target="_blank"
		>
			<LogoNuxt
				class="page-header__logo"
				logo-type="symbol"
			/>
		</a>
		<PageNav />
	</el-header>
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
		position: relative;
		position: fixed;
		z-index: 9;
		top: 0;
		width: 100%;
		height: 6rem;

		&__logo {
			position: absolute;
			z-index: 9;
			top: 50%;
			left: 2rem;
			transform: translateY(-50%);
		}
	}
</style>
