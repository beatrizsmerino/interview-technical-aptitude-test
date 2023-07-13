<template>
	<div class="about">
		<PageTitle :title="pageTitle" />
	</div>
</template>

<script>
	import PageTitle from "@/components/Page/PageTitle";

	export default {
		"name": "ViewAbout",
		"components": {
			PageTitle,
		},
		data() {
			return {
				"pageTitle": "About us",
			};
		},
	};
</script>
