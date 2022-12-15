/** @module methods */
/** @requires module:methods.getCategoryPath */
/** @requires module:data~categories */

const { getCategoryPath } = require("./getCategoryPath.js");
const { categories } = require("../data/index.js");

/** will be module:methods.checkCategoryPath */
/** @description Output samples of the use `getCategoryPath` */
const checkCategoryPath = () => {
	/** @example should output: '/category1/category3/category4' **/
	console.log(getCategoryPath(categories, "category4"));

	/** @example should output: '/category1/category2' **/
	console.log(getCategoryPath(categories, "category2"));

	/** @example should output: '/category5' **/
	console.log(getCategoryPath(categories, "category5"));
};

module.exports = {
	checkCategoryPath
};
