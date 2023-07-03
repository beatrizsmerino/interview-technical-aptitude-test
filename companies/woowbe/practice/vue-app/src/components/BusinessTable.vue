<template>
	<section>
		<h2>Business data</h2>
		<pre>{{ businessesData }}</pre>
	</section>
</template>

<script>
export default {
	name: "BusinessTable",
	data() {
		return {
			businesses: [],
		};
	},
	computed: {
		businessesData() {
			return this.businesses;
		},
	},
	async mounted() {
		await this.fetchBusinessData();
	},
	methods: {
		async fetchBusinessData() {
			try {
				const token = this.$store.getters.token;
				const response = await fetch(
					"https://backend.dev.woowbe.com/api/v1/business/public/",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				const data = await response.json();
				this.businesses = data;
			} catch (error) {
				console.error(
					"Error al obtener los datos de comercios:",
					error,
				);
			}
		},
	},
};
</script>
