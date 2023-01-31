<template>
	<div class="user-list">
		<el-table
			class="user-list__table"
			:data="getUserList"
			style="width: 100%;"
			height="370"
		>
			<el-table-column
				prop="id"
				label="ID"
				width="80px"
				fixed
			/>
			<el-table-column
				prop="name"
				label="Name"
				width="200px"
			/>
			<el-table-column
				prop="username"
				label="Username"
				width="180px"
			/>
			<el-table-column
				prop="email"
				label="Email"
				width="250px"
			/>
			<el-table-column label="Address">
				<el-table-column
					prop="address.street"
					label="Street"
					width="180px"
				/>
				<el-table-column
					prop="address.suite"
					label="Suite"
					width="120px"
				/>
				<el-table-column
					prop="address.city"
					label="City"
					width="150px"
				/>
				<el-table-column
					prop="address.zipcode"
					label="Zipcode"
					width="140px"
				/>
				<el-table-column label="Geo">
					<el-table-column
						prop="address.geo.lat"
						label="Lat"
						width="120px"
					/>
					<el-table-column
						prop="address.geo.lng"
						label="Lng"
						width="120px"
					/>
				</el-table-column>
			</el-table-column>
			<el-table-column
				prop="phone"
				label="Phone"
				width="200px"
			/>
			<el-table-column
				prop="website"
				label="Website"
				width="140px"
			/>
			<el-table-column label="Company">
				<el-table-column
					prop="company.name"
					label="Name"
					width="180px"
				/>
				<el-table-column
					prop="company.catchPhrase"
					label="catchPhrase"
					width="180px"
				/>
				<el-table-column
					prop="company.bs"
					label="Bs"
					width="180px"
				/>
			</el-table-column>
			<el-table-column
				label="Acciones"
				fixed="right"
				width="150px"
			>
				<template slot-scope="scope">
					<el-button
						type="primary"
						icon="el-icon-edit"
						size="medium"
						@click="handleEditUser(scope.$index, scope.row)"
					/>
					<el-button
						type="danger"
						icon="el-icon-delete"
						size="medium"
						@click="handleDeleteUser(scope.$index, scope.row)"
					/>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {
		mapActions, mapGetters,
	} from "vuex";

	export default {
		"name": "UserList",
		"computed": {
			...mapGetters([
				"getUserList",
			]),
		},
		mounted() {
			this.fetchUserList();
		},
		"methods": {
			...mapActions([
				"fetchUserList",
				"deleteUser",
			]),
			handleEditUser(userIndex, user) {
				console.log(userIndex, user);
			},
			handleDeleteUser(userIndex, user) {
				this.deleteUser(user);
				console.log(userIndex, user);
			},
		},
	};
</script>
