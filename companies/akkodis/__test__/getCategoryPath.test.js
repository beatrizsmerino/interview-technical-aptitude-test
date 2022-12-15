const { getCategoryPath } = require("../functions.js");
const { categories } = require("../data.js");

describe("Get full category path including parent and subcategories", () => {
	test("'category4' is '/category1/category3/category4'", () => {
		expect(getCategoryPath(categories, "category4")).toBe("/category1/category3/category4");
	});

	test("'category2' is '/category1/category2'", () => {
		expect(getCategoryPath(categories, "category2")).toBe("/category1/category2");
	});

	test("'category5' is '/category5'", () => {
		expect(getCategoryPath(categories, "category5")).toBe("/category5");
	});
});
