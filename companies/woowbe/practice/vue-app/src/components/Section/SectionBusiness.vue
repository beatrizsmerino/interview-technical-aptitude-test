<template>
	<section>
		<h2>Business data</h2>
		<pre>{{ businessesData }}</pre>
	</section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "SectionBusiness",
	data() {
		return {
			businessesData: [],
		};
	},
	computed: {
		...mapGetters(["getToken"]),
	},
	async mounted() {
		await this.fetchBusinessData();
	},
	methods: {
		async fetchBusinessData() {
			try {
				const response = await fetch(
					"https://backend.dev.woowbe.com/api/v1/business/public/",
					{
						headers: {
							Authorization: `Bearer ${this.getToken}`,
						},
					},
				);
				const data = await response.json();
				this.businessesData = data;
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
