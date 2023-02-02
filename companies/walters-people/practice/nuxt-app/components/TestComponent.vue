<template>
	<el-row
		class="map"
		:gutter="20"
	>
		<el-col :span="24">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-input
						v-model="latitude"
						placeholder="Latitude"
					/>
				</el-col>
				<el-col :span="12">
					<el-input
						v-model="altitude"
						placeholder="Altitude"
					/>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<el-col :span="24">
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
				</el-col>
			</el-row>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		"name": "TestComponent",
		data() {
			return {
				"zoom": 12,
				"center": [],
				"url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				"attribution": '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
		mounted() {
			this.center = this.getCoords;
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

<style lang="scss" scoped>
	.map {
		:deep(.el-row) {
			margin-bottom: 20px;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
