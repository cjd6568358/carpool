<template>
	<div class="form-area">
		<div class="form-item type">
			<label class="label">我想要</label>
			<div class="options">
				<div class="item" :class="{ active:local_type === 1 }" :data-local_type="1" @click="bindClick">找车</div>
				<div class="item" :class="{ active:local_type === 2 }" :data-local_type="2" @click="bindClick">找人</div>
			</div>
		</div>
		<div class="form-item date">
			<label class="label">时间</label>
			<div class="options">
				<input type="date" v-model="local_date">
				<div class="tips">(只能选择未来三天以内)</div>
			</div>
		</div>
		<div class="form-item free">
			<label class="label">空座</label>
			<div class="options">
				<div v-if="local_mode === 'search'" class="item" :class="{ active:local_free === -1 }" :data-local_free="-1" @click="bindClick">不限</div>
				<div class="item" :class="{ active:local_free === 1 }" :data-local_free="1" @click="bindClick">1</div>
				<div class="item" :class="{ active:local_free === 2 }" :data-local_free="2" @click="bindClick">2</div>
				<div class="item" :class="{ active:local_free === 3 }" :data-local_free="3" @click="bindClick">3</div>
				<div class="item" :class="{ active:local_free === 4 }" :data-local_free="4" @click="bindClick">4</div>
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
			<label class="label">联系方式</label>
			<div class="options">
				<input maxlength="11" v-model="local_phone" placeholder="请输入您的手机号码" type="number">
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
		return {
			local_mode: "add", // 属性初始值（可选），如果未指定则会根据类型选择一个['search','add','view','edit'],
			local_type: 1,
			local_date: new Date().Format("yyyy-MM-dd"),
			local_fromCity: ["建湖", "全部"],
			local_toCity: ["上海", "全部"],
			local_free: 1,
			local_fee: 100,
			local_phone: "",
			local_name: "",
			local_remark: "",
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
				local_mode,
				local_fromCity,
				local_toCity,
				cityList
			} = this.$data;

			if (currCity === "上海市" && local_mode === "search") {
				local_fromCity = ["上海", "全部"];
				local_toCity = ["建湖", "全部"];
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
		bindClick({ target: { dataset } }) {
			Object.keys(dataset).forEach(key => {
				if (this.$data.hasOwnProperty(key)) {
					this.$data[key] = +dataset[key];
				}
			});
		},
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
			console.log(params);
			this.$emit("submit", params);
		},
		bindReset() {
			console.log(this.attachedData);
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
	&.type .options .item,
	&.free .options .item {
		display: block;
		padding: 5px 20px;
		text-align: center;
		border: 1px solid #dcdfe6;
		border-left: 0;
		min-width: 100px;
		&:first-child {
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
			border-left: 1px solid #dcdfe6;
		}
		&:last-child {
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
			// flex: 1;
		}
		span[space="nbsp"] {
			margin: 0 20px;
		}
	}
	.label {
		width: 160px;
		display: inline-block;
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
