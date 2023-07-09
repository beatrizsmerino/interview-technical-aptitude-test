<template>
	<ul>
		<li
			v-for="(propertyValueLevel1, propertyNameLevel1) in resultValueSaved"
			:key="propertyNameLevel1"
		>
			<template v-if="isListObject(propertyValueLevel1)">
				<strong>{{ propertyNameLevel1 }}:</strong>
				<ul>
					<li
						v-for="(propertyValueLevel2, propertyNameLevel2) in propertyValueLevel1"
						:key="propertyNameLevel2"
					>
						<template v-if="isListObject(propertyValueLevel2)">
							<strong>{{ propertyNameLevel2 }}:</strong>
							<UITable :table-data="propertyValueLevel2" />
						</template>
						<template v-else-if="isListArrayObject(propertyValueLevel2)">
							<strong>{{ propertyNameLevel2 }}:</strong>
							<UITable :table-data="propertyValueLevel2" />
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
				<UITable :table-data="propertyValueLevel1" />
			</template>
			<template v-else>
				<UISectionProperty
					:property-name="propertyNameLevel1"
					:property-value="propertyValueLevel1"
				/>
			</template>
		</li>
	</ul>
</template>

<script>
	import UISectionProperty from "@/components/UI/Section/UISectionProperty";
	import UITable from "@/components/UI/UITable";

	export default {
		"name": "UISectionArticleContent",
		"components": {
			UISectionProperty,
			UITable,
		},
		"props": {
			"resultValue": {
				"type": Object,
				"required": true,
			},
		},
		data() {
			return {
				"resultValueSaved": this.sortProperties(this.resultValue),
			};
		},
	};
</script>
