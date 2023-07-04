<template>
	<section class="offers">
		<h2>Offers data</h2>

		<UIMessage :message="responseMessage" />

		<nav>
			<ul>
				<li>
					<strong>Resultados encontrados:</strong>
					<span>{{ offersData.count }}</span>
				</li>
				<li>
					<strong>Pagina:</strong>
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
				<summary>#{{ resultIndex + 1 }}</summary>
				<div
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
								<span v-if="propertyValue.length > 1">
									{{ propertyValue.slice(0, -1).join(", ") }}
									y
									{{
										propertyValue[propertyValue.length - 1]
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
										<span>{{ dataValue }}</span>
									</p>
								</li>
							</ul>
						</template>
						<template v-else-if="isListArrayObject(propertyValue)">
							<strong>{{ propertyName }}:</strong>
							<ul>
								<li
									v-for="(
										dataValue, dataIndex
									) in propertyValue"
									:key="dataIndex"
								>
									<ul>
										<li
											v-for="(
												itemObj, indexObj
											) in dataValue"
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
				</div>
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
					throw new Error("Error al obtener los datos de ofertas");
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
	},
};
</script>

<style lang="scss" scoped>
.offers {
	text-align: left;
}
</style>
