var _tencentWay = null;
var _user_flag = null;
var _login_type = null;
var _vuserid = null;
var _qqtoken = null;
var _mobile = null;
var needQQ = false;
var _isneedExit = true;//记录圣诞小屋页面是否需要退掉
var _isToastExit = false;//记录做任务toast是否响应返回键

var _actionid = 102; //主活动id
var _lotteryid = 100; //抽奖活动id
var _buyActiveId = 101; //采购活动id
var _testurl0 = "https://restful.skysrt.com";
var _testurl = "https://restful.skysrt.com//light";
var enurl = "https://webapp.skysrt.com/christmas18/address/index.html?";
var awardurl = "https://webapp.skysrt.com/christmas18/myaward/index.html?";
var packlisturl = "https://api.tvshop.coocaa.com/cors/tvCartAPI/packGoodsList";
var packgoodUrl = "https://api.tvshop.coocaa.com/cors/tvCartAPI/addCartFromAct";
var goodsCouponUrl = "https://api.tvshop.coocaa.com/cors/tvUsersAPI/goodsCoupon";

var packGoodsObj = [{"goodId": 18129,"goodImg": "images/packid2/18129.png","goodName": "霸王润养精油洗发液"
}, {"goodId": 16927,"goodImg": "images/packid2/16927.png","goodName": "贝尔莱德便携熨烫机"
}, {"goodId": 17231,"goodImg": "images/packid2/17231.png","goodName": "山水全钢电陶炉"
}, {"goodId": 17784,"goodImg": "images/packid2/17784.png","goodName": "先锋智能移动地暖"
}, {"goodId": 17853,"goodImg": "images/packid2/17853.png","goodName": "玻妞擦窗机器人"
}, {"goodId": 16631,"goodImg": "images/packid2/16631.png","goodName": "新潮流电动清洁机"
}, {"goodId": 17909,"goodImg": "images/packid2/17909.png","goodName": "奥力福鹅绒被"
}, {"goodId": 18006,"goodImg": "images/packid2/18006.png","goodName": "洛比云学习机器人"
}, {"goodId": 18004,"goodImg": "images/packid2/18004.png","goodName": "杜邦智能蒸汽烤箱"
}, {"goodId": 17207,"goodImg": "images/packid2/17207.png","goodName": "五粮液1918佳酿酒"
}, {"goodId": 17208,"goodImg": "images/packid2/17208.png","goodName": "Queens真空破壁机"
}, {"goodId": 16522,"goodImg": "images/packid2/16522.png","goodName": "法国拉菲波尔多干红"
}, {"goodId": 15597,"goodImg": "images/packid2/15597.png","goodName": "QUEENS'MATE面条机"
}, {"goodId": 15679,"goodImg": "images/packid2/15679.png","goodName": "芯启源太空舱按摩椅"
}, {"goodId": 15837,"goodImg": "images/packid2/15837.png","goodName": "诺肯不锈钢浴室柜"
}, {"goodId": 17428,"goodImg": "images/packid2/17428.png","goodName": "荣事达脱糖养生煲"
}, {"goodId": 17933,"goodImg": "images/packid2/17933.png","goodName": "美国西屋取暖器"
}, {"goodId": 14927,"goodImg": "images/packid2/14927.png","goodName": "蒲尔菲富氢养生水杯"
}, {"goodId": 17076,"goodImg": "images/packid2/17076.png","goodName": "科莱默智能电饭煲"
}, {"goodId": 14044,"goodImg": "images/packid2/14044.png","goodName": "宝家洁自甩水平拖"}];

// var _actionid = 89; //主活动id
// var _lotteryid = 90; //抽奖活动id
// var _buyActiveId = 91; //采购活动id
// var _testurl0 = "http://beta.restful.lottery.coocaatv.com";
// var _testurl = "http://beta.restful.lottery.coocaatv.com//light";
// var enurl = "http://beta.webapp.skysrt.com/zy/address/index.html?";
// var awardurl = "http://beta.webapp.skysrt.com/yuanbo/test/XmasNewYear2018/myaward.html?";
// var packlisturl = "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/packGoodsList";
// var packgoodUrl = "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/addCartFromAct";
// var goodsCouponUrl = "http://beta.api.tvshop.coocaa.com/cors/tvUsersAPI/goodsCoupon";

// var packGoodsObj = [{"goodId": 14823,"goodImg": "images/packid/14823.png","goodName": "QUEENS'MATE面条机"
// }, {"goodId": 14822,"goodImg": "images/packid/14822.png","goodName": "Queens真空破壁机"
// }, {"goodId": 14821,"goodImg": "images/packid/14821.png","goodName": "奥力福鹅绒被"
// }, {"goodId": 14820,"goodImg": "images/packid/14820.png","goodName": "霸王润养精油洗发液"
// }, {"goodId": 14819,"goodImg": "images/packid/14819.png","goodName": "宝家洁自甩水平拖"
// }, {"goodId": 14818,"goodImg": "images/packid/14818.png","goodName": "贝尔莱德便携熨烫机"
// }, {"goodId": 14817,"goodImg": "images/packid/14817.png","goodName": "玻妞擦窗机器人"
// }, {"goodId": 14816,"goodImg": "images/packid/14816.png","goodName": "科莱默智能电饭煲"
// }, {"goodId": 14815,"goodImg": "images/packid/14815.png","goodName": "杜邦智能蒸汽烤箱"
// }, {"goodId": 14814,"goodImg": "images/packid/14814.png","goodName": "法国拉菲波尔多干红"
// }, {"goodId": 14813,"goodImg": "images/packid/14813.png","goodName": "洛比云学习机器人"
// }, {"goodId": 14812,"goodImg": "images/packid/14812.png","goodName": "美国西屋取暖器"
// }, {"goodId": 14811,"goodImg": "images/packid/14811.png","goodName": "诺肯不锈钢浴室柜"
// }, {"goodId": 14810,"goodImg": "images/packid/14810.png","goodName": "蒲尔菲富氢养生水杯"
// }, {"goodId": 14809,"goodImg": "images/packid/14809.png","goodName": "荣事达脱糖养生煲"
// }, {"goodId": 14808,"goodImg": "images/packid/14808.png","goodName": "山水触摸全钢电陶炉"
// }, {"goodId": 14807,"goodImg": "images/packid/14807.png","goodName": "五粮液1918佳酿酒"
// }, {"goodId": 14806,"goodImg": "images/packid/14806.png","goodName": "先锋智能移动地暖"
// }, {"goodId": 14803,"goodImg": "images/packid/14803.png","goodName": "芯启源太空舱按摩椅"
// }, {"goodId": 14800,"goodImg": "images/packid/14800.png","goodName": "新潮流电动清洁机"}];


var _version = "";
var _source = "";
var _mac = "";
var _chip = "";
var _model = "";
var _emmcCID = "";
var _udid = "";
var _cVersion = "";
var _cSize = "";
var _cSdk = "";
var _cBrand = "";
var _cFMode = "Default";
var _appversion = "";
var _accessToken = "";
var _openId = "";
var _nickName = "";

var _rememberId = "";
var _userKeyId = "";
var _loginstatus = null;
var _pgname = "gold";
var userIp = "";
var _remainingNumber = 0; //记录当前剩余铃铛数
var _isLessFivs = 0; //记录黄金屋活动距离结束是否小于5小时
var _elkOver = false; //麋鹿任务是否达到上线
var _packageOver = false; //打包任务是否达到上限
var _taskLogin = false; //是否需要弹登录1
var _bellLogin = false; //是否需要弹登录2
var _koiNum = 0;//记录锦鲤的个数
var goldHouseIsOpen = "1"; //1--未开始   2---已开始   3---已结束
var goldHouseStation = "黄金小屋未开启";
var _startLogin = 0; //记录启登录时的状态 
var _curPackIndex = 0; //记录当前点击的打包商品是第几个
var _curHomeBtn = ""; //记录主页面点击的btn
var t1 = "";
var intervalForCutdown = "";
var _curGoldAwardData = ""; //记录当前黄金屋抽奖
var _province = "";
var _city = "";
var _isStartDraw = "0";
var _gotoPackPage = "0"; //记录进入打包清单页面的路径
var _loginT = "";//登录弹窗的计时器
var _isFirstIn = 0;//记录是否是第一次登录

var startLoginFlag = false;
var changeLoginFlag = false;

var _moreGoodsIdArrTencent = [5, 57, 13230, 17231, 16992];
var _moreGoodsIdArrIqiyi = [1, 57, 13230, 17231, 16992];
var _moreGoodsNameArr = ["影视VIP年卡", "少儿VIP12个月", "欧慕迷你电烤箱", "山水触摸全钢电陶炉", "先锋电暖器"];
var packGoodsObj2 = new Array();
var couponGoodsId = "18129,13230,17231,18076,18073,18075,18074"; //推荐位id
var couponGoodsIdArr = [18129, 13230, 17231, 18076, 18073, 18075, 18074]; //推荐位id
//url传进来的参数：
var _bActivityEnd = false; //活动是否结束，默认进行中。
var flag = false;
var index = 0;
var TextNum2;
var browserVersion = 0;
var cAppVersion = 0;
var activityCenterVersion = 0;
var mallVersion = 0;
var ADMsg = null;

var missionlistTencent = [{business: "mall",type: "specialtopic",param: {"id": "102930"},action: "coocaa.intent.action.HOME_COMMON_LIST",countDownTime: 10,"subTask": 0
}, {business: "mall",type: "malldetail",param: {"id": "17186"},action: "coocaa.intent.action.MALL_DETAIL",countDownTime: 10,"subTask": 0
}, {business: "mall",type: "malldetail",param: {"id": "17933"},action: "coocaa.intent.action.MALL_DETAIL",countDownTime: 10,"subTask": 0
}, {business: "movie",type: "vip",param: {"source_id": "5"},action: "coocaa.intent.vip.center",countDownTime: 10,"subTask": 0
}, {business: "ad",type: "video",action: "app_browser.intent.action.PLAYER",param: {"extra.id": "","extra.uri": "http://v-play.coocaatv.com/0915/wushuang.mp4","extra.tips": "看视频得铃铛","extra.height": "","extra.width": "","extra.http_call_url": "","extra.type": "","extra.name": ""},countDownTime: 10,"subTask": 1
}, {business: "movie",type: "videospecial",param: {"topicCode": "98"},action: "coocaa.intent.movie.videospecial",countDownTime: 10,"subTask": 0
}, {business: "movie",type: "specialtopic",param: {"id": "103065"},action: "coocaa.intent.action.HOME_SPECIAL_TOPIC",countDownTime: 10,"subTask": 0
}, {business: "movie",type: "videospecial",param: {"pTopicCode": "1183"},action: "coocaa.intent.movie.videospecial",countDownTime: 10,"subTask": 0
}, {business: "edu",type: "commonlist",param: {"id": "10738"},action: "coocaa.intent.action.HOME_COMMON_LIST",countDownTime: 10,"subTask": 0
}, {business: "edu",type: "commonlist",param: {"id": "102831"},action: "coocaa.intent.action.HOME_COMMON_LIST",countDownTime: 10,"subTask": 0
}, {business: "edu",type: "commonlist",param: {"id": "103177"},action: "coocaa.intent.action.HOME_COMMON_LIST",countDownTime: 10,"subTask": 0}];
var missionlistYinhe = [{business: "mall",type: "specialtopic",param: {"id": "102930"},action: "coocaa.intent.action.HOME_COMMON_LIST",countDownTime: 10,"subTask": 0
}, {business: "mall",type: "malldetail",param: {"id": "17186"},action: "coocaa.intent.action.MALL_DETAIL",countDownTime: 10,"subTask": 0
}, {business: "mall",type: "malldetail",param: {"id": "17933"},action: "coocaa.intent.action.MALL_DETAIL",countDownTime: 10,"subTask": 0
}, {business: "movie",type: "vip",param: {"source_id": "1"},action: "coocaa.intent.vip.center",countDownTime: 10,"subTask": 0
}, {business: "ad",type: "video",action: "app_browser.intent.action.PLAYER",param: {"extra.id": "","extra.uri": "http://v-play.coocaatv.com/0915/wushuang.mp4","extra.tips": "看视频得铃铛","extra.height": "","extra.width": "","extra.http_call_url": "","extra.type": "","extra.name": ""},countDownTime: 10,"subTask": 1
}, {business: "movie",type: "videospecial",param: {"topicCode": "98"},action: "coocaa.intent.movie.videospecial",countDownTime: 10,"subTask": 0
}, {business: "movie",type: "specialtopic",param: {"id": "103099"},action: "coocaa.intent.action.HOME_SPECIAL_TOPIC",countDownTime: 10,"subTask": 0
}, {business: "movie",type: "videospecial",param: {"pTopicCode": "1183"},action: "coocaa.intent.movie.videospecial",countDownTime: 10,"subTask": 0
}, {business: "edu",type: "commonlist",param: {"id": "10738"},action: "coocaa.intent.action.HOME_COMMON_LIST",countDownTime: 10,"subTask": 0
}, {business: "edu",type: "commonlist",param: {"id": "102987"},action: "coocaa.intent.action.HOME_COMMON_LIST",countDownTime: 10,"subTask": 0
}, {business: "edu",type: "commonlist",param: {"id": "103178"},action: "coocaa.intent.action.HOME_COMMON_LIST",countDownTime: 10,"subTask": 0}];

var app = {
    canonical_uri: function(src, base_path) {
        var root_page = /^[^?#]*\//.exec(location.href)[0],
            root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
            absolute_regex = /^\w+\:\/\//;
        if(/^\/\/\/?/.test(src)) {
            src = location.protocol + src;
        } else if(!absolute_regex.test(src) && src.charAt(0) != "/") {
            src = (base_path || "") + src;
        }
        return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
    },
    rel_html_imgpath: function(iconurl) {
        return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'));
    },
    initialize: function() {
        this.bindEvents();
        console.log("lxw in initialize");
        _pgname = getQueryString("pagename");
        console.log(_pgname);
        if(_pgname == "pack") {
            $("#packGoodsPage").css("display", "block");
            _gotoPackPage = 0;
        } else {
            $("#homePage").css("display", "block");
        }
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.handleBackButton, false);
        document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
        document.addEventListener('resume', this.onResume, false);
        document.addEventListener("pause", this.pause, false);
    },
    handleBackButton: function() {
        console.log("lxw Back Button Pressed!");
    },
    onResume: function() {
        console.log("--------------------->Page onResume!");
        console.log(_loginstatus + "--" + _accessToken + "--" + _openId);
        onResumeFunc();
    },
    pause: function() {

    },
    onDeviceReady: function() {
        console.log("onDeviceReady");
        app.receivedEvent("deviceready");
        app.triggleButton();
    },
    receivedEvent: function(id) {
        console.log("=============>" + id);

    },
    handleBackButtonDown: function() {
        backButtonFunc();
    },
    triggleButton: function() {
        cordova.require("com.coocaaosapi");
        _appversion = accountVersion;
        listenUserChange();
        getDeviceInfo();
        getLocationInfo();
        buttonInitBefore();
        showAwardInfo();
        checkVersion();
        if(_pgname == "gold") {
            selectAd("ADPart1", "CCADTV10017", "G0003", "2", "1", "1", "", ""); //ADPart1  广告位id
        }
        coocaaosapi.getIpInfo(function(msg) {
            userIp = msg.ip;
        }, function() {});
    }
};

app.initialize();

function getLocationInfo() {
    coocaaosapi.getDeviceLocation(function(message) {
        console.log("location " + message.location);
        _province = message.location.split(",")[0];
        _city = message.location.split(",")[1];
        console.log(_province + "--" + _city);
    }, function(error) {
        console.log(error);
    });
}

function getDeviceInfo() {
    coocaaosapi.getDeviceInfo(function(message) {
        console.log(JSON.stringify(message));
        _model = message.model;
        _chip = message.chip;
        _mac = message.mac;

        if(message.emmcid == "" || message.emmcid == null) {
            _emmcCID = "123456";
        } else {
            _emmcCID = message.emmcid;
        }
        _udid = message.activeid;
        _version = message.version;
        _userKeyId = _udid;
        _cVersion = message.version.replace(/\./g, "");
        _cSize = message.panel;
        _cSdk = message.androidsdk;
        _cBrand = message.brand;
        getTvSource(_mac, _chip, _model, _emmcCID, _udid, _cFMode, _cVersion, _cSize, _appversion, _cSdk, _cBrand);
    }, function(error) {
        console.log("获取设备信息出现异常。");
    });
}
//获取视频源
function getTvSource(smac, schip, smodel, semmcid, sudid, sFMode, sTcVersion, sSize, sAppVersion, sSdk, sBrand) {
    console.log(smac + "--" + sudid + "--" + sAppVersion + "--" + sSdk);
    var ajaxTimeout = $.ajax({
        type: "POST",
        async: true,
        timeout: 10000,
        dataType: 'json',
        url: _testurl0 + "/light/active/tv/source",
        data: {
            "MAC": smac,
            "cChip": schip,
            "cModel": smodel,
            "cEmmcCID": semmcid,
            "cUDID": sudid,
            "cFMode": sFMode,
            "cTcVersion": sTcVersion,
            "cSize": sSize,
            "cAppVersion": sAppVersion,
            "cBrand": sBrand
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if(data.code == 0) {
                _qsource = data.data.source;
                if(_qsource == "tencent") {
                    needQQ = true;
                }
                console.log(_qsource + "--" + needQQ);
            }
        },
        error: function() {
            console.log('获取视频源失败');
        },
        complete: function(XMLHttpRequest, status) {
            console.log("-------------complete------------------" + status);
            if(status == 'timeout') {　　
                ajaxTimeout.abort();　　　　
            }
            hasLogin(needQQ, 0);
        }
    });
}
//判断是否登录
function hasLogin(needQQ, num) {
    coocaaosapi.hasCoocaaUserLogin(function(message) {
        console.log("haslogin " + message.haslogin);
        _loginstatus = message.haslogin;
        if(_loginstatus == "false") {
            if(needQQ){
                if(cAppVersion >= 3190030) {
                    _tencentWay = "both";
                } else {
                    _tencentWay = "qq";
                }
            }
            _user_flag = 0;
            _accessToken = "";
            _operateTime = 0;
            if(num == 0) {
                if(_pgname == "pack") {
                    actionInit(1, 1, 0, 1); //num1是否是第一次初始化,num2哪个页面初始化,num3是否只处理弹窗
                } else {
                    actionInit(1, 2, 0, 1); //num1是否是第一次初始化,num2哪个页面初始化,num3是否只处理弹窗
                }
            }
        } else {
            coocaaosapi.getUserInfo(function(message) {
                exterInfo = message.external_info;
                _openId = message.open_id;
                _mobile = message.mobile;
                console.log(_openId);
                _nickName = message.nick_name;
                coocaaosapi.getUserAccessToken(function(message) {
                    _accessToken = message.accesstoken;
                    console.log(_accessToken);
                    if(exterInfo == "[]") {
                        exterInfo = '[{}]';
                    } else {}
                    _user_flag = 1;
                    if(needQQ) {
                        qqinfo = JSON.parse(exterInfo);
                        if(qqinfo.length == 1) {
                            if(cAppVersion >= 3190030) {
                                if(JSON.stringify(qqinfo[0]) == "{}") {
                                    _tencentWay = "both";
                                } else {
                                    _tencentWay = qqinfo[0].external_flag;
                                }
                            } else {
                                _tencentWay = "qq";
                            }
                            if(qqinfo != "" && qqinfo != null && qqinfo[0].login) {
                                _qqtoken = qqinfo[0].external_id;
                                if(qqinfo[0].external_flag == "qq") {
                                    _login_type = 1;
                                } else {
                                    _login_type = 2;
                                    _vuserid = qqinfo[0].vuserid;
                                    if(_vuserid == undefined) {
                                        _vuserid = JSON.parse(qqinfo[0].refreshToken).vuserid
                                    }
                                    if(cAppVersion < 3190030) {
                                        _loginstatus = "false";
                                    }
                                }
                            } else {
                                _tencentWay = "both";
                                _loginstatus = "false";
                            }
                        } else {
                            var needSelectNum = 0;
                            for(var b = 0; b < qqinfo.length; b++) {
                                needSelectNum = needSelectNum + 1;
                                if(qqinfo[b].login && qqinfo[b].external_flag != "jscn") {
                                    _qqtoken = qqinfo[b].external_id;
                                    if(qqinfo[b].external_flag == "qq") {
                                        _login_type = 1;
                                    } else {
                                        _login_type = 2;
                                        _vuserid = qqinfo[b].vuserid;
                                        if(_vuserid == undefined) {
                                            _vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
                                        }
                                        if(cAppVersion < 3190030) {
                                            _loginstatus = "false";
                                            _tencentWay = "qq";
                                        }
                                    }
                                    break;
                                }
                                if(needSelectNum == qqinfo.length) {
                                    _tencentWay = "both";
                                    _loginstatus = "false";
                                }
                            }
                        }
                    } else {
                        qqinfo = JSON.parse(exterInfo);
                        for(var b = 0; b < qqinfo.length; b++) {
                            if(qqinfo[b].login) {
                                _qqtoken = qqinfo[b].external_id;
                                if(qqinfo[b].external_flag == "qq") {
                                    _login_type = 1;
                                } else if(qqinfo[b].external_flag == "weixin") {
                                    _login_type = 2;
                                    vuserid = qqinfo[b].vuserid;
                                    if(vuserid == undefined) {
                                        vuserid = JSON.parse(qqinfo[b].refreshToken).vuserid
                                    }
                                }
                                break;
                            } else {
                                _qqtoken = "";
                            }
                        }
                    }
                    if(num == 0) {
                        if(_pgname == "pack") {
                            actionInit(1, 1, 0, 1); //num1是否是第一次初始化,num2哪个页面初始化,num3是否只处理弹窗
                        } else {
                            actionInit(1, 2, 0, 1); //num1是否是第一次初始化,num2哪个页面初始化,num3是否只处理弹窗
                        }
                    }
                }, function(error) {
                    console.log(error);
                })
            }, function(error) {
                console.log(error);
            });
        }
    }, function(error) {
        console.log(error);
    });
}
//监听账户变化
function listenUserChange() {
    coocaaosapi.addUserChanggedListener(function(message) {
        console.log("监听到账户发生变化");
        changeLoginFlag = true;
        console.log(_startLogin);
        hasLogin(needQQ, 1);
    });
}
//启登录
function startLogin(needQQ) {
    console.log("lxw " + _tencentWay);
    if(needQQ) {
        if(accountVersion > 4030000) {
            if(_tencentWay == "qq") {
                coocaaosapi.startWeixinOrQQ2("LOGIN_QQ", function(message) {
                    console.log(message);
                }, function(error) {
                    console.log(error);
                });
            } else if(_tencentWay == "weixin") {
                coocaaosapi.startWeixinOrQQ2("LOGIN_WEIXIN", function(message) {
                    console.log(message);
                }, function(error) {
                    console.log(error);
                });
            } else if(_tencentWay == "both") {
                coocaaosapi.startWeixinOrQQ2("TENCENT", function(message) {
                    console.log(message);
                }, function(error) {
                    console.log(error);
                });
            }
        } else {
            coocaaosapi.startThirdQQAccount(function(message) {
                console.log(message);
            }, function(error) {
                console.log(error);
            });
        }
    } else {
        if(_version.replace(/\./g, "") < 550000000 && accountVersion > 4030000) {
            coocaaosapi.startUserSettingAndFinish2(function(message) {
                console.log(message);
            }, function(error) {
                console.log(error);
            });
        } else {
            coocaaosapi.startUserSettingAndFinish(function(message) {
                console.log(message);
            }, function(error) {
                console.log(error);
            });
        }
    }
}

