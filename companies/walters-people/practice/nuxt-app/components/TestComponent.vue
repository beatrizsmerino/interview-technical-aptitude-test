<template>
	<div>
		<!-- Coordinates input-->
		<el-input placeholder="Latitude" v-model="form.coordinates[0]"></el-input>
		<el-input placeholder="Altitude" v-model="form.coordinates[1]"></el-input>

		<!-- MAP -->
		<client-only>
			<l-map style="height: 350px;" :zoom="zoom" :center="center">

				<l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

				<l-marker draggable :lat-lng="markerLatLng" @dragend="getMarkerPosition">
					<l-tooltip>Hello!</l-tooltip>
				</l-marker>
			
			</l-map>
		</client-only>

	</div>
</template>

<script>
export default {
	name: "TestComponent",
	data() {
		return {
			form: {
				name: '',
				position: {
					type: '',
					coordinates: [],
				},
			},
			markerLatLng: [40.4357604633955, -3.6865084995701385], // Example coordinates.
		}
	},
	methods: {
		getMarkerPosition(e) {
			const coordinates = e.target.getLatLng();
			this.markerLatLng[0] = coordinates.lat;
			this.markerLatLng[1] = coordinates.lng;

			this.form.position.coordinates = this.markerLatLng;
			console.log(this.markerLatLng); // Detect the change and display the array with the new coordinates.
			console.log(this.form.position.coordinates); // Detects the change and displays the changed value.
		},
	},
};
</script>
