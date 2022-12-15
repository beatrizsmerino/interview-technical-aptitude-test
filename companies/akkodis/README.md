# Akkodis / Ejercicio JS BERSHKA

## Description

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

- __*`prettier`*__ and __*`eslint`*__ packages: formatter and linter code.
- __*`jest`*__ package: create test to check the code.
- __*`jsdoc`*__ package: generates code documentation.

2. Use the next commands of npm

- __*`lint`*__: to fix and format code
- __*`test:akkodis`*__: to check with `console.log` the `getCategoryPath` function.
- __*`jest:akkodis`*__: to check with `jest`  the `getCategoryPath` function.
- __*`jsdocs:akkodis`*__: to generate the `JSDOC` documentation
