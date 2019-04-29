<template>
	<div class="blacklist-page">
		<NavBar :leftBtns="['back']" title="黑名单查询"></NavBar>
		<div class="overflow-container">
			<div class="search">
				<input type="tel" v-model="key" autofocus placeholder="请输入手机号">
				<button @click="addBlackList" type="warn">新增</button>
			</div>
			<ul>
				<li v-for="item in blackList" :key="item">
					<span>{{item}}</span>
					<button @click="del(item)" type="warn">清除</button>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
	components: {},
	data() {
		return {
			key: ""
		};
	},
	computed: {
		...mapState(["blackList"])
	},
	mounted() {
		let { key = "" } = this.$route.query;
		Object.assign(this.$data, {
			key
		});
		this.FETCH_BLACKLIST();
	},
	methods: {
		...mapActions(["FETCH_BLACKLIST", "UPDATE_BLACKLIST"]),
		async addBlackList() {
			let blackList = await this.FETCH_BLACKLIST();
			blackList.push(this.$data.key);
			this.UPDATE_BLACKLIST([...new Set(blackList)]);
			this.$data.key = "";
		},
		async del(info) {
			let blackList = await this.FETCH_BLACKLIST();
			blackList = blackList.filter(item => item !== info);
			this.UPDATE_BLACKLIST(blackList);
		}
	}
};
</script>
<style lang="scss" scoped>
.blacklist-page {
	.search {
		margin-bottom: 20px;
		padding: 20px;
		display: flex;
		input {
			flex: 1;
			height: 64px;
			line-height: 64px;
			border-radius: 8px;
			padding-left: 35px;
			background-color: #fff;
			border: 1px solid #ddd;
			font-size: 28px;
		}
		button {
			margin-left: 20px;
			width: 160px;
			height: 64px;
			line-height: 64px;
		}
	}

	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		font-size: 28px;
	}

	ul {
		padding: 20px;
		li {
			background-color: #fff;
			margin-bottom: 20px;
			display: flex;
			span {
				padding-left: 20px;
				height: 64px;
				line-height: 64px;
				flex: 1;
			}
			button {
				margin-left: 20px;
				width: 160px;
				height: 64px;
				line-height: 64px;
			}
		}
	}
}
</style>
