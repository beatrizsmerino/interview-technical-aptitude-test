<template>
	<main class="account">
		<PageTitle :title="pageTitle" />
		<template v-if="getLoggedIn">
			<div class="account__content">
				<SectionBusiness class="account__section account__section--business" />
				<SectionSales class="account__section account__section--sales" />
				<SectionOffers class="account__section account__section--offers" />
			</div>
			<UIMessage
				message-text="Welcome to your account!"
				message-status="success"
			/>
		</template>
		<template v-else>
			<UIMessage
				message-text="You must be logged in to access your account."
				message-status="error"
			/>
		</template>
	</main>
</template>

<script>
	import { mapGetters } from "vuex";

	import PageTitle from "@/components/Page/PageTitle";
	import SectionBusiness from "@/components/Section/SectionBusiness";
	import SectionOffers from "@/components/Section/SectionOffers";
	import SectionSales from "@/components/Section/SectionSales";
	import UIMessage from "@/components/UI/UIMessage";

	export default {
		"name": "ViewAccount",
		"components": {
			PageTitle,
			SectionBusiness,
			SectionOffers,
			SectionSales,
			UIMessage,
		},
		data() {
			return {
				"pageTitle": "User account",
			};
		},
		"computed": {
			...mapGetters([
				"getLoggedIn",
			]),
		},
	};
</script>

<style lang="scss" scoped>
	.account {
		padding: 0 4rem;

		@include media("lg") {
			padding: 0 3rem;
		}

		@include media("md") {
			padding: 0 2rem;
		}

		&__content {
			display: grid;
			grid-gap: 2rem;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr);

			@include media("lg") {
				grid-template-columns: repeat(2, 1fr);
				grid-template-rows: repeat(3, 1fr);
			}
		}

		&__section {
			padding: 2rem;
			overflow: hidden;
			border-radius: 0.5rem;

			&--business {
				grid-area: 1 / 1 / 2 / 2;
				background-color: mix($color-white, $color-brand-2, 80%);
				box-shadow: mix($color-white, $color-brand-2, 70%) 0.5rem 0.5rem;

				@include media("lg") {
					grid-area: 1 / 1 / 2 / 3;
				}
			}

			&--sales {
				grid-area: 1 / 2 / 2 / 3;
				background-color: mix($color-white, $color-brand-3, 80%);
				box-shadow: mix($color-white, $color-brand-3, 70%) 0.5rem 0.5rem;

				@include media("lg") {
					grid-area: 2 / 1 / 3 / 3;
				}
			}

			&--offers {
				grid-area: 2 / 1 / 3 / 3;
				background-color: mix($color-white, $color-brand-4, 80%);
				box-shadow: mix($color-white, $color-brand-4, 40%) 0.5rem 0.5rem;

				@include media("lg") {
					grid-area: 3 / 1 / 4 / 3;
				}
			}
		}
	}
</style>
