<template>
    <div class="picker-view">
        <div class="picker-content">
            <div class="mask-top"></div>
            <div class="mask-bottom"></div>
            <div class="wheel-wrapper" ref="wheelWrapper">
                <div class="wheel" v-for="(data,i) of pickerData" :key="i">
                    <ul class="wheel-scroll">
                        <li v-for="(item,ii) of data" class="wheel-item" :key="ii">{{item.text}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const COMPONENT_NAME = 'PickerView';
const EVENT_VALUE_CHANGE = 'valuechange';
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
        selectedIndex: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            pickerSelectedIndex: this.selectedIndex.length ? this.selectedIndex : new Array(this.pickerData.length).fill(0)
        };
    },
    computed: {
        pickerData() {
            return this.data.slice();
        }
    },
    beforeMount() {},
    mounted() {
        // console.log(this.data)
        this.enable();
    },
    methods: {
        enable() {
            if (!this.wheels || this.dirty) {
                this.$nextTick(() => {
                    this.wheels = [];
                    let wheelWrapper = this.$refs.wheelWrapper;
                    for (let i = 0; i < this.pickerData.length; i++) {
                        this._createWheel(wheelWrapper, i);
                    }
                    this.dirty = false;
                });
            } else {
                for (let i = 0; i < this.pickerData.length; i++) {
                    this.wheels[i].enable();
                    this.wheels[i].wheelTo(this.pickerSelectedIndex[i]);
                }
            }
        },
        disable() {
            for (let i = 0; i < this.pickerData.length; i++) {
                this.wheels[i].disable();
            }
        },
        // setData(data) {
        //     this.pickerData = data.slice()
        //     this.dirty = true
        // },
        setSelectedIndex(index) {
            this.pickerSelectedIndex = index;
        },
        refill(datas) {
            let ret = [];
            if (!datas.length) {
                return ret;
            }
            datas.forEach((data, index) => {
                ret[index] = this.refillColumn(index, data);
            });
            return ret;
        },
        refillColumn(index, data) {
            if (this.state !== STATE_SHOW) {
                console.error('can not use refillColumn when picker is not show');
                return;
            }
            const wheelWrapper = this.$refs.wheelWrapper;
            let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll');
            let wheel = this.wheels[index];
            if (scroll && wheel) {
                let oldData = this.pickerData[index];
                this.$set(this.pickerData, index, data);
                let selectedIndex = wheel.getSelectedIndex();
                let dist = 0;
                if (oldData.length) {
                    let oldValue = oldData[selectedIndex].value;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].value === oldValue) {
                            dist = i;
                            break;
                        }
                    }
                }
                this.pickerSelectedIndex[index] = dist;
                this.$nextTick(() => {
                    // recreate wheel so that the wrapperHeight will be correct.
                    wheel = this._createWheel(wheelWrapper, index);
                    wheel.wheelTo(dist);
                });
                return dist;
            }
        },
        scrollTo(index, dist) {
            const wheel = this.wheels[index];
            this.pickerSelectedIndex[index] = dist;
            wheel.wheelTo(dist);
        },
        refresh() {
            setTimeout(() => {
                this.wheels.forEach((wheel, index) => {
                    wheel.refresh();
                });
            }, 200);
        },
        async _createWheel(wheelWrapper, i) {
            let { default: BScroll } = await import(/* webpackChunkName: "betterScroll" */ 'better-scroll');
            if (!this.wheels[i]) {
                this.wheels[i] = new BScroll(wheelWrapper.children[i], {
                    wheel: {
                        selectedIndex: this.pickerSelectedIndex[i]
                    },
                    probeType: 3
                });
                this.wheels[i].on('scrollEnd', () => {
                    this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex());
                });
            } else {
                this.wheels[i].refresh();
            }

            return this.wheels[i];
        }
    },
    watch: {
        pickerData() {
            this.dirty = true;
            this.enable();
        }
    }
};
</script>

<style lang="scss">
.picker-view {
    background-color: #fff;
    overflow: hidden;
    .picker-content {
        position: relative;
        margin: 40px 0;
        .mask-top,
        .mask-bottom {
            z-index: 10;
            width: 100%;
            height: 136px;
            pointer-events: none;
            transform: translateZ(0);
        }
        .mask-top {
            position: absolute;
            top: 0;
            /* prettier-ignore */
            border-bottom: 1PX solid #ebebeb;
            background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
        }
        .mask-bottom {
            position: absolute;
            bottom: 0;
            /* prettier-ignore */
            border-top: 1PX solid #ebebeb;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
        }
        .wheel-wrapper {
            display: flex;
            padding: 0 32px;
            .wheel {
                flex: 1;
                width: 1%;
                height: 346px;
                overflow: hidden;
                font-size: 40px;
                .wheel-scroll {
                    padding: 0;
                    margin-top: 136px;
                    line-height: 72px;
                    list-style: none;
                    .wheel-item {
                        text-align: center;
                        list-style: none;
                        height: 72px;
                        overflow: hidden;
                        white-space: nowrap;
                        color: #333;
                    }
                }
            }
        }
    }
}
</style>