<template>
	<div
		v-if="messageText && showMessage"
		:class="{
			'message': true,
			'message--error': messageStatus === 'error',
			'message--success': messageStatus === 'success',
			'message--info': messageStatus === 'info',
			'is-animate': showMessage === true,
		}"
	>
		<p>
			{{ messageText }}
		</p>
	</div>
</template>

<script>
	export default {
		"name": "UIMessage",
		"props": {
			"messageText": {
				"type": String,
				"required": true,
			},
			"messageStatus": {
				"type": String,
				"required": true,
			},
		},
		data() {
			return {
				"showMessage": true,
			};
		},
		mounted() {
			setTimeout(() => {
				this.showMessage = false;
			}, 6000);
		},
	};
</script>

<style lang="scss" scoped>
	.message {
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1rem 3rem;
		transition: all 0.5s ease-in-out;
		color: $color-black;
		font-size: 1.2rem;
		font-weight: 700;
		text-align: center;

		&--error {
			background-color: $color-error;
		}

		&--success {
			background-color: $color-success;
		}

		&--info {
			background-color: $color-info;
		}

		&.is-animate {
			transform: translateY(100%);
			animation: show-hide 5s 0.5s forwards;
		}

		@keyframes show-hide {
			0% {
				transform: translateY(100%);
				opacity: 0;
			}

			5% {
				transform: translateY(0%);
				opacity: 1;
			}

			95% {
				transform: translateY(0%);
				opacity: 1;
			}

			100% {
				transform: translateY(100%);
				opacity: 0;
			}
		}
	}
</style>
