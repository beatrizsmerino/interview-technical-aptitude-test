<template>
	<div class="page-main__inner">
		<h1 class="page-head text-3xl leading-7 font-semibold">
			User list
		</h1>
		<TableUserList />
		<TestComponent />
	</div>
</template>

<script>
	import TableUserList from "@/components/TableUserList";
	import TestComponent from "@/components/TestComponent";

	export default {
		"name": "UserList",
		"components": {
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
		&__inner {
			margin-bottom: 4rem;
			padding: 0 2rem;
		}
	}
</style>
