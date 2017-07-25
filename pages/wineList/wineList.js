var { monthFormatList, dayFormatList, APIS } = require('../../const');
var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
Page({
  data: {
     footerConfig:{
			isHiddenPush:true,
		},
     wineList:[],
     categoryId:'',

    offset: 1,
		loading:false,
		disabled:false,
		hasMore:false,
		isNoData:"",
		loadText:'点击加载更多...',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      categoryId: options.categoryId || '',
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
			this.getProductList(false);//获取产品
			wx.hideLoading();
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
  /*获取商品列表 */
  getProductList:function(load){
     var that = this;
     if(load){
        that.setData({
          loading:!that.data.loading,
          disabled:!that.data.disabled,
          loadText:'加载中...',
        })
     };
  	 request({
          url: APIS.GET_PRODUCT_LIST,
          data: {
            sid: wx.getStorageSync('sid'),
            pageNum:that.data.offset,
            pageSize:10,
            isOnlyIndex:'false',
            categoryId:that.data.categoryId
          },
          method: 'POST', 
          realSuccess: function(data){
              that.setData({
                wineList:that.data.wineList.concat(data.dataList),
                hasMore:data.hasMore
              });
            	if(load){
                that.setData({
                  loading:!that.data.loading,
                  disabled:!that.data.disabled,
                  loadText:'点击加载更多...'
                })
              }
              if(!that.data.hasMore){
                that.setData({
                  loadText:'没有更多数据了'
                })
              }
              if(data.dataList.length==0){
                that.wineList({
                  isNoData:"暂时没有数据！"
                });
              }
              wx.hideLoading();
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
 /*获取更多商品列表 */
 showMore:function(e){
		var that=this;
		if(that.data.hasMore){
			that.setData({
				offset:that.data.offset+1,
			});
			that.getProductList(true);
		}
	}
})