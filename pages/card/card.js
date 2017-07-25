var { monthFormatList, dayFormatList, APIS } = require('../../const');

var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
Page({
  data:{
    	mycardList:[
            {
                title:"3",
                satrtTime:"有效期开始",
                endTime:"有效期结束",
                stores:"今世缘助跑活动"
            },
            {
                title:"5",
                satrtTime:"有效期开始",
                endTime:"有效期结束",
                stores:"今世缘助跑活动"
            }
          ],
    isAllowPublish:false
  },


onShow: function() {
		user.login(this.renderUI, this, true);
	},
	renderUI: function () {
		
		this.getMyCardList();//获取我的卡券
    	wx.hideLoading();
    },

  /*获取我的卡券*/
  getMyCardList:function(){
	  var that = this;
    request({
			url: APIS.MY_CARD_LIST,
			data: {
				sid: wx.getStorageSync('sid'),
			},
			method: 'POST', 
			success: function(data){
				that.setData({
					mycardList:data.resultData.dataList,
				});
       
			}
		}, false);
  },

})