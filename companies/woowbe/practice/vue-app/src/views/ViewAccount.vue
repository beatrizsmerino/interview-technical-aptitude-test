<template>
	<div class="account">
		<PageTitle :title="pageTitle" />
		<div v-if="getLoggedIn">
			<UIMessage
				message-text="Welcome to your account!"
				message-status="success"
			/>
			<SectionBusiness />
			<SectionSales />
			<SectionOffers />
		</div>
		<div v-else>
			<UIMessage
				message-text="You must be logged in to access your account."
				message-status="error"
			/>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	import PageTitle from "@/components/Page/PageTitle";
	import SectionBusiness from "@/components/Section/SectionBusiness";
	import SectionOffers from "@/components/Section/SectionOffers";
	import SectionSales from "@/components/Section/SectionSales";
	import UIMessage from "@/components/UI/UIMessage";

	export default {
		"name": "AccountView",
		"components": {
			PageTitle,
			SectionBusiness,
			SectionOffers,
			SectionSales,
			UIMessage,
		},
		data() {
			return {
				"pageTitle": "User account",
			};
		},
		"computed": {
			...mapGetters([
				"getLoggedIn",
			]),
		},
	};
</script>
