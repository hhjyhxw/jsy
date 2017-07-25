var { monthFormatList, dayFormatList, APIS } = require('../../const');
var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
Page({
  data: {
     footerConfig:{
			isHiddenPush:true,
		 },
     moduleList:[
       {
        colorValue:'1', 
        imgUrl: 'https://www.leiyi.club/img/jsy/ss.png',
       
       },
       {
          colorValue:'2', 
          imgUrl:'https://www.leiyi.club/img/jsy/bairi_module_03.png'
       },
       {
        colorValue:'3', 
        imgUrl:'https://www.leiyi.club/img/jsy/xieshi.png',
       }
         
          
          

     ],
    categoryId:'',

    offset: 1,
		loading:false,
		disabled:false,
		hasMore:false,
		isNoData:"",
		loadText:'点击加载更多...',
  },
  onLoad: function (options) {
    var footerConfig = {
			isHiddenPush:user.isAllowPublish()
		};
		this.setData({
			footerConfig:footerConfig
		});
  },

	onShow: function() {
		//user.login(this.renderUI, this, true);
	},

	renderUI: function () {
			this.getProductList(false);//获取产品
			wx.hideLoading();
    },

})