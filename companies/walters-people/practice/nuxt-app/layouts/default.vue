<template>
	<div class="common-layout">
		<el-container>
			<PageHeader />
			<el-main class="page-main">
				<Nuxt />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import PageHeader from "@/components/Page/PageHeader";

	export default {
		"name": "Default",
		"components": {
			PageHeader,
		},
	};
</script>
