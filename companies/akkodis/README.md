# Akkodis / Ejercicio JS BERSHKA

```javascript
const categories = [
    {
        name: 'category1',
        subcategories: [
            {
                name: 'category2',
                subcategories: []
            },
            {
                name: 'category3',
                subcategories: [
                    {
                        name: 'category4',
                        subcategories: []
                    }
                ]
            }
        ]
    },
    {
        name: 'category5',
        subcategories: []
    }
];

// TO-DO: Implement this function
const getCategoryPath = (categories, categoryName) => {
    let path;


    return path;
};

// OUTPUT SAMPLES
console.log(getCategoryPath(categories, 'category4')); // should output: '/category1/category3/category4'
console.log(getCategoryPath(categories, 'category2')); // should output: '/category1/category2'
console.log(getCategoryPath(categories, 'category5')); // should output: '/category5'
```

## Init steps

1. Run the `npm install` command to install the project dependencies:

- packages `prettier` and `eslint`: code formatter and linter
- package `jest`: run the test to check the code
-`jsdoc`package: generates code documentation

2. Use the next commands of npm

- `lint`: to fix and format code
- `test:akkodis`: to check with `console.log` the `getCategoryPath` function.
- `jest:akkodis`: to check with `jest`  the `getCategoryPath` function.
- `jsdocs:akkodis`: to generate the `JSDOC` documentation
