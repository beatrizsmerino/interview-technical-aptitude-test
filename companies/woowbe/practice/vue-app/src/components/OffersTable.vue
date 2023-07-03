<template>
	<section>
		<h2>Offers data</h2>
		<pre>{{ offersData }}</pre>
	</section>
</template>

<script>
export default {
	name: "OffersTable",
	data() {
		return {
			offers: [],
		};
	},
	computed: {
		offersData() {
			return this.offers;
		},
	},
	async mounted() {
		await this.fetchOffersData();
	},
	methods: {
		async fetchOffersData() {
			try {
				const token = this.$store.getters.token;
				const response = await fetch(
					"https://backend.dev.woowbe.com/api/v1/offers/public/",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				const data = await response.json();
				this.offers = data;
			} catch (error) {
				console.error("Error al obtener los datos de ofertas:", error);
			}
		},
	},
};
</script>
