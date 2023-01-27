<template>
	<div>
		<pre>{{ getUserList }}</pre>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'UserList',
		computed: {
			...mapGetters(['getUserList'])
		},
		methods: {
			...mapActions(['fetchUserList'])
		},
		mounted() {
			this.fetchUserList();
		}
	};
</script>
