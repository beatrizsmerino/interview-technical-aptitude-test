const { getCategoryPath } = require("../functions.js");
const { categories } = require("../data.js");

describe("Get full category path including parent and subcategories", () => {
	test("if 'category4' is selected his full path is '/category1/category3/category4'", () => {
		expect(getCategoryPath(categories, "category4")).toBe("/category1/category3/category4");
	});

	test("if 'category2' is selected his full path is '/category1/category2'", () => {
		expect(getCategoryPath(categories, "category2")).toBe("/category1/category2");
	});

	test("if 'category5' is selected his full path is '/category5'", () => {
		expect(getCategoryPath(categories, "category5")).toBe("/category5");
	});
});
