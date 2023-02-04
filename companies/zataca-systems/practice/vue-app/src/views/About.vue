<template>
	<div class="about">
		<PageTitle :title="pageTitle" />
	</div>
</template>

<script>
import PageTitle from "@/components/PageTitle";

export default {
	name: "About",
	components: {
		PageTitle
	},
	data() {
		return {
			pageTitle: "This is an about page"
		}
	},
}
</script>
