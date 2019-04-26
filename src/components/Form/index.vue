<template>
	<div class="form-area">
		<div class="form-item type">
			<label class="label">我想要</label>
			<div class="options">
				<div class="item" :class="{ active:local_type === 1 }" @click="local_type = 1">找车</div>
				<div class="item" :class="{ active:local_type === 2 }" @click="local_type = 2">找人</div>
			</div>
		</div>
		<div class="form-item date">
			<label class="label">时间</label>
			<div class="options">
				<div class="item" v-if="!isShowDate" :class="{ active:local_date === today }" @click="local_date = today">今天</div>
				<div class="item" v-if="!isShowDate" :class="{ active:local_date === tomorrow }" @click="local_date = tomorrow">明天</div>
				<div class="item" v-if="!isShowDate" :class="{ active:local_date === dayAfterTomorrow }" @click="local_date = dayAfterTomorrow">后天</div>
				<div class="item" :class="{ active:isShowDate }" @click="isShowDate = !isShowDate">自选</div>
				<input v-if="isShowDate" :min="today" type="date" v-model="local_date">
			</div>
		</div>
		<div class="form-item free">
			<label class="label">空座</label>
			<div class="options">
				<div v-if="local_mode === 'search'" class="item" :class="{ active:local_free === -1 }" @click="local_free = -1">不限</div>
				<div class="item" :class="{ active:local_free === 1 }" @click="local_free = 1">1</div>
				<div class="item" :class="{ active:local_free === 2 }" @click="local_free = 2">2</div>
				<div class="item" :class="{ active:local_free === 3 }" @click="local_free = 3">3</div>
				<div class="item" :class="{ active:local_free === 4 }" @click="local_free = 4">4</div>
			</div>
		</div>
		<div class="form-item fromCity">
			<label class="label">出发地</label>
			<div class="options">
				<div class="picker citylocal_index" @click="selectCityIndex(fromCityIndex,'from')">{{cityList[fromCityIndex]}}</div>
				<span space="nbsp">-</span>
				<div class="picker citylocal_arealocal_index" @click="selectCityAreaIndex(fromCityAreaIndex,'from')">{{fromCityAreaList[fromCityAreaIndex]}}</div>
				<div class="tips">(左侧地区可更改)</div>
			</div>
		</div>
		<div class="form-item toCity">
			<label class="label">目的地</label>
			<div class="options">
				<div class="picker citylocal_index" @click="selectCityIndex(toCityIndex,'to')">{{cityList[toCityIndex]}}</div>
				<span space="nbsp">-</span>
				<div class="picker citylocal_arealocal_index" @click="selectCityAreaIndex(toCityAreaIndex,'to')">{{toCityAreaList[toCityAreaIndex]}}</div>
				<div class="tips">(左侧地区可更改)</div>
			</div>
		</div>
		<div class="form-item name" v-if="local_mode !== 'search'">
			<label class="label">联系人</label>
			<div class="options">
				<input v-model="local_name" placeholder="请输入您的姓名">
			</div>
		</div>
		<div class="form-item fee" v-if="local_mode !== 'search'">
			<label class="label">拼车费用</label>
			<div class="options">
				<input v-model="local_fee" type="number" placeholder="请输入费用">
			</div>
		</div>
		<div class="form-item phone" v-if="local_mode !== 'search'">
			<label class="label require">联系方式</label>
			<div class="options">
				<input maxlength="11" v-model="local_phone" placeholder="请输入您的手机号码" type="tel">
			</div>
		</div>
		<div class="form-item remark" v-if="local_mode !== 'search'">
			<div class="options">
				<textarea v-model="local_remark" class="textarea" maxlength="120" placeholder="具体出发时间，是否有小孩，行李有多少...个性化需求都可以写在这里哦~~"/>
			</div>
		</div>
		<div class="form-buttons" v-if="local_mode === 'add' || local_mode === 'edit'">
			<button class="btn submit" type="primary" @click="bindSubmit">
				<template v-if="local_mode === 'add'">提交</template>
				<template v-else>更新</template>
			</button>
			<button class="btn reset" type="default" @click="bindReset">重置</button>
		</div>
	</div>
