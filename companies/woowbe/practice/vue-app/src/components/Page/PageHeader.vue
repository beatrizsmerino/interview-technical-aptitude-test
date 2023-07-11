<template>
	<header class="page__header">
		<nav class="nav">
			<ul class="nav__list">
				<li
					v-for="link in filteredLinkList"
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
	import { mapGetters } from "vuex";

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
			...mapGetters([
				"getLoggedIn",
			]),
			getLinkList() {
				return this.linkList;
			},
			filteredLinkList() {
				if (!this.getLoggedIn) {
					if (this.$route.path == "/account") {
						this.$router.push("/login");
					}

					return this.linkList.filter(link => link.name !== "Account");
				}
				if (this.$route.path == "/login") {
					this.$router.push("/account");
				}

				return this.linkList.filter(link => link.name !== "Login");
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page {
		&__header {
			padding: 3rem;
		}
	}

	.nav {
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
					content: "|";
					display: inline-block;
					margin: 0 0.3rem;
				}
			}
		}

		&__link {
			color: $color-brand-2;
			font-weight: bold;

			&.router-link-exact-active {
				color: $color-brand-1;
			}
		}
	}
</style>
