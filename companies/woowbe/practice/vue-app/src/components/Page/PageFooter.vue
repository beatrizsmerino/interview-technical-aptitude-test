<template>
	<footer class="page__footer">
		{{ getCopyright }}
	</footer>
</template>

<script>
	export default {
		"name": "PageFooter",
		data() {
			return {
				"currentYear": new Date().getFullYear(),
			};
		},
		"computed": {
			getCopyright() {
				return `© ${this.currentYear} - Todos los derechos reservados`;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page {
		&__footer {
			padding: 3rem;
		}
	}
</style>
