<template>
	<div class="page-main__inner">
		<PageTitle :title="pageTitle" />
		<UserListTable />
		<UserMap />
	</div>
</template>

<script>
	import PageTitle from "@/components/Page/PageTitle";
	import UserListTable from "@/components/User/UserListTable";
	import UserMap from "@/components/User/UserMap";

	export default {
		"name": "UserList",
		"components": {
			PageTitle,
			UserListTable,
			UserMap,
		},
		data() {
			return {
				"pageTitle": `User list`,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.page-main {
		&__inner {
			margin-bottom: 4rem;
			padding: 0 2rem;
		}
	}
</style>
