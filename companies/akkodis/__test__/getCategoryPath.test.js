/* eslint-disable no-undef */
const {
	getCategoryPath,
} = require("../src/methods/getCategoryPath.js");
const {
	categories,
} = require("../src/data/categories.js");

describe("Get full category path including parent and subcategories", () => {
	it("should return '/category1/category3/category4' with category4'", () => {
		expect(getCategoryPath(categories, "category4")).toBe("/category1/category3/category4");
	});

	it("should return '/category1/category2' with 'category2'", () => {
		expect(getCategoryPath(categories, "category2")).toBe("/category1/category2");
	});

	it("should return '/category1/category3' with 'category3'", () => {
		expect(getCategoryPath(categories, "category3")).toBe("/category1/category3");
	});

	it("should return '/category5' with 'category5'", () => {
		expect(getCategoryPath(categories, "category5")).toBe("/category5");
	});

	it("should return '/category1' with 'category1'", () => {
		expect(getCategoryPath(categories, "category1")).toBe("/category1");
	});
});
