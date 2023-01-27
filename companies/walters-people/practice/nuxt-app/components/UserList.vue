<template>
	<div>
		<pre>{{ getUsers }}</pre>
	</div>
</template>

<script>
export default {
	name: 'UserList',
	data() {
		return {
			users: [],
		}
	},
	computed: {
		getUsers() {
			return this.users
		},
	},
	mounted() {
		this.fetchUsers()
	},
	methods: {
		async fetchUsers() {
			const response = await this.$axios.$get(
				'http://jsonplaceholder.typicode.com/users',
			)

			this.users = response
		},
	},
}
</script>
