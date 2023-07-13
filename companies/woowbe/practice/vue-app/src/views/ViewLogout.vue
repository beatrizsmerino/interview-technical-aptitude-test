<template>
	<div class="login">
		<PageTitle :title="pageTitle" />
	</div>
</template>

<script>
	import { mapMutations } from "vuex";
	import PageTitle from "@/components/Page/PageTitle";

	export default {
		"name": "ViewLogout",
		"components": {
			PageTitle,
		},
		data() {
			return {
				"pageTitle": "Logout",
			};
		},
		mounted() {
			this.logout();
		},
		"methods": {
			...mapMutations([
				"setToken",
				"setLoggedIn",
			]),
			logout() {
				this.setToken("");
				localStorage.removeItem("token");
				this.setLoggedIn(false);
				this.$router.push("/login");
			},
		},
	};
</script>
