<template>
	<div class="login">
		<PageTitle :title="pageTitle" />
		<SectionLogin />
	</div>
</template>

<script>
	import PageTitle from "@/components/Page/PageTitle";
	import SectionLogin from "@/components/Section/SectionLogin";

	export default {
		"name": "ViewLogin",
		"components": {
			PageTitle,
			SectionLogin,
		},
		data() {
			return {
				"pageTitle": "Login",
			};
		},
	};
</script>

<style lang="scss" scoped>
	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
