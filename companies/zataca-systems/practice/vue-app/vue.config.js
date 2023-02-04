const SASS = require("sass");
const Fibers = require("fibers");
const ESLintPlugin = require("eslint-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {

	// Add configuration for use Dart sass/scss and compile files of 'assets' folder
	"css": {
		"loaderOptions": {
			"sass": {
				"implementation": SASS,
				"sassOptions": {
					"fiber": Fibers,
				},
			},
			"scss": {
				"additionalData": `@import "@/assets/scss/styles.scss";`,
			},
		},
	},

	// Emit 'eslint' errors and warnings in the console
	// https://cli.vuejs.org/config/#lintonsave
	"lintOnSave": true,

	"configureWebpack": {
		"plugins": [

			// Add configuration for autofix eslint errors
			new ESLintPlugin({
				"fix": true,
				"files": [
					"src/**/*.{vue,js}",
				],
			}),

			// Add configuration for autofix stylelint errors
			new StyleLintPlugin({
				"fix": true,
				"files": [
					"src/**/*.{vue,scss}",
				],
			}),
		],
	},
};
