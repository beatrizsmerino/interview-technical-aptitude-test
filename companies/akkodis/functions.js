// TO-DO: Implement this function

const getCategoryNumber = categoryName => {
	const number = categoryName.replace("category", "");

	return number;
};

const getCategoryPath = (categories, categoryName) => {
	let path = "";

	const categoryNumber = getCategoryNumber(categoryName);
	console.log(categoryNumber);

	categories.forEach(category => {
		if (category.name != categoryName) {
			if (typeof category.subcategories != "undefined") {
				const subcategory = getCategoryPath(
					category.subcategories,
					categoryName
				);
				if (subcategory) {
					path += `/${category.name}${subcategory}`;
				}
			}
		} else {
			path = `/${category.name}`;
		}
	});

	return path;
};

module.exports = {
	getCategoryPath
};