function buttonInitBefore() {
    $("#firstLoadRule").unbind("itemClick").bind("itemClick", function() {
        console.log("首次进入弹窗规则的我知道了");
        $("#firstLoadRule").css("display", "none");
        $("#firstLoadDraw").css("display", "block");
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("drawAward1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        if(goldHouseIsOpen == 2) {
            sentLog("new_player_gift_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '游戏玩法弹窗', '黄金小屋已开启', '', '']);
        } else {
            sentLog("new_player_gift_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '游戏玩法弹窗', '黄金小屋未开启', '', '']);
        }
    });
    $(".drawAwards").unbind("itemClick").bind("itemClick", function() {
        $("#firstLoadDraw").css("display", "none");
        $("#firstLoadAward").css("display", "block");
        $("#redAwardImg").css("display", "none");
        $("#couponAwardImg").css("display", "none");
        $("#entityAwardImg").css("display", "none");
        firstSendGift();
        var _fIndex = $(".drawAwards").index($(this));
        if(_fIndex == 0) {
            if(goldHouseIsOpen == 2) {
                sentLog("new_player_gift_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"第一个礼品"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋已开启+第一个礼品', '', '']);
            } else {
                sentLog("new_player_gift_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"第一个礼品"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋未开启+第一个礼品', '', '']);
            }
        } else if(_fIndex == 1) {
            if(goldHouseIsOpen == 2) {
                sentLog("new_player_gift_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"第二个礼品"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋已开启+第二个礼品', '', '']);
            } else {
                sentLog("new_player_gift_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"第二个礼品"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋未开启+第二个礼品', '', '']);
            }
        } else if(_fIndex == 2) {
            if(goldHouseIsOpen == 2) {
                sentLog("new_player_gift_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"第三个礼品"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋已开启+第三个礼品', '', '']);
            } else {
                sentLog("new_player_gift_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"第三个礼品"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋未开启+第三个礼品', '', '']);
            }
        }
    });
    $("#close").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了返回+退掉弹窗");
        $("#firstLoadAward").css("display", "none");
        $("#dialogPage").css("display", "none");
        $(".secondBtns").css("display", "none");
        if(goldHouseIsOpen == 2) {
            map = new coocaakeymap($(".coocaa_btn"), document.getElementById("goldHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            $("#goldHome").trigger("focus");
            sentLog("new_player_gift_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"关闭"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋已开启+收下红包', '', '']);
        } else {
            randBtnFunc();
            sentLog("new_player_gift_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"关闭"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋未开启+收下红包', '', '']);
        }
    });
    $(".homeBtns").unbind("focus").bind("focus", function() {
        var _fIndex = $(".homeBtns").index($(this));
        console.log(_fIndex);
        console.log(_remainingNumber + "--" + _isLessFivs + "--" + _elkOver + "--" + _packageOver + "--" + goldHouseIsOpen);
        if(_fIndex == 5) {
            console.log("落焦在打包小屋上");
            _isneedExit = true;
            $("#packGoodsBox").css("display", "block");
            $("#packDialog").css("display", "block");
            $("#packGoodsInfo").css("display", "none");
            if(goldHouseIsOpen == 3) {
                $("#packDialog").css("background-image","url(images/pop/end.png)");
            } else if(goldHouseIsOpen == 1||goldHouseIsOpen == 2) {
                if(_packageOver) {
                    $("#packDialog").css("background-image","url(images/pop/pack2.png)");
                    $("#packGoodState").html("今日打包任务已完成");
                } else {
                    $("#packDialog").css("background-image","url(images/pop/pack1.png)");
                    $("#packGoodState").html("按“确定”完成打包任务");
                }
            }
            $("#packHome .imgBlur").css("display", "none");
            $("#packHome .imgFocus").css("display", "block");
            map = new coocaakeymap($(".coocaa_btn"), document.getElementById("packHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            $("#packGoodsUl").stop(true, true).animate({left: 0}, {duration: 0,easing: "swing"});
        } else {
            $("#packGoodsBox").css("display", "none");
            $("#packDialog").css("display", "none");
            $("#packHome .imgBlur").css("display", "block");
            $("#packHome .imgFocus").css("display", "none");
        }
        if(_fIndex == 6) {
            console.log("落焦在锦鲤上");
            $("#koiListBox").css("display", "block");
            $("#koiList .imgBlur").css("display", "none");
            $("#koiList .imgFocus").css("display", "block");
        } else {
            $("#koiListBox").css("display", "none");
            $("#koiList .imgBlur").css("display", "block");
            $("#koiList .imgFocus").css("display", "none");
        }
        if(_fIndex == 3) {
            console.log("落焦在麋鹿休息区");
            $("#restDialog").css("display", "block");
            if(goldHouseIsOpen == 3) {
                $("#restDialog").css("background-image","url(images/pop/end.png)");
            } else if(goldHouseIsOpen == 1||goldHouseIsOpen == 2) {
                if(_elkOver) {
                    $("#restDialog").css("background-image","url(images/pop/reset2.png)");
                } else {
                    $("#restDialog").css("background-image","url(images/pop/reset1.png)");
                }
            }
            $("#restArea .imgBlur").css("display", "none");
            $("#restArea .imgFocus").css("display", "block");
        } else{
            $("#restDialog").css("display", "none");
            $("#restArea .imgBlur").css("display", "block");
            $("#restArea .imgFocus").css("display", "none");
        }
        if(_fIndex == 4) {
            console.log("落焦在黄金小屋上");
            $("#goldDialog").css("display", "block");
            $("#goldHome .imgBlur").css("display", "none");
            $("#goldHome .imgFocus").css("display", "block");
            if(goldHouseIsOpen == 3) {
                $("#goldDialog").css("background-image","url(images/pop/end.png)");
            } else if(goldHouseIsOpen == 1) {
                $("#goldDialog").css("background-image","url(images/pop/gold1.png)");
            } else if(goldHouseIsOpen == 2) {
                if(_remainingNumber < 5) {
                    $("#goldDialog").css("background-image","url(images/pop/gold2.png)");
                } else {
                    if(_koiNum == 2) {
                        $("#goldDialog").css("background-image","url(images/pop/gold5.png)");
                    } else {
                        if(_isLessFivs == 1) {
                            $("#goldDialog").css("background-image","url(images/pop/gold3.png)");
                        } else {
                            var items = ['1', '2'];
                            var item = Math.floor(Math.random() * items.length);
                            console.log(item);
                            if (item == 1) {
                                $("#goldDialog").css("background-image","url(images/pop/gold6.png)");
                            } else{
                                $("#goldDialog").css("background-image","url(images/pop/gold4.png)");
                            }
                        }
                    }
                }
            }
        } else {
            $("#goldDialog").css("display", "none");
            $("#goldHome .imgBlur").css("display", "block");
            $("#goldHome .imgFocus").css("display", "none");
        }
        if(_fIndex == 7) {
            console.log("落焦在采购小屋上");
            $("#purchaseDialog").css("display", "block");
            $("#purchaseHome .imgBlur").css("display", "none");
            $("#purchaseHome .imgFocus").css("display", "block");
            if(goldHouseIsOpen == 3) {
                $("#purchaseDialog").css("background-image","url(images/pop/end.png)");
            } else{
                $("#purchaseDialog").css("background-image","url(images/pop/purchase1.png)");
            }
        }else{
            $("#purchaseDialog").css("display", "none");
            $("#purchaseHome .imgBlur").css("display", "block");
            $("#purchaseHome .imgFocus").css("display", "none");
        }
    });
    $(".homeBtns").unbind("blur").bind("blur", function() {
        var _fIndex = $(".homeBtns").index($(this));
        if(_fIndex == 3) {
            $("#restDialog").css("display", "none");
        } else if(_fIndex == 4) {
            $("#goldDialog").css("display", "none");
        } else if(_fIndex == 5) {
            $("#packDialog").css("display", "none");
        } else if(_fIndex == 6) {
            console.log("锦鲤失去焦点");
        } else if(_fIndex == 7) {
            $("#purchaseDialog").css("display", "none");
        }
    });
    $("#koiList").unbind("itemClick").bind("itemClick", function() {
        _curHomeBtn = "koiList";
        console.log("点击了锦鲤礼包");
        $("#dialogPage").css("display", "block");
        $("#giftsShowBox").css("display", "block");
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("giftsImgBox"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    });
    $("#packHome").unbind("itemClick").bind("itemClick", function() {
        _curHomeBtn = "packHome";
        $("#packDialog").css("display", "none");
        map = new coocaakeymap($("#packGoodsBox .coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
        $(".packGoodsItem:eq(0)").trigger("focus");

        if(goldHouseIsOpen == 1) {
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"打包小屋"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋未开启+打包小屋', '', '']);
        } else if(goldHouseIsOpen == 2) {
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"打包小屋"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋已开启+打包小屋', '', '']);
        } else if(goldHouseIsOpen == 3) {
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已关闭","button_name":"打包小屋"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋已关闭+打包小屋', '', '']);
        }
    });
    $("#goldHome").unbind("itemClick").bind("itemClick", function() {
        _curHomeBtn = "goldHome";
        console.log("点击了黄金小屋" + goldHouseIsOpen);
        $("#dialogPage").css("display", "block");
        console.log(_remainingNumber);
        if(goldHouseIsOpen == 1) {
            console.log("黄金小屋未开始");
            $("#notStart").css("display", "block");
            map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("notStartBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            sentLog("goldhouse_rule_page_show", '{"page_name":"黄金小屋规则页","activity_name":"双旦活动-圣诞小屋"}');
            _czc.push(['_trackEvent', '圣诞小屋页面', '黄金小屋活动规则页面', '', '', '']);
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"黄金小屋"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋未开启+黄金小屋', '', '']);
        } else if(goldHouseIsOpen == 2) {
            console.log("黄金小屋已开始");
            if(_remainingNumber < 5) {
                $("#noFiveBell").css("display", "block");
                console.log(_elkOver+"--"+_packageOver);
                if (!_elkOver) {
                    $("#nofiveBellImg").css("background-image", "url(images/dialog/todotask3.png)");
                } else if(!_packageOver){
                    $("#nofiveBellImg").css("background-image", "url(images/dialog/todotask2.png)");
                } else{
                    $("#nofiveBellImg").css("background-image", "url(images/dialog/todotask.png)");
                }
                if (_remainingNumber != 0) {
                    $("#noFiveBellInfo").html('您目前只有<span style="color: #fffd44">'+_remainingNumber+'</span>个铃铛');
                } else{
                    $("#noFiveBellInfo").html('您目前没有铃铛');
                }
                map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("noFiveBellInfo"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                sentLog("money_insufficient_page_show", '{"page_name":"获取游戏机会弹窗","activity_name":"双旦活动-圣诞小屋"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '铃铛不足弹窗曝光', '1', '', '']);
            } else {
                $("#hasFiveBell").css("display", "block");
                map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("fiveBellEnsure"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            }
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"黄金小屋"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋已开启+黄金小屋', '', '']);
        } else if(goldHouseIsOpen == 3) {
            console.log("黄金小屋已关闭");
            $("#hasEnd").css("display", "block");
            map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("hasEndBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已关闭","button_name":"黄金小屋"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋已关闭+黄金小屋', '', '']);
        }
    });
    $("#notStartBtn").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了黄金小屋未开始的知道了");
        $("#notStart").css("display", "none");
        $("#dialogPage").css("display", "none");
        map = new coocaakeymap($(".coocaa_btn"), document.getElementById("goldHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    });

    $("#activeRule").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了活动规则");
        _curHomeBtn = "activeRule";
        $("#rulePage").css("display", "block");
        map = new coocaakeymap($(".coocaa_btn3"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
        if(goldHouseIsOpen == 1) {
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"活动规则"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋未开启+活动规则', '', '']);
        } else if(goldHouseIsOpen == 2) {
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"活动规则"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋已开启+活动规则', '', '']);
        } else if(goldHouseIsOpen == 3) {
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已关闭","button_name":"活动规则"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋已关闭+活动规则', '', '']);
        }
        sentLog("main_rule_page_show", '{"page_name":"活动规则","activity_name":"双旦活动-圣诞小屋","last_page_name":"圣诞小屋页面"}');
        _czc.push(['_trackEvent', '主活动页面', '活动规则', '圣诞小屋页面', '', '']);
    });
    $("#fiveBellEnsure").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了黄金小屋弹窗的确定键");
        $("#hasFiveBell").css("display", "none");
        startDrawFunc();
        sentLog("luck_draw_box_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋"}');
        _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖箱曝光', '1', '', '']);
    });
    $("#nextTime").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了黄金小屋弹窗的下次再说");
        var _status = $("#nextTime").attr("status");
        $("#dialogPage").css("display", "none");
        $("#firstLoadDraw").css("display", "none");
        $(".secondBtns").css("display", "none");
        setCurBtnFocus();
        if(goldHouseIsOpen == 2) {
            if(_status == 0) {
                sentLog("new_player_gift_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"下次再领"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋未开启+收下红包', '', '']);
            } else {
                sentLog("new_player_gift_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"不用了"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋未开启+收下红包', '', '']);
            }
        } else {
            if(_status == 0) {
                sentLog("new_player_gift_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"下次再领"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋未开启+收下红包', '', '']);
            } else {
                sentLog("new_player_gift_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"不用了"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋未开启+收下红包', '', '']);
            }
        }
    });
    $("#fiveBellCancel").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了黄金小屋弹窗的取消键");
        $("#dialogPage").css("display", "none");
        $("#hasFiveBell").css("display", "none");
        map = new coocaakeymap($(".coocaa_btn"), document.getElementById("goldHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    });
    $("#noFiveBellInfo").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了黄金小屋弹窗的去做任务");
        $("#dialogPage").css("display", "none");
        $("#noFiveBell").css("display", "none");
        $("#goldHome").trigger("blur");
        console.log(_elkOver + "--" + _packageOver);
        if(!_elkOver) {
            console.log("麋鹿任务未做完");
            map = new coocaakeymap($(".coocaa_btn"), document.getElementById("restArea"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            $("#restArea").trigger("focus");
        } else if(!_packageOver) {
            console.log("麋鹿任务已做完但打包任务未做完");
            map = new coocaakeymap($(".coocaa_btn"), document.getElementById("packHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            $("#packHome").trigger("focus");
        } else {
            console.log("打包任务已做完且麋鹿任务已做完");
            map = new coocaakeymap($(".coocaa_btn"), document.getElementById("purchaseHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            $("#purchaseHome").trigger("focus");
        }

        sentLog("money_insufficient_button_click", '{"page_name":"获取抽奖机会弹窗","activity_name":"双旦活动-圣诞小屋","activity_name":"做任务"}');
        _czc.push(['_trackEvent', '获取抽奖机会弹窗', '做任务button点击', '做任务', '', '']);
    });
    $("#restArea").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了麋鹿休息区");
        _curHomeBtn = "restArea";
        if(goldHouseIsOpen == "1") {
            goldHouseStation = "黄金小屋未开启";
        } else if(goldHouseIsOpen == "2") {
            goldHouseStation = "黄金小屋已开启";
        } else {
            goldHouseStation = "黄金小屋已关闭";
        }
        var reward_type = "奖励未达上限";
        if(_elkOver) {
            reward_type = "奖励已达上限";
        }
        sentLog("christmas_house_page_button_click", '{"button_name":"麋鹿休息处","page_name":"圣诞小屋页面","activity_name":"双旦活动--圣诞小屋","page_type":"' + goldHouseStation + '","reward_type":"' + reward_type + '"}');
        _czc.push(['_trackEvent', '双旦活动--圣诞小屋', '圣诞小屋页面' + goldHouseStation, '麋鹿休息处点击' + reward_type, '', '']);

        var apkVersion = [];
        var apkArry = ["com.coocaa.activecenter", "com.coocaa.app_browser", "com.coocaa.mall", "com.tianci.movieplatform"];
        var a = '{ "pkgList": ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"] }';
        var randomMax = 11; //任务数
        var randomNum = Math.floor(Math.random() * (randomMax));
        console.log("做任务：=======" + randomNum);
        coocaaosapi.getAppInfo(a, function(message) {
            console.log("getAppInfo====" + message);
            for(var i = 0; i < 4; i++) {
                apkVersion.push(JSON.parse(message)[apkArry[i]].versionCode);
            }
            activityCenterVersion = apkVersion[0];
            browserVersion = apkVersion[1];
            mallVersion = apkVersion[2];
            cAppVersion = apkVersion[3];
            console.log("===activityCenterVersion==" + activityCenterVersion + "===browserVersion==" + browserVersion + "==mallVersion==" + mallVersion + "==cAppVersion==" + cAppVersion);
            if(needQQ) {
                missionlist = missionlistTencent;
            } else {
                missionlist = missionlistYinhe;
            }
            if(activityCenterVersion < 103004) {
                console.log("活动中心版本过低！！！！");
                $("#needUpdate").show();
                _isToastExit = true;
                $("#blackBg").show();
                $("#needUpdate").css("width","1134px");
                $("#needUpdate").css("height","308px");
                $("#needUpdate").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/loading.png)");
                map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                toastTimeout = setTimeout(hideToast,3000);
                return;
            } else if(missionlist[randomNum].business == "ad") {
                if(browserVersion < 104031) {
                    console.log("浏览器版本过低！！！！");
                    $("#needUpdate").show();
                    _isToastExit = true;
                    $("#blackBg").show();
                    $("#needUpdate").css("width","1134px");
                    $("#needUpdate").css("height","308px");
                    $("#needUpdate").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/loading.png)");
                    map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    toastTimeout = setTimeout(hideToast,3000);
                    return;
                } else {
                    if(_elkOver) {
                        startLowVersionAction(randomNum);
                    } else {
                        startNewVersionAction(randomNum);
                    }
                }
            } else if(missionlist[randomNum].business == "movie" || missionlist[randomNum].business == "edu") {
                if(cAppVersion < 3410022) {
                    if(missionlist[randomNum].type == "videospecial") {
                        if(cAppVersion < 3300000) {
                            startLowVersionAction(4);
                        } else {
                            startLowVersionAction(randomNum);
                        }
                    } else if(missionlist[randomNum].type == "specialtopic") {
                        if(cAppVersion < 3170001) {
                            startLowVersionAction(4);
                        } else {
                            startLowVersionAction(randomNum);
                        }
                    } else {
                        startLowVersionAction(randomNum);
                    }
                } else {
                    if(_elkOver) {
                        startLowVersionAction(randomNum);
                    } else {
                        startNewVersionAction(randomNum);
                    }
                }
            } else if(missionlist[randomNum].business == "mall") {
                if(mallVersion < 31000020) {
                    console.log("商城版本不支持apk添加=======调用加机会接口");
                    startLowVersionAction(randomNum);
                } else {
                    if(_elkOver) {
                        startLowVersionAction(randomNum);
                    } else {
                        startNewVersionAction(randomNum);
                    }
                }
            }
        }, function(error) {
            console.log("getAppInfo----error" + JSON.stringify(error));
        });

        function startLowVersionAction(randomNum) {
            if(!_elkOver) {
                console.log("加机会");
                addChance(missionlist[randomNum].subTask);
            } else {
                console.log("不加机会");
            }
            var param1 = "action",
                param2 = missionlist[randomNum].action,
                param3 = "",
                param4 = "",
                param5 = "";
            var str = "[]";
            if(JSON.stringify(missionlist[randomNum].param) != "{}") {
                str = '[' + JSON.stringify(missionlist[randomNum].param).replace(/,/g, "},{") + ']'
            }
            //coocaaosapi.startCommonNormalAction(param1, param2, param3, param4, param5, str, function() {}, function() {});
            $("#needUpdate").show();
            _isToastExit = true;
            $("#blackBg").show();
            $("#needUpdate").css("width","1253px");
            $("#needUpdate").css("height","683px");
            if (!_elkOver) {
                $("#needUpdate").css("background","url(images/dialog/toast1.png)");
            } else{
                $("#needUpdate").css("background","url(images/dialog/toast2.png)");
            }
            map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
            toastTimeout = setTimeout(hideToast,3000);
            toastTimeout2 = setTimeout(startLowAction1,3100);
            function startLowAction1(){
                coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
            }
        }

        function startNewVersionAction(randomNum) {
            var param1 = "action",
                param2 = missionlist[randomNum].action,
                param3 = "",
                param4 = "",
                param5 = "";
            var str = "[]";
            if(JSON.stringify(missionlist[randomNum].param) != "{}") {
                str = '[' + JSON.stringify(missionlist[randomNum].param).replace(/,/g, "},{") + ']'
            }
            str = JSON.parse(str);
            var external = {
                "id": _actionid,
                "userKeyId": _userKeyId,
                "subTask": missionlist[randomNum].subTask,
                "countDownTime": missionlist[randomNum].countDownTime,
                "chanceSource": "2",
                "verify_key": new Date().getTime()
            }
            var doubleEggs_Active = {
                "doubleEggs_Active": external
            };
            str.push(doubleEggs_Active);
            str = JSON.stringify(str);
            //coocaaosapi.startCommonNormalAction(param1, param2, param3, param4, param5, str, function() {}, function() {});
            $("#needUpdate").show();
            _isToastExit = true;
            $("#blackBg").show();
            console.log("加机会的图");
            $("#needUpdate").css("width","1253px");
            $("#needUpdate").css("height","683px");
            $("#needUpdate").css("background","url(images/dialog/toast1.png)");
            map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
            toastTimeout = setTimeout(hideToast,3000);
            toastTimeout2 = setTimeout(startLowAction2,3100);
            function startLowAction2(){
                coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
            }
        }

        function addChance(taskType) {
            var taskName = "跳转任务";
            if(taskType == "1") {
                taskName == "视频任务";
            }
            $.ajax({
                type: "post",
                async: true,
                url: _testurl + "/xmas/add-chance",
                data: {
                    id: _actionid,
                    userKeyId: _userKeyId,
                    chanceSource: 2,
                    subTask: 0,
                    cOpenId: _openId
                },
                dataType: "json",
                success: function(data) {
                    console.log(JSON.stringify(data));
                    if(data.code == 50100) {
                        _remainingNumber = data.data.remainingNumber;
                        $("#bellnum").val("X" + _remainingNumber);
                        showGoldHousePlace(goldHouseIsOpen, _remainingNumber);
                        if(goldHouseIsOpen == "1") {
                            goldHouseStation = "黄金小屋未开启";
                        } else if(goldHouseIsOpen == "2") {
                            goldHouseStation = "黄金小屋已开启";
                        } else {
                            goldHouseStation = "黄金小屋已关闭";
                        }
                        sentLog("task_finished", '{"task_type":"' + taskName + '","task_result":"麋鹿任务完成","page_name":"圣诞小屋页面","activity_name":"双旦活动-麋鹿任务页面","page_type":"' + goldHouseStation + '"}');
                        _czc.push(['_trackEvent', '双旦活动-麋鹿任务页面', '圣诞小屋页面'+goldHouseStation, taskName+"完成", '', '']);
                    } else {
                        if(goldHouseIsOpen == "1") {
                            goldHouseStation = "黄金小屋未开启";
                        } else if(goldHouseIsOpen == "2") {
                            goldHouseStation = "黄金小屋已开启";
                        } else {
                            goldHouseStation = "黄金小屋已关闭";
                        }
                        sentLog("task_finished", '{"task_type":"' + taskName + '","task_result":"麋鹿任务失败","page_name":"圣诞小屋页面","activity_name":"双旦活动-麋鹿任务页面","page_type":"' + goldHouseStation + '"}');
                        _czc.push(['_trackEvent', '双旦活动-麋鹿任务页面', '圣诞小屋页面'+goldHouseStation, taskName+"失败", '', '']);
                    }
                },
                error: function(error) {
                    console.log("--------访问失败" + JSON.stringify(error));
                    if(goldHouseIsOpen == "1") {
                        goldHouseStation = "黄金小屋未开启";
                    } else if(goldHouseIsOpen == "2") {
                        goldHouseStation = "黄金小屋已开启";
                    } else {
                        goldHouseStation = "黄金小屋已关闭";
                    }
                    sentLog("task_finished", '{"task_type":"' + taskName + '","task_result":"麋鹿任务失败","page_name":"圣诞小屋页面","activity_name":"双旦活动-麋鹿任务页面","page_type":"' + goldHouseStation + '"}');
                    _czc.push(['_trackEvent', '双旦活动-麋鹿任务页面', '圣诞小屋页面'+goldHouseStation, taskName+"失败", '', '']);
                }
            });
        }
    })
    $("#purchaseHome").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了采购小屋");
        _curHomeBtn = "purchaseHome";
        $("#_jrbuyZone").css("display", "block");
        $("#homePage").css("display", "none");
        getAddPack();
    });
    $("#myAward,#hasEndBtn,#hasCloseBtn").unbind("itemClick").bind("itemClick", function() {
        console.log("我的礼物按钮+跳转我的礼物页面");
        sentLog("main_reward_page_show", '{"page_name":"我的礼物","activity_name":"双旦活动-我的礼物页面","last_page_name":"圣诞小屋页面"}');
        _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '我的礼物曝光', '', '', '']);
        coocaaosapi.startNewBrowser3(awardurl + "&actEnd=" + _bActivityEnd + "&awardToast=false", function() {console.log("OK");}, function() {});
        if($(this).attr("id") == "myAward") {
            _curHomeBtn = "myAward";
            if (goldHouseIsOpen == 1) {
                sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动--圣诞小屋","page_type":"黄金小屋未开启","button_name":"我的礼物"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '我的礼物点击', '', '', '']);
            } else if(goldHouseIsOpen ==2){
                sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动--圣诞小屋","page_type":"黄金小屋已开启","button_name":"我的礼物"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '我的礼物点击', '', '', '']);
            }else if(goldHouseIsOpen == 3){
                sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动--圣诞小屋","page_type":"黄金小屋已关闭","button_name":"我的礼物"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '我的礼物点击', '', '', '']);
            }
        } else {
            $("#homePage").css("display", "block");
            $("#dialogPage").css("display", "none");
            $("#hasEnd").css("display", "none");
            $("#hasClose").css("display", "none");
            $("#getKoi2").css("display", "none");
            $(".secondBtns").css("display", "none");
            setCurBtnFocus();
        }
    });
    $("#koibtn1,#koi2btn1").unbind("itemClick").bind("itemClick", function() {
        console.log("点击继续召唤 +判断铃铛是否够");
        console.log(_remainingNumber);
        if(_remainingNumber < 5) {
            console.log("铃铛不足");
            $("#getKoi").css("display", "none");
            $("#noFiveBell").css("display", "block");
            console.log(_elkOver+"--"+_packageOver);
            if (!_elkOver) {
                $("#nofiveBellImg").css("background-image", "url(images/dialog/todotask3.png)");
            } else if(!_packageOver){
                $("#nofiveBellImg").css("background-image", "url(images/dialog/todotask2.png)");
            } else{
                $("#nofiveBellImg").css("background-image", "url(images/dialog/todotask.png)");
            }
            if (_remainingNumber != 0) {
                $("#noFiveBellInfo").html('您目前只有<span style="color: #fffd44">'+_remainingNumber+'</span>个铃铛');
            } else{
                $("#noFiveBellInfo").html('您目前没有铃铛');
            }
            map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("noFiveBellInfo"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            sentLog("money_insufficient_page_show", '{"page_name":"获取游戏机会弹窗","activity_name":"双旦活动-圣诞小屋"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '铃铛不足弹窗曝光', '1', '', '']);
        } else {
            console.log("铃铛足够+直接抽奖");
            $("#getKoi").css("display", "none");
            $("#hasFiveBell").css("display", "block");
            map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("fiveBellEnsure"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        }
        if(goldHouseIsOpen == 2) {
            sentLog("luck_draw_box_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"继续召唤"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖弹窗button点击', '黄金小屋已开启+继续召唤', '', '']);
        } else {
            sentLog("luck_draw_box_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"继续召唤"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖弹窗button点击', '黄金小屋未开启+继续召唤', '', '']);
        }
    });
    
    $("#koibtn2").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了活动已结束的我的礼物按钮+跳转我的礼物页面");
        var _kActiveId = $("#koibtn2").attr("activeId");
        var _kAwardId = $("#koibtn2").attr("awardId");
        var _kRememberId = $("#koibtn2").attr("rememberId");
        var _kUserKeyId = $("#koibtn2").attr("userKeyId");
        var _kAwardTypeId = $("#koibtn2").attr("awardTypeId");
        var _kAwardName = $("#koibtn2").attr("awardName");
        var _kAwardTime = $("#koibtn2").attr("awardTime");
        var _kAwardUrl = $("#koibtn2").attr("awardUrl");
        console.log(_kAwardTypeId);
        if(_kAwardTypeId == 2) {
            console.log("点击了实物奖的马上领取");
            if(_loginstatus == "false") {
                console.log("领取实物奖励+启登录");
                startAndSendLog(2);
            } else {
                $("#getKoi").css("display","none");
                $("#getDrawEntity").css("display","block");
                map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("getDrawRedQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                if(goldHouseIsOpen == 2) {
                    sentLog("luck_draw_box_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"收下礼物"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖弹窗button点击', '黄金小屋已开启+收下礼物', '', '']);
                } else {
                    sentLog("luck_draw_box_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"收下礼物"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖弹窗button点击', '黄金小屋未开启+收下礼物', '', '']);
                }
            }
        } else if(_kAwardTypeId == 5) {
            console.log("使用红包+领取并跳转优惠券页面");
            if(_loginstatus == "false") {
                console.log("使用红包+启登录");
                startAndSendLog(2);
            } else {
                if(goldHouseIsOpen == 2) {
                    sentLog("luck_draw_box_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"使用红包"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖弹窗button点击', '黄金小屋已开启+使用红包', '', '']);
                } else {
                    sentLog("luck_draw_box_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"使用红包"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖弹窗button点击', '黄金小屋未开启+使用红包', '', '']);
                }
                $("#getKoi").css("display", "none");
                $("#dialogPage").css("display", "none");
                $("#homePage").css("display", "block");
                $(".secondBtns").css("display", "none");
                setCurBtnFocus();
                sendPrizes(_kAwardId, _kRememberId, _kUserKeyId, _kAwardTypeId, _kActiveId, _qsource);
            }
        }else if(_kAwardTypeId == 7) {
            console.log("点击了红包奖的收下红包");
            if(_loginstatus == "false") {
                console.log("领取红包奖励+启登录");
                startAndSendLog(2);
            } else {
                $("#getKoi").css("display","none");
                $("#getDrawRed").css("display","block");
                map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("getDrawEnQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                if(goldHouseIsOpen == 2) {
                    sentLog("luck_draw_box_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"收下红包"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖弹窗button点击', '黄金小屋已开启+收下红包', '', '']);
                } else {
                    sentLog("luck_draw_box_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"收下红包"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖弹窗button点击', '黄金小屋未开启+收下红包', '', '']);
                }
            }
        } 
    });
    $("#koi2btn2").unbind("itemClick").bind("itemClick", function() {
        if(_loginstatus == "false") {
            console.log("领取锦鲤奖励+启登录");
            startAndSendLog(2);
        } else {
            $("#getKoi2").css("display","none");
            $("#getKoi2BG").css("display","block");
            map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("koiMouldImg2"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            if(goldHouseIsOpen == 2) {
                sentLog("luck_draw_box_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"马上领取"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖弹窗button点击', '黄金小屋已开启+马上领取', '', '']);
            } else {
                sentLog("luck_draw_box_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"马上领取"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '抽奖弹窗button点击', '黄金小屋未开启+马上领取', '', '']);
            }
        }
    });
    $("#hasDoneBtn,#toLoginBtn").unbind("itemClick").bind("itemClick", function() {
        console.log("启登录");
        clearTimeout(_loginT);
        startAndSendLog(1);
        var _curId = $(this).attr("id");
        console.log(_curId);
        if(_curId == "hasDoneBtn") {
            sentLog("landing_lead_button_click", '{"page_name":"引导登录弹窗","activity_name":"双旦活动-圣诞小屋","page_type":"圣诞小屋页面","button_name":"立即登录"}');
            _czc.push(['_trackEvent', '引导登录弹窗', '引导登录弹窗按钮点击', '圣诞小屋页面+立即登录', '', '']);
        } else {
            if(goldHouseIsOpen == 2) {
                sentLog("landing_page_button_click", '{"page_name":"双旦活动登录弹窗","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"立即登录"}');
                _czc.push(['_trackEvent', '引导登录弹窗', '登录弹窗button被点击', '黄金小屋已开启+立即登录', '', '']);
            } else {
                sentLog("landing_page_button_click", '{"page_name":"双旦活动登录弹窗","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"立即登录"}');
                _czc.push(['_trackEvent', '引导登录弹窗', '登录弹窗button被点击', '黄金小屋未开启+立即登录', '', '']);
            }
        }
    });
    $("#hasLoginBtn").unbind("itemClick").bind("itemClick", function() {
        console.log("知道了");
        $("#dialogPage").css("display", "none");
        $("#hasLogined").css("display", "none");
        $("#homePage").css("display", "block");
        $(".secondBtns").css("display", "none");
        setCurBtnFocus();
    });
    $("#packList").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了打包清单");
        _curHomeBtn = "packList";
        $("#packGoodsPage").css("display", "block");
        $("#packGoodsListOuterContainerId").stop(true, true).animate({scrollTop: 0}, {duration: 0,easing: "swing",complete: function() {}});
        _gotoPackPage = 1;
        if(goldHouseIsOpen == 1) {
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"打包清单"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋未开启+打包清单', '', '']);
            sentLog("pack_list_page_show", '{"page_name":"打包清单页面","activity_name":"双旦活动-打包任务页面","last_page_name":"圣诞小屋页面","page_type":"黄金小屋未开启"}');
            _czc.push(['_trackEvent', '主活动页面', '打包清单页面曝光', '黄金小屋未开启', '', '']);
            $("#toastEnd").css("display","none");
            if(document.getElementById("toastEmpty").style.display == "block"){
                map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEmpty"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            }else{
                map = new coocaakeymap($(".coocaa_btn_pack"), $(".coocaa_btn_pack").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
            }
        } else if(goldHouseIsOpen == 2) {
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"打包清单"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋已开启+打包清单', '', '']);
            sentLog("pack_list_page_show", '{"page_name":"打包清单页面","activity_name":"双旦活动-打包任务页面","last_page_name":"圣诞小屋页面","page_type":"黄金小屋已开启"}');
            _czc.push(['_trackEvent', '主活动页面', '打包清单页面曝光', '黄金小屋已开启', '', '']);
            
            $("#toastEnd").css("display","none");
            if(document.getElementById("toastEmpty").style.display == "block"){
                map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEmpty"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            }else{
                map = new coocaakeymap($(".coocaa_btn_pack"), $(".coocaa_btn_pack").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
            }
        } else if(goldHouseIsOpen == 3) {
            sentLog("christmas_house_page_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已关闭","button_name":"打包清单"}');
            _czc.push(['_trackEvent', '主活动页面', '主活动页面按钮点击', '黄金小屋已关闭+打包清单', '', '']);
            sentLog("pack_list_page_show", '{"page_name":"打包清单页面","activity_name":"双旦活动-打包任务页面","last_page_name":"圣诞小屋页面","page_type":"黄金小屋已关闭"}');
            _czc.push(['_trackEvent', '主活动页面', '打包清单页面曝光', '黄金小屋已关闭', '', '']);
            $("#toastEnd").css("display","block");
            $("#toastEmpty").css("display","none");
            $("#moreGoodsContainer").css("display","none");
            $("#packGoodsContainer").css("display","none");
            map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEnd"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        }
    });

    $("#thanks_btn1").unbind("itemClick").bind("itemClick", function() {
        console.log("任务奖励弹窗的第一个button");
        var _cAwardType = $("#thanks_btn1").attr("awardTypeId");
        var _cAwardId = $("#thanks_btn1").attr("awardId");
        var _cRememberId = $("#thanks_btn1").attr("rememberId");
        var _cUserKeyId = $("#thanks_btn1").attr("userKeyId");
        var _cAwardUrl = $("#thanks_btn1").attr("awardUrl");
        var _cAwardName = $("#thanks_btn1").attr("awardName");
        var _cActiveId = $("#thanks_btn1").attr("activeId");
        var _cAwardTime = $("#thanks_btn1").attr("awardTime");
        console.log(_cAwardType);
        console.log(_loginstatus);
        if(_cAwardType == 2) {
            console.log("实体奖的收下礼物");
            if(_loginstatus == "true") {
                console.log("展示实体奖的二维码弹窗");
                $("#thanks_Bg").css("display", "none");
                $("#firstSendEntity").css("display", "block");
                $("#firstEnName").html("奖品名称:" + _cAwardName);
                $("#firstEnTime").html("获奖时间:" + _cAwardTime);
                var enstr = enurl + "activeId=" + _cActiveId + "&rememberId=" + _cRememberId + "&userKeyId=" + _cUserKeyId + "&access_token=" + _accessToken;
                drawQrcode("entityQrcode", enstr, 190);
                map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("entityQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                if(goldHouseIsOpen == 2) {
                    sentLog("reward_popup_ button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"收下礼物"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗按钮被点击', '黄金小屋已开启+收下红包', '', '']);
                } else {
                    sentLog("reward_popup_ button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"收下礼物"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗按钮被点击', '黄金小屋未开启+收下红包', '', '']);
                }
            } else {
                console.log("启登录");
                startAndSendLog(2);
            }
        } else if(_cAwardType == 5) {
            console.log("优惠券的使用红包");
            if(_loginstatus == "true") {
                console.log("领取优惠券并跳转使用页面");
                console.log(goldHouseIsOpen);
                if(goldHouseIsOpen == 2) {
                    sentLog("reward_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"使用红包"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗按钮被点击', '黄金小屋已开启+使用红包', '', '']);
                } else {
                    sentLog("reward_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"使用红包"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗按钮被点击', '黄金小屋未开启+使用红包', '', '']);
                }
                $("#thanks_Bg").css("display", "none");
                $("#dialogPage").css("display", "none");
                sendPrizes(_cAwardId, _cRememberId, _cUserKeyId, _cAwardType, _cActiveId, _qsource);
                console.log(document.getElementById("packGoodsBox").style.display);
                if (document.getElementById("packGoodsBox").style.display == "block") {
                    $(".secondBtns").css("display", "none");
                    $(".secondFloor").css("display", "none");
                    $("#packGoodsBox").css("display", "block");
                    map = new coocaakeymap($("#packGoodsBox .coocaa_btn"), $(".packGoodsItem").eq(_curPackIndex), "btn-focus", function() {}, function(val) {}, function(obj) {});
                    $(".packGoodsItem").eq(_curPackIndex).trigger("focus");
                } else{
                    $(".secondBtns").css("display", "none");
                    setCurBtnFocus();
                }
            } else {
                console.log("启登录");
                startAndSendLog(2);
            }
        } else if(_cAwardType == 7) {
            console.log("红包奖的收下红包");
            var _cAwardBouns = $("#thanks_btn1").attr("awardBouns");
            if(_loginstatus == "true") {
                console.log("展示红包奖的二维码弹窗");
                $("#thanks_Bg").css("display", "none");
                $("#firstSendRed").css("display", "block");
                console.log(_cAwardBouns);
                $("#allRedNum").html(_cAwardBouns);
                getRedPacketsQrcode(_cActiveId, _cRememberId, _cUserKeyId, "redQrcode");
                map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("redQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                if(goldHouseIsOpen == 2) {
                    sentLog("reward_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"收下红包"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗按钮被点击', '黄金小屋已开启+收下红包', '', '']);
                } else {
                    sentLog("reward_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"收下红包"}');
                    _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗按钮被点击', '黄金小屋未开启+收下红包', '', '']);
                }
            } else {
                console.log("启登录");
                startAndSendLog(2);
            }
        }
    });
    $("#thanks_btn2").unbind("itemClick").bind("itemClick", function() {
        console.log("任务奖励弹窗的第二个button");
        $("#dialogPage").css("display", "none");
        $("#thanks_Bg").css("display", "none");
        var _cClickType = $("#thanks_btn2").attr("clicktype");
        if(_cClickType == 1) {
            console.log("查看打包清单");
            $("#packGoodsPage").css("display", "block");
            if(goldHouseIsOpen == 1) {
                sentLog("pack_list_page_show", '{"page_name":"打包清单页面","activity_name":"双旦活动-打包任务页面","last_page_name":"圣诞小屋页面","page_type":"黄金小屋未开启"}');
                _czc.push(['_trackEvent', '打包清单页面', '打包清单页面曝光', '黄金小屋未开启', '', '']);
                sentLog("reward_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"查看打包清单"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗点击', '黄金小屋未开启+查看打包清单', '', '']);
            } else if(goldHouseIsOpen == 2) {
                sentLog("pack_list_page_show", '{"page_name":"打包清单页面","activity_name":"双旦活动-打包任务页面","last_page_name":"圣诞小屋页面","page_type":"黄金小屋已开启"}');
                _czc.push(['_trackEvent', '打包清单页面', '打包清单页面曝光', '黄金小屋已开启', '', '']);
                sentLog("reward_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"查看打包清单"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗点击', '黄金小屋已开启+查看打包清单', '', '']);
            } else if(goldHouseIsOpen == 3) {
                sentLog("pack_list_page_show", '{"page_name":"打包清单页面","activity_name":"双旦活动-打包任务页面","last_page_name":"圣诞小屋页面","page_type":"黄金小屋已关闭"}');
                _czc.push(['_trackEvent', '打包清单页面', '打包清单页面曝光', '黄金小屋已关闭', '', '']);
                sentLog("reward_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已关闭","button_name":"查看打包清单"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗点击', '黄金小屋已关闭+查看打包清单', '', '']);
            }
            _gotoPackPage = 2;
            if(_bActivityEnd == true) {
                console.log("活动已结束");
                $("#toastEnd").css("display", "block");
                map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEnd"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            } else {
                console.log("活动进行中");
                if(document.getElementById("toastEmpty").style.display == "block") {
                    map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEmpty"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                } else {
                    $("#packGoodsListOuterContainerId").stop(true, true).animate({scrollTop: 0}, {duration: 0,easing: "swing",complete: function() {}});
                    map = new coocaakeymap($(".coocaa_btn_pack"), $(".coocaa_btn_pack").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
                }
            }
        } else { //返回
            console.log("返回");
            if(goldHouseIsOpen == 2) {
                sentLog("reward_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"关闭"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋已开启+关闭', '', '']);
            } else {
                sentLog("reward_popup_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"关闭"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '新手礼包点击', '黄金小屋未开启+关闭', '', '']);
            }
            map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curHomeBtn), "btn-focus", function() {}, function(val) {}, function(obj) {});
            $("#" + _curHomeBtn).trigger("focus");
        }
    });
    $("#packIsOverBtn1").unbind("itemClick").bind("itemClick", function() {
        console.log("再逛逛");
        $("#firstLoadAward").css("display", "none");
        $("#dialogPage").css("display", "none");
        $("#packIsOver").css("display", "none");
        $(".secondBtns").css("display", "none");
        console.log(_curPackIndex);
        $("#packGoodsBox").css("display", "block");
        map = new coocaakeymap($("#packGoodsBox .coocaa_btn"), $(".packGoodsItem").eq(_curPackIndex), "btn-focus", function() {}, function(val) {}, function(obj) {});
        $(".packGoodsItem").eq(_curPackIndex).trigger("focus");
    });
    $("#packIsOverBtn2").unbind("itemClick").bind("itemClick", function() {
        console.log("去打包清单");
        $("#packGoodsPage").css("display", "block");
        _gotoPackPage = 2;
        if(_bActivityEnd == true) {
            console.log("活动已结束");
            $("#toastEnd").css("display", "block");
            map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEnd"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        } else {
            console.log("活动进行中");
            if(document.getElementById("toastEmpty").style.display == "block") {
                map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEmpty"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            } else {
                $("#packGoodsListOuterContainerId").stop(true, true).animate({scrollTop: 0}, {duration: 0,easing: "swing",complete: function() {}});
                map = new coocaakeymap($(".coocaa_btn_pack"), $(".coocaa_btn_pack").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
            }
        }
    });
    
}
function setCurBtnFocus(){
    if(goldHouseIsOpen == 2) {
        map = new coocaakeymap($(".coocaa_btn"), document.getElementById("goldHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        $("#goldHome").trigger("focus");
    } else {
        randBtnFunc();
    }
}
function randBtnFunc() {
    var idName = "";
    if (!_elkOver) {
        idName = "restArea";
    } else if(!_packageOver){
        idName = "packHome";
    } else{
        idName = "purchaseHome";
    }
    map = new coocaakeymap($(".coocaa_btn"), document.getElementById(idName), "btn-focus", function() {}, function(val) {}, function(obj) {});
    console.log(idName);
    $("#" + idName).trigger("focus");
}

function buttonInitAfter() {
    $(".packGoodsItem").unbind("focus").bind("focus", function() {
        _isneedExit = false;
        $("#packGoodsInfo").css("display", "block");
        console.log("打包商品获得焦点");
        var _fIndex = $(".packGoodsItem").index($(this));
        var _curName = $(this).attr("goodName");
        $("#packGoodName").html(_curName);
        var _itemWidth = $(".packGoodsItem:eq(0)").outerWidth(true);
        if(_fIndex > 1) {
            var myScrollTopValue = _itemWidth * (_fIndex - 2) * (-1);
            $("#packGoodsUl").stop(true, true).animate({left: myScrollTopValue}, {duration: 0,easing: "swing"});
        }
        if(_fIndex == 0) {
            $("#packGoodsInfo").css("left", "733px");
            $("#packGoodsUl").stop(true, true).animate({left: 0}, {duration: 0,easing: "swing"});
        } else if(_fIndex == 1) {
            $("#packGoodsInfo").css("left", "920px");
        } else {
            $("#packGoodsInfo").css("left", "1100px");
        }
        $("#packHome .imgBlur").css("display", "none");
        $("#packHome .imgFocus").css("display", "block");
    });
    $(".packGoodsItem").unbind("blur").bind("blur", function() {
        console.log("打包商品失去焦点");
        $("#packGoodsInfo").css("display", "none");
        $("#packHome .imgBlur").css("display", "block");
        $("#packHome .imgFocus").css("display", "none");
    });
    $(".packGoodsItem").unbind("itemClick").bind("itemClick", function() {
        console.log("点击了打包商品");
        var nowTime = new Date().getTime();
        var clickTime = $("#packGoodsUl").attr("ctime");
        if(clickTime != 'undefined' && (nowTime - clickTime < 3000)) {
            console.log('操作过于频繁，稍后再试');
            return false;
        } else {
            $("#packGoodsUl").attr("ctime", nowTime);
            var _fIndex = $(".packGoodsItem").index($(this));
            var _goodsId = $(this).attr("curid");
            var _clickState = $(this).attr("packstate");
            _curPackIndex = _fIndex;
            _curHomeBtn = "packHome";
            goodsPackedFunc(_fIndex, _goodsId, _clickState);

            var _curName = $(this).attr("goodName");
            if(_packageOver) {
                if(goldHouseIsOpen == 2) {
                    sentLog("pack_wares_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"' + _curName + '","reward_type":"奖励已达上限"}');
                    _czc.push(['_trackEvent', '商品被打包', '圣诞小屋页面', '黄金小屋已开启+奖励已达上限', '', '']);
                } else {
                    sentLog("pack_wares_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"' + _curName + '","reward_type":"奖励已达上限"}');
                    _czc.push(['_trackEvent', '商品被打包', '圣诞小屋页面', '黄金小屋未开启+奖励已达上限', '', '']);
                }
            } else {
                if(goldHouseIsOpen == 2) {
                    sentLog("pack_wares_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启","button_name":"' + _curName + '","reward_type":"奖励未达上限"}');
                    _czc.push(['_trackEvent', '商品被打包', '圣诞小屋页面', '黄金小屋已开启+奖励未达上限', '', '']);
                } else {
                    sentLog("pack_wares_button_click", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启","button_name":"' + _curName + '","reward_type":"奖励未达上限"}');
                    _czc.push(['_trackEvent', '商品被打包', '圣诞小屋页面', '黄金小屋未开启+奖励未达上限', '', '']);
                }
            }
        }
    });
}

function buttonInitAfter2() {
    $(".coocaa_btn_pack").unbind("itemClick").bind("itemClick", function() {
        var _Index1 = $(".coocaa_btn_pack").index($(this));
        console.log("itemClick _Index1 = " + _Index1);
        var _curBtnId = $(this).attr("id");
        if(_curBtnId == "toastEmpty") {
            $("#packGoodsPage").css("display", "none");
            $("#homePage").css("display", "block");
            document.getElementById("packGoodsBox").style.display = "block";
            actionInit(0, 2, 1, 1);
        } else if(_curBtnId == "toastEnd") {
            console.log("go myGifts now....");
            var url =  awardurl +"actEnd=" + _bActivityEnd + "&awardToast=false&from=home";
            coocaaosapi.startNewBrowser3(url, function(success) {}, function(err) {});
        } else {
            var goodsId = $(this).attr("goodsid");
            var goodsName = $(this).attr("goodsName");
            webBtnClickLog(goodsName);
            if(_curBtnId == "moreGoodsItemMovie" || _curBtnId == "moreGoodsItemEdu") {
                var businesstype = $(this).attr("businesstype");
                coocaaosapi.startMovieMemberCenter(businesstype.toString(), goodsId.toString(), function(msg) {
                    console.log("startAppShopDetail success.");
                }, function(err) {
                    console.log("startAppShopDetail error.");
                })
            } else {
                //进入商品购买详情页
                coocaaosapi.startAppShopDetail(goodsId.toString(), function(msg) {
                    console.log("startAppShopDetail success.");
                }, function(err) {
                    console.log("startAppShopDetail error.");
                });
            }
        }
    });
    $(".coocaa_btn_pack").unbind("focus").bind("focus", function() {
        var _Lindex = $(".coocaa_btn_pack").index($(this));
        var parentId = $(this).parent().attr("id");
        var itemHeight = 398; //398px
        var myScrollTopValue = $(this).position().top - 398;
        if(_Lindex < 5) {myScrollTopValue = 0;}
        console.log("focusShift myScrollTopValue: " + myScrollTopValue + "parentId:" + parentId);
        console.log(parentId);
        if(parentId == "packGoodsList") {
            $("#packGoodsListOuterContainerId").stop(true, true).animate({scrollTop: myScrollTopValue}, {duration: 0,easing: "swing",complete: function() {}});
        }
    });
}
//活动初始化 
function actionInit(num1, num2, num3, num4) {
    //num1是否是第一次初始化,num2哪个页面初始化,num3是否只处理弹窗
    var ajaxTimeoutOne = $.ajax({
        type: "POST",
        async: true,
        timeout: 5000,
        dataType: 'json',
        url: _testurl + "/xmas/init",
        data: {
            "id": _actionid,
            "cUDID": _udid,
            "MAC": _mac,
            "cChip": _chip,
            "cModel": _model,
            "cEmmcCID": _emmcCID,
            "cOpenId": _openId,
            "goldActiveId": _lotteryid,
            "initSource": num2,
            "accessToken": _accessToken,
            "cNickName": _nickName,
            "buyActiveId": _buyActiveId
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            var _pagename = getQueryString("pagename");
            if(data.code == 50001) {
                console.log("该活动不存在");
            } else if(data.code == 50002) {
                console.log("该活动未开始");
            } else if(data.code == 50003) {
                console.log("该活动已结束");
                _bActivityEnd = true;
                goldHouseIsOpen = 3;
                if(_pgname == "pack") {
                    $("#toastEnd").css("display", "block");
                    $("#toastEmpty").css("display","none");
                    $("#moreGoodsContainer").css("display","none");
                    $("#packGoodsContainer").css("display","none");
                    map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEnd"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                }else{
                    if(num1 == 1) {
                        showGoldHousePlace(3, 6);
                        map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
                        sentLog("christmas_house_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已关闭"}');
                        _czc.push(['_trackEvent', '圣诞小屋曝光', '圣诞小屋页面', '黄金小屋已关闭', '', '']);
                    }
                }
                $("#bellnum").val("X0");
                showGoldHousePlace(3, 6);
            } else if(data.code == 50042) {
                console.log("该活动已下架");
            } else if(data.code == 50100) {
                console.log("该活动进行中+获取数据成功");
                _remainingNumber = data.data.chanceResult.remainingNumber;
                $("#bellnum").val("X" + _remainingNumber);
                _elkOver = data.data.chanceResult.elkOver;
                _packageOver = data.data.chanceResult.packageOver;
                _taskLogin = data.data.chanceResult.taskLogin;
                _bellLogin = data.data.chanceResult.bellLogin;
                _userKeyId = data.data.userKeyId;
                
                if(num1 == 1) {
                    if (_pagename != "pack") {
                        if(goldHouseIsOpen == 2) {
                            sentLog("christmas_house_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启"}');
                            _czc.push(['_trackEvent', '圣诞小屋曝光', '圣诞小屋页面', '黄金小屋已开启', '', '']);
                        } else {
                            sentLog("christmas_house_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启"}');
                            _czc.push(['_trackEvent', '圣诞小屋曝光', '圣诞小屋页面', '黄金小屋未开启', '', '']);
                        }
                        //设置缓存,判断是否是黄金屋开启后第一次进入
                        if(_remainingNumber>4){
                            var localNum = localStorage.getItem("isFirst");
                            console.log(localNum);
                            if(localNum != 2){
                                localStorage.setItem("isFirst", "2");
                                _isFirstIn = 1;
                            }else{
                                _isFirstIn = 0;
                            }
                        }
                    }
                }
                if(num3 == 0) {
                    var cSysTime = new Date(data.data.sysTime).getTime();
                    var goldBeginTime = new Date(data.data.goldActiveBeginTime).getTime();
                    var goldEndTime = new Date(data.data.goldActiveEndTime).getTime();
                    if(cSysTime < goldBeginTime) {
                        goldHouseIsOpen = 1;
                    } else {
                        goldHouseIsOpen = 2;
                        if(goldEndTime - cSysTime < 18000000) {_isLessFivs = 1;} else {_isLessFivs = 0;}
                    }
                    showGoldHousePlace(goldHouseIsOpen, _remainingNumber);
                    if(_pagename == "pack") {
                        console.log(_pagename);
                    } else {
                        showInitDialog(data.data, num1, num4);
                    }
                } else {
                    console.log("只处理弹窗");
                    showInitDialog(data.data, num1, num4);
                }
            }
        },
        error: function() {
            console.log("获取失败");
        },
        complete: function(XMLHttpRequest, status) {　　　　
            console.log("-------------complete------------------" + status);
            if(status == 'timeout') {　　　　　
                ajaxTimeoutOne.abort();　　　　
            }
            if(num1 == 1){
                if(num2 == 1){
                    getPackedGoodsList(0,1,0);
                }else if(num2 == 2){
                    getPackedGoodsList(0,0,0);
                }
            }
        }
    });
}
//显示黄金小屋的样式
function showGoldHousePlace(state, Number) {
    console.log(state + "--" + Number);
    if(state == 1) {
        $("#bellNUmBox").css("top", "283px");
        $("#bellNUmBox").css("left", "688px");
        $("#goldHome").css("top", "200px");
        $("#goldHome").css("left", "568px");
        $("#goldHome").css("height", "477px");
        $("#goldHome").css("width", "550px");
        if(Number < 5) {
            $("#goldHome .imgBlur").attr("src", "images/gold_blur.png");
            $("#goldHome .imgFocus").attr("src", "images/gold_focus.png");
        } else {
            $("#goldHome .imgBlur").attr("src", "images/gold_blur2.png");
            $("#goldHome .imgFocus").attr("src", "images/gold_focus2.png");
        }
        $("#goldGif").css("display","none");
    } else if(state == 2 || state == 3) {
        $("#bellNUmBox").css("top", "240px");
        $("#bellNUmBox").css("left", "668px");
        $("#goldHome").css("top", "165px");
        $("#goldHome").css("left", "558px");
        $("#goldHome").css("height", "487px");
        $("#goldHome").css("width", "609px");
        $("#goldHome .imgBlur").attr("src", "images/gold_blur3.png");
        $("#goldHome .imgFocus").attr("src", "images/gold_focus3.png");
        $("#goldGif").css("display","block");
    }
}
//页面首次加载的弹窗逻辑
function showInitDialog(dataObj, num1, num4) {
    console.log(JSON.stringify(dataObj));
    if(dataObj.chanceResult.firstIn == 0) {
        console.log("弹出规则+送礼物弹窗");
        $("#dialogPage").css("display", "block");
        $("#firstLoadRule").css("display", "block");
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("firstLoadRule"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        if(goldHouseIsOpen == 2) {
            sentLog("game_rule_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '游戏玩法弹窗', '黄金小屋已开启', '', '']);
        } else {
            sentLog("game_rule_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '游戏玩法弹窗', '黄金小屋未开启', '', '']);
        }
    } else if(dataObj.chanceResult.firstIn == 2) {
        console.log("弹出送礼物弹窗");
        $("#nextTime").attr("status", "1");
        $("#dialogPage").css("display", "block");
        $("#firstLoadDraw").css("display", "block");
        $("#nextTime .imgBlur").attr("src", "images/dialog/noThanks_blur.png");
        $("#nextTime .imgFocus").attr("src", "images/dialog/noThanks_focus.png");
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("drawAward1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        if(goldHouseIsOpen == 2) {
            sentLog("new_player_gift_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '游戏玩法弹窗', '黄金小屋已开启', '', '']);
        } else {
            sentLog("new_player_gift_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '游戏玩法弹窗', '黄金小屋未开启', '', '']);
        }
    } else if(dataObj.chanceResult.chanceSource.length > 0) {
        $("#dialogPage").css("display", "block");
        var _awardtype = dataObj.chanceResult.rememberModel.awardTypeId;
        $("#thanks_btn1").attr("userKeyId", dataObj.chanceResult.rememberModel.userKeyId);
        $("#thanks_btn1").attr("awardId", dataObj.chanceResult.rememberModel.awardId);
        $("#thanks_btn1").attr("rememberId", dataObj.chanceResult.rememberModel.lotteryRememberId);
        $("#thanks_btn1").attr("awardTypeId", _awardtype);
        $("#thanks_btn1").attr("activeId", dataObj.chanceResult.rememberModel.lotteryActiveId);
        $("#thanks_btn1").attr("awardUrl", dataObj.chanceResult.rememberModel.awardUrl);
        $("#thanks_btn1").attr("awardName", dataObj.chanceResult.rememberModel.awardName);
        var _oAwardTime = dataObj.chanceResult.rememberModel.awardTime;
        _oAwardTime = _oAwardTime.substr(0, 10);
        $("#thanks_btn1").attr("awardTime", _oAwardTime);
        if(_awardtype == 2) {
            $("#thanks_entity").css("display", "block");
            $("#thanks_coupon").css("display", "none");
            $("#thanks_red").css("display", "none");
            $("#enAwardBox").html(dataObj.chanceResult.rememberModel.awardName);
            $("#thanks_entityImg").attr("src", dataObj.chanceResult.rememberModel.awardUrl);
            $("#thanks_btn1 .btnName").html("收下礼物");
        } else if(_awardtype == 5) {
            $("#thanks_entity").css("display", "none");
            $("#thanks_coupon").css("display", "block");
            $("#thanks_red").css("display", "none");
            console.log(dataObj.chanceResult.rememberModel.awardUrl);
            $("#thanks_couponImg").attr("src", dataObj.chanceResult.rememberModel.awardUrl);
            $("#thanks_btn1 .btnName").html("使用红包");
        } else if(_awardtype == 7) {
            var _awardBouns = dataObj.chanceResult.rememberModel.awardInfo.bonus;
            $("#thanks_btn1").attr("awardBouns", _awardBouns);
            $("#thanks_entity").css("display", "none");
            $("#thanks_coupon").css("display", "none");
            $("#thanks_red").css("display", "block");
            //$("#redAwardName").html("现金红包");
            $("#redAwardName").html('<span style="font-size:30px;">'+dataObj.chanceResult.rememberModel.awardName+'</span>');
            var _showBonus = "";
            if(dataObj.chanceResult.rememberModel.mergeAwardInfo == "" || dataObj.chanceResult.rememberModel.mergeAwardInfo == null) {
                _showBonus = dataObj.chanceResult.rememberModel.awardInfo.bonus;
            } else {
                _showBonus = dataObj.chanceResult.rememberModel.mergeAwardInfo.bonus;
            }
            $("#redAwardInfo").html('<span style="font-size:30px;">'+_showBonus+"元</span>");
            $("#thanks_btn1 .btnName").html("收下红包");
            $("#thanks_btn1").attr("activeId", dataObj.chanceResult.rememberModel.lotteryActiveId);
        }
        
        if(dataObj.chanceResult.chanceSource.length == 1) {
            console.log(dataObj.chanceResult.chanceSource[0]);
            if(dataObj.chanceResult.chanceSource[0] > 0 && dataObj.chanceResult.chanceSource[0] < 4) {
                if(dataObj.chanceResult.chanceSource[0] == 1 || dataObj.chanceResult.chanceSource[0] == 2) {
                    $("#thanks_Bg").css("display", "block");
                    $("#thanks_btn2 .btnName").html("关闭");
                    $("#thanks_btn2").css("left", "990px");
                    $("#thanks_btn2").css("width", "147px");
                    $("#thanks_btn2 .imgBlur").attr("src", "images/dialog/red_blur.png");
                    $("#thanks_btn2 .imgFocus").attr("src", "images/dialog/red_focus.png");
                    if(dataObj.chanceResult.chanceSource[0] == 1) {
                        $("#thanks_info1").html("感谢你帮圣诞爷爷采购礼物");
                        $("#thanks_giftsBox").css("background-image", "url(images/dialog/couponbell5.png)");
                        if(_awardtype == 2) {
                            $("#thanks_info3").css("display", "none");
                        }else if(_awardtype == 5){
                            $("#thanks_info3").css("display", "none");
                        }else if(_awardtype == 7){
                            $("#thanks_info3").css("display", "block");
                            $("#thanks_info3").html('*当前返利红包总额<span style="color:#fff642">' + dataObj.chanceResult.rememberModel.awardInfo.bonus + '</span>元');
                        }
                    } else {
                        $("#thanks_info1").html("感谢你带麋鹿玩耍");
                        $("#thanks_giftsBox").css("background-image", "url(images/dialog/couponbell1.png)");
                        if(_awardtype == 2) {
                            $("#thanks_info3").css("display", "none");
                        }else if(_awardtype == 5){
                            $("#thanks_info3").css("display", "none");
                        }else if(_awardtype == 7){
                            $("#thanks_info3").css("display", "block");
                            $("#thanks_info3").html('*当前任务红包总额<span style="color:#fff642">' + dataObj.chanceResult.rememberModel.awardInfo.bonus + '</span>元');
                        }
                    }
                    $("#thanks_btn2").attr("clicktype", 0);
                } else if(dataObj.chanceResult.chanceSource[0] == 3) {
                    $("#thanks_Bg").css("display", "block");
                    $("#thanks_info1").html("感谢你帮圣诞爷爷打包礼物");
                    $("#thanks_giftsBox").css("background-image", "url(images/dialog/couponbell1.png)");
                    $("#thanks_btn2 .btnName").html("查看打包清单");
                    $("#thanks_btn2").css("left", "945px");
                    $("#thanks_btn2").css("width", "210px");
                    $("#thanks_btn2 .imgBlur").attr("src", "images/dialog/checkpacklist_blur.png");
                    $("#thanks_btn2 .imgFocus").attr("src", "images/dialog/checkpacklist_focus.png");
                    $("#thanks_btn2").attr("clicktype", 1);
                    if(_awardtype == 2) {
                        $("#thanks_info3").css("display", "block");
                        $("#thanks_info3").html("*该打包商品已放入打包清单，限时降价快去看看");
                    }else if(_awardtype == 5){
                        $("#thanks_info3").css("display", "block");
                        $("#thanks_info3").html("*该打包商品已放入打包清单，限时降价快去看看");
                    }else if(_awardtype == 7){
                        $("#thanks_info3").css("display", "block");
                        $("#thanks_info3").html('*当前任务红包总额<span style="color:#fff642">' + dataObj.chanceResult.rememberModel.awardInfo.bonus + '</span>元');
                    }
                }
            } else if(dataObj.chanceSource[0] == 4) {
                console.log("弹完成首次登录任务的奖励页");
                $("#hasLogined").css("display", "block");
                map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("hasLoginBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            }
        } else {
            console.log("弹多个奖励领取的奖励页");
            $("#thanks_Bg").css("display", "block");
            if(dataObj.chanceResult.chanceSource[dataObj.chanceResult.chanceSource.length-1] == 3){
                $("#thanks_info1").html("感谢你帮圣诞爷爷打包礼物");
            }else if(dataObj.chanceResult.chanceSource[dataObj.chanceResult.chanceSource.length-1] == 2){
                $("#thanks_info1").html("感谢你带麋鹿玩耍");
            }else{
                $("#thanks_info1").html("感谢你帮圣诞爷爷采购礼物");
            }
            $("#thanks_btn2 .btnName").html("关闭");
            $("#thanks_btn2").css("left", "990px");
            $("#thanks_btn2").css("width", "147px");
            $("#thanks_btn2 .imgBlur").attr("src", "images/dialog/red_blur.png");
            $("#thanks_btn2 .imgFocus").attr("src", "images/dialog/red_focus.png");
            $("#thanks_info3").html('*还有更多任务奖励都已放入<span style="color:#fff642">[我的礼物]</span>，请前往查看');
            $("#thanks_info3").css("display", "block");
        }
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("thanks_btn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});

        if(goldHouseIsOpen == 2) {
            sentLog("reward_popup_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗曝光', '黄金小屋已开启', '', '']);
        } else {
            sentLog("reward_popup_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗曝光', '黄金小屋未开启', '', '']);
        }
    } else if(dataObj.chanceResult.taskLogin) {
        console.log("其他任务做完了还没做登录任务的时候的弹窗");
        $("#dialogPage").css("display", "block");
        $("#hasDone").css("display", "block");
        _loginT = setTimeout(clearLoginDialog,8000);
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("hasDoneBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        sentLog("landing_lead_page_show", '{"page_name":"引导登录弹窗","activity_name":"双旦活动-圣诞小屋","last_page_name":"圣诞小屋页面"}');
        _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '主页面引导登录弹窗', '圣诞小屋页面', '', '']);
    } else if(dataObj.chanceResult.bellLogin) {
        console.log("铃铛不足的时候的弹去登陆的弹窗");
        $("#dialogPage").css("display", "block");
        $("#gotoLogin").css("display", "block");
        _loginT = setTimeout(clearLoginDialog,8000);
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("toLoginBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        sentLog("landing_lead_page_show", '{"page_name":"铃铛不足登录弹窗","activity_name":"双旦活动-圣诞小屋","last_page_name":"圣诞小屋页面"}');
        _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '铃铛不足登录弹窗', '圣诞小屋页面', '', '']);
    } else {
        console.log("不弹窗");
        console.log(_elkOver + "--" + _packageOver + "--" + goldHouseIsOpen);
        if(num4 == 1) {
            if(document.getElementById("packGoodsBox").style.display == "block") {
                $("#dialogPage").css("display", "none");
                $(".secondFloor").css("display", "none");
                $(".secondBtns").css("display", "none");
                $("#packGoodsBox").css("display", "block");
                map = new coocaakeymap($("#packGoodsBox .coocaa_btn"), $(".packGoodsItem").eq(_curPackIndex), "btn-focus", function() {}, function(val) {}, function(obj) {});
                $(".packGoodsItem").eq(_curPackIndex).trigger("focus");
            } else {
                $(".secondBtns").css("display", "none");
                setCurBtnFocus();
            }
        }
    }
    showSandanInfo(dataObj,num1);
}
function clearLoginDialog(){
    console.log("8秒未操作");
    clearTimeout(_loginT);
    $("#dialogPage").css("display", "none");
    $("#hasDone").css("display", "none");
    $("#gotoLogin").css("display", "none");
    $(".secondBtns").css("display", "none");
    setCurBtnFocus();
}

function showSandanInfo(dataObj,num){
    console.log(num);
    $("#pullDown").css("display","none");
    $("#raise").css("display","block");
    $("#bulletinBoard").css("display","block");
    if(goldHouseIsOpen == 1){
        console.log("------------------------1"+_elkOver+"_______"+_packageOver);
        if(!_elkOver){
            $("#bulletinBoard").css("background-image","url(images/pop/new7.png)");
        }else if(!_packageOver){
            $("#bulletinBoard").css("background-image","url(images/pop/new8.png)");
        }else{
            $("#bulletinBoard").css("background-image","url(images/pop/new9.png)");
        }
    }else if(goldHouseIsOpen == 2){
        console.log(dataObj.chanceResult.giftBell+"--"+_koiNum+"--"+_remainingNumber);
        if(dataObj.chanceResult.giftBell) {
            console.log("----------------3");
            $("#bulletinBoard").css("background-image","url(images/pop/new3.png)");
        }else if(_koiNum == 0){
            console.log(_isFirstIn);
            if (_remainingNumber > 5 &&(_isFirstIn == 1)) {
                console.log("----------------2");
                $("#bulletinBoard").css("background-image","url(images/pop/new2.png)");
            } else{
                console.log("------------------------1"+_elkOver+"_______"+_packageOver);
                if(!_elkOver){
                    $("#bulletinBoard").css("background-image","url(images/pop/new7.png)");
                }else if(!_packageOver){
                    $("#bulletinBoard").css("background-image","url(images/pop/new8.png)");
                }else{
                    $("#bulletinBoard").css("background-image","url(images/pop/new9.png)");
                }
            }
        }else if(_koiNum == 1){
            console.log("----------------5");
            $("#bulletinBoard").css("background-image","url(images/pop/new5.png)");
        }else{
            console.log("----------------6");
            $("#bulletinBoard").css("background-image","url(images/pop/new6.png)");
        }
    }
    setTimeout(changeThebulletinInfo,30000);
}
function changeThebulletinInfo(){
    console.log("----------------------30秒后");
    $("#pullDown").css("display","block");
    $("#raise").css("display","none");
    $("#bulletinBoard").css("display","none");
}
//首次送礼物
function firstSendGift() {
    console.log(_mac + "--" + _chip + "--" + _model + "--" + _emmcCID + "--" + _udid);
    console.log(_accessToken + "--" + _openId + "--" + _nickName);
    console.log(_userKeyId);
    var ajaxTimeoutTwo = $.ajax({
        type: "POST",
        async: true,
        timeout: 5000,
        dataType: 'json',
        url: _testurl + "/xmas/add-chance",
        data: {
            "MAC": _mac,
            "cChip": _chip,
            "cModel": _model,
            "cEmmcCID": _emmcCID,
            "cUDID": _udid,
            "accessToken": _accessToken,
            "cOpenId": _openId,
            "cNickName": _nickName,
            "id": _actionid,
            "userKeyId": _userKeyId,
            "chanceSource": "5",
            "subTask": "0"
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if(data.code == 50001) {
                console.log("该活动不存在");
            } else if(data.code == 50002) {
                console.log("该活动未开始");
            } else if(data.code == 50003) {
                console.log("该活动已结束");
                _bActivityEnd = true;
                goldHouseIsOpen = 3;
                _remainingNumber = 0;
                _elkOver = true;
                _packageOver = true;
                _bellLogin = false;
                _taskLogin = false;
            } else if(data.code == 50100) {
                console.log("该活动进行中+获取数据成功");
                var fAwardId = data.data.rememberModel.awardId;
                var fRememberId = data.data.rememberModel.lotteryRememberId;
                var fUserKeyId = data.data.rememberModel.userKeyId;
                var fAwardTypeId = data.data.rememberModel.awardTypeId;
                var fActiveId = data.data.rememberModel.lotteryActiveId;
                var fAwardName = data.data.rememberModel.awardName;
                var fAwardUrl = data.data.rememberModel.awardUrl;
                var fAwardTime = data.data.rememberModel.awardTime;
                fAwardTime = fAwardTime.substring(0, 10);
                console.log(fAwardUrl);
                if(fAwardTypeId == 7) {
                    console.log("获得红包+收下红包");
                    $("#firstAwardInfo").html("恭喜获得现金红包");
                    $("#redAwardImg").css("display", "block");
                    $("#redAwardNum").html(data.data.rememberModel.awardInfo.bonus);
                    $("#allRedNum").html(data.data.rememberModel.awardInfo.bonus);
                } else if(fAwardTypeId == 5) {
                    $("#firstAwardInfo").html("恭喜获得平台红包");
                    $("#couponAwardImg").css("display", "block");
                    $("#couponAwardImg").css("background-image", "url(" + fAwardUrl + ")");
                } else if(fAwardTypeId == 2) {
                    $("#firstAwardInfo").html("恭喜获得"+fAwardName);
                    $("#entityAwardImg").css("display", "block");
                    $("#entityAwardImg").css("background-image", "url(" + fAwardUrl + ")");
                }
                map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("close"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            }
        },
        error: function() {
            console.log("获取失败");
        },
        complete: function(XMLHttpRequest, status) {　　　　
            console.log("-------------complete------------------" + status);
            if(status == 'timeout') {　　　　　
                ajaxTimeoutTwo.abort();　　　　
            }　　
        }
    });
}
//获取已打包商品
function getPackedGoodsList(num,num2,num3) {
    //num2:1表示早打包清单页
    var data = JSON.stringify({
        "token": _accessToken,
        "cudid": _udid + "_" + _mac
    });
    console.log(data);
    $("#hasPackedGif").css("display", "none");
    var ajaxTTTT = $.ajax({
        type: "get",
        async: true,
        url: packlisturl,
        data: {
            param: data
        },
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
            if(data.code == 0) {
                packGoodsObj2 = [];
                if(data.data == null) {
                    packGoodsShow(num);
                    if (goldHouseIsOpen == 3) {
                        $("#toastEmpty").css("display", "none");
                        $("#toastEnd").css("display", "block");
                        $("#packGoodsContainer").css("display", "none");
                        $("#moreGoodsContainer").css("display", "none");
                        if (num2 == 1) {
                            map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEnd"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                        }
                    } else{
                        $("#toastEmpty").css("display", "block");
                        $("#toastEnd").css("display", "none");
                        $("#packGoodsContainer").css("display", "none");
                        $("#moreGoodsContainer").css("display", "none");
                        if (num2 == 1) {
                            map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEmpty"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                        }
                    }
                } else {
                    if (goldHouseIsOpen == 3) {
                        $("#toastEmpty").css("display", "none");
                        $("#toastEnd").css("display", "block");
                        $("#packGoodsContainer").css("display", "none");
                        $("#moreGoodsContainer").css("display", "none");
                        if (num2 == 1) {
                            map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEnd"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                        }
                    } else{
                        $("#toastEmpty").css("display", "none");
                        $("#toastEnd").css("display", "none");
                        //每次进来前清除之前加的元素,防止重复显示:
                        $("#packGoodsList .goodsItemClass").remove();
                        console.log("data.data.length: "+ data.data.length);
                        var len = data.data.length;
                        for(var i = 0; i < len; i++) {
                            packGoodsObj2.push(data.data[i].goodsId);
                            var goodsInfo = (data.data[i].goodsInfo);
                            var goodsItem = '<div  class="goodsItemClass coocaa_btn_pack" goodsid=" ' + data.data[i].goodsId + ' " + goodsName=" ' + goodsInfo.goodsName + ' " > \
                                                <div class="goodsItemPlaceHolderClass"></div>                               \
                                                <div class="packGoodsItemPic"></div>                                        \
                                                <div class="packGoodsItemName">' + goodsInfo.goodsName + '</div>\
                                                <div class="packGoodsItemLabel">\
                                                    <div class="packGoodsItemLabelPriceNow">￥' + goodsInfo.shopPrice + '</div>\
                                                    <div class="packGoodsItemLabelTip">原价：</div>\
                                                    <div class="packGoodsItemLabelPriceOld">￥' + goodsInfo.promotePrice + '</div>\
                                                </div>\
                                            </div>';
                            $("#packGoodsList").append(goodsItem);
                            var thumb = "url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/img/new/pp"+data.data[i].goodsId+".jpg)";
                            $("#packGoodsList .goodsItemClass:last-of-type .packGoodsItemPic").css("background-image", thumb);
                        }
                        $("#packGoodsContainer").css("display", "block");
                        if (num2 == 1) {
                            map = new coocaakeymap($(".coocaa_btn_pack"), $(".coocaa_btn_pack").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
                        }
                        if(len <= 5) { //显示更多商品
                            var list = $("#moreGoodsContainer .goodsItemClass");
                            var len2 = list.length;
                            var _moreGoodsIdArr;
                            if(_qsource == "tencent") {
                                _moreGoodsIdArr = _moreGoodsIdArrTencent;
                            } else {
                                _moreGoodsIdArr = _moreGoodsIdArrIqiyi;
                            }
                            for(var i = 0; i < len2; i++) {
                                list.eq(i).attr("goodsid", _moreGoodsIdArr[i]);
                                list.eq(i).attr("goodsName", _moreGoodsNameArr[i]);
                                if(i == 0) { //影视
                                    list.eq(i).attr("businesstype", 0);
                                } else if(i == 1) { //教育
                                    list.eq(i).attr("businesstype", 1);
                                }
                            }
                            packlistPageMoreGoodsInit();
                            $("#moreGoodsContainer").css("display", "block");
                        } else {
                            $("#moreGoodsContainer").css("display", "none");
                        }
                    }
                    packGoodsShow(num);
                }
                buttonInitAfter2();
            } else {
                console.log("----------访问失败------");
                $("#toastEmpty").css("display", "none");
                $("#toastEnd").css("display", "block");
                $("#packGoodsContainer").css("display", "none");
                $("#moreGoodsContainer").css("display", "none");
                if (num2 == 1) {
                    map = new coocaakeymap($(".coocaa_btn_pack"), document.getElementById("toastEnd"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                }
            }
        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        },
        complete: function(XMLHttpRequest, status) {　　　　
            console.log("-------------complete------------------" + status);
            if(status == 'timeout') {　　　　　
                ajaxTTTT.abort();　　　　
            }
            if(num3 == 1){
                getDoneWorkAward(3);//4-登录任务 3-打包任务
            }
        }
    });
}
//打包商品
function goodsPackedFunc(oIndex, goodsId, clickState) {
    console.log(goodsId + "--" + _accessToken + "--" + _actionid + "--" + _mac);
    var data = JSON.stringify({
        "goodsId": goodsId,
        "token": _accessToken,
        "cudid": _udid + "_" + _mac
    });
    console.log(data);
    $.ajax({
        type: "get",
        async: true,
        url: packgoodUrl,
        data: {
            param: data
        },
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
            if(data.code == 0) {
                if(data.data == true) {
                    console.log("打包成功,是否被打包过:" + clickState);
                    $("#addGif").attr("src", "images/add.gif");
                    if(oIndex == 0) {
                        $("#hasPackedGif").css("left", "175px");
                    } else if(oIndex == 1) {
                        $("#hasPackedGif").css("left", "355px");
                    } else {
                        $("#hasPackedGif").css("left", "535px");
                    }
                    if(clickState == 0) {
                        $("#hasPackedGif").css("display", "block");
                        $("#hasPackedGif").attr("src","images/haspacked.gif");
                    } else {
                        $("#hasPackedGif").css("display", "none");
                    }
                    if(!_packageOver) {
                        setTimeout(function() {getPackedGoodsList(0,0,1);}, 1000);
                        $("#packedToast").css("display","block");
                        setTimeout(function(){$("#packedToast").css("display","none");}, 2000);
                    } else {
                        setTimeout(function() {getPackedGoodsList(0,0,0);}, 1000);
                        $("#dialogPage").css("display","block");
                        $("#packIsOver").css("display","block");
                        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("packIsOverBtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                    }
                    if(goldHouseIsOpen == 2) {
                        sentLog("pack_finished", '{"page_name":"打包完成","activity_name":"双旦活动-打包任务页面","page_type":"黄金小屋已开启"}');
                        _czc.push(['_trackEvent', '双旦活动-打包小屋页面', '打包商品', '黄金小屋已开启', '', '']);
                    } else {
                        sentLog("pack_finished", '{"page_name":"打包完成","activity_name":"双旦活动-打包任务页面","page_type":"黄金小屋未开启"}');
                        _czc.push(['_trackEvent', '双旦活动-打包小屋页面', '打包商品', '黄金小屋未开启', '', '']);
                    }
                } else {
                    if(goldHouseIsOpen == 2) {
                        sentLog("pack_finished", '{"page_name":"打包失败","activity_name":"双旦活动-打包任务页面","page_type":"黄金小屋已开启"}');
                        _czc.push(['_trackEvent', '双旦活动-打包小屋页面', '打包商品', '黄金小屋已开启', '', '']);
                    } else {
                        sentLog("pack_finished", '{"page_name":"打包失败","activity_name":"双旦活动-打包任务页面","page_type":"黄金小屋未开启"}');
                        _czc.push(['_trackEvent', '双旦活动-打包小屋页面', '打包商品', '黄金小屋未开启', '', '']);
                    }
                }
            } else {
                if(goldHouseIsOpen == 2) {
                    sentLog("pack_finished", '{"page_name":"打包失败","activity_name":"双旦活动-打包任务页面","page_type":"黄金小屋已开启"}');
                    _czc.push(['_trackEvent', '双旦活动-打包小屋页面', '打包商品', '黄金小屋已开启', '', '']);
                } else {
                    sentLog("pack_finished", '{"page_name":"打包失败","activity_name":"双旦活动-打包任务页面","page_type":"黄金小屋未开启"}');
                    _czc.push(['_trackEvent', '双旦活动-打包小屋页面', '打包商品', '黄金小屋未开启', '', '']);
                }
            }
        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
            if(goldHouseIsOpen == 2) {
                sentLog("pack_finished", '{"page_name":"打包失败","activity_name":"双旦活动-打包任务页面","page_type":"黄金小屋已开启"}');
                _czc.push(['_trackEvent', '双旦活动-打包小屋页面', '打包商品', '黄金小屋已开启', '', '']);
            } else {
                sentLog("pack_finished", '{"page_name":"打包失败","activity_name":"双旦活动-打包任务页面","page_type":"黄金小屋未开启"}');
                _czc.push(['_trackEvent', '双旦活动-打包小屋页面', '打包商品', '黄金小屋未开启', '', '']);
            }
        }
    });
}
//获取完成打包任务的奖励
function getDoneWorkAward(num) {
    var ajaxTimeoutTwo = $.ajax({
        type: "POST",
        async: true,
        timeout: 5000,
        dataType: 'json',
        url: _testurl + "/xmas/add-chance",
        data: {
            "MAC": _mac,
            "cChip": _chip,
            "cModel": _model,
            "cEmmcCID": _emmcCID,
            "cUDID": _udid,
            "accessToken": _accessToken,
            "cOpenId": _openId,
            "cNickName": _nickName,
            "id": _actionid,
            "userKeyId": _userKeyId,
            "chanceSource": num,
            "subTask": "0"
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if(data.code == 50001) {
                console.log("该活动不存在");
            } else if(data.code == 50002) {
                console.log("该活动未开始");
            } else if(data.code == 50003) {
                console.log("该活动已结束");
                _bActivityEnd = true;
                goldHouseIsOpen = 3;
            } else if(data.code == 50100) {
                console.log("该活动进行中+获取数据成功");
                _remainingNumber = data.data.remainingNumber;
                $("#bellnum").val("X" + _remainingNumber);
                showGoldHousePlace(goldHouseIsOpen, _remainingNumber);
                _elkOver = data.data.elkOver;
                _packageOver = data.data.packageOver;
                if(num == 4) {
                    console.log("完成了登录任务");
                    $("#hasDone").css("display", "none");
                    $("#gotoLogin").css("display", "none");
                    $("#hasLogined").css("display", "block");
                    map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("hasLoginBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                } else {
                    showWorkDialog(data.data, num);
                }
            }
        },
        error: function() {
            console.log("获取失败");
            $("#dialogPage").css("display", "none");
            $("#homePage").css("display", "none");
            $(".secondBtns").css("display", "none");
            setCurBtnFocus();
        },
        complete: function(XMLHttpRequest, status) {　　　　
            console.log("-------------complete------------------" + status);
            if(status == 'timeout') {　　　　　
                ajaxTimeoutTwo.abort();　　　　
            }　　
        }
    });
}

function showWorkDialog(dataObj, num) {
    console.log(num);
    console.log(JSON.stringify(dataObj));
    _remainingNumber = dataObj.remainingNumber;
    if (num == 4) {
        console.log("登录任务");
    } else{
        $("#thanks_btn1").attr("userKeyId", dataObj.rememberModel.userKeyId);
        $("#thanks_btn1").attr("awardId", dataObj.rememberModel.awardId);
        $("#thanks_btn1").attr("rememberId", dataObj.rememberModel.lotteryRememberId);
        $("#thanks_btn1").attr("awardTypeId", dataObj.rememberModel.awardTypeId);
        $("#thanks_btn1").attr("awardUrl", dataObj.rememberModel.awardUrl);
        $("#thanks_btn1").attr("awardName", dataObj.rememberModel.awardName);
        $("#thanks_btn1").attr("activeId", dataObj.rememberModel.lotteryActiveId);
        var _oAwardTime = dataObj.rememberModel.awardTime;
        _oAwardTime = _oAwardTime.substr(0, 10);
        $("#thanks_btn1").attr("awardTime", _oAwardTime);
    
        $("#dialogPage").css("display", "block");
        $("#thanks_Bg").css("display", "block");
        if(goldHouseIsOpen == 2) {
            sentLog("reward_popup_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗曝光', '黄金小屋已开启', '', '']);
        } else {
            sentLog("reward_popup_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启"}');
            _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '奖励弹窗曝光', '黄金小屋未开启', '', '']);
        }
        var _awardtype = dataObj.rememberModel.awardTypeId;
        if(_awardtype == 2) {
            $("#thanks_entity").css("display", "block");
            $("#thanks_coupon").css("display", "none");
            $("#thanks_red").css("display", "none");
            $("#enAwardBox").html(dataObj.rememberModel.awardName);
            $("#thanks_entityImg").attr("src", dataObj.rememberModel.awardUrl);
            $("#thanks_btn1 .btnName").html("收下礼物");
            $("#thanks_info3").css("display", "none");
        } else if(_awardtype == 5) {
            $("#thanks_entity").css("display", "none");
            $("#thanks_coupon").css("display", "block");
            $("#thanks_red").css("display", "none");
            console.log(dataObj.rememberModel.awardUrl);
            $("#thanks_couponImg").attr("src", dataObj.rememberModel.awardUrl);
            $("#thanks_btn1 .btnName").html("使用红包");
            $("#thanks_info3").css("display", "block");
            $("#thanks_info3").html("*该打包商品已放入打包清单，限时降价快去看看");
        } else if(_awardtype == 7) {
            var _awardBouns = dataObj.rememberModel.awardInfo.bonus;
            $("#thanks_btn1").attr("awardBouns", _awardBouns);
            $("#thanks_entity").css("display", "none");
            $("#thanks_coupon").css("display", "none");
            $("#thanks_red").css("display", "block");
            //$("#redAwardName").html("现金红包");
            $("#redAwardName").html('<span style="font-size:30px;">'+dataObj.rememberModel.awardName+'</span>');
            var _showBonus = "";
            if(dataObj.rememberModel.mergeAwardInfo == "" || dataObj.rememberModel.mergeAwardInfo == null) {
                _showBonus = dataObj.rememberModel.awardInfo.bonus;
            } else {
                _showBonus = dataObj.rememberModel.mergeAwardInfo.bonus;
            }
            $("#redAwardInfo").html('<span style="font-size:30px;">'+_showBonus + "元</span>");
            $("#thanks_btn1 .btnName").html("收下红包");
        }
        if(num == 1 || num == 2) {
            $("#thanks_btn2 .btnName").html("关闭");
            $("#thanks_btn2").css("left", "990px");
            $("#thanks_btn2").css("width", "147px");
            $("#thanks_btn2 .imgBlur").attr("src", "images/dialog/red_blur.png");
            $("#thanks_btn2 .imgFocus").attr("src", "images/dialog/red_focus.png");
            if(num == 1) {
                $("#thanks_info1").html("感谢你帮圣诞爷爷采购礼物");
                $("#thanks_giftsBox").css("background-image", "url(images/dialog/couponbell5.png)");
                if(_awardtype == 2) {
                    $("#thanks_info3").css("display", "none");
                }else if(_awardtype == 5){
                    $("#thanks_info3").css("display", "none");
                }else if(_awardtype == 7){
                    $("#thanks_info3").css("display", "block");
                    $("#thanks_info3").html('*当前返利红包总额<span style="color:#fff642">' + _showBonus + '</span>元');
                }
            } else {
                $("#thanks_info1").html("感谢你带麋鹿玩耍");
                $("#thanks_giftsBox").css("background-image", "url(images/dialog/couponbell1.png)");
                if(_awardtype == 2) {
                    $("#thanks_info3").css("display", "none");
                }else if(_awardtype == 5){
                    $("#thanks_info3").css("display", "none");
                }else if(_awardtype == 7){
                    $("#thanks_info3").css("display", "block");
                    $("#thanks_info3").html('*当前任务红包总额<span style="color:#fff642">' + _showBonus + '</span>元');
                }
            }
            $("#thanks_btn2").attr("clicktype", 0);
        } else if(num == 3) {
            $("#thanks_info1").html("感谢你帮圣诞爷爷打包礼物");
            $("#thanks_btn2 .btnName").html("查看打包清单");
            $("#thanks_giftsBox").css("background-image", "url(images/dialog/couponbell1.png)");
            $("#thanks_btn2").css("left", "945px");
            $("#thanks_btn2").css("width", "210px");
            $("#thanks_btn2 .imgBlur").attr("src", "images/dialog/checkpacklist_blur.png");
            $("#thanks_btn2 .imgFocus").attr("src", "images/dialog/checkpacklist_focus.png");
            $("#thanks_btn2").attr("clicktype", 1);
            if(_awardtype == 2) {
                $("#thanks_info3").css("display", "block");
                $("#thanks_info3").html("*该打包商品已放入打包清单，限时降价快去看看");
            }else if(_awardtype == 5){
                $("#thanks_info3").css("display", "block");
                $("#thanks_info3").html("*该打包商品已放入打包清单，限时降价快去看看");
            }else if(_awardtype == 7){
                $("#thanks_info3").css("display", "block");
                $("#thanks_info3").html('*当前任务红包总额<span style="color:#fff642">' + dataObj.rememberModel.awardInfo.bonus + '</span>元');
            }
        }
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("thanks_btn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    }
}
//左上角奖品信息展示
function showAwardInfo() {
    $("#koiNewsul").html("");
    $("#fakeNewsul").html("");
    $.ajax({
        type: "get",
        async: true,
        url: _testurl + "/xmas/news",
        data: {
            id: _actionid,
            goldActiveId: _lotteryid
        },
        dataType: "json",
        timeout: 10000,
        success: function(data) {
            console.log("返回状态：" + JSON.stringify(data));
            if(data.data.koiNews.code == "50100") {
                _koiNum = data.data.koiNews.result.length;
                console.log(_koiNum);
                if(data.data.koiNews.result.length > 0) {
                    var box = document.getElementById("koiNewsul");
                    for(var i = 0; i < data.data.koiNews.result.length; i++) {
                        var list = document.createElement("li");
                        console.log(data.data.koiNews.result[i].nickName);
                        if(data.data.koiNews.result[i].nickName == "") {
                            userIp = userIp.substr(0, 6) + "...";
                            list.innerHTML = "恭喜" + data.data.koiNews.result[i].province + "ip地址：" + userIp + " 成为" + data.data.koiNews.result[i].queue + "号锦鲤";
                        } else {
                            var province = (data.data.koiNews.result[i].province==null)?"":data.data.koiNews.result[i].province;
                            province = province.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g,"");
                            var username = data.data.koiNews.result[i].nickName.length>5?data.data.koiNews.result[i].nickName.substr(0,5)+"...":data.data.koiNews.result[i].nickName;
                            list.innerHTML="恭喜"+province+"用户"+username+"成为"+data.data.koiNews.result[i].queue+"号锦鲤";
                        }
                        box.appendChild(list);
                    }
                    showAwardlist("#koiNews", "#koiNewsul");
                } else {
                    $("#koiNewsul").html("超级锦鲤仍未出现，就等你来了！");
                }
            } else {
                var nowTime = new Date(data.data.koiNews.sysTime).getTime();
                var beginTime = new Date(data.data.koiNews.beginTime).getTime();
                clearInterval(intervalForCutdown);
                intervalForCutdown = setInterval(showTime, 1000);

                function showTime() {
                    nowTime = nowTime + 1000;
                    var cutdown = beginTime - nowTime;
                    var transTime = Math.ceil(cutdown / 1000 / 60 / 60 / 24);
                    if(transTime > 1) {
                        $("#koiNewsul").html("距离黄金小屋开启还剩" + transTime + "天");
                    } else if(transTime == 1) {
                        var transTime = Math.ceil(cutdown / 1000 / 60 / 60);
                        if(transTime > 1) {
                            $("#koiNewsul").html("距离黄金小屋开启还剩" + transTime + "小时");
                        } else if(transTime == 1) {
                            var transTime = Math.ceil(cutdown / 1000 / 60);
                            if(transTime > 1) {
                                $("#koiNewsul").html("距离黄金小屋开启还剩" + transTime + "分钟");
                            } else if(transTime == 1) {
                                var transTime = Math.ceil(cutdown / 1000);
                                if(transTime >= 0) {
                                    $("#koiNewsul").html("距离黄金小屋开启还剩" + transTime + "秒");
                                } else {
                                    clearInterval(intervalForCutdown);
                                    $("#koiNewsul").html("超级锦鲤仍未出现，就等你来了！");
                                }
                            } else {
                                clearInterval(intervalForCutdown);
                                $("#koiNewsul").html("超级锦鲤仍未出现，就等你来了！");
                            }
                        } else {
                            clearInterval(intervalForCutdown);
                            $("#koiNewsul").html("超级锦鲤仍未出现，就等你来了！");
                        }
                    } else {
                        clearInterval(intervalForCutdown);
                        $("#koiNewsul").html("超级锦鲤仍未出现，就等你来了！");
                    }
                }
            }
            var box = document.getElementById("fakeNewsul");
            for(var i = 0; i < data.data.fakeNews.length; i++) {
                var _curNickName = data.data.fakeNews[i].nickName;
                var _curAwardName = data.data.fakeNews[i].awardName;
                var list = document.createElement("li");
                list.innerHTML = _curNickName + _curAwardName;
                box.appendChild(list);
            }
            showAwardlist("#fakeNews", "#fakeNewsul");
        },
        error: function(error) {
            console.log("-----------访问失败---------" + JSON.stringify(error));
        }
    });
}

function showAwardlist(box, inner, name) {
    var boxHeight = $(box).height();
    var listHeight = $(inner).height();
    var screenNum = Math.ceil(listHeight / boxHeight);
    console.log("---" + boxHeight + "---" + listHeight + "----" + screenNum + "---")
    var a = 1;
    if(screenNum > 1) {
        setInterval(marquee, 3000);
    }
    function marquee() {
        $(inner).css("transform", "translate3D(0, -" + a * boxHeight + "px, 0)");
        a++;
        if(a == screenNum) {
            a = 0
        }
    }
}
//打包商品详情展示
function packGoodsShow(num) {
    var newGoodsIdArray = [];
    var newGoodsNameArray = [];
    var newGoodsImgArray = [];
    var newGoodsPacked = [];
    console.log(packGoodsObj2);
    for(var i = 0; i < packGoodsObj.length; i++) {
        var _curGoodId = packGoodsObj[i].goodId;
        if(packGoodsObj2.indexOf(_curGoodId)>= 0) {
            newGoodsIdArray.push(packGoodsObj[i].goodId);
            newGoodsNameArray.push(packGoodsObj[i].goodName);
            newGoodsImgArray.push(packGoodsObj[i].goodImg);
            newGoodsPacked.push(1);
        } else {
            newGoodsIdArray.unshift(packGoodsObj[i].goodId);
            newGoodsNameArray.unshift(packGoodsObj[i].goodName);
            newGoodsImgArray.unshift(packGoodsObj[i].goodImg);
            newGoodsPacked.unshift(0);
        }
    }
    console.log(newGoodsPacked);

    for(var j = 0; j < newGoodsIdArray.length; j++) {
        $(".packGoodsItem:eq(" + j + ")").attr("curId", newGoodsIdArray[j]);
        $(".packGoodsItem:eq(" + j + ")").attr("goodName", newGoodsNameArray[j]);
        $(".packGoodsItem:eq(" + j + ")").attr("packstate", newGoodsPacked[j]);
        if(newGoodsPacked[j] == 1) {
            var _innerHtml = '<img class="goodsImages" src="' + newGoodsImgArray[j] + '"/><img class="hasPackedImages" src="images/haspacked.png"/>';
        } else {
            var _innerHtml = '<img class="goodsImages" src="' + newGoodsImgArray[j] + '"/>';
        }
        $(".packGoodsItem:eq(" + j + ")").html(_innerHtml);
    }
    if(num == 1) {
        console.log(_curPackIndex);
        $(".secondBtns").css("display", "none");
        $("#packGoodsBox").css("display","block");
        map = new coocaakeymap($("#packGoodsBox .coocaa_btn"), $(".packGoodsItem").eq(_curPackIndex), "btn-focus", function() {}, function(val) {}, function(obj) {});
        $(".packGoodsItem").eq(_curPackIndex).trigger("focus");
    }
    buttonInitAfter();
}

function startDrawFunc() {
    console.log("开始抽奖" + _province +"--"+ _city+"--"+_nickName);
    var ajaxTimeoutOne = $.ajax({
        type: "POST",
        async: true,
        timeout: 5000,
        dataType: 'json',
        url: _testurl + "/xmas/lottery",
        data: {
            "id": _actionid,
            "cUDID": _udid,
            "MAC": _mac,
            "cEmmcCID": _emmcCID,
            "cOpenId": _openId,
            "cModel": _model,
            "cChip": _chip,
            "goldActiveId": _lotteryid,
            "province": _province,
            "city": _city,
            "cNickName": _nickName
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if(data.code == 50001) {
                console.log("该活动不存在");
            } else if(data.code == 50002) {
                console.log("该活动未开始");
            } else if(data.code == 50003) {
                console.log("该活动已结束");
                _bActivityEnd = true;
                goldHouseIsOpen = 3;
                $("#hasEnd").css("display", "block");
                map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("hasEndBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                sentLog("draw_award_result", '{"page_name":"黄金小屋抽奖","activity_name":"双旦活动-圣诞小屋","award_result":"抽奖失败","award_type":"-1","award_name":"-1"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋', '黄金小屋抽奖', '抽奖失败+活动已结束', '', '']);
            } else if(data.code == 50042) {
                console.log("该活动已下架");
            } else if(data.code == 50100) {
                console.log("该活动进行中+获取数据成功");
                console.log(data.data.seq);
                _remainingNumber = data.data.remainingNumber;
                _curGoldAwardData = data.data;
                console.log(_remainingNumber);
                $("#bellnum").val("X" + _remainingNumber);
                showGoldHousePlace(goldHouseIsOpen, _remainingNumber);
                $("#startDrawBox").css("display", "block");
                map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("startDrawBox"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                var _machine = $("#machine").slotMachine({
                    active: 0,
                    delay: 800,
                    complete: function() {
                        console.log("hello" + this.active);
                        _isStartDraw = 0;
                        showThisAwardDialog(_curGoldAwardData);
                    }
                });
                _machine.futureActive = data.data.seq - 1;
                _isStartDraw = 1;
                setTimeout(function(){_machine.shuffle(3);}, 1000);
                var _dAwardType = data.data.awardTypeId;
                var _dAwardName = data.data.awardName;
                sentLog("draw_award_result", '{"page_name":"黄金小屋抽奖","activity_name":"双旦活动-圣诞小屋","award_result":"抽奖成功","award_type":"'+_dAwardType+'","award_name":"'+_dAwardName+'"}');
                _czc.push(['_trackEvent', '双旦活动-圣诞小屋', '黄金小屋抽奖', _dAwardType+'-'+_dAwardName, '', '']);
            }
        },
        error: function() {
            console.log("获取失败");
        },
        complete: function(XMLHttpRequest, status) {　　　　
            console.log("-------------complete------------------" + status);
            if(status == 'timeout') {　　　　　
                ajaxTimeoutOne.abort();　　　　
            }　　
        }
    });
}
function showThisAwardDialog(awardObj) {
    console.log(JSON.stringify(awardObj));
    var _cawardId = awardObj.awardId; //奖品id
    var _cactiveId = awardObj.lotteryActiveId; //奖品活动id
    var _crememberId = awardObj.lotteryRememberId; //奖品记录id
    var _cuserKeyId = awardObj.userKeyId; //抽奖用户的userkeyid
    var _cawardName = awardObj.awardName; //奖品名称
    var _cawardTime = awardObj.awardTime; //奖品名称
    _cawardTime = _cawardTime.substr(0, 10);
    console.log(_cawardName);
    var _cawardUrl = awardObj.awardUrl; //奖品url
    var _cawardTypeId = awardObj.awardTypeId; //奖品类型

    $("#startDrawBox").css("display", "none");
    if(_cawardTypeId == 7) {
        var _margeType = awardObj.margeType; //当奖品为红包时该微信红包是否是合并后的总额度红包
        var _bouns1 = awardObj.awardInfo.bonus; //当奖品为红包时的红包总金额
        if(awardObj.mergeAwardInfo == "" || awardObj.mergeAwardInfo == null) {
            var _bouns2 = _bouns1;
        } else {
            var _bouns2 = awardObj.mergeAwardInfo.bonus; //当奖品为红包时的本次中奖的微信红包额度
        }
        console.log(_margeType + "--" + _bouns1 + "--" + _bouns2);
    }
    if(_cawardTypeId == 16) {
        var _queue = awardObj.queue; //当奖品为锦鲤是锦鲤的编号
    }
    $("#koibtn2").attr("activeId", _cactiveId);
    $("#koibtn2").attr("awardId", _cawardId);
    $("#koibtn2").attr("rememberId", _crememberId);
    $("#koibtn2").attr("userKeyId", _cuserKeyId);
    $("#koibtn2").attr("awardTypeId", _cawardTypeId);
    $("#koibtn2").attr("awardName", _cawardName);
    $("#koibtn2").attr("awardTime", _cawardTime);
    $("#koibtn2").attr("awardUrl", _cawardUrl);

    $(".thisDrawAwardImg").css("display", "none");
    $("#machine").stop(true, true).animate({scrollTop: 0}, {duration: 0,easing: "swing",complete: function() {}});
    console.log(_koiNum);
    if(_cawardTypeId == 2) {
        console.log("抽中实体奖");
        if (_koiNum>1) {
            $("#superKoiInfo").css("display","none");
        } else{
            $("#superKoiInfo").css("display","block");
        }
        $("#koiMouldImg").css("background-image","url(images/dialog/draw_entity.png)");
        $("#getKoiInfo").css("display","block");
        $("#koiAwardName").html(_cawardName);
        $("#getKoi").css("display", "block");
        $("#curAwardInfo").css("display", "none");
        $("#entityImgPart").css("background-image", "url(" + _cawardUrl + ")");
        $("#entityImgShow").css("display", "block");
        $("#couponImgShow").css("display", "none");
        $("#redImgShow").css("display", "none");
        $("#koibtn2 .btnName").html("马上领取");
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("koibtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        var enstr = enurl + "activeId=" + _cactiveId + "&rememberId=" + _crememberId + "&userKeyId=" + _cuserKeyId + "&access_token=" + _accessToken;
        drawQrcode("getDrawEnQrcode", enstr, 180);
        $("#getDrawEnName").html("奖品名称"+_cawardName);
        $("#getDrawEnTime").html("获奖时间"+_cawardTime);
    } else if(_cawardTypeId == 5) {
        console.log("抽中优惠券");
        if (_koiNum>1) {
            $("#superKoiInfo").css("display","none");
        } else{
            $("#superKoiInfo").css("display","block");
        }
        $("#koiMouldImg").css("background-image","url(images/dialog/draw_coupon.png)");
        $("#getKoiInfo").css("display","block");
        $("#koiAwardName").html("平台红包");
        $("#getKoi").css("display", "block");
        $("#curAwardInfo").css("display", "none");
        console.log(_cawardUrl);
        $("#couponImgPart").css("background-image", "url(" + _cawardUrl + ")");
        $("#couponImgShow").css("display", "block");
        $("#entityImgShow").css("display", "none");
        $("#redImgShow").css("display", "none");
        $("#koibtn2 .btnName").html("使用红包");
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("koibtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
    } else if(_cawardTypeId == 7) {
        console.log("抽中红包奖");
        if (_koiNum>1) {
            $("#superKoiInfo").css("display","none");
        } else{
            $("#superKoiInfo").css("display","block");
        }
        $("#koiMouldImg").css("background-image","url(images/dialog/draw_red.png)");
        $("#getKoiInfo").css("display","none");
        $("#getKoi").css("display", "block");
        $("#curAwardInfo").css("display", "block");
        $("#curAwardInfo").html('当前抽奖红包总额<span style="color: #ffe82a;">' + _bouns1 + '</span>元')
        $("#getAwardNum").html(_bouns2);
        $("#koibtn2").attr("awardBouns1", _bouns1);
        $("#koibtn2").attr("awardBouns2", _bouns2);
        $("#redImgShow").css("display", "block");
        $("#entityImgShow").css("display", "none");
        $("#couponImgShow").css("display", "none");
        $("#koibtn2 .btnName").html("收下红包");
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("koibtn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        getRedPacketsQrcode(_cactiveId, _crememberId, _cuserKeyId, "getDrawRedQrcode");
        $("#getDrawRedNum").html(_bouns1);
    } else if(_cawardTypeId == 16) {
        console.log("抽中锦鲤");
        $("#koibtn2").attr("awardQueue", _queue);
        $("#getKoi2").css("display", "block");
        map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("koi2btn1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        var enstr = enurl + "activeId=" + _cactiveId + "&rememberId=" + _crememberId + "&userKeyId=" + _cuserKeyId + "&access_token=" + _accessToken;
        drawQrcode("koiMouldImg2", enstr, 180);
    }
}

function startAndSendLog(num){
    _startLogin = num; //1表示登录弹窗时启登录 2表示领取奖励时启登录
    startLoginFlag = true;
    startLogin(needQQ);
    if (num == 1) {
        sentLog("landing_page_show", '{"page_name":"双旦活动登录弹窗","activity_name":"双旦活动-圣诞小屋","last_page_name":"登录任务"}');
        _czc.push(['_trackEvent', '双旦活动-圣诞小屋', '双旦活动登录弹窗', '圣诞小屋页面', '', '']);
    } else{
        sentLog("landing_page_show", '{"page_name":"双旦活动登录弹窗","activity_name":"双旦活动-圣诞小屋","last_page_name":"领取礼物"}');
        _czc.push(['_trackEvent', '双旦活动-圣诞小屋', '双旦活动登录弹窗', '圣诞小屋页面', '', '']);
    }
}
//领取优惠券并跳转使用
function sendPrizes(oAwardId, oRememberId, oUserKeyId, oType, oActiveId, oQsource) {
    console.log(oAwardId + "--" + oRememberId + "--" + oUserKeyId + "--" + oType + "--" + oActiveId);
    if(oQsource != "tencent") {
        oQsource = "iqiyi";
    }
    console.log(oQsource);
    var ajaxTimeoutFive = $.ajax({
        type: "GET",
        async: true,
        timeout: 5000,
        dataType: 'jsonp',
        jsonp: "callback",
        url: _testurl0 + "/v3/lottery/verify/receive",
        data: {
            "activeId": oActiveId,
            "awardId": oAwardId,
            "rememberId": oRememberId,
            "awardTypeId": oType,
            "userKeyId": oUserKeyId,
            "MAC": _mac,
            "cOpenId": _openId,
            "source": oQsource
        },
        success: function(data) {
            console.log(JSON.stringify(data));
            if(data.code == "50100") {
                var couponDetail = data.data.couponInfo.couponDetail;
                console.log(couponDetail);
                if(couponDetail == 1) { //已配置
                    var data_a = data.data.couponInfo.onclickData;
                    var packageName = JSON.parse(data_a).packageName;
                    var byvalue = JSON.parse(data_a).byvalue;
                    var bywhat = JSON.parse(data_a).bywhat;
                    var obj = JSON.parse(data_a).param;
                    var sources = new Array();
                    for(var key in obj) {
                        var px = {};
                        px[key] = obj[key];
                        sources.push(px);
                    }
                    sources = JSON.stringify(sources);
                    console.log(packageName + "--" + byvalue + "--" + bywhat + "--" + sources);
                    console.log("跳转使用页面");
                    coocaaosapi.startParamAction2(bywhat, byvalue, sources, function(message) {}, function(error) {
                        console.log(error);
                    });
                } else {
                    console.log("未配置");
                }
            } else {
                console.log("优惠券激活失败,需要给出激活失败的提示.");
                //saveData1(name,imgurl,lotteryActiveId,awardid,rememberId,qsource,userkeyid);
                //$("#dialogPage").css("display","block");
                //$("#couponFail").css("display","block");
                //map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("couponFailBtn"), "btn-focus", function() {}, function(val) {}, function(obj) {});
            }
        },
        error: function() {
            console.log("获取失败");
        },
        complete: function(XMLHttpRequest, status) {　　　　
            console.log("-------------complete------------------" + status);
            if(status == 'timeout') {　　　　　
                ajaxTimeoutFive.abort();　　　　
            }
        }
    });

}
//获取打包清单
function getAddPack() {
    if(needQQ) {
        $("#_jrrecommendbox ._jrgoodsbox:nth-child(1) ._jrgoods").css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/buyzone/tencentgoods.jpg)");
    } else {
        $("#_jrrecommendbox ._jrgoodsbox:nth-child(1) ._jrgoods").css("backgroundImage", "url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/buyzone/yinhegoods.jpg)");
    }

    if(goldHouseIsOpen == "1") {
        goldHouseStation = "黄金小屋未开启";
    } else if(goldHouseIsOpen == "2") {
        goldHouseStation = "黄金小屋已开启";
    } else {
        goldHouseStation = "黄金小屋已关闭";
    }
    sentLog("christmas_house_page_button_click", '{"button_name":"采购小屋","page_name":"圣诞小屋页面","activity_name":"双旦活动--圣诞小屋","page_type":"' + goldHouseStation + '"}');
    _czc.push(['_trackEvent', '双旦活动--圣诞小屋', '圣诞小屋页面' + goldHouseStation, '采购小屋点击', '', '']);
    sentLog("purchase_house_page_show", '{"page_name":"采购小屋页面","activity_name":"双旦活动-采购小屋页面","page_type":"' + goldHouseStation + '"}');
    _czc.push(['_trackEvent', '双旦活动-采购小屋页面', '采购小屋页面曝光' + goldHouseStation, '', '', '']);
    var data = JSON.stringify({
        "token": _accessToken,
        "cudid": _udid + "_" + _mac
    });
    console.log("=============" + data);
    var haspack = false;
    $.ajax({
        type: "get",
        async: true,
        url: packlisturl,
        data: {
            param: data
        },
        dataType: "json",
        success: function(data) {
            console.log("------------packGoodsList----result-------------" + JSON.stringify(data));
            if(data.code == 0) {
                if(data.data == null) {
                    haspack = false;
                } else {
                    haspack = true;
                    $("#_jrpackbox").html("");
                    $("#_jrpackzone").show();
                    var packLength = data.data.length > 4 ? 4 : data.data.length;
                    console.log("========" + packLength);
                    var arrPack = data.data;
                    var packBox = document.getElementById("_jrpackbox");
                    for(var i = 0; i < packLength; i++) {
                        var _jrgoodsbox = document.createElement("div");
                        _jrgoodsbox.setAttribute('class', '_jrgoodsbox');
                        var _jrborder = document.createElement("div");
                        _jrborder.setAttribute('class', '_jrborder');
                        var packDiv = document.createElement("div");
                        packDiv.setAttribute('class', '_jrcoocaabtn _jrgoods _jrgoods' + i);
                        packDiv.setAttribute('goodsId', arrPack[i].goodsId);
                        packDiv.setAttribute('product_name', arrPack[i].goodsInfo.goodsName);
                        packDiv.setAttribute('goodsThumb', arrPack[i].goodsInfo.goodsThumb);
                        packDiv.setAttribute('promotePrice', arrPack[i].goodsInfo.promotePrice);
                        packDiv.setAttribute('shopPrice', arrPack[i].goodsInfo.shopPrice);
                        packDiv.setAttribute('type', "packnormal");
                        // packDiv.style.backgroundImage = "url("+arrPack[i].goodsInfo.goodsThumb+")";
                        var goodsName = document.createElement("div");
                        goodsName.setAttribute('class', 'goodsName');
                        goodsName.innerHTML = arrPack[i].goodsInfo.goodsName;
                        var nowPrice = document.createElement("div");
                        nowPrice.setAttribute('class', 'nowPrice');
                        nowPrice.innerHTML = "￥" + arrPack[i].goodsInfo.shopPrice;
                        var oldPrice = document.createElement("div");
                        oldPrice.setAttribute('class', 'oldPrice');
                        oldPrice.innerHTML = "原价：" + arrPack[i].goodsInfo.promotePrice;
                        var goodsImg = document.createElement("div");
                        goodsImg.setAttribute('class', 'goodsImg');
                        // goodsImg.style.backgroundImage = "url("+arrPack[i].goodsInfo.goodsThumb+")";
                        goodsImg.style.backgroundImage = "url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/img/new/pp" + arrPack[i].goodsId + ".jpg)";
                        packDiv.appendChild(goodsName);
                        packDiv.appendChild(nowPrice);
                        packDiv.appendChild(oldPrice);
                        packDiv.appendChild(goodsImg);
                        _jrgoodsbox.appendChild(_jrborder);
                        _jrgoodsbox.appendChild(packDiv);
                        packBox.appendChild(_jrgoodsbox);
                    }
                    var _jrgoodsbox = document.createElement("div");
                    _jrgoodsbox.setAttribute('class', '_jrgoodsbox');
                    var _jrborder = document.createElement("div");
                    _jrborder.setAttribute('class', '_jrborder special');
                    var packDiv = document.createElement("div");
                    packDiv.setAttribute('class', '_jrcoocaabtn _jrgoods _jrpackMore');
                    packDiv.setAttribute('product_name', '可能喜欢更多');
                    packDiv.setAttribute('type', "packmore");
                    packDiv.style.backgroundImage = "url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/buyzone/more.png)";
                    _jrgoodsbox.appendChild(_jrborder);
                    _jrgoodsbox.appendChild(packDiv);
                    packBox.appendChild(_jrgoodsbox);
                }
            } else {
                console.log("----------访问失败------");
            }
            if(_accessToken != "" && _accessToken != null && _accessToken != undefined) {
                setFocusInPack(haspack);
                selectGoodsCoupon();
            } else {
                setFocusInPack(haspack);
            }
        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        }
    });
}

//获取优惠券接口
function selectGoodsCoupon() {
    var data = JSON.stringify({
        "ids": couponGoodsId,
        "token": _accessToken
    });
    $.ajax({
        type: "get",
        async: true,
        url: goodsCouponUrl,
        data: {
            param: data
        },
        dataType: "json",
        success: function(data) {
            console.log(JSON.stringify(data));
            for(var i = 0; i < couponGoodsIdArr.length; i++) {
                $("[goodsId=" + couponGoodsIdArr[i] + "] .couponword").html(data.data[couponGoodsIdArr[i]]);
            }
        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        }
    });
}

//设置采购小屋焦点以及事件
function setFocusInPack(haspack) {
    console.log("***************************************");
    $("._jrborder").hide();
    $("._jrgoods").unbind("focus").bind("focus", function() {
        $(this).prev("._jrborder").show();
        var changeY = 0;
        var firstnum = $("#_jrpackbox ._jrgoodsbox ._jrcoocaabtn").index($(this));
        var secondnum = $("#_jrrecommendbox ._jrgoodsbox ._jrcoocaabtn").index($(this));
        if($("#_jrpackzone").css("display") == "none"){
            changeY = Math.floor(secondnum/5)*100;
        }else{
            if(firstnum!=-1){
                changeY = 610;
            }else{
                changeY = Math.floor(secondnum/5)*300;
            }
        }
        $("#_jrbuyZoneInner").css("transform", "translate3D(0, -" + changeY + "px, 0)");
    })

    $("._jrgoods").unbind("blur").bind("blur", function() {
        $(this).prev("._jrborder").hide();
    })

    if(haspack) {
        map = new coocaakeymap($("._jrcoocaabtn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
        $("._jrcoocaabtn:eq(0)").trigger("focus");
    } else {
        map = new coocaakeymap($("._jrcoocaabtn"), $("#_jrrecommendbox ._jrgoodsbox ._jrcoocaabtn:eq(0)"), "btn-focus", function() {}, function(val) {}, function(obj) {});
        $("#_jrrecommendbox ._jrgoodsbox ._jrcoocaabtn:eq(0)").trigger("focus");
    }
    $("._jrgoods").unbind("itemClick").bind("itemClick", function() {
        var product = $(this).attr("product_name");
        var button_name = "你可能喜欢推荐位";
        var _thisType = $(this).attr("type");
        var _thisGoodsId = $(this).attr("goodsId");
        if(_thisType == "packnormal") {
            coocaaosapi.startAppShopDetail("" + _thisGoodsId, function() {
                console.log("====")
            }, function() {
                console.log("error-----")
            });
        } else if(_thisType == "packmore") {
            console.log("goto PACKList Page====");
            if(goldHouseIsOpen == 1) {
                sentLog("pack_list_page_show", '{"page_name":"打包清单页面","activity_name":"双旦活动-打包任务页面","last_page_name":"采购小屋页面","page_type":"黄金小屋未开启"}');
                _czc.push(['_trackEvent', '打包清单页面', '打包清单页面曝光', '黄金小屋未开启', '', '']);
                $("#toastEnd").css("display", "none");
            } else if(goldHouseIsOpen == 2) {
                sentLog("pack_list_page_show", '{"page_name":"打包清单页面","activity_name":"双旦活动-打包任务页面","last_page_name":"采购小屋页面","page_type":"黄金小屋已开启"}');
                _czc.push(['_trackEvent', '打包清单页面', '打包清单页面曝光', '黄金小屋已开启', '', '']);
                $("#toastEnd").css("display", "none");
            } else if(goldHouseIsOpen == 3) {
                sentLog("pack_list_page_show", '{"page_name":"打包清单页面","activity_name":"双旦活动-打包任务页面","last_page_name":"采购小屋页面","page_type":"黄金小屋已关闭"}');
                _czc.push(['_trackEvent', '打包清单页面', '打包清单页面曝光', '黄金小屋已关闭', '', '']);
                $("#toastEnd").css("display","block");
                $("#toastEmpty").css("display","none");
                $("#moreGoodsContainer").css("display","none");
                $("#packGoodsContainer").css("display","none");
            }
            $("#_jrbuyZone").css("display", "none");
            $("#packGoodsPage").css("display", "block");
            _gotoPackPage = 3;
            map = new coocaakeymap($(".coocaa_btn_pack"), $(".coocaa_btn_pack").eq(0), "btn-focus", function() {}, function(val) {}, function(obj) {});
            $("#packGoodsListOuterContainerId").stop(true, true).animate({scrollTop: 0}, {duration: 0,easing: "swing",complete: function() {}});
            $(".coocaa_btn_pack").eq(0).trigger("focus");
        } else if(_thisType == "moviepkg") {
            button_name = "超值爆品精选推荐商品推荐位";
            if(needQQ) {
                product = "腾讯影视VIP年卡";
                coocaaosapi.startMovieMemberCenter("0", "5", function() {}, function() {})
            } else {
                product = "爱奇艺影视VIP年卡";
                coocaaosapi.startMovieMemberCenter("0", "1", function() {}, function() {})
            }
        } else if(_thisType == "edupkg") {
            button_name = "超值爆品精选推荐商品推荐位";
            coocaaosapi.startMovieMemberCenter("1", "57", function() {}, function() {})
        } else if(_thisType == "goodsnormal") {
            button_name = "超值爆品精选推荐商品推荐位";
            coocaaosapi.startAppShopDetail("" + _thisGoodsId, function() {
                console.log("====")
            }, function() {
                console.log("error-----")
            });
        } else if(_thisType == "goodsmore") {
            button_name = "超值爆品精选推荐商品推荐位";
            coocaaosapi.startAppShopZone2("193", function() {}, function() {})
        }
        sentLog("purchase_house_wares_click", '{"page_name":"采购小屋页面","activity_name":"双旦活动-采购小屋页面","product_name":"' + product + '","button_name":"' + button_name + '"}');
        _czc.push(['_trackEvent', '双旦活动-采购小屋页面', '采购小屋页面点击', button_name + '+' + product, '', '']);
    })
}

function packlistPageMoreGoodsInit() {
    if(_qsource == "tencent") {
        $("#moregoodsList .goodsItemPlaceHolderClass:eq(0)").css("background-image", "url(images/packlist/goods-more.png)");
    } else {
        $("#moregoodsList .goodsItemPlaceHolderClass:eq(0)").css("background-image", "url(images/packlist/goods-moreA.png)");
    }
    $("#moregoodsList .goodsItemPlaceHolderClass:eq(1)").css("background-image", "url(images/packlist/goods-more2.png)");
    $("#moregoodsList .goodsItemPlaceHolderClass:eq(2)").css("background-image", "url(images/packlist/goods-more3.png)");
    $("#moregoodsList .goodsItemPlaceHolderClass:eq(3)").css("background-image", "url(images/packlist/goods-more4.png)");
    $("#moregoodsList .goodsItemPlaceHolderClass:eq(4)").css("background-image", "url(images/packlist/goods-more5.png)");
}
//页面翻页
function focusShift(el) {
    var index = $(".coocaa_btn_pack").index(el);
    
    //超过一行，往下翻(index/5-1)的高度
    //获取焦点元素所属section的top值：
    var parentId = el.parent().attr("id");
    var itemHeight = 398; //398px 单个item高度是398
    var myScrollTopValue = el.position().top - 398;
    if(index < 5) {
        myScrollTopValue = 0;
    }
    console.log("focusShift myScrollTopValue: " + myScrollTopValue + "parentId:" + parentId);
    if(parentId == "packGoodsList") {
        $("#packGoodsListOuterContainerId").stop(true, true).animate({scrollTop: myScrollTopValue}, {duration: 0,easing: "swing",complete: function() {}});
    }
}
//点击返回
function backButtonFunc() {
    console.log(_isToastExit);
    if(_isToastExit){
        return;
    }else if(_isStartDraw == 0) {
        if(document.getElementById("dialogPage").style.display == "block" || document.getElementById("_jrbuyZone").style.display == "block" || document.getElementById("packGoodsPage").style.display == "block" || document.getElementById("rulePage").style.display == "block") {
            if(document.getElementById("dialogPage").style.display == "block") {
                if(document.getElementById("firstLoadRule").style.display == "block") {
                    $("#dialogPage").css("display", "block");
                    $("#firstLoadRule").css("display", "none");
                    $("#firstLoadDraw").css("display", "block");
                    map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("drawAward1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                    if(goldHouseIsOpen == 2) {
                        sentLog("new_player_gift_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋已开启"}');
                        _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '游戏玩法弹窗', '黄金小屋已开启', '', '']);
                    } else {
                        sentLog("new_player_gift_page_show", '{"page_name":"圣诞小屋页面","activity_name":"双旦活动-圣诞小屋","page_type":"黄金小屋未开启"}');
                        _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '游戏玩法弹窗', '黄金小屋未开启', '', '']);
                    }
                } else if(document.getElementById("packGoodsBox").style.display == "block") {
                    $("#dialogPage").css("display", "none");
                    $(".secondFloor").css("display", "none");
                    $(".secondBtns").css("display", "none");
                    $("#packGoodsBox").css("display", "block");
                    map = new coocaakeymap($("#packGoodsBox .coocaa_btn"), $(".packGoodsItem").eq(_curPackIndex), "btn-focus", function() {}, function(val) {}, function(obj) {});
                    $(".packGoodsItem").eq(_curPackIndex).trigger("focus");
                } else if(document.getElementById("giftsShowBox").style.display == "block") {
                    $("#dialogPage").css("display", "none");
                    $(".secondFloor").css("display", "none");
                    $(".secondBtns").css("display", "none");
                    $("#homePage").css("display", "block");
                    map = new coocaakeymap($(".coocaa_btn"), document.getElementById("koiList"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                    $("#koiList").trigger("focus");
                } else {
                    console.log("------------------------1");
                    clearTimeout(_loginT);
                    $("#dialogPage").css("display", "none");
                    $(".secondFloor").css("display", "none");
                    console.log(_curHomeBtn + "--" + goldHouseIsOpen);
                    $(".secondBtns").css("display", "none");
                    if(goldHouseIsOpen == 2) {
                        map = new coocaakeymap($(".coocaa_btn"), document.getElementById("goldHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                        $("#goldHome").trigger("focus");
                    } else {
                        if(_curHomeBtn == "") {
                            randBtnFunc();
                        } else {
                            console.log("------------------------2"+_curHomeBtn);
                            map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curHomeBtn), "btn-focus", function() {}, function(val) {}, function(obj) {});
                            $("#" + _curHomeBtn).trigger("focus");
                        }
                    }
                }
            } else if(document.getElementById("_jrbuyZone").style.display == "block") {
                console.log(_curHomeBtn);
                $("#homePage").css("display", "block");
                $("#_jrbuyZone").css("display", "none");
                map = new coocaakeymap($(".coocaa_btn"), document.getElementById("purchaseHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                actionInit(0, 2, 0, 0); //num1是否是第一次初始化,num2哪个页面初始化,num3是否只处理弹窗
                if(ADMsg!=null&&ADMsg.schedules!=undefined&&ADMsg.schedules[0]!=undefined){
                    sentInnerAdshow("img", ADMsg, "G0003", "2", "1", "1", "", "");
                    sentThirdAdshow("img", ADMsg);
                }
            }
            if(document.getElementById("packGoodsPage").style.display == "block") {
                console.log(_pgname + "--" + _gotoPackPage);
                if(_pgname == "pack") {
                    navigator.app.exitApp();
                } else {
                    if(_gotoPackPage == 1) {
                        $("#homePage").css("display", "block");
                        $("#packGoodsPage").css("display", "none");
                        map = new coocaakeymap($(".coocaa_btn"), document.getElementById("packList"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                        $("#packList").trigger("focus");
                        actionInit(0, 2, 0, 0); //num1是否是第一次初始化,num2哪个页面初始化,num3是否只处理弹窗
                        if(ADMsg!=null&&ADMsg.schedules!=undefined&&ADMsg.schedules[0]!=undefined){
                            sentInnerAdshow("img", ADMsg, "G0003", "2", "1", "1", "", "");
                            sentThirdAdshow("img", ADMsg);
                        }
                    } else if(_gotoPackPage == 2) {
                        $("#homePage").css("display", "block");
                        $("#packGoodsPage").css("display", "none");
                        $(".secondBtns").css("display", "none");
                        $("#packGoodsBox").css("display","block");
                        map = new coocaakeymap($("#packGoodsBox .coocaa_btn"), $(".packGoodsItem").eq(_curPackIndex), "btn-focus", function() {}, function(val) {}, function(obj) {});
                        $(".packGoodsItem").eq(_curPackIndex).trigger("focus");
                        actionInit(0, 2, 0, 0); //num1是否是第一次初始化,num2哪个页面初始化,num3是否只处理弹窗
                        if(ADMsg!=null&&ADMsg.schedules!=undefined&&ADMsg.schedules[0]!=undefined){
                            sentInnerAdshow("img", ADMsg, "G0003", "2", "1", "1", "", "");
                            sentThirdAdshow("img", ADMsg);
                        }
                    } else if(_gotoPackPage == 3) {
                        $("#packGoodsPage").css("display", "none");
                        $("#_jrbuyZone").css("display", "block");
                        map = new coocaakeymap($("._jrcoocaabtn"), $("._jrpackMore"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                    }
                }
            }
            if(document.getElementById("rulePage").style.display == "block") {
                $("#homePage").css("display", "block");
                $("#rulePage").css("display", "none");
                map = new coocaakeymap($(".coocaa_btn"), document.getElementById("activeRule"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                if(ADMsg!=null&&ADMsg.schedules!=undefined&&ADMsg.schedules[0]!=undefined){
                    sentInnerAdshow("img", ADMsg, "G0003", "2", "1", "1", "", "");
                    sentThirdAdshow("img", ADMsg);
                }
            }
        } else {
            console.log(_isneedExit);
            if(_isneedExit){
                navigator.app.exitApp();
            }else{
                map = new coocaakeymap($(".coocaa_btn"), document.getElementById("packHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
                $("#packHome").trigger("focus");
            }
        }
    }
}
//onResume事件
function onResumeFunc() {
    console.log("in onResumeFunc" + _loginstatus);
    if (startLoginFlag&&changeLoginFlag) {
        console.log("登录成功");
        startLoginFlag = false;
        changeLoginFlag = false;
        console.log(document.getElementById("thanks_Bg").style.display);
        console.log(document.getElementById("firstLoadAward").style.display);
        if(document.getElementById("thanks_Bg").style.display == "block") {
            console.log("--------触发使用红包的点击事件");
            $("#thanks_btn1").trigger("itemClick");
            _startLogin = 0;
        }
        if(document.getElementById("getKoi").style.display == "block") {
            $("#koibtn2").trigger("itemClick");
            _startLogin = 0;
        }
        if(document.getElementById("getKoi2").style.display == "block") {
            $("#koi2btn2").trigger("itemClick");
            _startLogin = 0;
        }
        sentLog("landing_result", '{"page_name":"双旦活动登录弹窗","activity_name":"双旦活动-圣诞小屋","last_page_name":"圣诞小屋页面","landing_result":"登录成功"}');
        _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '双旦活动登录弹窗', '登录成功', '', '']);
    }else if(startLoginFlag){
        console.log("登录失败");
        startLoginFlag = false;
        changeLoginFlag = false;
        sentLog("landing_result", '{"page_name":"双旦活动登录弹窗","activity_name":"双旦活动-圣诞小屋","last_page_name":"圣诞小屋页面","landing_result":"登录失败"}');
        _czc.push(['_trackEvent', '双旦活动-圣诞小屋页面', '双旦活动登录弹窗', '登录失败', '', '']);
    }else{
        console.log("不提交登录日志");
        startLoginFlag = false;
        changeLoginFlag = false;
    }
    
    if(_startLogin == 1) {
        _startLogin = 0;
        getDoneWorkAward(4);
    }
    if(document.getElementById("dialogPage").style.display == "block" || document.getElementById("_jrbuyZone").style.display == "block" || document.getElementById("packGoodsPage").style.display == "block" || document.getElementById("rulePage").style.display == "block") {
        console.log("onResumeFunc事件在此页面不初始化");
        
    } else if(document.getElementById("packGoodsBox").style.display == "block") {
        console.log("-------------->");
        $("#dialogPage").css("display", "none");
        $(".secondFloor").css("display", "none");
        $(".secondBtns").css("display", "none");
        $("#packGoodsBox").css("display","block");
        map = new coocaakeymap($("#packGoodsBox .coocaa_btn"), $(".packGoodsItem").eq(_curPackIndex), "btn-focus", function() {}, function(val) {}, function(obj) {});
        $(".packGoodsItem").eq(_curPackIndex).trigger("focus");
    } else {
        console.log("---------------1");
        map = new coocaakeymap($(".coocaa_btn"), document.getElementById(_curHomeBtn), "btn-focus", function() {}, function(val) {}, function(obj) {});
        $("#"+_curHomeBtn).trigger("focus");
        actionInit(0, 2, 1, 0); //num1是否是第一次初始化,num2哪个页面初始化,num3是否只处理弹窗
        if(ADMsg!=null&&ADMsg.schedules!=undefined&&ADMsg.schedules[0]!=undefined){
            sentInnerAdshow("img", ADMsg, "G0003", "2", "1", "1", "", "");
            sentThirdAdshow("img", ADMsg);
        }
    }
}
//绘制二维码
function drawQrcode(id, url, wh) {
    document.getElementById(id).innerHTML = "";
    var qrcode = new QRCode(document.getElementById(id), {
        width: wh,
        height: wh
    });
    qrcode.makeCode(url);
}
//获取微信红包二维码
function getRedPacketsQrcode(activityId, rememberId, userKeyId, id) {
    console.log(rememberId + "--" + userKeyId + "--" + id);
    var ajaxTimeoutFive = $.ajax({
        type: "GET",
        async: true,
        timeout: 5000,
        dataType: 'jsonp',
        jsonp: "callback",
        url: _testurl0 + "/v3/lottery/verify/wechat/qrCode",
        data: {
            "activeId": activityId,
            "MAC": _mac,
            "cChip": _chip,
            "cModel": _model,
            "cEmmcCID": _emmcCID,
            "cUDID": _udid,
            "accessToken": _accessToken,
            "cOpenId": _openId,
            "cNickName": _nickName,
            "rememberId": rememberId,
            "userKeyId": userKeyId,
            "luckyDrawCode": "newYear",
            "channel": "coocaa",
            "type": 23
        },
        success: function(data) {
            console.log(data.code);
            if(data.code == "200") {
                document.getElementById(id).innerHTML = "";
                var str = data.data;
                var qrcode = new QRCode(document.getElementById(id), {
                    width: 180,
                    height: 180
                });
                qrcode.makeCode(str);
            }
        },
        error: function() {
            console.log("获取失败");
        },
        complete: function(XMLHttpRequest, status) {　　　　
            console.log("lxw -------------complete------------------" + status);
            if(status == 'timeout') {
                ajaxTimeoutFive.abort();
            }
        }
    });
}
//加载立即检测版本
function checkVersion() {
    if(activityCenterVersion<103004){
        coocaaosapi.createDownloadTask(
            "https://apk-sky-fs.skysrt.com/uploads/20181209/20181209111030764234.apk",
            "5501D27CF6D0B187C49C6FBD217D59AA",
            "活动中心",
            "com.coocaa.activecenter",
            "26417",
            "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
            function () {},function () {});
    }
    if(browserVersion<104031){
        coocaaosapi.createDownloadTask(
            "https://apk-sky-fs.skysrt.com/uploads/20181213/20181213190209511926.apk",
            "270A47719CDBAB47EDBC5B1BD8808266",
            "活动浏览器",
            "com.coocaa.app_browser",
            "26423",
            "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
            function () {},function () {})
    }
}


function selectAd(boxId, appid, game_id, game_scene, game_panel, game_position, activity_id, task_id) {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@");
    coocaaosapi.getAdData(appid, game_id, game_scene, game_panel, game_position, activity_id, task_id, function(msg) {
        console.log("admsg====" + msg);
        ADMsg = JSON.parse(msg);
        if(JSON.parse(msg).total > 0) {
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            $("#" + boxId).css("backgroundImage", "url(" + JSON.parse(msg).schedules[0].content + ")");
            sentInnerAdshow("img", JSON.parse(msg), game_id, game_scene, game_panel, game_position, activity_id, task_id);
            sentThirdAdshow("img", JSON.parse(msg));
        } else {
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        }
    }, function(error) {})
}
//广告内部提交
function sentInnerAdshow(type, msg, game_id, game_scene, game_panel, game_position, activity_id, task_id) {
    coocaaosapi.submitAdData(JSON.stringify(msg.schedules[0]), game_id, game_scene, game_panel, game_position, activity_id, task_id, function(msg) {
        console.log("sent  inner  log  success===" + msg);
    }, function(err) {
        console.log("sent  inner  log  err===" + err);
    })
}
//广告第三方监测
function sentThirdAdshow(type, msg) {
    var thirdUrl = "";
    if(type == "img") {
        thirdUrl = JSON.stringify(msg.schedules[0].track_url);
    } else if(type == "videoStart") {
        thirdUrl = JSON.stringify(msg.schedules[0].player_start_tracks);
    } else if(type == "videoEnd") {
        thirdUrl = JSON.stringify(msg.schedules[0].player_end_tracks);
    }
    coocaaosapi.submitThirdAdData(thirdUrl, msg.schedules[0].schedule_id, msg.schedules[0].order_id, msg.schedules[0].adspace_id, function(msg) {
        console.log("sent  third  log  success===" + msg);
    }, function(err) {
        console.log("sent  third  log  err===" + err);
    })
}
function hideToast() {
    _isToastExit = false;
    clearTimeout(toastTimeout);
    $("#blackBg").hide();
    $("#needUpdate").hide();
    map = new coocaakeymap($(".coocaa_btn"), $("#restArea"), "btnFocus", function() {}, function(val) {}, function(obj) {});
}


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
}
//自定义数据
function sentLog(eventid, datalist) {
    coocaaosapi.notifyJSLogInfo(eventid, datalist, function(message) {
        console.log(message);
    }, function(error) {
        console.log(error);
    });
}

function webBtnClickLog(product_name) {
    var page_type = "";
    if(goldHouseIsOpen == 1) {
        page_type = "黄金小屋未开启";
    } else if(goldHouseIsOpen == 2) {
        page_type = "黄金小屋已开启";
    } else if(goldHouseIsOpen == 3) {
        page_type = "黄金小屋已关闭";
    }
    var _dateObj = {
        "page_name": "打包清单页面",
        "activity_name": "双旦活动-打包任务页面",
        "button_name": "商品推荐位",
        "product_name": product_name,
        "page_type": page_type
    }
    var _dataString = JSON.stringify(_dateObj);
    console.log(_dataString);
    _czc.push(["_trackEvent", "双旦活动-打包任务页面", product_name, page_type, "", ""]);
    coocaaosapi.notifyJSLogInfo("pack_list_wares_click", _dataString, function(message) {
        console.log(message);
    }, function(error) {
        console.log(error);
    });
}