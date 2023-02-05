<template>
	<header class="page-header">
		<nav class="nav">
			<ul class="nav__list">
				<li
					v-for="link in getLinkList"
					:key="link.id"
					class="nav__item"
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
		"name": "PageHeader",
		data() {
			return {
				"linkList": [
					{
						"name": "Home",
						"path": "/",
					},
					{
						"name": "About",
						"path": "/about",
					},
					{
						"name": "Products",
						"path": "/products",
					},
				],
			};
		},
		"computed": {
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
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0;
			padding: 0;
			list-style: none;
		}

		&__item {
			display: flex;
			align-items: center;
			justify-content: center;

			&:not(:last-child) {
				&:after {
					content: '|';
					display: inline-block;
					margin: 0 0.5rem;
				}
			}
		}

		&__link {
			padding: 0.5rem;
			color: $color-brand-2;
			font-weight: bold;
			text-decoration: none;

			&.router-link-exact-active {
				color: $color-brand-1;
			}
		}
	}
</style>
