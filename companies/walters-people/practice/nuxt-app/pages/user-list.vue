<template>
	<div class="page-main__inner">
		<UserListTable />
		<UserMap />
	</div>
</template>

<script>
	import UserListTable from "@/components/User/UserListTable";
	import UserMap from "@/components/User/UserMap";

	export default {
		"name": "UserList",
		"components": {
			UserListTable,
			UserMap,
		},
		"layout": "page-content",
	};
</script>
