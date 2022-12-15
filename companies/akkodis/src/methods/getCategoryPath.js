/** @module methods */

/** will be module:methods.getCategoryPath */
// eslint-disable-next-line multiline-comment-style
/**
 * @param {array} categories List of categories
 * @param {string} categoryName Category selected
 * @returns {string}
 * @description Obtain a path with the parent categories and parent subcategories of the selected category, whose data is in a nested array object.
 **/
const getCategoryPath = (categories, categoryName) => {
	let path = "";

	categories.forEach(category => {
		if (category.name != categoryName) {
			if (category.subcategories) {
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
