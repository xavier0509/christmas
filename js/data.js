var accountVersion = ""; // 账户版本
var cAppVersion = ""; //影视版本
var deviceInfo = ""; //设备信息
var macAddress = ""; //mac
var TVmodel = ""; //机型
var TVchip = ""; //机芯
var activityId = ""; //激活id
var emmcId = "";//emmcid;
var loginstatus = ""; //登录状态-string
var tencentWay = ""; //腾讯源机器调用登录的要求（both,qq,weixin)
var user_flag = ""; //下单传递用户标识1-token；2-openid
var access_token = ""; //token值
var login_type = ""; //下单拓展信息 0-手机；1-qq;2-weixin
var vuserid = ""; //vuserid
var showFlag = ""; //用于判断当前账户是否发生改变，防止多次监听到账户变化多次刷新页面
var cOpenId = "";
var nick_name = "";
var movieSource = "";
var needQQ = false;

var gameVersion = 0;
var showprogress = 0;
var waitApkInstallFunc = "";
var downToast = "";
var downGameFalse = false;
var startActionReplace = "coocaa.intent.action.HOME";

var actionStatus = "start";
var gameStatus = "";

// var adressIp = "http://beta.restful.lottery.coocaatv.com";
// var orderUrl = "http://172.20.132.182:8090/v3/order/genOrderByJsonp.html?data=";
// var actionId = "89";
// var goldActionId = "90";
// var buyActiveId = "91";
var adressIp = "https://restful.skysrt.com";
var orderUrl = "https://api-business.skysrt.com/v3/order/genOrderByJsonp.html?data=";
var actionId = "102";
var goldActionId = "100";
var buyActiveId = "101";

// var awardurl = "http://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/myaward.html?from=street";
// var homeurl = "http://beta.webapp.skysrt.com/lxw/sd/index.html";

var awardurl = "https://webapp.skysrt.com/christmas18/myaward/index.html?from=street";
var homeurl = "https://webapp.skysrt.com/christmas18/main/index.html";

// var operationurl="http://172.20.155.91:8080/tvos/getWebPageContent";
var operationurl="http://api.home.skysrt.com/v1/tvos/getWebPageContent";

var showMove = false;//是否展示动效

var browserVersion = 0;
var cAppVersion = 0;
var activityCenterVersion = 0;
var mallVersion = 0;

var userKeyId = "";

var homepage = "";
var ADMsg = null;
var topblock_type="";//页面顶部推荐推荐位状态
var page_type = "";//黄金小屋未开启状态;
var link_type = "";//首行影视链接、首行教育链接、首行购物链接、首行应用链接
var bannerBtnName="马上领取";
var needSentADLog = false;
var needFresh = false;
var actEnd = false;
var awardToast = false;
var marqueeInterval1 = null;
var marqueeInterval2 = null;
var intervalForCutdown = null;
var rememberBtn = null;
var needRememberFocus = false;
var remembernum = "0";
var toastTimeout = null;
var toastTimeout2 = null;
var toastTimeout3 = null;
var userIp = "";





