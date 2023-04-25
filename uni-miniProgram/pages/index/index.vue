<template>
	<view class="content">
		<scroll-view :scroll-y="!disableScroll" style="height:100vh">
			<view class="top-head">
				<view>早上好！张三先生</view>
				<view class="badge">
						<uni-badge class="uni-badge-left-margin" :text="77" absolute="rightTop" :offset="[-1, -1]" size="small">
							<view class="box">
								<image style="width:50rpx;height: 50rpx;" src="../../static/images/logo.png" mode=""></image>
							</view>
						</uni-badge>
				</view>
			</view>
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration">
					<swiper-item>
						<view class="swiper-item uni-bg-red">A</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-green">B</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-blue">C</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-pink">D</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-skyblue">E</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="row-list">
				<view class="row">
					<view class="row-item">
						<image src="../../static/images/yiyao.png" mode=""></image>
						<span>功能一</span>
					</view>
					<view class="row-item">
						<image src="../../static/images/yiyao.png" mode=""></image>
						<span>功能二</span>
					</view>
					<view class="row-item">
						<image src="../../static/images/yiyao.png" mode=""></image>
						<span>功能三</span>
					</view>
					<view class="row-item">
						<image src="../../static/images/yiyao.png" mode=""></image>
						<span>功能四</span>
					</view>
					<view class="row-item">
						<image src="../../static/images/yiyao.png" mode=""></image>
						<span>功能五</span>
					</view>
					
				</view>
			</view>
			<view class="part-box">
				<view class="part">
					<view class="part-item" v-for="item in partList" :key="item.id" @click="handleDialogOpen(item.id)">
							<image :src="item.image" mode=""></image>
							<span>{{item.title}}</span>
					</view>
				</view>
			</view>
			<!-- 弹窗 -->
			<MyDialog ref="myDialog"  title="功能B">
			</MyDialog>
		</scroll-view>
		<Tabbar :current-page="0"></Tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// part
				partList: [
					{id:1,title:'功能A',image:require('../../static/images/logo.png')},
					{id:2,title:'功能B',image:require('../../static/images/logo.png')},
					{id:3,title:'功能C',image:require('../../static/images/logo.png')},
					{id:4,title:'功能D',image:require('../../static/images/logo.png')},
					{id:5,title:'功能E',image:require('../../static/images/logo.png')},
					{id:6,title:'功能F',image:require('../../static/images/logo.png')},
					{id:7,title:'功能G',image:require('../../static/images/logo.png')},
					{id:8,title:'功能H',image:require('../../static/images/logo.png')},
					{id:9,title:'功能I',image:require('../../static/images/logo.png')},
					{id:10,title:'功能J',image:require('../../static/images/logo.png')},
					// 补充空选项
					{id:11,title:''},
					{id:12,title:''}
				],
				// 弹窗
				type: 'center',
				// 防止滚动穿透
				disableScroll:false,
			}
		},
		onLoad() {

		},
		mounted() {
		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			// 弹窗组件
			handleDialogOpen(id){
				this.$refs.myDialog.open();
				this.disableScroll=false;
			}

		}
	}
</script>

<style lang="scss">
	$border-color:#efefef;
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: fixed;
		background-color: #f1f1f1;
	}
	.top-head{
		height: 130rpx;
		width: 100%;
		background-color: #272a3b;
		color: #82b41f;
		font-size: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.badge{
			position: absolute;
			right: 50rpx;
		}
	}
	/* swiper */
	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}
	.info {
		position: absolute;
		right: 20rpx;
	}
	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
	.uni-bg-red{
		background: #fdb025;
	}
	.uni-bg-green{
		background: #8c8cfe;
	}
	.uni-bg-blue{
		background: #4f8bff;
	}
	.uni-bg-skyblue{
		background: skyblue;
	}
	.uni-bg-pink{
		background: pink;
	}
	.row-list{
		height: 200rpx;
		width: 100%;
		background-color: #272a3b;
	}
	.row{
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.row-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.row-item image{
		width: 100rpx;
		height: 100rpx;
	}
	.row-item span{
		color: #a1a4ad;
	}
	.part-box{
		padding-bottom: 200rpx;
	}
	.part{
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
		border-top: 1px solid $border-color;
		background: #fff;
	}
	.part-item{
		width: 25%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid $border-color;
		border-right: 1px solid $border-color;
	}
	.part-item:nth-child(4),.part-item:nth-child(8),.part-item:nth-child(12){
		border-right: 0;
	}
	.part-item image{
		width: 100rpx;
		height: 100rpx;
	}
	.part-item span{
		color: #9e9e9e;
		margin-top: 10rpx;
	}
</style>
