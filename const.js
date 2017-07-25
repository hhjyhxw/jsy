var monthFormatList = [
  { arabic: 1, eng: 'January', simpleEng: 'Jan' },
  { arabic: 2, eng: 'February', simpleEng: 'Feb' },
  { arabic: 3, eng: 'March', simpleEng: 'Mar' },
  { arabic: 4, eng: 'April', simpleEng: 'Apr' },
  { arabic: 5, eng: 'May', simpleEng: 'May' },
  { arabic: 6, eng: 'June', simpleEng: 'Jun' },
  { arabic: 7, eng: 'July', simpleEng: 'Jul' },
  { arabic: 8, eng: 'August', simpleEng: 'Aug' },
  { arabic: 9, eng: 'September', simpleEng: 'Sep' },
  { arabic: 10, eng: 'October', simpleEng: 'Oct' },
  { arabic: 11, eng: 'November', simpleEng: 'Nov' },
  { arabic: 12, eng: 'December', simpleEng: 'Dec' },
];

var dayFormatList = [
  { chi: '星期天', eng: 'Sunday', simpleEng: 'Sun' },
  { chi: '星期一', eng: 'Monday', simpleEng: 'Mon' },
  { chi: '星期二', eng: 'Tuesday', simpleEng: 'Tues' },
  { chi: '星期三', eng: 'Wednesday', simpleEng: 'Wed' },
  { chi: '星期四', eng: 'Thursday', simpleEng: 'Thur' },
  { chi: '星期五', eng: 'Friday', simpleEng: 'Fri' },
  { chi: '星期六', eng: 'Saturday', simpleEng: 'Sat' }
];

var reqHost = 'https://www.leiyi.club/jsy';
var reqImgHost = 'https://www.leiyi.club/img/jsy';

var APIS = {
  REQ_IMG_HOST:         reqImgHost,
  LOGIN: 										reqHost + '/wx/login',
  CHECK_SESSION: 						reqHost + '/wx/checkSession',
  FILE_UPLOAD:              reqHost + '/fileUpload',//删除图片

  GET_BANNER: 						reqHost + '/getBanner',//首页banner
  GET_CATRGORY: 			reqHost + '/getcatrgory',//商品分类
  GET_PRODUCT_LIST: reqHost + '/getProductList',//商品列表
	GET_PRODUCT_DETAIL: 					reqHost + '/getProductDetail', //产品详情

	GET_ANNOUOUNCEMENT_LIST: 			reqHost + '/getAnnouncementList',//获取公告列表

	GET_TEMPLATE:									reqHost + '/getTemplate',//获取头图模板
	GET_COLOR_CONFIG: 						reqHost + '/getColorConfig',//获取底色列表
	GET_PRIZE_LIST:					reqHost + '/getPrizeList',//获取奖品列表
	PUBLISHED_ACTIVITY:		reqHost + '/publishedActvitiy', //发布活动
  GET_CARD_LIST:        reqHost + '/getCardList',//祝福语送卡券列表
	ACTIVITY_DETAIL: 				reqHost +'/activityDetail',//活动详情
	GET_COMMENT_LIST: 							reqHost +'/getCommentList', //评论列表
  ADD_COMMENT: 							reqHost +'/addComment', //7，提交祝福
  CARD_NOTIFY: 							reqHost +'/cardNotify', //8，领取卡券成功通知
  
	
	MY_CENTEN: 						 		reqHost +'/myCenter', //个人中心
	MY_PRIZE_LIST: 									reqHost +'/myPrizeList', //我的奖品列表
	MY_CARD_LIST: 						reqHost +'/myCardList', //我的卡券
	MY_FOLLOW: 							 	reqHost +'/myFollow', //3，我参加过的婚礼
	LIST_ADD: 							 	reqHost +'/listAdd',// 4，卡券列表领取卡券/打开卡券

  //四、助力活动
	ENTER_HELP:								reqHost +'/enterHelp',//1，进去创建页面
	CREATE_HELP:							reqHost +'/createHelp',//2，创建助力
	MY_HELP_LIST:      reqHost +'/myHelpList',//3，我的助力列表

 
	
};

var QQ_MAP_KEY = 'PLWBZ-AGPWS-LWBOA-6BJYO-ZUYYZ-O7FKK';

module.exports = {
    monthFormatList: monthFormatList,
    dayFormatList: dayFormatList,
    APIS: APIS,
    QQ_MAP_KEY: QQ_MAP_KEY
};
