var { monthFormatList, dayFormatList, APIS } = require('../../const');
var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
Page({
	data: {
		isHidden:true,// true（隐藏祝福语弹窗）false(显示祝福语弹窗)
		colorValue:'1',//低色值 "1"  喜庆红;"2" 浪漫粉  "3"淡雅黄
		colorValueImg_top:'https://www.leiyi.club/img/jsy/bg1_03.png',
		colorValueImg_bottom:'',
		colorValueImg_center:'',
		picture: [
        '../../images/post01.png',
        'https://www.leiyi.club/img/jsy/bairi_module_03.png',
        'https://www.leiyi.club/img/jsy/banner01.jpg'
		],  // 详情图片
	
		indicatorDots: true,  
	    autoplay: true,  
	    interval: 5000,  
	    duration: 500,
		
		offset: 1,
		loading:false,
		disabled:false,
		hasMore:true,
		isNoData:"",
		loadText:'点击加载更多...',
		commentList:[
			{
				nick:'花语',
				createTime:'2017-07-03 20:02',
			headImg:'http://wx.qlogo.cn/mmopen/vi_32/WLz2uqsHZTHUv53icLEy30cLj1I4MD9iaUicMxw7l39AkZFw6LjAyIU8mnyH5oHP4W9dmV2NJa28ibZaj8SM2kRW4Q/0',
      content:'这里是祝福语'
			},
			
			{
				nick:'倩影',
				createTime:'2017-07-03 20:02',
			headImg:'http://wx.qlogo.cn/mmopen/vi_32/WLz2uqsHZTHUv53icLEy30cLj1I4MD9iaUicMxw7l39AkZFw6LjAyIU8mnyH5oHP4W9dmV2NJa28ibZaj8SM2kRW4Q/0',
				content:'这里是祝福语'
			},
      {
        nick: '花千水',
        createTime: '2017-07-03 20:02',
        headImg: 'http://wx.qlogo.cn/mmopen/vi_32/WLz2uqsHZTHUv53icLEy30cLj1I4MD9iaUicMxw7l39AkZFw6LjAyIU8mnyH5oHP4W9dmV2NJa28ibZaj8SM2kRW4Q/0',
        content:'这里是祝福语'
      }
			
		]
	},

	onLoad: function(options){
		var picture = options.picture.split(',');
		var colorValueImg_top = '';
		var colorValueImg_bottom = '';
		var colorValueImg_center = '';
		if(options.colorValue=='1'){
			colorValueImg_top = APIS.REQ_IMG_HOST+'/bg1_03.png';
			colorValueImg_bottom = APIS.REQ_IMG_HOST+'/wedding_detail_bg02.jpg';
			colorValueImg_center = APIS.REQ_IMG_HOST+'/hunqing_qu.png';
		}else if(options.colorValue=='2'){
			colorValueImg_top = APIS.REQ_IMG_HOST+'/detail_bairi_03.png';
			colorValueImg_bottom = APIS.REQ_IMG_HOST+'/bairi_bottom.png';
			colorValueImg_center = APIS.REQ_IMG_HOST+'/bairi_center.png';
		}else{
			colorValueImg_top = APIS.REQ_IMG_HOST+'/detail_xieshi_03.png';
			colorValueImg_bottom = APIS.REQ_IMG_HOST+'/xieshi_bottom.png';
			colorValueImg_center = APIS.REQ_IMG_HOST+'/xieshi_center.png';
		}
		this.setData({
			activityId:options.scene || '',
			picture:picture,
			colorValue:options.colorValue || '',
			colorValueImg_top:colorValueImg_top,
			colorValueImg_bottom:colorValueImg_bottom,
			colorValueImg_center:colorValueImg_center
		});
		
	},
 })