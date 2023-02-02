<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<PageNav />
			</el-header>
			<el-main>
				<Tutorial />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import PageNav from "@/components/PageNav";
	import Tutorial from "@/components/Tutorial";

	export default {
		PageNav,
		Tutorial,
	};
</script>
