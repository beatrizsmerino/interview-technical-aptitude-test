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
						"name": "Login",
						"path": "/login",
					},
					{
						"name": "Account",
						"path": "/account",
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
					margin: 0 0.3rem;
				}
			}
		}

		&__link {
			color: #2C3E50;
			font-weight: bold;

			&.router-link-exact-active {
				color: #42B983;
			}
		}
	}
</style>
