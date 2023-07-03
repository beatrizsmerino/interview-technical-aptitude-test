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
	name: "LoginView",
	components: {
		PageTitle,
		SectionLogin,
	},
	data() {
		return {
			pageTitle: "Login",
		};
	},
};
</script>
