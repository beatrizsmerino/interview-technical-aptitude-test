<template>
	<div class="home">
		<img
			alt="Vue logo"
			src="../assets/logo.png"
		/>
		<SectionWelcome :page-title="pageTitle" />
	</div>
</template>

<script>
import SectionWelcome from "@/components/Section/SectionWelcome.vue";

export default {
	name: "HomeView",
	components: {
		SectionWelcome,
	},
	data() {
		return {
			pageTitle: "Welcome to Your Vue.js App",
		};
	},
};
</script>
