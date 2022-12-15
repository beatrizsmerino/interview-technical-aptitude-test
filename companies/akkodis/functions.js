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

module.exports = {
	getCategoryPath
};
