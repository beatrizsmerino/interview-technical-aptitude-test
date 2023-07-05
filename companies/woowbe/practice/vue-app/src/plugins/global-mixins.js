export default {
	methods: {
		isEmpty(value) {
			return (
				value === null ||
				(typeof value === "string" && value.trim() === "") ||
				(Array.isArray(value) && value.length === 0) ||
				(typeof value === "object" && Object.keys(value).length === 0)
			);
		},
		isListArrayObject(value) {
			if (Array.isArray(value)) {
				return (
					value.length > 0 &&
					value.every(
						item => typeof item === "object" && item !== null,
					)
				);
			}
			return false;
		},
		isListObject(value) {
			return (
				typeof value === "object" &&
				value !== null &&
				!Array.isArray(value) &&
				Object.keys(value).length > 0
			);
		},
		isListArray(value) {
			return (
				Array.isArray(value) &&
				value.every(item => typeof item !== "object" || item === null)
			);
		},
		isImage(value) {
			if (typeof value === "string") {
				const extensionsAvailable = [".jpg", ".jpeg", ".png", ".gif"];
				const extension = value
					.substring(value.lastIndexOf("."))
					.toLowerCase();
				return extensionsAvailable.includes(extension);
			}
			return false;
		},
		isIcon(value) {
			if (typeof value === "string") {
				const extensionsAvailable = [".svg"];
				const extension = value
					.substring(value.lastIndexOf("."))
					.toLowerCase();
				return extensionsAvailable.includes(extension);
			}
			return false;
		},
		isLink(value) {
			if (typeof value === "string") {
				const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
				return urlPattern.test(value);
			}
			return false;
		},
	},
};
