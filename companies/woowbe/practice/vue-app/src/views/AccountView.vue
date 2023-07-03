<template>
	<div class="account">
		<PageTitle :title="pageTitle" />
		<p v-if="isLoggedIn">¡Bienvenido a tu cuenta!</p>
		<p v-else>Debes iniciar sesión para acceder a tu cuenta.</p>
	</div>
</template>

<script>
import PageTitle from "@/components/Page/PageTitle";

export default {
	name: "AccountView",
	components: {
		PageTitle,
	},
	data() {
		return {
			pageTitle: "User account",
		};
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		},
	},
};
</script>
