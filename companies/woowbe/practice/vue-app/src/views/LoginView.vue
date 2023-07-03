<template>
	<div class="login">
		<PageTitle :title="pageTitle" />
		<LoginForm />
	</div>
</template>

<script>
import PageTitle from "@/components/Page/PageTitle";
import LoginForm from "@/components/LoginForm";

export default {
	name: "LoginView",
	components: {
		PageTitle,
		LoginForm,
	},
	data() {
		return {
			pageTitle: "Login",
		};
	},
};
</script>
