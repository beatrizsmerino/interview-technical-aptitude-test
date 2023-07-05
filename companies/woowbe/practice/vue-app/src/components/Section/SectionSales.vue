<template>
	<section class="sales">
		<h2>Points of sales</h2>

		<UIMessage :message="responseMessage" />

		<nav>
			<ul>
				<li>
					<strong>Results found:</strong>
					<span>{{ salesData.count }}</span>
				</li>
				<li>
					<strong>Current page:</strong>
					<span>{{ getPageNumberCurrent(salesData.next) }}</span>
				</li>
				<li v-if="salesData.previous">
					<button @click="fetchData(salesData.previous)">Prev</button>
				</li>
				<li v-if="salesData.next">
					<button @click="fetchData(salesData.next)">Next</button>
				</li>
			</ul>
		</nav>

		<article
			v-for="(resultValue, resultIndex) in salesData.results"
			:key="resultIndex"
		>
			<details :open="resultIndex === 0">
				<summary class="sales__summary">
					<h3 class="sales__title">#{{ resultIndex + 1 }}</h3>
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
										class="sales__image"
										v-else-if="isImage(propertyValue)"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										/>
									</span>
									<span
										class="sales__icon"
										v-else-if="isIcon(propertyValue)"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										/>
									</span>
									<span
										class="sales__link"
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
										<template
											v-if="isListObject(dataValue)"
										>
											<strong>{{ dataIndex }}:</strong>
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
															v-if="
																isEmpty(itemObj)
															"
														>
															---
														</span>
														<span
															class="sales__image"
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
															class="sales__icon"
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
															class="sales__link"
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
										</template>
										<template
											v-else-if="
												isListArrayObject(dataValue)
											"
										>
											<strong>{{ dataIndex }}:</strong>
											<ul>
												<li
													v-for="(
														itemObj, indexObj
													) in dataValue"
													:key="indexObj"
												>
													<strong>
														#{{ indexObj }}:
													</strong>
													<ul>
														<li
															v-for="(
																item, index
															) in itemObj"
															:key="index"
														>
															<p>
																<strong>
																	{{ index }}:
																</strong>
																<span
																	v-if="
																		isEmpty(
																			item,
																		)
																	"
																>
																	---
																</span>
																<span
																	class="sales__image"
																	v-else-if="
																		isImage(
																			item,
																		)
																	"
																>
																	<img
																		:src="
																			item
																		"
																		:alt="
																			item
																		"
																	/>
																</span>
																<span
																	class="sales__icon"
																	v-else-if="
																		isIcon(
																			item,
																		)
																	"
																>
																	<img
																		:src="
																			item
																		"
																		:alt="
																			item
																		"
																	/>
																</span>
																<span
																	class="sales__link"
																	v-else-if="
																		isLink(
																			item,
																		)
																	"
																>
																	<a
																		:href="
																			item
																		"
																		target="_blank"
																		rel="noopener noreferrer"
																	>
																		{{
																			item
																		}}
																	</a>
																</span>
																<span v-else>
																	{{ item }}
																</span>
															</p>
														</li>
													</ul>
												</li>
											</ul>
										</template>
										<template v-else>
											<p>
												<strong>
													{{ dataIndex }}:
												</strong>
												<span v-if="isEmpty(dataValue)">
													---
												</span>
												<span
													class="sales__image"
													v-else-if="
														isImage(dataValue)
													"
												>
													<img
														:src="dataValue"
														:alt="dataValue"
													/>
												</span>
												<span
													class="sales__icon"
													v-else-if="
														isIcon(dataValue)
													"
												>
													<img
														:src="dataValue"
														:alt="dataValue"
													/>
												</span>
												<span
													class="sales__link"
													v-else-if="
														isLink(dataValue)
													"
												>
													<a
														:href="dataValue"
														target="_blank"
														rel="noopener noreferrer"
													>
														{{ dataValue }}
													</a>
												</span>
												<span v-else>
													{{ dataValue }}
												</span>
											</p>
										</template>
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
													<span>{{ itemObj }}</span>
												</p>
											</li>
										</ul>
									</li>
								</ul>
							</template>
							<template v-else>
								<p>
									<strong>{{ propertyName }}:</strong>
									<span>{{ propertyValue }}</span>
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
	name: "SectionSales",
	components: {
		UIMessage,
	},
	data() {
		return {
			salesData: {},
			responseMessage: "",
		};
	},
	computed: {
		...mapGetters(["getToken"]),
	},
	async mounted() {
		await this.fetchData(
			"https://backend.dev.woowbe.com/api/v1/points_of_sales/public/",
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
					this.salesData = data;
				} else {
					throw new Error("Error in obtaining sales points");
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
.sales {
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
