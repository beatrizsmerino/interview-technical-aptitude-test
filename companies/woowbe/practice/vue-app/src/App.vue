<template>
	<div class="app page__wrapper">
		<div class="page__content">
			<PageHeader />
			<router-view />
		</div>
		<PageFooter />
	</div>
</template>
<script>
	import PageHeader from "@/components/Page/PageHeader";
	import PageFooter from "@/components/Page/PageFooter";

	export default {
		"name": "App",
		"components": {
			PageHeader,
			PageFooter,
		},
	};
</script>

<style lang="scss">
	// PARTIALS SASS
	// =================================================
	// Pattern 7-1
	// https://sass-guidelin.es/#the-7-1-pattern
	// 1. ABSTRACTS (settings that not generates code)
	// 2. BASE (standard styles for commonly used HTML elements)
	// 3. COMPONENTS (reusables micro modules of the widgets)
	// 4. LAYOUTS (global wireframe with the main parts)
	// 5. PAGES (styles for each page)
	// 6. THEMES (change the state of colors dark or light)
	// 7. VENDORS (external css code of the libraries and frameworks)

	// BASE
	//----------------------------------------------------------------------
	@import "./assets/scss/base/base-reset";

	body {
		margin: 0;
	}

	.app {
		color: $color-brand-vue-2;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	.page {
		&__wrapper {
			display: flex;
			flex-direction: column;
			min-height: 100vh;
		}

		&__content {
			flex-grow: 1;
		}
	}
</style>
