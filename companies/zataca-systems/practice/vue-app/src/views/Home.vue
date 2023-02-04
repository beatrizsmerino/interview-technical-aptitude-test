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
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "Home",
	components: {
		HelloWorld,
	},
	data() {
		return {
			pageTitle: `Welcome to Your<br><span class="page-title__highlight">Vue.js App</span>`,
		};
	},
};
</script>

<style lang="scss">
.home {
	text-align: center;
}
</style>
