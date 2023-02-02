<template>
	<div>
		<!-- Coordinates input-->
		<el-input
			v-model="form.position.coordinates[0]"
			placeholder="Latitude"
		/>
		<el-input
			v-model="form.position.coordinates[1]"
			placeholder="Altitude"
		/>

		<!-- MAP -->
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
					:lat-lng="markerLatLng"
					@dragend="getMarkerPosition"
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
				"form": {
					"name": "",
					"position": {
						"type": "",
						"coordinates": [],
					},
				},
				"zoom": 12,
				"center": [],
				"url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				"attribution":
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

				// Example coordinates.
				"markerLatLng": [
					40.4357604633955,
					-3.6865084995701385,
				],
			};
		},
		mounted() {
			this.center = this.markerLatLng;
			this.form.position.coordinates = this.markerLatLng;
		},
		"methods": {
			getMarkerPosition(e) {
				const coordinates = e.target.getLatLng();
				this.markerLatLng[0] = coordinates.lat;
				this.markerLatLng[1] = coordinates.lng;

				this.form.position.coordinates = this.markerLatLng;

				console.log(
					"Detect the change and display the array with the new coordinates.",
					this.markerLatLng,
				);
				console.log(
					"Detects the change and displays the changed value.",
					this.form.position.coordinates,
				);
			},
		},
	};
</script>