</template>
<script>
import { getCurrCityByIP } from "../../util/index";
import cityArea from "./cityArea";
import Picker from "../Picker/index.vue";
export default {
	name: "Form",
	props: {
		dynamic: {
			type: Object,
			default: {}
		}
	},
	data() {
		let now = Date.now();
		let today = new Date(now).Format("yyyy-MM-dd");
		let tomorrow = new Date(now + 1 * 24 * 60 * 60 * 1000).Format(
			"yyyy-MM-dd"
		);
		let dayAfterTomorrow = new Date(now + 2 * 24 * 60 * 60 * 1000).Format(
			"yyyy-MM-dd"
		);
		let local_date = today;
		return {
			local_mode: "add", // 属性初始值（可选），如果未指定则会根据类型选择一个['search','add','view','edit'],
			local_type: 1,
			local_date,
			local_fromCity: ["建湖", "县城"],
			local_toCity: ["上海", "市区"],
			local_free: 1,
			local_fee: 100,
			local_phone: "",
			local_name: "",
			local_remark: "",
			isShowDate: false,
			today,
			tomorrow,
			dayAfterTomorrow,
			cityList: Object.keys(cityArea),
			fromCityIndex: 0,
			fromCityAreaIndex: 0,
			fromCityAreaList: [],
			toCityIndex: 1,
			toCityAreaIndex: 0,
			toCityAreaList: []
		};
	},
	updated() {
		if (this.$data.local_mode === "search") {
			this.bindSubmit();
		}
	},
	async mounted() {
		getCurrCityByIP().then(currCity => {
			let { dynamic } = this.$props;
			Object.keys(dynamic).forEach(key => {
				this.$data["local_" + key] = dynamic[key];
			});
			let {
				dayAfterTomorrow,
				local_mode,
				local_fromCity,
				local_toCity,
				cityList,
				local_year,
				local_month,
				local_day
			} = this.$data;
			if (local_mode === "edit") {
				this.$data.local_date =
					local_year + "-" + local_month + "-" + local_day;
				delete this.$data.local_year;
				delete this.$data.local_month;
				delete this.$data.local_day;
				if (this.$data.local_date > dayAfterTomorrow) {
					this.$data.isShowDate = true;
				}
			}

			if (currCity === "上海市" && local_mode === "search") {
				local_fromCity = ["上海", "市区"];
				local_toCity = ["建湖", "县城"];
			}
			let fromCityIndex = cityList.findIndex(
				item => item === local_fromCity[0]
			);
			let fromCityAreaIndex = cityArea[local_fromCity[0]].findIndex(
				item => item === local_fromCity[1]
			);
			let toCityIndex = cityList.findIndex(
				item => item === local_toCity[0]
			);
			let toCityAreaIndex = cityArea[local_toCity[0]].findIndex(
				item => item === local_toCity[1]
			);

			let fromCityAreaList = cityArea[cityList[fromCityIndex]];
			let toCityAreaList = cityArea[cityList[toCityIndex]];
			Object.assign(this.$data, {
				cityArea,
				cityList,
				local_fromCity,
				fromCityIndex,
				fromCityAreaIndex,
				fromCityAreaList,
				local_toCity,
				toCityIndex,
				toCityAreaIndex,
				toCityAreaList
			});
			this.attachedData = { ...this.$data };
			// console.log("attachedData:", this.attachedData);
		});
	},
	methods: {
		selectCityIndex(index, type) {
			let selectedIndex = [index];
			let pickerData = this.$data.cityList.map((city, i) => {
				return {
					text: city,
					value: city
				};
			});
			this.$openModal({
				customClass: "modal-popup-picker",
				position: "bottom",
				maskClosable: true,
				content: (
					<Picker
						title="请选择城市"
						on-select={(index, val, text) =>
							this.cityPickerChange(index, val, text, type)
						}
						cascade={true}
						selectedIndex={selectedIndex}
						data={pickerData}
					/>
				)
			});
		},
		selectCityAreaIndex(index, type) {
			let selectedIndex = [index];
			let pickerData = this.$data[type + "CityAreaList"].map(
				(area, i) => {
					return {
						text: area,
						value: area
					};
				}
			);
			this.$openModal({
				customClass: "modal-popup-picker",
				position: "bottom",
				maskClosable: true,
				content: (
					<Picker
						title="请选择地区"
						on-select={(index, val, text) =>
							this.cityAreaPickerChange(index, val, text, type)
						}
						cascade={true}
						selectedIndex={selectedIndex}
						data={pickerData}
					/>
				)
			});
		},
		cityPickerChange([index], val, text, type) {
			let { cityList, cityArea } = this.$data;
			let fromCityIndex = 0;
			let toCityIndex = 1;
			let fromCityAreaList = [];
			let toCityAreaList = [];
			if (type === "from") {
				fromCityIndex = index;
				toCityIndex = fromCityIndex + 1;
				if (cityList.length - 1 === fromCityIndex) {
					toCityIndex = 0;
				}
				fromCityAreaList = cityArea[cityList[fromCityIndex]];
				toCityAreaList = cityArea[cityList[toCityIndex]];
			} else {
				toCityIndex = index;
				fromCityIndex = toCityIndex + 1;
				if (cityList.length - 1 === toCityIndex) {
					fromCityIndex = 0;
				}
				fromCityAreaList = cityArea[cityList[fromCityIndex]];
				toCityAreaList = cityArea[cityList[toCityIndex]];
			}
			Object.assign(this.$data, {
				fromCityAreaList,
				toCityAreaList,
				fromCityIndex,
				toCityIndex,
				fromCityAreaIndex: 0,
				toCityAreaIndex: 0
			});
		},
		cityAreaPickerChange([index], val, text, type) {
			this.$data[type + "CityAreaIndex"] = index;
		},
		bindSubmit() {
			let {
				local_mode,
				cityList,
				local_type,
				local_phone,
				local_name,
				local_free,
				local_fee,
				local_remark,
				local_date,
				fromCityAreaIndex,
				fromCityAreaList,
				fromCityIndex,
				toCityAreaIndex,
				toCityAreaList,
				toCityIndex
			} = this.$data;
			let [year, month, day] = new Date(local_date)
				.Format("yyyy-MM-dd")
				.split("-");
			if (!cityList) {
				return;
			}
			if (local_mode === "add" || local_mode === "edit") {
				if (!/^0?1[123456789]\d{9}$/.test(local_phone)) {
					this.$Toast.info("请输入正确的手机号");
					return;
				}
			}
			let fromCity =
				cityList[fromCityIndex] +
				"-" +
				fromCityAreaList[fromCityAreaIndex];
			let toCity =
				cityList[toCityIndex] + "-" + toCityAreaList[toCityAreaIndex];
			let params = {
				mode: local_mode,
				type: local_type,
				phone: local_phone,
				name: local_name,
				free: local_free,
				fee: local_fee,
				remark: local_remark,
				fromCity,
				toCity,
				year,
				month,
				day
			};
			if (local_mode === "edit") {
				params.orderId = this.$data.local_orderId;
			}
			this.$emit("submit", params);
		},
		bindReset() {
			Object.assign(this.$data, this.attachedData);
		}
	}
};
</script>

