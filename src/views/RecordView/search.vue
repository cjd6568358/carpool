<template>
	<div class="record-search-page">
		<NavBar :leftBtns="['back']" @backClick="backClick" title="快捷查询"></NavBar>
		<div class="overflow-container">
			<div class="search">
				<input type="tel" v-model="key" autofocus placeholder="请输入手机号查询" @input="searchRecords">
			</div>
			<recordList :records="currRecords" :showContact="showContact" :showEdit="showEdit" :showDelete="showDelete" @reload="searchRecords" @editRecord="bindeditRecord"></recordList>
			<publish class="publish" v-if="!currRecords.length"></publish>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Publish from "../../components/Publish/index.vue";
import RecordList from "../../components/RecordList/index.vue";
export default {
	components: { Publish, RecordList },
	data() {
		let showContact = false;
		let showEdit = false;
		let showDelete = false;
		return {
			key: "",
			showContact,
			showEdit,
			showDelete
		};
	},
	computed: {
		...mapState(["records"]),
		currRecords() {
			return this.records.filter(item => {
				return item.phone.startsWith(this.$data.key);
			});
		}
	},
	mounted() {
		let { mode, key = "" } = this.$route.query;
		let showContact = false;
		let showEdit = false;
		let showDelete = false;
		if (mode === "common") {
			showContact = true;
			showEdit = false;
			showDelete = false;
		} else if (mode === "admin") {
			showContact = false;
			showEdit = true;
			showDelete = true;
		}
		Object.assign(this.$data, {
			key,
			showContact,
			showEdit,
			showDelete
		});
		this.FETCH_ALL_RECORDS();
	},
	methods: {
		...mapActions(["FETCH_ALL_RECORDS"]),
		searchRecords() {
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => {
				this.FETCH_ALL_RECORDS();
			}, 500);
		},
		bindeditRecord(info) {
			this.$router.push(
				`/record/info?mode=edit&recordInfo=${JSON.stringify(info)}`
			);
		},
		backClick() {
			this.$router.replace("/home");
		}
	}
};
</script>
<style lang="scss" scoped>
.record-search-page {
	.search {
		margin-bottom: 20px;
		padding: 20px;
	}

	.search input {
		width: 100%;
		height: 64px;
		line-height: 64px;
		border-radius: 8px;
		padding-left: 35px;
		background-color: #fff;
		border: 1px solid #ddd;
		font-size: 28px;
	}

	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		font-size: 28px;
	}

	.publish {
		margin: 20px auto;
	}
}
</style>
