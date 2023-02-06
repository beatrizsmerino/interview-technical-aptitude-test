<template>
	<div class="common-layout">
		<el-container>
			<PageHeader />
			<el-main>
				<Tutorial />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import PageHeader from "@/components/Page/PageHeader";
	import Tutorial from "@/components/Tutorial";

	export default {
		"name": "Home",
		"components": {
			PageHeader,
			Tutorial,
		},
	};
</script>