<style lang="scss" scoped>
.form-area {
	background-color: #f5f5f5;
	font-size: 28px;
	line-height: 40px;
	padding: 20px;
}

.form-item {
	background-color: #fff;
	padding: 20px;
	border-radius: 10px;
	font-size: 32px;
	display: flex;
	align-items: center;
	&:not(:first-child) {
		margin-top: 10px;
	}
	&.date .options .item,
	&.type .options .item,
	&.free .options .item {
		display: block;
		padding: 5px 20px;
		text-align: center;
		border: 1px solid #dcdfe6;
		border-left: 0;
		min-width: 100px;
		&:first-of-type {
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
			border-left: 1px solid #dcdfe6;
		}
		&:last-of-type {
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
		}
		&.active {
			background-color: #04be02;
			border-color: #04be02;
			color: #fff;
		}
	}
	&.date .options,
	&.fromCity .options,
	&.toCity .options {
		display: inline-flex;
	}
	.options {
		display: inline-flex;
		flex: 1;
		flex-wrap: wrap;
		.tips {
			font-size: 20px;
			color: #a3a3a3;
			margin-left: 20px;
		}
		.textarea {
			width: 100%;
			height: 100px;
		}
		input[type="date"] {
			margin-left: 20px;
			padding-left: 20px;
		}
		span[space="nbsp"] {
			margin: 0 20px;
		}
	}
	.label {
		width: 160px;
		display: inline-block;
		&.require {
			position: relative;
			&:before {
				content: "*";
				font-size: 28px;
				position: absolute;
				top: 50%;
				left: -15px;
				color: red;
				transform: translateY(-50%);
			}
		}
	}
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
	font-size: 28px;
}

.form-buttons {
	margin-top: 20px;
	display: flex;
	.btn {
		flex: 1;
		&:first-child {
			margin-right: 30px;
		}
	}
}
</style>
