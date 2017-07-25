var { monthFormatList, dayFormatList, APIS } = require('../../const');

var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');

Page({
	data: {
		pictureUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'

    ],  //事情图片
    	notice: [
      '今天我们要结婚啦!!!',
      '今天，你可以变得更美!!!',
      '今天大促销!!!'
    ],//公告
		myrecord: [
      {
				name1:'今世缘婚庆',
				desbic1:'这一刻牵手,相伴永远!',
				imgurl1:'../../images/p1.jpg',
				eventId1:'1',
				name2:'再续前缘',
				desbic2:'感谢上苍，让我再次遇见你!',
				imgurl2:'../../images/p2.jpg',
				eventId2:'1'
			},
			{
				name1:'小清新',
				desbic1:'咿呀咿呀咿呀咿呀咿呀咿呀咿!',
				imgurl1:'../../images/p6.jpg',
				eventId1:'1',
				name2:'再续前缘',
				desbic2:'感谢上苍，让我再次遇见你!',
				imgurl2:'../../images/p7.jpg',
				eventId2:'1'
			},
			{
				name1:'osd',
				desbic1:'哈哈哈哈哈哈哈哈哈哈哈!',
				imgurl1:'../../images/p4.jpg',
				eventId1:'1',
				name2:'再续前缘',
				desbic2:'感谢上苍，让我再次遇见你!',
				imgurl2:'../../images/p5.jpg',
				eventId2:'1'
			}
    ],//我参与过的活动
	    indicatorDots: true,  
	    autoplay: true,  
	    interval: 5000,  
	    duration: 500,
   		offset: 1,
	 	  eventId: "",
		  scrollToId: 'J_detail',
	  	fromShare: 0
	},


	onLoad: function () {
		wx.showLoading({
			mask: true,
			title: '数据加载中'
		});
	},

	onShow: function() {
		user.login(this.renderUI, this, true);
		
	},

	renderUI: function () {
		this.setData({
		screenWidth: wx.getSystemInfoSync().screenWidth
		});
		wx.hideLoading();
        wx.showToast({
          title: '数据加载成功'
        });
		wx.hideLoading();
	},

	onPreviewSlider: function(e) {
		wx.previewImage({
		  current: e.target.dataset.url, // 当前显示图片的链接，不填则默认为 urls 的第一张
		  urls: this.data.pictureUrls
		});
	},
})