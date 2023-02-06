<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<PageNav />
			</el-header>
			<el-main class="page-main">
				<h1 class="page-head text-3xl leading-7 font-semibold">
					User list
				</h1>
				<TableUserList />
				<TestComponent />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import PageNav from "@/components/Page/PageNav";
	import TableUserList from "@/components/TableUserList";
	import TestComponent from "@/components/TestComponent";

	export default {
		"name": "UserList",
		"components": {
			PageNav,
			TableUserList,
			TestComponent,
		},
	};
</script>

<style lang="scss" scoped>
	.page-head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
	}

	.page-main {
		margin-bottom: 4rem;
		padding: 0 2rem;
	}
</style>
