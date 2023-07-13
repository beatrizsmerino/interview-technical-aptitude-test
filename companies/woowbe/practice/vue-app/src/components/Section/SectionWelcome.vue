<template>
	<div class="hello">
		<PageTitle :title="pageTitle" />

		<p>
			For a guide and recipes on how to configure / customize this project,
			<br >
			check out the
			<UILink
				link-modifier="vue"
				link-url="https://cli.vuejs.org"
				link-text="vue-cli documentation"
			/>
			.
		</p>
		<h3>Installed CLI Plugins</h3>
		<ul>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
					link-text="babel"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
					link-text="router"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"
					link-text="vuex"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
					link-text="eslint"
				/>
			</li>
		</ul>
		<h3>Essential Links</h3>
		<ul>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://vuejs.org"
					link-text="Core Docs"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://forum.vuejs.org"
					link-text="Forum"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://chat.vuejs.org"
					link-text="Community Chat"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://twitter.com/vuejs"
					link-text="Twitter"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://news.vuejs.org"
					link-text="News"
				/>
			</li>
		</ul>
		<h3>Ecosystem</h3>
		<ul>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://router.vuejs.org"
					link-text="vue-router"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://vuex.vuejs.org"
					link-text="vuex"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://github.com/vuejs/vue-devtools#vue-devtools"
					link-text="vue-devtools"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://vue-loader.vuejs.org"
					link-text="vue-loader"
				/>
			</li>
			<li>
				<UILink
					link-modifier="vue"
					link-url="https://github.com/vuejs/awesome-vue"
					link-text="awesome-vue"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
	import PageTitle from "@/components/Page/PageTitle";
	import UILink from "@/components/UI/UILink";

	export default {
		"name": "SectionWelcome",
		"components": {
			PageTitle,
			UILink,
		},
		"props": {
			"pageTitle": String,
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	h3 {
		margin: 40px 0 0;
	}

	ul {
		padding: 0;
		list-style-type: none;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: $color-brand-1;
	}
</style>
