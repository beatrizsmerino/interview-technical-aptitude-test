// MODULE VUEX
// TASKS
// =================================================

const state = {
	"userList": [],
};

const getters = {
	"getUserList": state => state.userList,
};

const actions = {
	async fetchUserList({ commit }) {
		const response = await this.$axios.$get(
			"http://jsonplaceholder.typicode.com/users",
		);
		commit("setUserList", response);
	},
	deleteUser({ commit }, userId) {
		commit("deleteUserByID", userId);
	},
};

const mutations = {
	"setUserList": (state, payload) => (state.userList = payload),
	deleteUserByID(state, payload) {
		state.userList = state.userList.filter(item => item.id !== payload.id);
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
