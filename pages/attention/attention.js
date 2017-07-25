// pages/show/attention.js
var { monthFormatList, dayFormatList, APIS } = require('../../const');

var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
Page({
  data: {
    myFollow: [
      {
        id: 1,
        title: "小宝和小花的婚礼",
        pictures: [
          "https://www.leiyi.club/img/jsy/wedding01.jpg",
        ],
        hasMore: true,
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      {
        id: 2,
        title: "小明和小银的婚礼",
        pictures: [
          //"../../images/banner.jpg",
          "https://www.leiyi.club/img/jsy/banner01.jpg"
        ],
        hasMore: true,
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
  },


  onShow: function () {
    user.login(this.renderUI, this, true);
  },
  renderUI: function () {
    this.getMyFollow();//获取我参加的婚礼
    wx.hideLoading();
  },
  /*获取我参加的婚礼*/
  getMyFollow: function () {
    var that = this;
    request({
      url: APIS.MY_FOLLOW,
      data: {
        sid: wx.getStorageSync('sid'),
        pageNum: 1,
        pageSize: 10,
      },
      method: 'POST',
      realSuccess: function (data) {
        that.setData({
          mycardList: data.resultData.dataList,
        });

      }
    }, false);
  },

  onPreviewSlider: function (e) {
    wx.previewImage({
      current: e.target.dataset.url, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: this.data.pictureUrls
    });
  },
})