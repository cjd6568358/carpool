<template>
	<div class="home-page">
		<div class="overflow-container">
			<!-- <Publish class="publish"></Publish> -->
			<Form :dynamic="{ mode:'search' }" @submit="onSearch"></Form>
			<RecordList :records="currRecords"></RecordList>
		</div>
		<TabBar></TabBar>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Form from "../../components/Form/index.vue";
import Publish from "../../components/Publish/index.vue";
import RecordList from "../../components/RecordList/index.vue";
export default {
	components: { Form, Publish, RecordList },
	data() {
		return {
			searchParams: {}
		};
	},
	computed: {
		...mapState(["records"]),
		currRecords() {
			let {
				fromCity,
				toCity,
				orderType,
				year,
				month,
				day,
				free
			} = this.searchParams;
			let tmpArr = [];
			if (!fromCity) {
				return tmpArr;
			}
			let fromCityArr = fromCity.split("-");
			let toCityArr = toCity.split("-");
			tmpArr = this.records.filter(item => {
				if (
					item.orderType !== orderType &&
					item.year === year &&
					item.month === month &&
					item.day === day &&
					free <= item.free &&
					(item.fromCity === fromCity ||
						(item.fromCity.startsWith(fromCityArr[0]) &&
							fromCityArr[1] === "不限")) &&
					(item.toCity === toCity ||
						(item.toCity.startsWith(toCityArr[0]) &&
							toCityArr[1] === "不限"))
				) {
					return true;
				} else {
					return false;
				}
			});
			tmpArr.sort((a, b) => {
				return b.time - a.time;
			});
			return tmpArr;
		}
	},
	mounted() {},
	methods: {
		...mapActions(["FETCH_ALL_RECORDS"]),
		onSearch({
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
			remark
		}) {
			this.$data.searchParams = {
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
				remark
			};
			this.$Toast.info("正在为您查询中...");
			this.FETCH_ALL_RECORDS();
		}
	}
};
</script>
<style lang="scss" scoped>
.home-page {
}
</style>
