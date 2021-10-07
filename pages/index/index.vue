<template>
	<view>
		<u-swiper :list="slides" name="img_url" height="320"></u-swiper>
		<view class="u-text-center u-m-t-30">
			<u-tabs :list="sortList" bar-width="100" item-width="150" :current="currentSort" @change="changeSort">
			</u-tabs>
		</view>

		<u-row gutter="16" class="u-skeleton">
			<u-col span="6" v-for="goods in goodsList.length != 0 ? goodsList : [{},{},{},{}]">
				<goods-card :goods="goods"></goods-card>
			</u-col>
		</u-row>
		
		<!--骨架屏-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortList: [{
						name: '默认'
					},
					{
						name: '销量'
					},
					{
						name: '推荐'
					},
					{
						name: '最新'
					}
				],
				currentSort: 0,
				slides: [],
				goodsList: [],
				page: 1,
				loading:false,
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			changeSort(index) {
				this.currentSort = index
				// 重置商品和分页
				this.goodsList = []
				this.page = 1
				this.getData()
			},
			// 获取数据
			async getData(){
				// 显示骨架屏
				this.loading = true
				const params = {
					page:this.page
				}
				if(this.currentSort == 1) params.sales = 1
				if(this.currentSort == 2) params.recommend = 1
				if(this.currentSort == 3) params.new = 1
				const res = await this.$u.api.index(params)
				this.loading = false // 隐藏骨架屏
				this.slides = res.slides
				this.goodsList = [...this.goodsList,...res.goods.data]
			},
		},
		onReachBottom() {
			// 重新请求数据，带上分页参数
			this.page = this.page + 1
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
