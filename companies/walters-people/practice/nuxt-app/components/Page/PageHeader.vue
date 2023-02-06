<template>
	<el-header class="page-header">
		<LogoNuxt
			class="page-header__logo"
			logo-type="symbol"
		/>
		<PageNav />
	</el-header>
</template>

<script>
	import LogoNuxt from "@/components/Logo/LogoNuxt";
	import PageNav from "@/components/Page/PageNav";

	export default {
		"name": "PageHeader",
		"components": {
			LogoNuxt,
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
