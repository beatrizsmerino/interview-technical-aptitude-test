<template>
	<div>
		<strong>Pagination:</strong>
		<ul>
			<li>
				<strong>Total page:</strong>
				<span>{{ resultPage.total }}</span>
			</li>
			<li>
				<strong>Previous page:</strong>
				<span>{{ resultPage.prev }}</span>
			</li>
			<li>
				<strong>Current page:</strong>
				<span>{{ resultPage.current }}</span>
			</li>
			<li>
				<strong>Next page:</strong>
				<span>{{ resultPage.next }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		"name": "UISectionPagination",
		"props": {
			"resultPage": {
				"type": Object,
				"required": true,
			},
		},
	};
</script>

<style lang="scss" scoped></style>
