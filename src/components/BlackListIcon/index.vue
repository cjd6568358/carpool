<template>
    <svg class="icon-blacklist-btn" @click="$emit('blacklistClick')">
        <use xlink:href="#icon-blacklist"></use>
    </svg>
</template>

<script>
export default {
    name: 'blacklistIcon',
    data() {
        return {};
    },
    computed: {},
    methods: {
    }
};
</script>

<style lang="scss">
.icon-blacklist-btn {
    width: 48px;
    height: 48px;
    fill: currentColor;
    transform: rotate(180deg);
}
</style>