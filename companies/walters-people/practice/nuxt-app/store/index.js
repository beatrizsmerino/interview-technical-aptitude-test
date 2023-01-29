import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";

// LOAD VUEX
Vue.use(Vuex);

// STATE
const state = {};

// GETTERS
const getters = {};

// MUTACTIONS
const mutations = {};

// ACTIONS
const actions = {};

// MODULES
const modules = {
	users,
};

// CREATE STORE
const createStore = () =>
	new Vuex.Store({
		state,
		getters,
		mutations,
		actions,
		modules,
	});

export default createStore;
