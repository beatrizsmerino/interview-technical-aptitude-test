/*
 * MODULE VUEX
 * TASKS
 * =================================================
 */

const state = {
	userList: []
};

const getters = {
	getUserList: state => state.userList
};

const actions = {
	async fetchUserList({ commit }) {
		const response = await this.$axios.$get('http://jsonplaceholder.typicode.com/users');
		commit('setUserList', response);
	}
};

const mutations = {
	setUserList: (state, payload) => (state.userList = payload)
};

export default {
	state,
	getters,
	actions,
	mutations
};
