<template>
	<form
		class="form"
		@submit.prevent="login"
	>
		<div class="form__item">
			<label
				class="form__label"
				for="email"
			>
				Email:
			</label>
			<input
				id="email"
				v-model="email"
				class="form__field"
				type="email"
				required
			>
		</div>

		<div class="form__item">
			<label
				class="form__label"
				for="password"
			>
				Password:
			</label>
			<input
				id="password"
				v-model="password"
				class="form__field"
				type="password"
				required
			>
		</div>

		<UIButton
			class="form__button"
			button-text="Login"
			type="submit"
		/>

		<UIMessage
			:message-text="messageText"
			:message-status="messageStatus"
		/>
	</form>
</template>

<script>
	import { mapMutations } from "vuex";
	import UIButton from "@/components/UI/UIButton";
	import UIMessage from "@/components/UI/UIMessage.vue";

	export default {
		"name": "SectionLogin",
		"components": {
			UIButton,
			UIMessage,
		},
		data() {
			return {
				"email": "",
				"password": "",
				"messageText": "",
				"messageStatus": "",
			};
		},
		"methods": {
			...mapMutations([
				"setToken",
				"setLoggedIn",
			]),
			async login() {
				try {
					const response = await this.sendLoginRequest();
					const data = await response.json();
					this.handleLoginSuccess(data);
				} catch (error) {
					this.handleLoginError(error);
				}
			},
			async sendLoginRequest() {
				const response = await fetch("https://backend.dev.woowbe.com/api/v1/auth/jwt/token/", {
					"method": "POST",
					"headers": {
						"Content-Type": "application/json",
					},
					"body": JSON.stringify({
						"email": this.email,
						"password": this.password,
					}),
				});
				if (!response.ok) {
					throw new Error("Error logging in. Verify your credentials.");
				}

				return response;
			},
			handleLoginSuccess(data) {
				this.setToken(data.token);
				this.messageText = "Successful login";
				this.messageStatus = "success";
				this.setLoggedIn(true);
				localStorage.setItem("token", data.token);
				this.$router.push("/account");
			},
			handleLoginError(error) {
				this.messageText = error.message;
				this.messageStatus = "error";
			},
		},
	};
</script>

<style lang="scss" scoped>
	.form {
		width: 100%;
		max-width: 20rem;

		&__item {
			display: flex;
			flex-direction: column;
			margin-bottom: 1rem;
		}

		&__label {
			display: flex;
			width: 100%;
			margin-bottom: 0.5rem;
			font-weight: bold;
		}

		&__field {
			display: flex;
			width: 100%;
			padding: 0.8rem;
			border: 0.1rem solid $color-brand-2;
			border-radius: 0.5rem;
			background-color: $color-white;
			appearance: none;
		}

		&__button {
			width: 100%;
		}
	}
</style>
