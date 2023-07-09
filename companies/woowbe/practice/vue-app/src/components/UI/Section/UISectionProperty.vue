<template>
	<component
		:is="getPropertyHtmlTag"
		:class="{
			'section__property': true,
			'section__property--reverse': !propertyParagraph,
		}"
	>
		<strong v-if="propertyParagraph">
			{{ propertyName }}:
		</strong>
		<template v-if="isEmpty(propertyValue)">
			<img
				v-if="propertyIndex === 'square_picture' || propertyIndex === 'widescreen_picture' || propertyIndex === 'cover'"
				:src="getImageDefault"
				class="section__image"
				alt="Image not found"
			>
			<img
				v-else-if="propertyIndex === 'icon'"
				class="section__icon"
				:src="getIconDefault"
				alt="Icon not found"
			>
			<span v-else>
				---
			</span>
		</template>
		<template v-else-if="isListArray(propertyValue)">
			<span v-if="propertyValue.length > 1">
				{{ propertyValue.slice(0, -1).join(", ") }}
				y
				{{ propertyValue[propertyValue.length - 1] }}
			</span>
			<span v-else>
				{{ propertyValue[0] }}
			</span>
		</template>
		<template v-else>
			<span
				v-if="isImage(propertyValue)"
				class="section__image"
			>
				<img
					:src="propertyValue"
					:alt="getFileName(propertyValue)"
				>
			</span>
			<span
				v-else-if="isIcon(propertyValue)"
				class="section__icon"
			>
				<img
					:src="propertyValue"
					:alt="getFileName(propertyValue)"
				>
			</span>
			<span
				v-else-if="isLink(propertyValue)"
				class="section__link"
			>
				<a
					:href="propertyValue"
					target="_blank"
					rel="noopener noreferrer"
				>
					{{ propertyValue }}
				</a>
			</span>
			<span v-else>
				{{ propertyValue }}
			</span>
		</template>
		<strong v-if="!propertyParagraph">
			{{ propertyName }}:
		</strong>
	</component>
</template>

<script>
	import iconDefault from "@/assets/icons/icon-default.svg";
	import imageDefault from "@/assets/images/image-default.jpg";
	import globalMixins from "@/plugins/global-mixins.js";

	export default {
		"name": "UISectionProperty",
		"mixins": [
			globalMixins,
		],
		"props": {
			"propertyParagraph": {
				"type": Boolean,
				"default": true,
			},
			"propertyIndex": {
				"type": String,
				default() {
					return this.propertyName;
				},
			},
			"propertyName": {
				"type": String,
				"required": true,
			},
			"propertyValue": {
				"type": [
					String,
					Array,
					Object,
					Number,
					Boolean,
					null,
				],
				"default": null,
			},
		},
		"computed": {
			getPropertyHtmlTag() {
				if (this.propertyParagraph) {
					return "p";
				}

				return "div";
			},
			getIconDefault() {
				return iconDefault;
			},
			getImageDefault() {
				return imageDefault;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.section {
		&__property {
			&--reverse {
				display: inline-block !important;

				> * {
					display: inline-block !important;
					vertical-align: bottom;
				}

				.section {
					&__icon {
						max-width: 2rem;
					}
				}
			}
		}

		&__image,
		&__icon {
			display: flex;
			width: 100%;

			img {
				display: flex;
				width: 100%;
			}
		}

		&__image {
			max-width: 15rem;
		}

		&__icon {
			max-width: 3rem;
		}

		p {
			margin: 0;
		}
	}
</style>
