<template>
	<ul>
		<li
			v-for="(propertyValueLevel1, propertyNameLevel1) in resultValueSaved"
			:key="propertyNameLevel1"
		>
			<template v-if="isEmpty(propertyValueLevel1)">
				<p>
					<strong>{{ propertyNameLevel1 }}:</strong>
					<span>---</span>
				</p>
			</template>
			<template v-else>
				<template v-if="isListArray(propertyValueLevel1)">
					<p>
						<strong>{{ propertyNameLevel1 }}:</strong>
						<UISectionProperty
							:property-name="propertyNameLevel1"
							:property-value="propertyValueLevel1"
						/>
					</p>
				</template>
				<template v-else-if="isListObject(propertyValueLevel1)">
					<strong>{{ propertyNameLevel1 }}:</strong>
					<ul>
						<li
							v-for="(propertyValueLevel2, propertyNameLevel2) in propertyValueLevel1"
							:key="propertyNameLevel2"
						>
							<template v-if="isListObject(propertyValueLevel2)">
								<strong>{{ propertyNameLevel2 }}:</strong>
								<ul>
									<li
										v-for="(propertyValueLevel3, propertyNameLevel3) in propertyValueLevel2"
										:key="propertyNameLevel3"
									>
										<UISectionProperty
											:property-name="propertyNameLevel3"
											:property-value="propertyValueLevel3"
										/>
									</li>
								</ul>
							</template>
							<template v-else-if="isListArrayObject(propertyValueLevel2)">
								<strong>{{ propertyNameLevel2 }}:</strong>
								<ul>
									<li
										v-for="(propertyValueLevel3, propertyNameLevel3) in propertyValueLevel2"
										:key="propertyNameLevel3"
									>
										<strong>#{{ propertyNameLevel3 }}:</strong>
										<ul>
											<li
												v-for="(propertyValueLevel4, propertyNameLevel4) in propertyValueLevel3"
												:key="propertyNameLevel4"
											>
												<UISectionProperty
													:property-name="propertyNameLevel4"
													:property-value="propertyValueLevel4"
												/>
											</li>
										</ul>
									</li>
								</ul>
							</template>
							<template v-else>
								<UISectionProperty
									:property-name="propertyNameLevel2"
									:property-value="propertyValueLevel2"
								/>
							</template>
						</li>
					</ul>
				</template>
				<template v-else-if="isListArrayObject(propertyValueLevel1)">
					<strong>{{ propertyNameLevel1 }}:</strong>
					<ul>
						<li
							v-for="(propertyValueLevel2, propertyNameLevel2) in propertyValueLevel1"
							:key="propertyNameLevel2"
						>
							<strong>#{{ propertyNameLevel2 }}:</strong>
							<ul>
								<li
									v-for="(propertyValueLevel3, propertyNameLevel3) in propertyValueLevel2"
									:key="propertyNameLevel3"
								>
									<UISectionProperty
										:property-name="propertyNameLevel3"
										:property-value="propertyValueLevel3"
									/>
								</li>
							</ul>
						</li>
					</ul>
				</template>
				<template v-else>
					<UISectionProperty
						:property-name="propertyNameLevel1"
						:property-value="propertyValueLevel1"
					/>
				</template>
			</template>
		</li>
	</ul>
</template>

<script>
	import globalMixins from "@/plugins/global-mixins.js";
	import UISectionProperty from "@/components/UI/Section/UISectionProperty";

	export default {
		"name": "UISectionArticleContent",
		"components": {
			UISectionProperty,
		},
		"mixins": [
			globalMixins,
		],
		"props": {
			"resultValue": {
				"type": Object,
				"required": true,
			},
		},
		data() {
			return {
				"resultValueSaved": this.resultValue,
			};
		},
	};
</script>
