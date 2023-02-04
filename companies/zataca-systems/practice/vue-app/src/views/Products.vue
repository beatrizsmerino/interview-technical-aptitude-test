<template>
	<div class="products">
		<PageTitle :title="pageTitle" />
	</div>
</template>

<script>
import PageTitle from "@/components/PageTitle";

export default {
	name: "Products",
	components: {
		PageTitle
	},
	data() {
		return {
			pageTitle: "This is an products page"
		}
	},
}
</script>
