<template>
	<section class="offers">
		<h2>Offers data</h2>

		<UIMessage :message="responseMessage" />

		<nav>
			<ul>
				<li>
					<strong>Results found:</strong>
					<span>{{ offersData.count }}</span>
				</li>
				<li>
					<strong>Current page:</strong>
					<span>{{ getPageNumberCurrent(offersData.next) }}</span>
				</li>
				<li v-if="offersData.previous">
					<button @click="fetchData(offersData.previous)">
						Prev
					</button>
				</li>
				<li v-if="offersData.next">
					<button @click="fetchData(offersData.next)">Next</button>
				</li>
			</ul>
		</nav>

		<article
			v-for="(resultValue, resultIndex) in offersData.results"
			:key="resultIndex"
		>
			<details :open="resultIndex === 0">
				<summary class="offers__summary">
					<h3 class="offers__title">#{{ resultIndex + 1 }}</h3>
				</summary>
				<ul>
					<li
						v-for="(propertyValue, propertyName) in resultValue"
						:key="propertyName"
					>
						<template v-if="isEmpty(propertyValue)">
							<p>
								<strong>{{ propertyName }}:</strong>
								<span>---</span>
							</p>
						</template>
						<template v-else>
							<template v-if="isListArray(propertyValue)">
								<p>
									<strong>{{ propertyName }}:</strong>
									<span v-if="isEmpty(propertyValue)">
										---
									</span>
									<span
										class="offers__image"
										v-else-if="isImage(propertyValue)"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										/>
									</span>
									<span
										class="offers__icon"
										v-else-if="isIcon(propertyValue)"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										/>
									</span>
									<span
										class="offers__link"
										v-else-if="isLink(propertyValue)"
									>
										<a
											:href="propertyValue"
											target="_blank"
											rel="noopener noreferrer"
										>
											{{ propertyValue }}
										</a>
									</span>
									<span v-else-if="propertyValue.length > 1">
										{{
											propertyValue
												.slice(0, -1)
												.join(", ")
										}}
										y
										{{
											propertyValue[
												propertyValue.length - 1
											]
										}}
									</span>
									<span v-else>
										{{ propertyValue[0] }}
									</span>
								</p>
							</template>
							<template v-else-if="isListObject(propertyValue)">
								<strong>{{ propertyName }}:</strong>
								<ul>
									<li
										v-for="(
											dataValue, dataIndex
										) in propertyValue"
										:key="dataIndex"
									>
										<p>
											<strong>{{ dataIndex }}:</strong>
											<span v-if="isEmpty(dataValue)">
												---
											</span>
											<span
												class="offers__image"
												v-else-if="isImage(dataValue)"
											>
												<img
													:src="dataValue"
													:alt="dataValue"
												/>
											</span>
											<span
												class="offers__icon"
												v-else-if="isIcon(dataValue)"
											>
												<img
													:src="dataValue"
													:alt="dataValue"
												/>
											</span>
											<span
												class="offers__link"
												v-else-if="isLink(dataValue)"
											>
												<a
													:href="dataValue"
													target="_blank"
													rel="noopener noreferrer"
												>
													{{ dataValue }}
												</a>
											</span>
											<span v-else>{{ dataValue }}</span>
										</p>
									</li>
								</ul>
							</template>
							<template
								v-else-if="isListArrayObject(propertyValue)"
							>
								<strong>{{ propertyName }}:</strong>
								<ul>
									<li
										v-for="(
											dataValue, dataIndex
										) in propertyValue"
										:key="dataIndex"
									>
										<strong>#{{ dataIndex }}:</strong>
										<ul>
											<li
												v-for="(
													itemObj, indexObj
												) in dataValue"
												:key="indexObj"
											>
												<p>
													<strong>
														{{ indexObj }}:
													</strong>
													<span
														v-if="isEmpty(itemObj)"
													>
														---
													</span>
													<span
														class="offers__image"
														v-else-if="
															isImage(itemObj)
														"
													>
														<img
															:src="itemObj"
															:alt="itemObj"
														/>
													</span>
													<span
														class="offers__icon"
														v-else-if="
															isIcon(itemObj)
														"
													>
														<img
															:src="itemObj"
															:alt="itemObj"
														/>
													</span>
													<span
														class="offers__link"
														v-else-if="
															isLink(itemObj)
														"
													>
														<a
															:href="itemObj"
															target="_blank"
															rel="noopener noreferrer"
														>
															{{ itemObj }}
														</a>
													</span>
													<span v-else>
														{{ itemObj }}
													</span>
												</p>
											</li>
										</ul>
									</li>
								</ul>
							</template>
							<template v-else>
								<p>
									<strong>{{ propertyName }}:</strong>
									<span v-if="isEmpty(propertyValue)">
										---
									</span>
									<span
										class="offers__image"
										v-else-if="isImage(propertyValue)"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										/>
									</span>
									<span
										class="offers__icon"
										v-else-if="isIcon(propertyValue)"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										/>
									</span>
									<span
										class="offers__link"
										v-else-if="isLink(propertyValue)"
									>
										<a
											:href="propertyValue"
											target="_blank"
											rel="noopener noreferrer"
										>
											{{ propertyValue }}
										</a>
									</span>
									<span v-else>{{ propertyValue }}</span>
								</p>
							</template>
						</template>
					</li>
				</ul>
			</details>
		</article>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import UIMessage from "@/components/UI/UIMessage.vue";

export default {
	name: "SectionOffers",
	components: {
		UIMessage,
	},
	data() {
		return {
			offersData: {},
			responseMessage: "",
		};
	},
	computed: {
		...mapGetters(["getToken"]),
	},
	async mounted() {
		await this.fetchData(
			"https://backend.dev.woowbe.com/api/v1/offers/public/",
		);
	},
	methods: {
		async fetchData(url) {
			try {
				const response = await fetch(url, {
					headers: {
						Authorization: `Bearer ${this.getToken}`,
					},
				});
				if (response.ok) {
					const data = await response.json();
					this.offersData = data;
				} else {
					throw new Error("Error when obtaining offer data");
				}
			} catch (error) {
				this.responseMessage = error.message;
			}
		},
		getPageNumberCurrent(url) {
			const params = new URLSearchParams(new URL(url).search);
			const pageNumber = params.get("page");

			return pageNumber ? pageNumber - 1 : "";
		},
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
</script>

<style lang="scss" scoped>
.offers {
	text-align: left;

	&__summary {
		cursor: pointer;
	}

	&__title {
		margin: 0;
		display: inline-block;
	}

	&__image,
	&__icon {
		width: 100%;
		display: flex;

		img {
			width: 100%;
			display: flex;
		}
	}

	&__image {
		max-width: 20rem;
	}

	&__icon {
		max-width: 3rem;
	}
}
</style>
