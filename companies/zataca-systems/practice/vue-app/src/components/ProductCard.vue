<template>
	<div class="product-card">
		<div class="product-card__inner">
			<div class="product-card__header">
				<div class="product-card__id">
					<span>#{{ product.id }}</span>
				</div>
				<h3 class="product-card__title">
					<span>
						{{ product.title }}
					</span>
				</h3>
			</div>
			<div class="product-card__body">
				<p class="product-card__description">
					<strong>Description:</strong>
					<span>
						{{ product.body }}
					</span>
				</p>
				<div class="product-card__info">
					<div class="product-card__user-id">
						<strong>User ID:</strong>
						<span>{{ product.userId }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		"name": "ProductCard",
		"props": {
			"product": {
				"type": Object,
				"required": true,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.product-card {
		&__inner {
			display: flex;
			flex-direction: column;
		}

		&__header {
			padding: 1rem 2rem;

			@include media('md') {
				padding: 0.5rem 1.5rem;
			}
		}

		&__body {
			padding: 2rem;
			transition: all 0.5s ease-in-out;
			border-radius: 0 0.8rem 0.8rem;
			background: $color-ghost;

			@include media('md') {
				padding: 1.5rem;
			}

			> * {
				&:not(:last-child) {
					margin-bottom: 1rem;
				}
			}
		}

		&__id {
			color: $color-white;
			font-size: 2rem;
			font-style: italic;
			font-weight: 400;
			text-align: right;

			@include media('md') {
				font-size: 1.5rem;
			}
		}

		&__title {
			display: inline-block;

			span {
				transition: all 0.5s ease-in-out;
				font-size: 1.5rem;
				font-weight: 500;
				letter-spacing: 0.1rem;
				text-transform: uppercase;

				@include media('xl') {
					font-size: 1.4rem;
				}

				@include media('md') {
					font-size: 1.2rem;
				}
			}
		}

		&__description {
			display: inline-block;
			position: relative;
			height: 180px;
			margin: 0;
			overflow: hidden;
			transition: all 0.5s ease-in-out;

			@include media('md') {
				height: auto;
			}

			&:after {
				content: '';
				display: inline-block;
				position: absolute;
				z-index: 9;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 3rem;
				background: linear-gradient(180deg, rgba($color-ghost, 0) 0%, rgba($color-ghost, 1) 100%);
			}
		}

		&__user-id {
			span {
				display: inline-block;
				margin: 0.5rem;
				padding: 0.2rem 0.6rem;
				border-radius: 0.2rem;
				background-color: $color-light;
				font-weight: 500;
			}
		}
	}
</style>
