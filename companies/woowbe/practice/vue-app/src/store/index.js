import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoggedIn: false,
		token: "",
	},
	getters: {
		getLoggedIn: state => state.isLoggedIn,
		getToken: state => state.token,
	},
	mutations: {
		setLoggedIn(state, isLoggedIn) {
			state.isLoggedIn = isLoggedIn;
		},
		setToken(state, token) {
			state.token = token;
		},
	},
	actions: {},
	modules: {},
});
