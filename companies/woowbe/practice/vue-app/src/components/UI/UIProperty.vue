<template>
	<component
		:is="getPropertyHtmlTag"
		:class="{
			'property': true,
			'property--reverse': !propertyParagraph,
		}"
	>
		<strong v-if="propertyName && propertyParagraph">
			{{ propertyName }}:
		</strong>
		<template v-if="isEmpty(propertyValue)">
			<img
				v-if="propertyIndex === 'square_picture' || propertyIndex === 'widescreen_picture' || propertyIndex === 'cover'"
				:src="getImageDefault"
				class="property__image"
				alt="Image not found"
			>
			<img
				v-else-if="propertyIndex === 'icon'"
				class="property__icon"
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
				class="property__image"
			>
				<img
					:src="propertyValue"
					:alt="getFileName(propertyValue)"
				>
			</span>
			<span
				v-else-if="isIcon(propertyValue)"
				class="property__icon"
			>
				<img
					:src="propertyValue"
					:alt="getFileName(propertyValue)"
				>
			</span>
			<span
				v-else-if="isLink(propertyValue)"
				class="property__link"
			>
				<UILink
					:link-url="propertyValue"
					:link-text="propertyValue"
					target="_blank"
					rel="noopener noreferrer"
				/>
			</span>
			<span v-else>
				{{ propertyValue }}
			</span>
		</template>
		<strong v-if="propertyName && !propertyParagraph">
			{{ propertyName }}:
		</strong>
	</component>
</template>

<script>
	import iconDefault from "@/assets/icons/icon-default.svg";
	import imageDefault from "@/assets/images/image-default.jpg";
	import UILink from "@/components/UI/UILink";

	export default {
		"name": "UIProperty",
		"component": {
			UILink,
		},
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
				"default": null,
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
	.property {
		margin: 0;

		&--reverse {
			display: inline-block !important;

			> * {
				display: inline-block !important;
				vertical-align: bottom;
			}

			.property {
				&__icon {
					max-width: 2rem;
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
			border: 0.1rem solid $color-metal;
		}

		&__icon {
			max-width: 3rem;
		}
	}
</style>
