var { monthFormatList, dayFormatList, APIS } = require('../../const');

var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
Page({
  data: {
    myPrizeList: [
      {
        prizeRecordId: 1,
        prizeName: "奖品名称",
        titil: "李雷和韩梅梅的婚礼抽奖",
        prizeTime: "2017-07-03 20:30",
        status: "0" //0未领取 1已领取待发货 2已发货（可查看物流）

      },
      {
        prizeRecordId: 1,
        prizeName: "奖品名称",
        titil: "婚庆活动名称",
        prizeTime: "2017-07-03 20:30",
        status: "0" //0未领取 1已领取待发货 2已发货（可查看物流）
      }
    ],
    isAllowPublish: false
  },
  

  onShow: function () {
    user.login(this.renderUI, this, true);
  },
  renderUI: function () {
    this.getMyPrizeList();//获取我的奖品
    wx.hideLoading();
  },

  /*获取我的奖品*/
  getMyPrizeList: function () {
    var that = this;
    request({
      url: APIS.MY_PRIZE_LIST,
      data: {
        sid: wx.getStorageSync('sid'),
      },
      method: 'POST',
      success: function (data) {
        that.setData({
          myPrizeList: data.resultData.dataList,
        });

      }
    }, false);
  },

})