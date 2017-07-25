
Page({
  data:{
    colorValue: '',
    imgUrl: '../../images/index1.png',
    fromShare: 0,
    winHeight: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var sysInfo = wx.getSystemInfoSync();
    console.log(sysInfo);
    this.setData({
      winHeight: sysInfo.windowHeight,
      imgUrl:options.imgUrl,
      colorValue:options.colorValue
    });
    
  },



  onShareAppMessage: function() {
		// 用户点击右上角分享
		return {
			title: '婚庆小程序', // 分享描述
			path: '/pages/eventPoster/eventPoster?eventId='+this.data.eventId+'&fromShare=1' // 分享路径
		}
	},
})