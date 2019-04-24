<template>
    <svg class="icon-back-btn" @click="backClick">
        <use xlink:href="#icon-arrow"></use>
    </svg>
</template>

<script>
export default {
    name: 'backIcon',
    data() {
        return {};
    },
    computed: {},
    methods: {
        backClick(e) {
            if (this.$listeners.backClick) {
                this.$emit('backClick', e);
            } else {
                history.back();
            }
        }
    }
};
</script>

<style lang="scss">
.icon-back-btn {
    width: 60px;
    height: 60px;
    fill: currentColor;
    transform: rotate(180deg);
}
</style>