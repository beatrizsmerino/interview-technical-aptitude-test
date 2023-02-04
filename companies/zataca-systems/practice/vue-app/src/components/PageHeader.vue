<template>
	<header class="page-header">
		<nav class="nav">
			<ul class="nav__list">
				<li
					class="nav__item"
					v-for="link in getLinkList"
					:key="link.id"
				>
					<router-link
						class="nav__link"
						:to="link.path"
					>
						{{ link.name }}
					</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	name: "PageHeader",
	data() {
		return {
			linkList: [
				{
					name: "Home",
					path: "/",
				},
				{
					name: "About",
					path: "/about",
				},
				{
					name: "Products",
					path: "/products",
				},
			],
		};
	},
	computed: {
		getLinkList() {
			return this.linkList;
		},
	},
};
</script>

<style lang="scss" scoped>
.nav {
	padding: 30px;

	&__list {
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		list-style: none;
	}

	&__item {
		display: flex;
		align-items: center;
		justify-content: center;

		&:not(:last-child) {
			&:after {
				content: "|";
				display: inline-block;
				margin: 0 0.3rem;
			}
		}
	}

	&__link {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
