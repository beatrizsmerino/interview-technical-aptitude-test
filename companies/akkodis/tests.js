const { getCategoryPath } = require("./functions.js");
const { categories } = require("./data.js");

console.log(categories);

const tests = () => {
	// OUTPUT SAMPLES

	// should output: '/category1/category3/category4'
	console.log(getCategoryPath(categories, "category4"));

	// should output: '/category1/category2'
	console.log(getCategoryPath(categories, "category2"));

	// should output: '/category5'
	console.log(getCategoryPath(categories, "category5"));
};

module.exports = {
	tests
};
