/** @module methods/checkCategoryPath */

/** @requires module:data.categories */
/** @requires module:methods.getCategoryPath */
const { categories } = require('../data/categories.js')
const { getCategoryPath } = require('./getCategoryPath.js')

/** will be module:methods.checkCategoryPath */
/** @description Output samples of the use `getCategoryPath` */
const checkCategoryPath = () => {
	/** @example should output: '/category1/category3/category4' **/
	console.log(getCategoryPath(categories, 'category4'))

	/** @example should output: '/category1/category2' **/
	console.log(getCategoryPath(categories, 'category2'))

	/** @example should output: '/category5' **/
	console.log(getCategoryPath(categories, 'category5'))
}

module.exports = {
	checkCategoryPath,
}
