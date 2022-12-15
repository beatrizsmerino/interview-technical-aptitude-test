const categories = require("./data.js");

console.log(categories);

// TO-DO: Implement this function
const getCategoryNumber = categoryName => {
	const number = categoryName.replace("category", "");

	return number;
};

const getCategoryPath = (categories, categoryName) => {
	const path = categoryName;
	const categoryNumber = getCategoryNumber(categoryName);

	console.log(categoryNumber);

	return path;
};

// OUTPUT SAMPLES

// should output: '/category1/category3/category4'
console.log(getCategoryPath(categories, "category4"));

// should output: '/category1/category2'
console.log(getCategoryPath(categories, "category2"));

// should output: '/category5'
console.log(getCategoryPath(categories, "category5"));
