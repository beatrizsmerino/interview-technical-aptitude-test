<template>
	<div class="account">
		<PageTitle :title="pageTitle" />
		<div v-if="getLoggedIn">
			<p>¡Bienvenido a tu cuenta!</p>
			<BusinessTable />
			<OffersTable />
		</div>
		<div v-else>
			<p>Debes iniciar sesión para acceder a tu cuenta.</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

import PageTitle from "@/components/Page/PageTitle";
import BusinessTable from "@/components/BusinessTable";
import OffersTable from "@/components/OffersTable";

export default {
	name: "AccountView",
	components: {
		PageTitle,
		BusinessTable,
		OffersTable,
	},
	data() {
		return {
			pageTitle: "User account",
		};
	},
	computed: {
		...mapGetters(["getLoggedIn"]),
	},
};
</script>
