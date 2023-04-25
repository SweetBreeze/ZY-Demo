<template>
	<view class="myDialog-box" v-if="isOpen">
		<view class="myDialog">
			<text class="head-text">{{title}}</text>
			<!-- 各个组件都不同的功能，暂且先写一个，不使用循环。 -->
			<view class="dialog-part">
				<view class="dialog-part-item" v-for="item in 10" :key="item">
					<image src="../static/images/logo.png" mode=""></image>
					<span>{{'功能'+(item+1)}}</span>
				</view>
			</view>
		</view>
		<view class="mask" @click="isOpen=false"></view>
	</view>
</template>

<script>
	export default {
			name: "MyDialog",
			props: {
				title: {
					type: String,
					default: '功能B'
				},
				id:{
					type:Number,
				}
			},
			data() {
				return {
					isOpen: false
				};
			},
			methods: {
				open() {
					this.isOpen = true;
				},
				close() {
					this.isOpen = false;
				},
			}
		}
</script>

<style lang='scss'>
	    .myDialog-box {
			width: 100vw;
			position: fixed;
		      }
		.myDialog {
			width: 90%;
			border-radius: 16px;
			background-color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			position: fixed;
			top: 20%;
			left: 50%;
			transform: translateX(-50%);
			z-index: 10000;
			.head-text{
				font-weight: 600;
				height: 100rpx;
				width: 100%;
				color: #86b90f;
				font-size: 40rpx;
				margin-bottom: 20px;
				background-color: #272a3b;
				border-radius: 16px 16px 0 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.dialog-part{
				display: flex;
				/* justify-content: space-around; */
				flex-wrap: wrap;
				.dialog-part-item{
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 25%;
					margin-bottom: 40rpx;
				}
				image{
					width: 100rpx;
					height: 100rpx;
				}
				span{
					color: #9a9a9a;
					margin-top: 10rpx;
				}
			}
		}
		.mask{
			width: 100vw;
			height: 100vh;
			background-color: rgba(104,101,104,.4);
			position: fixed;
			top: 0%;
			left: 0%;
			z-index: 1000;
		}
</style>