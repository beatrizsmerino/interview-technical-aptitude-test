<template>
	<section class="offers">
		<h2>Offers</h2>

		<UIMessage :message="responseMessage" />

		<template v-if="offersData">
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
					<li v-if="offersData.previous || offersData.next">
						<strong>Navigation:</strong>
						<button
							:disabled="!offersData.previous"
							@click="fetchData(offersData.previous)"
						>
							Prev
						</button>
						<button
							:disabled="!offersData.next"
							@click="fetchData(offersData.next)"
						>
							Next
						</button>
					</li>
				</ul>
			</nav>

			<article
				v-for="(resultValue, resultIndex) in offersData.results"
				:key="resultIndex"
			>
				<details :open="resultIndex === 0">
					<summary class="offers__summary">
						<h3 class="offers__title">
							<span>#{{ (resultIndex + 1).toString().padStart(2, "0") }}</span>
							<span>{{ resultValue.name }}</span>
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
											class="offers__image"
										>
											<img
												:src="propertyValue"
												:alt="propertyValue"
											>
										</span>
										<span
											v-else-if="isIcon(propertyValue)"
											class="offers__icon"
										>
											<img
												:src="propertyValue"
												:alt="propertyValue"
											>
										</span>
										<span
											v-else-if="isLink(propertyValue)"
											class="offers__link"
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
													class="offers__image"
												>
													<img
														:src="dataValue"
														:alt="dataValue"
													>
												</span>
												<span
													v-else-if="isIcon(dataValue)"
													class="offers__icon"
												>
													<img
														:src="dataValue"
														:alt="dataValue"
													>
												</span>
												<span
													v-else-if="isLink(dataValue)"
													class="offers__link"
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
															class="offers__image"
														>
															<img
																:src="itemObj"
																:alt="itemObj"
															>
														</span>
														<span
															v-else-if="isIcon(itemObj)"
															class="offers__icon"
														>
															<img
																:src="itemObj"
																:alt="itemObj"
															>
														</span>
														<span
															v-else-if="isLink(itemObj)"
															class="offers__link"
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
											class="offers__image"
										>
											<img
												:src="propertyValue"
												:alt="propertyValue"
											>
										</span>
										<span
											v-else-if="isIcon(propertyValue)"
											class="offers__icon"
										>
											<img
												:src="propertyValue"
												:alt="propertyValue"
											>
										</span>
										<span
											v-else-if="isLink(propertyValue)"
											class="offers__link"
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
		</template>
	</section>
</template>

<script>
	import { mapGetters } from "vuex";
	import globalMixins from "@/plugins/global-mixins.js";
	import UIMessage from "@/components/UI/UIMessage.vue";

	export default {
		"name": "SectionOffers",
		"components": {
			UIMessage,
		},
		"mixins": [
			globalMixins,
		],
		data() {
			return {
				"offersData": {},
				"responseMessage": "",
			};
		},
		"computed": {
			...mapGetters([
				"getToken",
			]),
		},
		async mounted() {
			await this.fetchData("https://backend.dev.woowbe.com/api/v1/offers/public/");
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
						this.setData(data);
					} else {
						throw new Error("Error when obtaining offer data");
					}
				} catch (error) {
					this.responseMessage = error.message;
				}
			},
			setData(data) {
				this.offersData = data;
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
	.offers {
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
