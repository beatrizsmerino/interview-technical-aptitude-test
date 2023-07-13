<template>
	<a
		:href="linkUrl"
		:class="getLinkClass"
		target="_blank"
		rel="noopener noreferrer"
	>
		{{ linkText }}
	</a>
</template>

<script>
	export default {
		"name": "UILink",
		"props": {
			"linkUrl": {
				"type": String,
				"required": true,
			},
			"linkText": {
				"type": String,
				"required": true,
			},
			"linkSection": {
				"type": String,
				"default": "",
			},
		},
		"computed": {
			getLinkClass() {
				return {
					"link": true,
					"link--vue": this.linkSection === "vue",
				};
			},
		},
	};
</script>

<style lang="scss" scoped>
	.link {
		position: relative;
		z-index: 2;
		transition: all 0.333s;
		background-clip: text;
		background-image: linear-gradient(
			to right,
			mix($color-black, $color-brand-2, 15%),
			mix($color-black, $color-brand-2, 15%) 50%,
			$color-brand-2 50%
		);
		background-position: 100%;
		background-size: 200% 100%;
		color: $color-brand-2;
		font-weight: 900;
		text-decoration: none;
		cursor: pointer;
		place-self: center;
		-webkit-text-fill-color: transparent;

		&:after {
			content: "";
			display: inline-block;
			position: absolute;
			z-index: -1;
			bottom: 0;
			left: 50%;
			width: 100%;
			height: 0.5rem;
			transform: translate(-50%, -30%);
			transition: all 0.2s ease-in-out;
			border-radius: 0.5rem;
			background-color: $color-brand-3;
		}

		&:hover {
			background-position: 0%;

			&:after {
				width: 102%;
				transform: translate(-50%, -50%);
				background-color: mix($color-white, $color-brand-3, 50%);
			}
		}

		&--vue {
			background-image: linear-gradient(to right, $color-brand-vue-2, $color-brand-vue-1 50%, $color-brand-vue-1 50%);
			color: $color-brand-vue-1;

			&:after {
				background-color: $color-brand-vue-4;
			}

			&:hover {
				&:after {
					background-color: mix($color-white, $color-brand-vue-4, 50%);
				}
			}
		}
	}
</style>
