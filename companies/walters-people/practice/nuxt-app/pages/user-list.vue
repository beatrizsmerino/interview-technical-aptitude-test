<template>
	<div>
		<PageNav />
		<el-header class="page-head">
			<h1 class="text-3xl leading-7 font-semibold">
				User list
			</h1>
		</el-header>
		<el-row>
			<el-col :span="24">
				<UserList />
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import PageNav from '@/components/PageNav';
	import UserList from '@/components/UserList';

	export default {
		name: 'PageUserList',
		components: {
			PageNav,
			UserList
		}
	};
</script>

<style lang="css" scope>
.page-head {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
