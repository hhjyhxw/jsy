var { monthFormatList, dayFormatList, APIS } = require('../../const');
var util = require('../../utils/util');
var user = require('../../libs/user');
var Q = require('../../libs/q/q');
var { uploadPic } = require('../../libs/upload');
var { request } = require('../../libs/request');

Page({
  data: {
    footerConfig:{
			isHiddenPush:true,
		},
    activityName:'',//活动名称
    piture_module: [//
      {
        id: "hearder_define",//自定义
        isChecked:true,
        name:'自定义'
       },
      {
         id: "hearder_module",//模板
         isChecked:false,
         name:'模板'
      }
    ],
    hearder_define:true,//头图 自定义图片(true 隐藏，''显示)
    hearder_define_add:'',//头图 自定义图片 添加按钮(true 隐藏，''显示)
    swiperHeight:'',//自定义图片高度
    swiperOutHeight:380,////自定义图片外层高度
    hearder_module:true,//头图 模板图片(true 隐藏，''显示)

    picPaths:[],//自定义图片路径
    templatePictrue:[//模板图片
      {
        imageurl:'../../images/post01.png',
        isSelect:true,
      },{
        imageurl:'../../images/actImg.jpg',
        isSelect:false,
      }
    ],  
    pictures:[],//最终活动保存的图片
    shading_module: [//
      {
        id: "1",//
        isChecked:true,
        name:'喜庆红'
       },
      {
        id: "2",//模板
        isChecked:false,
        name:'浪漫粉'
      },
      {
        id: "3",//模板图
        isChecked:false,
        name:'淡雅黄'
      }
    ],
    colorValue:'',//对应shading_module的id
    prizeList:[//奖品配置列表
      {
           pid:1,//奖品id
           pName:"i9",
           pStatus:"0"//0，现场发放，1物料接口领取 
       },
        {
           pid:2,//奖品id
           pName:"p10",
           pStatus:"1"//0，现场发放，1物料接口领取 
       },
       
    ],
    startTime: '',//活动开始时间
    endTime: '',//活动结束时间
    startDate:'',//活动开始日期
    endDate:'',//活动结束日期
    startClock: '',//活动开始小时
    endClock: '',//活动结束小时
    
    prize_module: [//奖项设置
      {
        prizeId: "",//prizeId:1,//奖品id
        prizeCount:2,//奖品数量
        prizeLevel:'1',//奖品等级  prizeLevel:"奖品等级",//从1开始，分别对应1,2，3等奖
        awardName:'一等奖',//奖项名称,一等奖|二等奖等
        isHidden:'',// 是否显示
      
        pName:"",//奖品名称
        pStatus:"0",//0，现场发放，1物料接口领取  不用传输后台
        margintop:false,//选择奖品的下下边框高度
       },
      {
        prizeId: "",//prizeId:1,//奖品id
        prizeCount:2,//奖品数量
        prizeLevel:'2',//奖品等级  prizeLevel:"奖品等级",//从1开始，分别对应1,2，3等奖
        awardName:'二等奖',//奖项名称,一等奖|二等奖等
        isHidden:'true',// 是否显示
        pName:"",//奖品名称
        pStatus:"0",//0，现场发放，1物料接口领取  不用传输后台
        margintop:false,//选择奖品的下下边框高度
       },
        {
        prizeId: "",//prizeId:1,//奖品id
        prizeCount:2,//奖品数量
        prizeLevel:'3',//奖品等级  prizeLevel:"奖品等级",//从1开始，分别对应1,2，3等奖
        awardName:'三等奖',//奖项名称,一等奖|二等奖等
        isHidden:'true',// 是否显示
      
        pName:"",//奖品名称
        pStatus:"0",//0，现场发放，1物料接口领取  不用传输后台
        margintop:false,//选择奖品的下下边框高度 
       },
        {
        prizeId: "",//prizeId:1,//奖品id
        prizeCount:2,//奖品数量
        prizeLevel:'4',//奖品等级  prizeLevel:"奖品等级",//从1开始，分别对应1,2，3等奖
        awardName:'四等奖',//奖项名称,一等奖|二等奖等
        isHidden:'true',// 是否显示
      
        pName:"",//奖品名称
        pStatus:"0",//0，现场发放，1物料接口领取  不用传输后台
        margintop:false,//选择奖品的下下边框高度
       },
        {
        prizeId: "",//prizeId:1,//奖品id
        prizeCount:2,//奖品数量
        prizeLevel:'5',//奖品等级  prizeLevel:"奖品等级",//从1开始，分别对应1,2，3等奖
        awardName:'五等奖',//奖项名称,一等奖|二等奖等
        isHidden:'true',// 是否显示
      
        pName:"",//奖品名称
        pStatus:"0",//0，现场发放，1物料接口领取  不用传输后台
        margintop:false,//选择奖品的下下边框高度
       },
       {
          prizeId: "",//prizeId:1,//奖品id
          prizeCount:2,//奖品数量
          prizeLevel:'5',//奖品等级  prizeLevel:"奖品等级",//从1开始，分别对应1,2，3等奖
          awardName:'六等奖',//奖项名称,一等奖|二等奖等
          isHidden:'true',// 是否显示
        
          pName:"",//奖品名称
          pStatus:"0",//0，现场发放，1物料接口领取  不用传输后台
          margintop:false,//选择奖品的下下边框高度
       },
      
    ],
    cardList:[
      {
            couponId:"数据库内优惠券id",
            cardId:"微信卡券标识",
            couponName:"10元优惠券",
            totalCount:"卡券数量"

        },
        {
            couponId:"数据库内优惠券id",
            cardId:"微信卡券标识",
            couponName:"50元代金券",
            totalCount:"卡券数量"

        }
    ],//卡券列表
    blessingCard:'',//选择卡券对象
    info:'',//最终提交数据
  },
  
  onLoad:function(options){
     this.renderDateTime();
     this.setData({
         colorValue:options.colorValue
    });
     
  },
  onShow: function () {
    user.login(this.renderUI, this, true);
    var footerConfig = {
			isHiddenPush:user.isAllowPublish()
		};
		this.setData({
			footerConfig:footerConfig
		});
  },
  renderUI: function () {
    this.getTemplate();//获取模板图片
    this.getPrizeList();//获取奖品列表
    //this.getCardList();//获取卡券列表
  },
  
/*活动名称*/
onActivityNameChange: function(e) {
    var activityName = e.detail.value;
    this.setData({
          activityName: activityName
    });
},
/*选择头图*/
onShadingChange: function(e) {
  
    var id = e.target.dataset.id;
    var d = this.data;
    var hearder_define = '';
    var hearder_module = '';
    var hearder_define_add = '';
    if('hearder_define'==id){
        if(d.picPaths.length<=0){
           hearder_define = true;
        }
        hearder_module = true;
    }
    if('hearder_module'==id){
      hearder_define = true;
      hearder_define_add = true;
      hearder_module = '';
    }
    var piture_module = d.piture_module;
    for(var i=0;i<piture_module.length;i++){
        var piture_module_obj = piture_module[i];
        if(id==piture_module_obj.id){
          piture_module_obj.isChecked=true;
          piture_module[i] = piture_module_obj;
          break;
        }
    }
    for(var i=0;i<piture_module.length;i++){
        var piture_module_obj = piture_module[i];
        if(id==piture_module_obj.id){
           continue;
        }else{
          piture_module_obj.isChecked=false;
          piture_module[i] = piture_module_obj;
        }
    }
    this.setData({
        piture_module: piture_module,
        hearder_define: hearder_define,
        hearder_module: hearder_module,
        hearder_define_add:hearder_define_add
    });
   
  },
/*添加自定义图片 */
 onChooseEventPics: function() {
    if (this.data.picPaths.length >= 5) {
      wx.showToast({
        title: '最多只能上传5张图片！'
      });
      return;
    }
    //自定义图片框是否显示
    var hearder_define = '';
    var that = this;
    var count = 5 - this.data.picPaths.length;
    wx.chooseImage({
      count: count, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // success
        var tempFilePaths = res.tempFilePaths;
        var pathArr = that.data.picPaths;
        pathArr = pathArr.concat(tempFilePaths);
        that.setData({
          picPaths: pathArr,
          swiperHeight:390,
          hearder_define:hearder_define
         });
      }
    })
  },
/*删除自定义已选图片*/
  onDeletePreview: function(e) {
    var index = e.target.dataset.index;
    var paths = this.data.picPaths;
    paths.splice(index, 1);
    this.setData({
      picPaths: paths
    });
    if (this.data.picPaths.length == 0) {
        this.setData({
            swiperHeight: 0,
            hearder_define:true
        });
    }
  },
  /*选择模板图片*/
  onSelectTemplet: function(e) {
      var index = e.target.dataset.index;
      var templatePictrue = this.data.templatePictrue;
      var templatePictrueObj = templatePictrue[index];
      if(templatePictrueObj.isSelect){
        templatePictrueObj.isSelect=false;
      }else{
        templatePictrueObj.isSelect=true;
      }
      templatePictrue[index]=templatePictrueObj;
      this.setData({
        templatePictrue: templatePictrue
      });
  },
  /*选择边框底纹*/
  onchangeShading: function(e) {
     var index = e.target.dataset.index;
     var shading_module = this.data.shading_module;
     for(var i=0;i<shading_module.length;i++){
       var shading_module_obj = shading_module[i];
       if(i==index){
         shading_module_obj.isChecked = true;
       }else{
          shading_module_obj.isChecked = false;
       }
       shading_module[i] = shading_module_obj;
     }
     this.setData({
        shading_module: shading_module
     });

  },
  /*初始化时间控件值*/
   renderDateTime: function() {
      var today = new Date();
      this.setData({
        startDate: util.formatDate(today),
        endDate: util.formatDate(today),
        startClock: '00:00',
        endClock: '02:00'
      });
  },
  /*开始日期改变 */
    bindStartDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    });
    this.validateTime();
  },
  /*结束日期改变 */
  bindEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    });
    this.validateTime();
  },
  /*开始时间改变 */
  bindStartClockChange: function(e) {
    this.setData({
      startClock: e.detail.value
    });
    this.validateTime();
  },
 /*结束结束改变 */
  bindEndClockChange: function(e) {
    this.setData({
      endClock: e.detail.value
    });
    this.validateTime();
  },

  /*选择奖品 */
  bindPrizeChange: function(e) {
    //奖品下标
    var prizeIndex = parseInt(e.detail.value);
    //奖项（等级）下标
    var prizelevel = parseInt(e.target.dataset.prizelevel);
   
    var d = this.data;
    var prizeObject = d.prizeList[prizeIndex];
    var prizeLevelObject = d.prize_module[prizelevel];
    prizeLevelObject.pName=prizeObject.pName;//奖品名称
    prizeLevelObject.prizeId=prizeObject.prizeId;//奖品ID
    prizeLevelObject.margintop=true;//选择奖项 与否 距离顶部的位置不一样
    prizeLevelObject.pStatus=prizeObject.pStatus;//用于区分发放礼品的方式
    var prize_module = d.prize_module;
    prize_module[prizelevel]=prizeLevelObject;
    this.setData({
      prize_module:prize_module
    });
   
  },
  //添加奖项
  addPrize: function(e) {
    var prize_module = this.data.prize_module;
    var countIndex = 0;
    for(var i=0;i<prize_module.length;i++){
        countIndex=i;
        if(prize_module[i].isHidden){
          break;
        }
     }
     if(countIndex<=5){
        var prize_module_obj = prize_module[countIndex];
       prize_module_obj.isHidden = '';
       prize_module[countIndex] = prize_module_obj;
       this.setData({
           prize_module:prize_module
        });
     }
     if(countIndex==5){
          wx.showToast({
            title: '最多只能添加6个奖项',
            duration: 2000
          });
      }
     
  },
  //删除奖项
  delPrize: function(e) {
    var prize_module = this.data.prize_module;
    var countIndex = 0;
    for(var i=prize_module.length-1;i>0;i--){
        countIndex=i;
        if(!prize_module[i].isHidden){
          break;
        }
     }
     if(countIndex<=5 && countIndex>0){
        var prize_module_obj = prize_module[countIndex];
       prize_module_obj.isHidden = true;
       prize_module[countIndex] = prize_module_obj;
       this.setData({
           prize_module:prize_module
        });
     }
     if(countIndex==1){
          wx.showToast({
            title: '最少保留一个奖项',
            duration: 2000
          });
      }
  },
  /*
    选择祝福语卡券
  */
  bindCardChange:function(e) {
    var index = e.detail.value;
    var d = this.data;
    var blessObj = d.cardList[index];
    var blessingCard = {
      couponId:blessObj.couponId,
      cardId:blessObj.cardId,
      couponName:blessObj.couponName
    };
    this.setData({
        blessingCard:blessingCard
    });
  },
  /*验证时间、日期 */
  validateTime: function() {
    var d = this.data;
    var st = d.startDate + ' ' + d.startClock;
    var et = d.endDate + ' ' + d.endClock;
   
    var tips = '';
    var flag = true;

    if (st > et) {
      tips = '活动开始时间不能小于结束时间，请请整！'
      flag = false;
    }
    if (!flag) {
      wx.showToast({
        title: tips,
        duration: 2000
      });
      this.renderDateTime();
    }
    return flag;
  },

	/*获取自模板图片*/
	getTemplate: function() {
    var that = this;
		request({
			url: APIS.GET_TEMPLATE,
			method: 'POST',
			realSuccess: function(data){
          var templatePictrue = [];
          var list = data.dataList;
          for(var i=0;i<list.length;i++){
                var pictureList = list[i].templatePictures;
                for(var j=0;j<pictureList.length;j++){
                      var obj = {
                        isSelect:false,
                        imageurl:pictureList[j]
                      }
                      templatePictrue.push(obj);
                }
          }
          that.setData({
            templatePictrue:templatePictrue
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
   },

   /*获取奖品列表*/
  getPrizeList: function() {
    var that = this;
		request({
			url: APIS.GET_PRIZE_LIST,
			method: 'POST',
			realSuccess: function(data){
          that.setData({
            prizeList:data.dataList
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
   },

   /*获取卡券列表*/
    getCardList: function() {
		var that = this;
		request({
			url: APIS.GET_CARD_LIST,
			method: 'POST',
			realSuccess: function(data){
            that.setData({
              cardList:data.dataList
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
   },

   /*检验并提交数据*/
  checkAndSave: function() {
    var that = this;
    wx.showLoading({
        mask: true,
        title: '活动发布中，请稍候！'
    });
    //保存前验证并构造需要提交的数据
    if(this.checkBaseInfo()){
       if(!this.constructBaseInfo()){
          return;
       }
    }else{
      return;
    }
   
    //头图自定义
    if(!this.data.hearder_define_add && this.data.picPaths!='' && this.data.picPaths.length >0){
        //异步提交文件之后，返回的结果  
        var fnArr = [];
        //异步提交文件之后，对应图片角标
        var localPicIndexArr = [];
        var pictures = this.data.pictures;
        for (var i in this.data.pictures) {
          var picPath = this.data.pictures[i];
          // 本地临时图片才上传
          if (picPath.indexOf('wxfile://') == 0) {
            fnArr.push(uploadPic(this.data.pictures[i]));
            localPicIndexArr.push(i);
          }
        }

        Q.all(fnArr)
        .then(function(picUrls) {
         
          var pictures = that.data.pictures;
          for (var i in picUrls) {
            pictures[localPicIndexArr[i]] = picUrls[i];
          }
          setTimeout(function() {
            that.setData({
              pictures: pictures
            });
        }, 0);
          var info = that.data.info;
          info.pictures = pictures;
          info.sid = wx.getStorageSync('sid');
          request({
            url: APIS.PUBLISHED_ACTIVITY,
            data: info,
            method: 'POST',
            realSuccess: function(data) {
               wx.showToast({
                   title:'活动发布成功'
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
          }, true, that);
        })
        .catch(function(e) {
         
          //wx.hideLoading();
          wx.showToast({
            title: e.errMsg || '活动发布失败，请稍后重试！'
          });
        });
    }
    //头图选择模板
    if(this.data.hearder_define_add && this.data.templatePictrue!='' && this.data.templatePictrue.length > 0){
          var info = this.data.info;
          info.sid = wx.getStorageSync('sid');
          request({
            url: APIS.PUBLISHED_ACTIVITY,
            data: info,
            method: 'POST',
            realSuccess: function(data) {
               wx.showToast({
                  title:'活动发布成功'
               });
            },
            realFail: function(msg) {
              //wx.hideLoading();
              wx.showToast({
                title: msg
              });
            },
            realComplete: function(msg) {
              //wx.hideLoading();
              wx.showToast({
                title: msg
              });
            }, 
          }, true, that);
    }
  },  
   
   /*数据验证*/
    checkBaseInfo: function() {
    
        var d = this.data;
        var flag = true;
        var tips = '';
        //活动名称
        if(d.activityName == ''){
            flag = false;
            tips = '活动名称不能为空！'
        }else if(!d.hearder_define_add && d.picPaths.length == 0){
          //显示自定义图片添加按钮,
          flag = false;
          tips = '自定义图片不能为空！'
        }else if(d.hearder_define_add && d.templatePictrue.length == 0){
          //显示自定义图片添加按钮,选择模板值
           flag = false;
           tips = '请选择头图模板！'
          //祝福语卡券
        }else if(d.blessingCard == ''){
            flag = false;
            tips = '请选择祝福语卡券！'
        }else{
            //奖项设置
            var prize_module_arr = d.prize_module;
            for(var i=0;i<prize_module_arr.length;i++){
                var prize_module_obj = prize_module_arr[i];
                //显示该奖项，则 奖品名称 和id、数量 不能为空
                if(!prize_module_obj.isHidden){
                    if(prize_module_obj.prizeId=='' || prize_module_obj.prizeCount=='' || prize_module_obj.prizeCount==0
                    || prize_module_obj.awardName=='' || prize_module_obj.prizeLevel==''){
                        flag = false;
                        tips = '请为'+prize_module_obj.awardName+'添加奖品和数量' ;
                        break;      
                    }
                }
            }
        }
        if (!flag) {
          //wx.hideLoading();
          wx.showToast({
            title: tips
          });
          return false;
        }
        return true;
     },

     //*构造需要提交的数据*/
      constructBaseInfo: function() {
       
        var d = this.data;
        var colorValue = '';//详情页边框底纹
        var pictures = [];//需要提交的图片
        var prizes = [];//现场奖品等项
        var blessingCard = '';//祝福语卡券
     
       /*1图片设置*/
       if(!d.hearder_define_add && d.picPaths.length >0){
          //显示自定义图片添加按钮,
           pictures = d.picPaths;
        }
       if(d.hearder_define_add && d.templatePictrue.length > 0){
          //显示自定义图片添加按钮,选择模板值
          var templatePictrueArr = d.templatePictrue;
          for(var i=0;i<templatePictrueArr.length;i++){
              if(templatePictrueArr[i].isSelect){
                  pictures.push(d.templatePictrue[i].imageurl);
              }
          }
        }
        /*2卡券设置*/
        if(d.blessingCard != ''){
            blessingCard = d.blessingCard;
        }
        /*3奖项设置*/
        var prize_module_arr = d.prize_module;
        var isGo = false;
        for(var i=0;i<prize_module_arr.length;i++){
            var prize_module_obj = prize_module_arr[i];
            //显示该奖项，则 奖品名称 和id、数量 不能为空
            if(!prize_module_obj.isHidden){
                if(prize_module_obj.prizeId=='' || prize_module_obj.prizeCount=='' || prize_module_obj.prizeCount==0
                || prize_module_obj.awardName=='' || prize_module_obj.prizeLevel==''){
                    isGo = true;
                    break;      
                }
            }
         }
          if(!isGo){
              var prize_module_arr = d.prize_module;
              for(var i=0;i<prize_module_arr.length;i++){
                if(prize_module_arr[i].isHidden==''){//选择没有隐藏的奖项
                    var prizeObj = {
                        prizeId:prize_module_arr[i].prizeId,
                        prizeCount:prize_module_arr[i].prizeCount,
                        prizeLevel:prize_module_arr[i].prizeLevel,
                        awardName:prize_module_arr[i].awardName,
                    };
                    prizes.push(prizeObj);
                }
             }
          }
          /*4底纹色值
          var shading_module_arr = d.shading_module;
          for(var i=0;i<shading_module_arr.length;i++){
            if(shading_module_arr[i].isChecked){
                colorValue = shading_module_arr[i].id;
            }
          }
          */
          colorValue = d.colorValue;
          //再次验证数据完整性
          var flag = true;
          var tips = '';
          if(colorValue == ''){
              flag = false;
              tips = '边框底纹选项为空';
          }
          if(pictures == '' || pictures.length == 0){
              flag = false;
              tips = '请添加头图';
          }
          if(prizes == '' || prizes.length == 0){
              flag = false;
              tips = '请添完成奖项设置';
          }
          if(blessingCard == ''){
              flag = false;
              tips = '请选择祝福语送卡券'
          }
          if (!flag) {
               wx.showToast({
                title: tips
              });
              return false;
         }
         var startTime = d.startDate + ' ' + d.startClock + ':00';
         var endTime = d.endDate + ' ' + d.endClock + ':00';
        //最终提交结果对象
        var info = {
            activityName:d.activityName,
            startTime: d.startDate + ' ' + d.startClock + ':00',
            endTime: d.endDate + ' ' + d.endClock + ':00',
            pictures:pictures,
            colorValue:colorValue,
            prizes:prizes,
            blessingCard:blessingCard
        };
        this.setData({
            info: info,
            pictures:pictures
        });
        return true;
    },

    /*预览*/
    preview:function(e){
        var d = this.data;
        var picture  = [];
        var colorValue = '';
        var flag = false;
       /*图片设置*/
       if(!d.hearder_define_add && d.picPaths.length >0){
          //显示自定义图片添加按钮,
           picture = d.picPaths;
           flag = true;
        }
       if(d.hearder_define_add && d.templatePictrue.length > 0){
          //显示自定义图片添加按钮,选择模板值
          var templatePictrueArr = d.templatePictrue;
          for(var i=0;i<templatePictrueArr.length;i++){
              if(templatePictrueArr[i].isSelect){
                  picture.push(d.templatePictrue[i].imageurl);
                  flag = true;
              }
          }
        }
        if(!flag){
            wx.showToast({
                title: '请选择头部滚动图片'
            });
            return;
        }
         /*底纹色值
        var shading_module_arr = d.shading_module;
        for(var i=0;i<shading_module_arr.length;i++){
          if(shading_module_arr[i].isChecked){
              colorValue = shading_module_arr[i].id;
          }
        }
        */
        colorValue = d.colorValue;
        wx.navigateTo({
          url: '../activityDetailPreview/activityDetailPreview?picture='+picture+'&colorValue='+colorValue,
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
})