import Vue from "vue";
import VueRouter from "vue-router";
import ViewAbout from "../views/ViewAbout.vue";
import ViewHome from "../views/ViewHome.vue";
import ViewLogin from "../views/ViewLogin.vue";
import ViewAccount from "../views/ViewAccount.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: ViewHome,
	},
	{
		path: "/about",
		name: "about",
		component: ViewAbout,
	},
	{
		path: "/login",
		name: "login",
		component: ViewLogin,
	},
	{
		path: "/account",
		name: "account",
		component: ViewAccount,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
