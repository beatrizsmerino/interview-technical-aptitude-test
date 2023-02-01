<template>
	<div>
		<el-input
			v-model="latitude"
			placeholder="Latitude"
		/>
		<el-input
			v-model="altitude"
			placeholder="Altitude"
		/>
		<client-only>
			<l-map
				style="height: 350px;"
				:zoom="zoom"
				:center="center"
			>
				<l-tile-layer
					:url="url"
					:attribution="attribution"
				/>
				<l-marker
					draggable
					:lat-lng="getCoords"
					@dragend="setCoords"
				>
					<l-tooltip>Hello!</l-tooltip>
				</l-marker>
			</l-map>
		</client-only>
	</div>
</template>

<script>
	export default {
		"name": "TestComponent",
		data() {
			return {
				"latitude": 40.4357604633955,
				"altitude": -3.6865084995701385,
			};
		},
		"computed": {
			getCoords() {
				return [
					this.latitude,
					this.altitude,
				];
			},
		},
		"methods": {
			setCoords(e) {
				const currentCoords = e.target.getLatLng();
				this.latitude = currentCoords.lat;
				this.altitude = currentCoords.lng;
			},
		},
	};
</script>
