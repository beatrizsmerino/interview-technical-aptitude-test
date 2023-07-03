<template>
	<div class="home">
		<img
			alt="Vue logo"
			src="../assets/logo.png"
		/>
		<HelloWorld :page-title="pageTitle" />
	</div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "HomeView",
	components: {
		HelloWorld,
	},
	data() {
		return {
			pageTitle: "Welcome to Your Vue.js App",
		};
	},
};
</script>
