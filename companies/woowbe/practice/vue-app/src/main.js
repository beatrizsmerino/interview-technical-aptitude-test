import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const token = localStorage.getItem("token");
if (token) {
	store.commit("setToken", token);
	store.commit("setLoggedIn", true);
}

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	"render": h => h(App),
}).$mount("#app");
