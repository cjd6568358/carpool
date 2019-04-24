<template>
	<router-link class="publish" :to="{ name:'recordInfo', query:{ mode:'add' } }">
		我 要<br>发 布
	</router-link>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.publish {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: #04be02;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	line-height: 30px;
	box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.4);
}
</style>

