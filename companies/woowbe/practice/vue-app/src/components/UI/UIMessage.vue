<template>
	<div
		v-if="message"
		class="message"
	>
		<p>
			{{ message }}
		</p>
	</div>
</template>

<script>
	export default {
		"name": "UIMessage",
		"props": {
			"message": {
				"type": String,
				"required": true,
			},
		},
	};
</script>

<style lang="scss" scoped></style>
