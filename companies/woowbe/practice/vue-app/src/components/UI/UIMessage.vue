<template>
	<div
		v-if="messageText && showMessage"
		:class="{
			'message': true,
			'message--error': messageStatus === 'error',
			'message--success': messageStatus === 'success',
			'message--info': messageStatus === 'info',
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
				"default": "error",
				"validator"(value) {
					return [
						"error",
						"success",
						"info",
					].includes(value);
				},
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
			}, 20000);
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
		color: $color-brand-2;
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
	}
</style>
