<template>
	<div class="app">
		<PageHeader />

		<router-view />
	</div>
</template>
<script>
	import PageHeader from "@/components/Page/PageHeader";

	export default {
		"name": "App",
		"components": {
			PageHeader,
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

	// COMPONETS
	//----------------------------------------------------------------------
	@import "./assets/scss/components/components-button";

	.app {
		color: $color-brand-vue-2;
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}
</style>
