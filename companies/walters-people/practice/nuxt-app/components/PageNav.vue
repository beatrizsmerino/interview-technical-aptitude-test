<template>
	<el-menu
		:router="true"
		:default-active="linkDefaultActive"
		class="page-nav"
		mode="horizontal"
		background-color="#003543"
		text-color="#fff"
		active-text-color="#00DC82"
	>
		<el-menu-item
			v-for="item in linkList"
			:key="item.id"
			:index="item.id"
			:route="item"
		>
			{{ item.title }}
		</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		"name": "PageNav",
		data() {
			return {
				"linkList": [
					{
						"id": "1",
						"name": "index",
						"title": "Home",
						"path": "/",
					},
					{
						"id": "2",
						"name": "user-list",
						"title": "User list",
						"path": "/user-list",
					},
				],
				"linkDefaultActive": null,
			};
		},
		mounted() {
			this.setLinkIDDefaultActive();
		},
		"methods": {
			setLinkIDDefaultActive() {
				const currentLink = this.linkList.filter(item => item.name === this.$route.name)[0];
				this.linkDefaultActive = currentLink.id;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page-nav {
		display: flex;
		justify-content: flex-end;
	}
</style>
