<template>
	<div class="login">
		<PageTitle :title="pageTitle" />
	</div>
</template>

<script>
import PageTitle from "@/components/PageTitle";

export default {
	name: "LoginView",
	components: {
		PageTitle,
	},
	data() {
		return {
			pageTitle: "This is an login page",
		};
	},
};
</script>
