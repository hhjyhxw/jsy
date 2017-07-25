var { monthFormatList, dayFormatList, APIS } = require('../../const');

var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');

Page({
	data: {
		footerConfig:{
			isHiddenPush:true,
		},
	 	banerList:[],//banner图片
		notice: [],
		somkeList:[],// 酒列表
		scene:'',// 是否是扫码进入
     	hasMore:'',
    	loadText:'点击加载更多...',
		wineCategoryId:'',//酒分类id
		smokeCategoryId:'',//烟分类id
  	    indicatorDots: true,  
	    autoplay: true,  
	    interval: 5000,  
	    duration: 500,
   		scrollToId: 'J_detail',
	  	fromShare: 0
	},


	onLoad: function (options) {
		//是否扫码进入活动详情
		var scene = options.scene;
		if(scene!=null && scene!=''){
			wx.navigateTo({
				url: '../activityDetail/activityDetail?scene='+scene
			})
		}
		
	},

	onShow: function() {
		user.login(this.renderUI, this, true);
		var footerConfig = {
			isHiddenPush:user.isAllowPublish()
		};
		this.setData({
			footerConfig:footerConfig
		});
	},

	renderUI: function () {
			
			this.getBannerList();//获取banner
		    this.getNoticeList();//获取公告列表
			this.getProductTypes();//获取产品类 及 展示的产品
			wx.hideLoading();
    },

	/*获取banner*/
	getBannerList: function() {
	
			var that = this;
			request({
					url: APIS.GET_BANNER,
					method: 'POST',
					realSuccess: function(data) {
							that.setData({
								banerList:data.dataList
							});
					},
					realFail: function(msg) {
						wx.showToast({
							title: msg
						});
					},
						realComplete: function(msg) {
						//wx.hideLoading();
						wx.showToast({
							title: msg
						});
					}
				}, true, that);
   },
   /*获取公告*/
	getNoticeList: function() {
		var that = this;
		request({
				url: APIS.GET_ANNOUOUNCEMENT_LIST,
				method: 'POST',
				realSuccess: function(data) {
							that.setData({
								notice:data.dataList
							});
					},
					realFail: function(msg) {
						wx.showToast({
							title: msg
						});
					},
					realComplete: function(msg) {
							wx.showToast({
							title: msg
						});
					}
			}, true, that);
   },
   /*获取产品类 及 展示的产品*/
	getProductTypes: function() {
		var sid = wx.getStorageSync('sid');
		var that = this;
		request({
			url: APIS.GET_CATRGORY,
			data: {
				sid: wx.getStorageSync('sid')
			},
     	method: 'GET',
			realSuccess: function(data){
					var list = data.dataList;
					if(list!=null && list.length>0){
						for (var i=0;i<list.length;i++) {
							var obj = list[i];
							//今世缘烟
							if(obj.catrgoryName.indexOf('烟')>=0){
								  that.setData({
										smokeCategoryId:obj.categoryId
									});
								  request({
										url: APIS.GET_PRODUCT_LIST,
										data: {
											sid: wx.getStorageSync('sid'),
											pageNum:1,
											pageSize:10,
											isOnlyIndex:'true',
											categoryId:obj.categoryId
										},
										method: 'POST', 
										realSuccess: function(data){
											that.setData({
												somkeList:data.dataList
											});
										},
										realFail: function(msg) {
												wx.showToast({
													title: msg
												});
											},
											realComplete: function(msg) {
													wx.showToast({
													title: msg
												});
											}
									}, true, that);
							}
							//酒
							if(obj.catrgoryName.indexOf('酒')>=0){
								 that.setData({
										wineCategoryId:obj.categoryId
									});
								 request({
										url: APIS.GET_PRODUCT_LIST,
										data: {
											sid: wx.getStorageSync('sid'),
											pageNum:1,
											pageSize:10,
											isOnlyIndex:'true',
											categoryId:obj.categoryId
										},
										method: 'POST', 
										realSuccess: function(data){
											that.setData({
												wineList:data.dataList
											});
										},
										realFail: function(msg) {
												wx.showToast({
													title: msg
												});
											},
											realComplete: function(msg) {
													wx.showToast({
													title: msg
												});
											}
									}, true, that);
							}
						}
					}
				},
				realFail: function(msg) {
						wx.showToast({
							title: msg
						});
					},
					realComplete: function(msg) {
							wx.showToast({
							title: msg
						});
					}
			}, true, that);
   },

	onPreviewSlider: function(e) {
		wx.previewImage({
		  current: e.target.dataset.url, // 当前显示图片的链接，不填则默认为 urls 的第一张
		  urls: this.data.pictureUrls
		});
	},
})