<template>
    <div class="picker" @click.stop>
        <div class="picker-choose">
            <span class="cancel" @click="cancel">{{cancelTxt}}</span>
            <span class="confirm" @click="confirm">{{confirmTxt}}</span>
            <h1 class="picker-title">{{title}}</h1>
        </div>
        <PickerView :selectedIndex="selectedIndex" @change="handleChange" ref="pickerView" :data="pickerData"></PickerView>
        <!-- <div class="picker-footer"></div> -->
    </div>
</template>

<script>
import PickerView from '../PickerView/index.vue';
const COMPONENT_NAME = 'Picker';
const EVENT_SELECT = 'select';
const EVENT_VALUE_CHANGE = 'valuechange';
const EVENT_CANCEL = 'cancel';
const EVENT_CHANGE = 'change';

export default {
    name: COMPONENT_NAME,
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        title: {
            type: String
        },
        cancelTxt: {
            type: String,
            default: '取消'
        },
        confirmTxt: {
            type: String,
            default: '确定'
        },
        selectedIndex: {
            type: Array,
            default() {
                return [];
            }
        },
        cascade: {
            type: Boolean,
            default: false
        }
        // value: {
        //     type: Boolean,
        //     default: false
        // }
    },
    components: { PickerView },
    data() {
        let pickerSelectedIndex = this.getColumnsSelectedIndex();
        return {
            pickerSelectedVal: [],
            pickerSelectedText: [],
            pickerSelectedIndex,
            pickerData: this.getPickerData(pickerSelectedIndex)
        };
    },
    computed: {},
    beforeMount() {},
    watch: {
        // pickerData() {
        //     this.$refs.pickerView.refresh()
        // }
    },
    methods: {
        getPickerData(selectedIndex) {
            if (this.cascade) {
                let dataSource = [];
                selectedIndex.forEach((item, i) => {
                    if (dataSource.length == 0) {
                        dataSource.push(this.data);
                    }
                    let children = dataSource.slice(-1)[0][item].children;
                    if (children) {
                        dataSource.push(children);
                    }
                });
                return dataSource;
            } else {
                return this.data;
            }
        },
        getColumnsSelectedIndex() {
            if (this.selectedIndex.length) {
                return this.selectedIndex.slice();
            } else {
                if (this.cascade) {
                    let dataSource = [];
                    let callee = data => {
                        dataSource.push(data);
                        if (data[0].children && Array.isArray(data[0].children)) {
                            callee(data[0].children);
                        }
                    };
                    callee(this.data);
                    return new Array(dataSource.length).fill(0);
                } else {
                    return new Array(this.data.length).fill(0);
                }
            }
        },
        confirm(e) {
            if (!this._canConfirm()) {
                return;
            }
            this.$emit('closeModal', e);
            let pickerView = this.$refs.pickerView;
            let changed = false;
            this.pickerData.forEach((item, i) => {
                let index = this.pickerSelectedIndex[i];
                this.pickerSelectedVal[i] = item[index].value;
                this.pickerSelectedText[i] = item[index].text;
                if (!changed && index !== this.selectedIndex[i]) {
                    changed = true;
                }
            });
            this.$emit(EVENT_SELECT, this.pickerSelectedIndex, this.pickerSelectedVal, this.pickerSelectedText);
            if (changed) {
                this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedIndex, this.pickerSelectedVal, this.pickerSelectedText);
            }
        },
        cancel(e) {
            this.$emit('closeModal', e);
            this.$emit(EVENT_CANCEL);
        },
        _canConfirm() {
            return this.$refs.pickerView.wheels.every(wheel => {
                return !wheel.isInTransition;
            });
        },
        handleChange(i, newIndex) {
            let pickerView = this.$refs.pickerView;
            if (newIndex !== this.pickerSelectedIndex[i] && this.cascade) {
                this.pickerSelectedIndex.splice(i, 1, newIndex);
                for (let j = this.pickerData.length - 1; j > i; j--) {
                    this.pickerSelectedIndex.splice(j, 1, 0);
                    pickerView.scrollTo(j, 0);
                }
                if (i != this.pickerData.length - 1) {
                    pickerView.setSelectedIndex(this.pickerSelectedIndex);
                    this.pickerData = this.getPickerData(this.pickerSelectedIndex);
                }
            }
            pickerView.refresh();
        }
    }
};
</script>

<style lang="scss">
.picker {
    .picker-choose {
        position: relative;
        height: 120px;
        color: #999;
        /* prettier-ignore */
        border-bottom: 1PX solid #ebebeb;
        .picker-title {
            margin: 0;
            line-height: 120px;
            font-weight: normal;
            text-align: center;
            font-size: 36px;
            color: #333;
        }
        .confirm,
        .cancel {
            position: absolute;
            top: 0;
            padding: 37px;
            font-size: 36px;
        }
        .confirm {
            right: 0;
            color: #04be02;
            &:active {
                color: #04be02;
            }
        }
        .cancel {
            left: 0;
            &:active {
                color: #c2c2c2;
            }
        }
    }
}
</style>