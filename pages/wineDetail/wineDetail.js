var { monthFormatList, dayFormatList, APIS } = require('../../const');
var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
Page({
  data:{
    footerConfig:{
			isHiddenPush:true,
		},
    productId: '',
    productImg: ['http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'https://www.leiyi.club/img/jsy/banner01.jpg'
    ],
    productName: '今世缘五年典藏今世缘典藏5年40度500ml*6正品白酒整箱婚庆',
    price: 426.00,
    desc:'',
    picture: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    scrollToId: 'J_detail',
    fromShare: 0
  },
  
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
        productId: options.productId || '',
    });
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
		this.isShowPublish();//是否显示发布按钮
    this.getProductDetail()
  },
  /*是否显示发布按钮*/
	isShowPublish: function(e) {
		 var that = this;
		 var isAllowPublish = wx.getStorageSync('isAllowPublish')
		 if (isAllowPublish!=null && isAllowPublish=='1') {
			that.setData({
         		isAllowPublish:false
       		});
		 }
		
	},
  	/*获取产品详情*/
	getProductDetail: function() {
    var that = this;
    request({
			url: APIS.GET_PRODUCT_DETAIL,
			data: {
				sid: wx.getStorageSync('sid'),
				productId:that.data.productId
			},
			method: 'POST', 
			realSuccess: function(data){
				that.setData({
					productImg: data.productImg,
          productName: data.productName,
          price: data.price,
          desc: data.detail.desc,
          picture: data.detail.picture
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

/*
  onShareAppMessage: function() {
		// 用户点击右上角分享
		return {
			title: '婚庆小程序', // 分享描述
			path: '/pages/eventPoster/eventPoster?eventId='+this.data.eventId+'&fromShare=1' // 分享路径
		}
	},
  */
  
})