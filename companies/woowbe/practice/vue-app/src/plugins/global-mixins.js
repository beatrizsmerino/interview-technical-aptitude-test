export default {
	"methods": {
		// eslint-disable-next-line complexity
		isEmpty(value) {
			return (
				value === null ||
				typeof value === "string" && value.trim() === "" ||
				Array.isArray(value) && value.length === 0 ||
				typeof value === "object" && Object.keys(value).length === 0
			);
		},
		isListArrayObject(value) {
			if (Array.isArray(value)) {
				return value.length > 0 && value.every(item => typeof item === "object" && item !== null);
			}

			return false;
		},
		isListObject(value) {
			return typeof value === "object" && value !== null && !Array.isArray(value) && Object.keys(value).length > 0;
		},
		isListArray(value) {
			return Array.isArray(value) && value.every(item => typeof item !== "object" || item === null);
		},
		getFileExtension(file) {
			const extension = file.substring(file.lastIndexOf(".")).toLowerCase();

			return extension;
		},
		isImage(value) {
			if (typeof value === "string") {
				const extensionsAvailable = [
					".jpg",
					".jpeg",
					".png",
					".gif",
				];
				const extension = this.getFileExtension(value);
				const isFound = extensionsAvailable.includes(extension);

				return isFound;
			}

			return false;
		},
		isIcon(value) {
			if (typeof value === "string") {
				const extensionsAvailable = [
					".svg",
				];

				const extension = this.getFileExtension(value);
				const isFound = extensionsAvailable.includes(extension);

				return isFound;
			}

			return false;
		},
		isLink(value) {
			if (typeof value === "string") {
				const urlPattern = /^(?:ftp|http|https):\/\/[^ "]+$/u;

				return urlPattern.test(value);
			}

			return false;
		},
	},
};
