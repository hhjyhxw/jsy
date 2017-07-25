var { monthFormatList, dayFormatList, APIS } = require('../../const');
var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footerConfig:{
			isHiddenPush:true,
		},
    headImg:'https://www.leiyi.club/img/jsy/prize.jpg',
    nick:'萌萌'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
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
    this.myCenter();
  },
   /** 个人中心*/
  myCenter:function(){
      var that = this;
			request({
					url: APIS.MY_CENTEN,
          data: {
            sid: wx.getStorageSync('sid')
          },
					method: 'POST',
					realSuccess: function(data) {
							that.setData({
								headImg:data.headImg,
                nick:data.nick
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
    
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})