<template>
    <svg class="icon-search-btn" @click="searchClick">
        <use xlink:href="#icon-search"></use>
    </svg>
</template>

<script>
export default {
    name: 'SearchIcon',
    data() {
        return {};
    },
    computed: {},
    methods: {
        searchClick(e) {
            if (this.$listeners.searchClick) {
                this.$emit('searchClick', e);
            }
        }
    }
};
</script>

<style lang="scss">
.icon-search-btn {
    width: 60px;
    height: 60px;
    fill: #1e1e1e;
}
</style>