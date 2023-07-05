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
					<button @click="fetchData(salesData.previous)">
						Prev
					</button>
				</li>
				<li v-if="salesData.next">
					<button @click="fetchData(salesData.next)">
						Next
					</button>
				</li>
			</ul>
		</nav>

		<article
			v-for="(resultValue, resultIndex) in salesData.results"
			:key="resultIndex"
		>
			<details>
				<summary class="sales__summary">
					<h3 class="sales__title">
						#{{ (resultIndex + 1).toString().padStart(2, "0") }} {{ resultValue.business.name }}
					</h3>
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
										v-else-if="isImage(propertyValue)"
										class="sales__image"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										>
									</span>
									<span
										v-else-if="isIcon(propertyValue)"
										class="sales__icon"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										>
									</span>
									<span
										v-else-if="isLink(propertyValue)"
										class="sales__link"
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
										{{ propertyValue.slice(0, -1).join(", ") }}
										y
										{{ propertyValue[propertyValue.length - 1] }}
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
										v-for="(dataValue, dataIndex) in propertyValue"
										:key="dataIndex"
									>
										<template v-if="isListObject(dataValue)">
											<strong>{{ dataIndex }}:</strong>
											<ul>
												<li
													v-for="(itemObj, indexObj) in dataValue"
													:key="indexObj"
												>
													<p>
														<strong>{{ indexObj }}:</strong>
														<span v-if="isEmpty(itemObj)">
															---
														</span>
														<span
															v-else-if="isImage(itemObj)"
															class="sales__image"
														>
															<img
																:src="itemObj"
																:alt="itemObj"
															>
														</span>
														<span
															v-else-if="isIcon(itemObj)"
															class="sales__icon"
														>
															<img
																:src="itemObj"
																:alt="itemObj"
															>
														</span>
														<span
															v-else-if="isLink(itemObj)"
															class="sales__link"
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
										<template v-else-if="isListArrayObject(dataValue)">
											<strong>{{ dataIndex }}:</strong>
											<ul>
												<li
													v-for="(itemObj, indexObj) in dataValue"
													:key="indexObj"
												>
													<strong>#{{ indexObj }}:</strong>
													<ul>
														<li
															v-for="(item, index) in itemObj"
															:key="index"
														>
															<p>
																<strong>{{ index }}:</strong>
																<span v-if="isEmpty(item)">
																	---
																</span>
																<span
																	v-else-if="isImage(item)"
																	class="sales__image"
																>
																	<img
																		:src="item"
																		:alt="item"
																	>
																</span>
																<span
																	v-else-if="isIcon(item)"
																	class="sales__icon"
																>
																	<img
																		:src="item"
																		:alt="item"
																	>
																</span>
																<span
																	v-else-if="isLink(item)"
																	class="sales__link"
																>
																	<a
																		:href="item"
																		target="_blank"
																		rel="noopener noreferrer"
																	>
																		{{ item }}
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
												<strong>{{ dataIndex }}:</strong>
												<span v-if="isEmpty(dataValue)">
													---
												</span>
												<span
													v-else-if="isImage(dataValue)"
													class="sales__image"
												>
													<img
														:src="dataValue"
														:alt="dataValue"
													>
												</span>
												<span
													v-else-if="isIcon(dataValue)"
													class="sales__icon"
												>
													<img
														:src="dataValue"
														:alt="dataValue"
													>
												</span>
												<span
													v-else-if="isLink(dataValue)"
													class="sales__link"
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
							<template v-else-if="isListArrayObject(propertyValue)">
								<strong>{{ propertyName }}:</strong>
								<ul>
									<li
										v-for="(dataValue, dataIndex) in propertyValue"
										:key="dataIndex"
									>
										<strong>#{{ dataIndex }}:</strong>
										<ul>
											<li
												v-for="(itemObj, indexObj) in dataValue"
												:key="indexObj"
											>
												<p>
													<strong>{{ indexObj }}:</strong>
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
	import globalMixins from "@/plugins/global-mixins.js";
	import UIMessage from "@/components/UI/UIMessage.vue";

	export default {
		"name": "SectionSales",
		"components": {
			UIMessage,
		},
		"mixins": [
			globalMixins,
		],
		data() {
			return {
				"salesData": {},
				"responseMessage": "",
			};
		},
		"computed": {
			...mapGetters([
				"getToken",
			]),
		},
		async mounted() {
			await this.fetchData("https://backend.dev.woowbe.com/api/v1/points_of_sales/public/");
		},
		"methods": {
			async fetchData(url) {
				try {
					const response = await fetch(url, {
						"headers": {
							"Authorization": `Bearer ${this.getToken}`,
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
				try {
					if (url) {
						const params = new URLSearchParams(new URL(url).search);
						const pageNumber = params.get("page");

						return pageNumber ? pageNumber - 1 : "";
					}

					return "";
				} catch (error) {
					console.error("Invalid URL:", error);

					return "";
				}
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
			display: inline-block;
			margin: 0;
		}

		&__image,
		&__icon {
			display: flex;
			width: 100%;

			img {
				display: flex;
				width: 100%;
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
