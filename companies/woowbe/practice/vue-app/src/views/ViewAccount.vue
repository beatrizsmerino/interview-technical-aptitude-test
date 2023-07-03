<template>
	<div class="account">
		<PageTitle :title="pageTitle" />
		<div v-if="getLoggedIn">
			<p>¡Bienvenido a tu cuenta!</p>
			<SectionBusiness />
			<SectionOffers />
		</div>
		<div v-else>
			<p>Debes iniciar sesión para acceder a tu cuenta.</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

import PageTitle from "@/components/Page/PageTitle";
import SectionBusiness from "@/components/Section/SectionBusiness";
import SectionOffers from "@/components/Section/SectionOffers";

export default {
	name: "AccountView",
	components: {
		PageTitle,
		SectionBusiness,
		SectionOffers,
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
