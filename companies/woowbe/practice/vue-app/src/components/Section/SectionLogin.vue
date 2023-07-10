<template>
	<form @submit.prevent="login">
		<div>
			<label for="email">
				Email:
			</label>
			<input
				id="email"
				v-model="email"
				type="email"
				required
			>
		</div>

		<div>
			<label for="password">
				Password:
			</label>
			<input
				id="password"
				v-model="password"
				type="password"
				required
			>
		</div>

		<button type="submit">
			Login
		</button>

		<UIMessage :message="responseMessage" />
	</form>
</template>

<script>
	import { mapMutations } from "vuex";
	import UIMessage from "@/components/UI/UIMessage.vue";

	export default {
		"name": "SectionLogin",
		"components": {
			UIMessage,
		},
		data() {
			return {
				"email": "",
				"password": "",
				"responseMessage": "",
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
				this.responseMessage = "Successful login";
				this.setLoggedIn(true);
				localStorage.setItem("token", data.token);
				this.$router.push("/account");
			},
			handleLoginError(error) {
				this.responseMessage = error.message;
			},
		},
	};
</script>
