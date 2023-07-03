<template>
	<div class="account">
		<PageTitle :title="pageTitle" />
	</div>
</template>

<script>
import PageTitle from "@/components/PageTitle";

export default {
	name: "AccountView",
	components: {
		PageTitle,
	},
	data() {
		return {
			pageTitle: "User account",
		};
	},
};
</script>
