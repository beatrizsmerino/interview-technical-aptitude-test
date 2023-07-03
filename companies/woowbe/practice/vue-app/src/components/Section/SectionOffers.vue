<template>
	<section>
		<h2>Offers data</h2>
		<pre>{{ offersData }}</pre>
	</section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "SectionOffers",
	data() {
		return {
			offersData: [],
		};
	},
	computed: {
		...mapGetters(["getToken"]),
	},
	async mounted() {
		await this.fetchOffersData();
	},
	methods: {
		async fetchOffersData() {
			try {
				const response = await fetch(
					"https://backend.dev.woowbe.com/api/v1/offers/public/",
					{
						headers: {
							Authorization: `Bearer ${this.getToken}`,
						},
					},
				);
				const data = await response.json();
				this.offersData = data;
			} catch (error) {
				console.error("Error al obtener los datos de ofertas:", error);
			}
		},
	},
};
</script>
