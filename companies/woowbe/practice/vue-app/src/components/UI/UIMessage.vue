<template>
	<div
		v-if="messageText"
		class="message"
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
		},
	};
</script>

<style lang="scss" scoped></style>
