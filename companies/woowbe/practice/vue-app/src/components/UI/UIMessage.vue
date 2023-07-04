<template>
	<div class="message">
		<p v-if="message">
			{{ message }}
		</p>
	</div>
</template>

<script>
export default {
	name: "UIMessage",
	props: {
		message: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped></style>
