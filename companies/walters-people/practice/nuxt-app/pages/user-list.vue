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
				<UserList />
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import PageNav from "@/components/PageNav";
	import UserList from "@/components/UserList";

	export default {
		name: "PageUserList",
		components: {
			PageNav,
			UserList,
		},
	};
</script>

<style lang="scss" scope>
	.page-head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
	}

	.page-main {
		padding: 0 2rem;
	}
</style>
