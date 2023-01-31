import {
	mount,
} from "@vue/test-utils";
import LogoNuxt from "~/components/Logo/LogoNuxt.vue";

describe("LogoNuxt", () => {
	test("is a Vue instance", () => {
		const wrapper = mount(LogoNuxt);
		expect(wrapper.vm).toBeTruthy();
	});
});
