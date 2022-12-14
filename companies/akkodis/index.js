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

// TO-DO: Implement this function
const getCategoryNumber = categoryName => {
	const number = categoryName.replace("category", "");

	return number;
};

const getCategoryPath = (categories, categoryName) => {
	const path = null;
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
