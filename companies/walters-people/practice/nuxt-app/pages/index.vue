<template>
	<div>
		<PageNav />
		<Tutorial />
		<UserList />
	</div>
</template>

<script>
	import PageNav from '@/components/PageNav';
	import Tutorial from '@/components/Tutorial';

	import UserList from '@/components/UserList';
	export default {
		Tutorial,
		UserList,
		PageNav
	};
</script>
