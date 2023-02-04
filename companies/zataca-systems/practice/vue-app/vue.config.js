module.exports = {
	// Add configuration for use Dart sass/scss and compile files of 'assets' folder
	css: {
		loaderOptions: {
			sass: {
				implementation: require("sass"),
				sassOptions: {
					fiber: require("fibers"),
				},
			},
			scss: {
				additionalData: `@import "@/assets/scss/styles.scss";`,
			},
		},
	},
};
