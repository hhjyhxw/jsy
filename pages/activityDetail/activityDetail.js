var { monthFormatList, dayFormatList, APIS } = require('../../const');
var util = require('../../utils/util');
var user = require('../../libs/user');
var { request } = require('../../libs/request');
Page({
	data: {
		isHidden:true,// true（隐藏祝福语弹窗）false(显示祝福语弹窗)
		hasComment:true,//是否已提交过祝福语
		isAllowPublish:true,// true（隐藏发布按钮）false(显示发布按钮)
		activityId:'',//活动ID
		colorValue:'1',//低色值 "1"  喜庆红;"2" 浪漫粉  "3"淡雅黄
		colorValueImg_top:'https://www.leiyi.club/img/jsy/bg1_03.png',
		colorValueImg_bottom:'https://www.leiyi.club/img/jsy/wedding_detail_bg02.jpg',
		colorValueImg_center:'https://www.leiyi.club/img/jsy/hunqing_qu.png',
		showModalStatus:false,//卡券窗口展示2 
		picture: [
        '../../images/post01.png',
      'https://www.leiyi.club/img/jsy/wedding01.jpg',
      'https://www.leiyi.club/img/jsy/banner01.jpg'
		],  // 详情图片
		cardList:[],//卡券
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
				nick:'残雪无痕',
				createTime:'2017-07-03 20:02',
			headImg:'http://wx.qlogo.cn/mmopen/vi_32/WLz2uqsHZTHUv53icLEy30cLj1I4MD9iaUicMxw7l39AkZFw6LjAyIU8mnyH5oHP4W9dmV2NJa28ibZaj8SM2kRW4Q/0',
      content:'超幸福，新郎好帅，新娘好漂亮，祝福他们超幸福，新郎好帅，新娘好漂亮，祝福他们'
			},
			
			{
				nick:'花千水',
				createTime:'2017-07-03 20:02',
			headImg:'http://wx.qlogo.cn/mmopen/vi_32/WLz2uqsHZTHUv53icLEy30cLj1I4MD9iaUicMxw7l39AkZFw6LjAyIU8mnyH5oHP4W9dmV2NJa28ibZaj8SM2kRW4Q/0',
				content:'超幸福，新郎好帅，新娘好漂亮，祝福他们'
			},
      {
        nick: '花千水',
        createTime: '2017-07-03 20:02',
        headImg: 'http://wx.qlogo.cn/mmopen/vi_32/WLz2uqsHZTHUv53icLEy30cLj1I4MD9iaUicMxw7l39AkZFw6LjAyIU8mnyH5oHP4W9dmV2NJa28ibZaj8SM2kRW4Q/0',
        content: '超幸福，新郎好帅，新娘好漂亮，祝福他们'
      }
			
		]
	},

	//扫码进入获取活动id
	onLoad: function(options){
		this.setData({
			activityId:options.scene || '',
		});
		
	},
  
	onShow: function() {
		user.login(this.renderUI, this, true);
	},
	renderUI: function () {
		this.setData({
			screenWidth: wx.getSystemInfoSync().screenWidth
		});
		this.isShowPublish();//是否显示发布按钮
		//this.activityDetail();//活动详情
		//this.onLoadData(false);//评论列表
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
  /*活动详情*/
  activityDetail:function(){
	  var that = this;
	  request({
			url: APIS.ACTIVITY_DETAIL,
			data: {
				sid: wx.getStorageSync('sid'),
				activityId:that.data.activityId
			},
			method: 'POST', 
			realSuccess: function(data){
				var isHidden = data.hasComment;
				var colorValue = data.colorValue;
					var colorValueImg_top = '';
					var colorValueImg_bottom = '';
					var colorValueImg_center = '';
					if(colorValue=='1'){
						colorValueImg_top = APIS.REQ_IMG_HOST+'/bg1_03.png';
						colorValueImg_bottom = APIS.REQ_IMG_HOST+'/wedding_detail_bg02.jpg';
						colorValueImg_center = APIS.REQ_IMG_HOST+'/hunqing_qu.png';
					}else if(colorValue=='2'){
						colorValueImg_top = APIS.REQ_IMG_HOST+'/detail_bairi_03.png';
						colorValueImg_bottom = APIS.REQ_IMG_HOST+'/bairi_bottom.png';
						colorValueImg_center = APIS.REQ_IMG_HOST+'/bairi_center.png';
					}else{
						colorValueImg_top = APIS.REQ_IMG_HOST+'/detail_xieshi_03.png';
						colorValueImg_bottom = APIS.REQ_IMG_HOST+'/xieshi_bottom.png';
						colorValueImg_center = APIS.REQ_IMG_HOST+'/xieshi_center.png';
					}
				that.setData({
					picture:data.dataList,
					isHidden:data.hasComment,
					hasComment:data.hasComment,
					colorValue:data.colorValue,
					colorValueImg_top:colorValueImg_top,
					colorValueImg_bottom:colorValueImg_bottom,
					colorValueImg_center:colorValueImg_center
				});
			},
			realFail: function(msg) {
              wx.showToast({
                title: msg
              });
            },
             realComplete: function(msg) {
              //wx.hideLoading();
              wx.showToast({
                title: msg
              });
            }
		}, false,that);
  },
  /*祝福语列表*/  
  onLoadData: function(load){
	
  	var that = this;
  	var params = {
  		sid: wx.getStorageSync('sid'),
  		pageSize: 10,   
	    pageNum: that.data.offset,
  	};
  	if(load){
  		that.setData({
  			loading:!that.data.loading,
		    disabled:!that.data.disabled,
		  	loadText:'加载中...',
  		})
  	}
  	 request({
      url: APIS.GET_COMMENT_LIST,
      data: params,
      method: 'POST',
      realSuccess: function(data){
      	console.log("评论列表",data);
      	var resList=data.dataList;
      	that.setData({
      		commentList:that.data.commentList.concat(resList),
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
      	if(data.commentList.length==0){
      		that.setData({
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
			//wx.hideLoading();
			wx.showToast({
				title: msg
			});
		}
    }, false,that);
	 wx.hideLoading();
  },
  /*更多祝福语*/
  showMore:function(e){
		var that=this;
		if(that.data.hasMore){
			that.setData({
				offset:that.data.offset+1,
			});
			that.onLoadData(true);
		}
	},
  /*关闭祝福语弹窗*/
  closeComfirm:function(e){
		this.setData({
			isHidden:true
		});
  },
  /*打开祝福语弹窗*/
  openCommentBox:function(e){
		this.setData({
			isHidden:false
		});
  },
  /*添加祝福语*/
  addComment:function(e){
	   //关闭弹窗
	  	this.setData({
			isHidden:true
		});
		wx.showToast({
          title: '数据提交中'
        });
		//检验参数
		var name = e.detail.value.name;
		var content = e.detail.value.content;
		var formId = e.detail.formId;
        if(name.length==0 || content.length==0){
			wx.showToast({
				title: '名称和祝福语不能为空'
			}); 
			return;
		 }
		var that = this;
		var params = {
			sid: wx.getStorageSync('sid'),
			name: name,   
			content: content,
			formId:formId,
		};
		//提交
		request({
			url: APIS.ADD_COMMENT,
			data: params,
     		method: 'POST',
			realSuccess: function(data){
				 //第一次提交祝福语成功
				if(!that.data.hasComment){
					//打开领取卡券窗口
					if(data.card!=null){
						that.setData({
							cardList:data.card,
							showModalStatus:true
						});
						
					}
				}
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
            }, 
		}, false,that);
  },
/*领取卡券*/
getCard:function(){
	var that = this;
	wx.addCard({
		cardList: that.data.cardList,
		success: function(res) {
			console.log(res.cardList) // 卡券添加结果
			if(res.cardList[0].isSuccess){
				wx.showToast({
					title: '领取卡券成功'
				}); 
				//领取卡券(添加卡券到卡包)成功，通知后台
				request({
					url: APIS.CARD_NOTIFY,
					data: {
						sid:wx.getStorageSync('sid'),
						carId:res.cardList[0].cardId,
					},
					method: 'POST',
					realSuccess: function(data){
						console.log(data) // 领取卡券成功通知结果
						wx.redirectTo({
						  url: '../game/game',
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
					}, 
				}, false,that);		
			}else{
				wx.showToast({
					title: '领取卡券失败，请稍后继续'
				}); 
			}
		},
		fail:function(res) {
			console.log(res) // 领取卡券(添加卡券到卡包)失败
			wx.showToast({
				title: '领取卡券失败，请稍后继续'
			}); 
		},
		complete:function(res) {
			console.log(res) // 领取卡券(添加卡券到卡包)失败
			wx.showToast({
				title: '领取卡券失败，请稍后继续'
			}); 
		},
	})
},
//关闭领取卡券弹窗
 closeBtn:function(e){
		this.setData({
			showModalStatus:false
		});
  },

  //打开婚庆地图地址
  openLocation:function(){
	 wx.openLocation({
		  latitude: +this.data.desLati,
		  longitude: +this.data.desLong,
		  scale: 28, // 缩放比例
		  name: this.data.address
		})
 },
	
	
})