<template>
	<div class="record-info-page">
		<NavBar :leftBtns="['back']" :title="title"></NavBar>
		<div class="overflow-container">
			<Form :dynamic="dynamic" @submit="onSubmit"></Form>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Form from "../../components/Form/index.vue";
import { calculatGUID, sendMsg } from "../../util/index";
export default {
	components: { Form },
	data() {
		return {
			dynamic: {},
			title: "信息发布"
		};
	},
	computed: {
		...mapState(["records", "userId", "blackList"])
	},
	mounted() {
		let { mode, recordInfo: dynamic = {} } = this.$route.query;
		if (typeof dynamic === "string") {
			dynamic = JSON.parse(dynamic);
		}
		if (mode === "add") {
			this.checkHistoryRecord();
		} else if (mode === "edit") {
			this.title = "信息修改";
			dynamic.fromCity = dynamic.fromCity.split("-");
			dynamic.toCity = dynamic.toCity.split("-");
		}
		dynamic.mode = mode;
		this.$data.dynamic = dynamic;
		this.FETCH_BLACKLIST();
	},
	methods: {
		...mapActions([
			"FETCH_ALL_RECORDS",
			"UPDATE_ALL_RECORDS",
			"FETCH_BLACKLIST"
		]),
		async onSubmit({
			mode,
			orderType,
			fromCity,
			toCity,
			phone,
			name,
			year,
			month,
			day,
			free,
			fee,
			remark,
			orderId
		}) {
			if (this.blackList.includes(phone)) {
                alert("该用户已被禁止访问");
				return;
			}
			await this.FETCH_ALL_RECORDS();
			let records = [];
			if (mode === "add") {
				records = this.records;
				sendMsg(
					"拼车小助手",
					`用户:${this.userId} 手机号:${phone} 发布了拼车信息`
				);
			} else if (mode === "edit") {
				records = this.records.filter(item => item.orderId !== orderId);
				sendMsg(
					"拼车小助手",
					`用户:${this.userId} 手机号:${phone} 修改了拼车信息`
				);
			}
			records.push({
				orderType,
				fromCity,
				toCity,
				phone,
				name,
				year,
				month,
				day,
				free,
				fee,
				remark,
				userId: this.userId,
				orderId: calculatGUID(),
				time: Date.now()
			});
			await this.UPDATE_ALL_RECORDS(records);
			this.$router.replace("/home");
		},

		/**
		 * 校验是否存在历史拼车订单
		 */
		async checkHistoryRecord() {
			await this.FETCH_ALL_RECORDS();
			let records = this.records.filter(
				item => item.userId === this.userId
			);
			if (
				records.length &&
				window.confirm(
					`系统检测到您已经发布了${
						records.length
					}条信息,是否需要更新它们?`
				)
			) {
				this.$router.push("/my");
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.record-info-page {
}
</style>
