/** @module data/categories */

/** will be module:data.categories */
/** @constant {Array} categories List of categories */
const categories = [
	{
		name: "category1",
		subcategories: [
			{
				name: "category2",
				subcategories: []
			},
			{
				name: "category3",
				subcategories: [
					{
						name: "category4",
						subcategories: []
					}
				]
			}
		]
	},
	{
		name: "category5",
		subcategories: []
	}
];

module.exports = {
	categories
};
