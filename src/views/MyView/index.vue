<template>
	<div class="my-page">
		<div class="overflow-container">
			<div class="section">
				<div class="title">我的发布</div>
				<recordList @reload="getMyRecords" @editRecord="bindeditRecord" :records="myRecords" :showContact="false" :showEdit="true" :showDelete="true"></recordList>
			</div>
		</div>
		<TabBar></TabBar>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import RecordList from "../../components/RecordList/index.vue";
export default {
	components: { RecordList },
	data() {
		return {};
	},
	computed: {
		...mapState(["records", "userId"]),
		myRecords() {
			return this.records.filter(item => {
				return item.userId === this.userId;
			});
		}
	},
	mounted() {
		this.FETCH_ALL_RECORDS();
	},
	methods: {
		...mapActions(["FETCH_ALL_RECORDS"]),
		getMyRecords() {
			this.$Toast.info("加载中...");
			this.FETCH_ALL_RECORDS();
		},
		bindeditRecord(info) {
			this.$router.push(
				`/record/info?mode=edit&recordInfo=${JSON.stringify(info)}`
			);
		}
	}
};
</script>
<style lang="scss" scoped>
.my-page {
	.section .title {
		padding: 10px 20px;
		font-size: 32px;
		font-weight: 600;
		color: #3d3d3d;
		text-align: center;
	}
}
</style>

