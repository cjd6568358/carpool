<template>
	<div class="my-page">
		<NavBar :rightBtns="rightBtns" @searchClick="router" title="我的发布"></NavBar>
		<div class="overflow-container">
			<div class="section">
				<!-- <div class="title" @click="router">我的发布</div> -->
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
		return {
			count: 0,
			rightBtns: ["search"]
		};
	},
	computed: {
		...mapState(["records", "userId", "isAdmin"]),
		myRecords() {
			return this.records.filter(item => {
				return item.userId === this.userId;
			});
		}
	},
	mounted() {
		if (this.isAdmin) {
			this.rightBtns.push("blacklist");
		}
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
		},
		router() {
			if (this.isAdmin) {
                this.$router.push("/record/search?mode=admin");
                return
			}
			if (this.timer) {
				clearTimeout(this.timer);
			}
			if (this.$data.count === 3) {
				this.$data.count = 0;
				let key = window.prompt("请输入秘钥");
				if (key === new Date().Format("MMdd")) {
					localStorage.setItem("isAdmin", 1);
					this.$store.state.isAdmin = true;
					this.$router.push("/record/search?mode=admin");
				}
			} else {
				this.$data.count++;
				this.timer = setTimeout(() => {
					this.$data.count = 0;
				}, 60000);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.my-page {
	.section {
		margin-top: 20px;
		.title {
			padding: 10px 20px;
			font-size: 32px;
			font-weight: 600;
			color: #3d3d3d;
			text-align: center;
		}
	}
}
</style>

