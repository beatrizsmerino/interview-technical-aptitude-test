<template>
	<div class="page-main__inner">
		<PageTitle :title="pageTitle" />
		<TableUserList />
		<TestComponent />
	</div>
</template>

<script>
	import PageTitle from "@/components/Page/PageTitle";
	import TableUserList from "@/components/TableUserList";
	import TestComponent from "@/components/TestComponent";

	export default {
		"name": "UserList",
		"components": {
			PageTitle,
			TableUserList,
			TestComponent,
		},
		data() {
			return {
				"pageTitle": `User list`,
			};
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
		&__inner {
			margin-bottom: 4rem;
			padding: 0 2rem;
		}
	}
</style>
