<template>
	<div class="records">
		<div class="record" v-for="(item,index) of records" :key="index">
			<div class="detail">
				<div class="from-to">
					<template v-if="showEdit">[{{item.type === 1 ? '人找车':'车找人'}}]</template>
					{{item.fromCity}} → {{item.toCity}}
				</div>
				<div class="name">{{item.type === 1 ? '乘客':'车主'}} : {{item.name}}</div>
				<div class="free">空座 : {{item.free}}</div>
				<div class="fee">费用 : {{item.fee}}</div>
				<div class="remark">{{item.remark}}</div>
			</div>
			<div class="action">
				<a class="contact-btn btn" v-if="showContact" :href="'tel:' + item.phone" size="mini" v-dc="`用户:${userId} 联系了${item.type === 1 ? '乘客':'车主'}${item.phone}`">联系我</a>
				<button class="edit-btn btn" v-if="showEdit" @click="bindEdit(item)" type="default" size="mini">编辑</button>
				<button class="delete-btn btn" v-if="showDelete" @click="bindDelete(item)" type="warn" size="mini">删除</button>
			</div>
		</div>
		<div v-if="!records.length" class="record empty">暂无数据</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
	props: {
		records: {
			type: Array,
			default: []
		},
		showContact: {
			type: Boolean,
			default: true
		},
		showEdit: {
			type: Boolean,
			default: false
		},
		showDelete: {
			type: Boolean,
			default: false
		}
	},
	computed: {
        ...mapState(["userId"]),
    },
	methods: {
		...mapActions(["FETCH_ALL_RECORDS", "UPDATE_ALL_RECORDS"]),
		bindEdit(record) {
			this.$emit("editRecord", record);
		},
		async bindDelete(record) {
			if (confirm("是否确认删除?")) {
				await this.FETCH_ALL_RECORDS();
				records = this.$store.state.records.filter(
					item => item.orderId !== record.orderId
				);
				await this.UPDATE_ALL_RECORDS(records);
				this.$Toast.info("删除成功!");
				this.$emit("reload", {});
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.records {
	margin: 0 20px;
	font-size: 28px;
}

.record {
	background-color: #fff;
	border-radius: 8px;
	padding: 20px;
    display: flex;
    box-shadow: 1px 1px 16px 0 rgba(0, 0, 0, 0.4);
	& + .record {
		margin-top: 20px;
	}
}

.from-to {
	width: 100%;
	text-align: center;
	margin-bottom: 20px;
}

.detail {
	display: flex;
	flex-wrap: wrap;
	flex: 1;
}

.name,
.free,
.fee {
	flex: 1;
	text-align: center;
}

.remark {
	width: 100%;
	font-size: 26px;
	color: #a3a3a3;
	margin-top: 10px;
}

.action {
	margin-left: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.contact-btn {
		background-color: #04be02;
	}
	.btn + .btn {
		margin-top: 10px;
	}
	a[size="mini"] {
		border-radius: 10px;
		color: #fff;
		display: inline-block;
		line-height: 2.3;
		font-size: 26px;
		padding: 0 1.34em;
	}
}

.empty {
	height: 160px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
