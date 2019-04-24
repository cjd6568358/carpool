<template>
	<ul>
		<router-link tag="li" :to="{ name:'home' }">拼车大厅</router-link>
		<router-link tag="li" :to="{ name:'recordInfo', query:{ mode:'add' } }">我要发布</router-link>
		<router-link tag="li" :to="{ name:'my' }">个人中心</router-link>
	</ul>
</template>
<style lang="scss" scoped>
ul {
	display: flex;
	border-top: 1px solid #ddd;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.04);
    background-color: #fff;
	li {
		height: 90px;
		font-size: 28px;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		&.router-link-active {
			color: #04be02;
		}
	}
}
</style>
