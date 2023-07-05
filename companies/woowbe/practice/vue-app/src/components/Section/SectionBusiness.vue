<template>
	<section class="business">
		<h2>Business</h2>

		<UIMessage :message="responseMessage" />

		<nav>
			<ul>
				<li>
					<strong>Results found:</strong>
					<span>{{ businessData.count }}</span>
				</li>
				<li>
					<strong>Current page:</strong>
					<span>{{ getPageNumberCurrent(businessData.next) }}</span>
				</li>
				<li v-if="businessData.previous">
					<button @click="fetchData(businessData.previous)">
						Prev
					</button>
				</li>
				<li v-if="businessData.next">
					<button @click="fetchData(businessData.next)">
						Next
					</button>
				</li>
			</ul>
		</nav>

		<article
			v-for="(resultValue, resultIndex) in businessData.results"
			:key="resultValue.id"
		>
			<details>
				<summary class="business__summary">
					<h3 class="business__title">
						#{{ (resultIndex + 1).toString().padStart(2, "0") }} {{ resultValue.name }}
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
										class="business__image"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										>
									</span>
									<span
										v-else-if="isIcon(propertyValue)"
										class="business__icon"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										>
									</span>
									<span
										v-else-if="isLink(propertyValue)"
										class="business__link"
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
										<p>
											<strong>{{ dataIndex }}:</strong>
											<span v-if="isEmpty(dataValue)">
												---
											</span>
											<span
												v-else-if="isImage(dataValue)"
												class="business__image"
											>
												<img
													:src="dataValue"
													:alt="dataValue"
												>
											</span>
											<span
												v-else-if="isIcon(dataValue)"
												class="business__icon"
											>
												<img
													:src="dataValue"
													:alt="dataValue"
												>
											</span>
											<span
												v-else-if="isLink(dataValue)"
												class="business__link"
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
													<span v-if="isEmpty(itemObj)">
														---
													</span>
													<span
														v-else-if="isImage(itemObj)"
														class="business__image"
													>
														<img
															:src="itemObj"
															:alt="itemObj"
														>
													</span>
													<span
														v-else-if="isIcon(itemObj)"
														class="business__icon"
													>
														<img
															:src="itemObj"
															:alt="itemObj"
														>
													</span>
													<span
														v-else-if="isLink(itemObj)"
														class="business__link"
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
										v-else-if="isImage(propertyValue)"
										class="business__image"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										>
									</span>
									<span
										v-else-if="isIcon(propertyValue)"
										class="business__icon"
									>
										<img
											:src="propertyValue"
											:alt="propertyValue"
										>
									</span>
									<span
										v-else-if="isLink(propertyValue)"
										class="business__link"
									>
										<a
											:href="propertyValue"
											target="_blank"
											rel="noopener noreferrer"
										>
											{{ propertyValue }}
										</a>
									</span>
									<span v-else>
										{{ propertyValue }}
									</span>
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
		"name": "SectionBusiness",
		"components": {
			UIMessage,
		},
		"mixins": [
			globalMixins,
		],
		data() {
			return {
				"businessData": [],
				"responseMessage": "",
			};
		},
		"computed": {
			...mapGetters([
				"getToken",
			]),
		},
		async mounted() {
			await this.fetchData("https://backend.dev.woowbe.com/api/v1/business/public/");
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
						this.businessData = data;
					} else {
						throw new Error("Error in obtaining business data");
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
	.business {
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
