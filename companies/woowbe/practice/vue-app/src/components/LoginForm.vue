<template>
	<form @submit.prevent="login">
		<div>
			<label for="email">Email:</label>
			<input
				type="email"
				id="email"
				v-model="email"
				required
			/>
		</div>

		<div>
			<label for="password">Contraseña:</label>
			<input
				type="password"
				id="password"
				v-model="password"
				required
			/>
		</div>

		<button type="submit">Iniciar sesión</button>

		<div>
			<p v-if="errorMessage">
				{{ errorMessage }}
			</p>
		</div>
	</form>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
			errorMessage: "",
		};
	},
	methods: {
		async login() {
			try {
				const response = await fetch(
					"https://backend.dev.woowbe.com/api/v1/auth/jwt/token/",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: this.email,
							password: this.password,
						}),
					},
				);
				if (response.ok) {
					const data = await response.json();
					this.$store.commit("setToken", data.token);
					console.log("Inicio de sesión exitoso");
					console.log("Token:", this.token);

					this.$store.commit("setLoggedIn", true);
					this.$router.push("/account");
				} else {
					throw new Error(
						"Error al iniciar sesión. Verifica tus credenciales.",
					);
				}
			} catch (error) {
				this.errorMessage = error.message;
				console.error(error);
			}
		},
	},
};
</script>
