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
				type,
				year,
				month,
				day,
				free
			} = this.searchParams;
			if (!fromCity) {
				return [];
			}
			let fromCityArr = fromCity.split("-");
			let toCityArr = toCity.split("-");
			return this.records.filter(item => {
				if (
					item.type !== type &&
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
		}
	},
	mounted() {},
	methods: {
		...mapActions(["FETCH_ALL_RECORDS"]),
		onSearch({
			mode,
			type,
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
				type,
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
	.publish {
		position: fixed;
		right: 50px;
		top: 20px;
	}
}
</style>
