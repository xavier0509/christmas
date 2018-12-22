var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.handleBackButton, false);
        document.addEventListener("backbuttondown", this.handleBackButtonDown, false);
        document.addEventListener("resume", this.handleresume, false);
        document.addEventListener("pause", this.handlepause, false);
    },
    handleresume: function() {
        console.log("************************");
        if(needFresh){
            needFresh = false;
            showPage(false,true)
        }else{
            needSentADLog = false;
            sentLog("shopping_mall_page_show",'{"page_name":"福利街页面","activity_name":"双旦活动-福利街","page_type":"'+page_type+'","topblock_type":"'+topblock_type+'","link_type":"'+link_type+'"}');
            _czc.push(['_trackEvent', '双旦活动-福利街', '福利街页面', '福利街曝光', '', '']);
            if(ADMsg!=null&&ADMsg.schedules!=undefined&&ADMsg.schedules[0]!=undefined){
                sentInnerAdshow("img",ADMsg,"G0003","1","1","1","","");
                sentThirdAdshow("img",ADMsg);
            }
        }
    },
    handlepause: function() {
        console.log("===========================pause==========");
    },
    handleBackButton: function() {

    },
    handleBackButtonDown: function() {
        if($("#rulePage").css("display") == "block"){
            $("#mainbox").show();
            $("#rulePage").hide();
            map = new coocaakeymap($(".coocaabtn"),$("#rule"), "btnFocus", function() {}, function(val) {}, function(obj) {});
            sentLog("shopping_mall_page_show",'{"page_name":"福利街页面","activity_name":"双旦活动-福利街","page_type":"'+page_type+'","topblock_type":"'+topblock_type+'","link_type":"'+link_type+'"}');
            _czc.push(['_trackEvent', '双旦活动-福利街', '福利街页面', '福利街曝光', '', '']);
            if(ADMsg!=null&&ADMsg.schedules!=undefined&&ADMsg.schedules[0]!=undefined){
                sentInnerAdshow("img",ADMsg,"G0003","1","1","1","","");
                sentThirdAdshow("img",ADMsg);
            }
        }else if($("#needUpdate").css("display") == "block"){
            hideToast();
        }else{
            exit();
        }
    },

    onDeviceReady: function() {
        cordova.require("coocaaosapi");
        app.receivedEvent('deviceready');
        app.triggleButton();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelectorAll('.received');
        // listeningElement.setAttribute('style', 'display:none;');
        for (var i = 0, j = receivedElement.length; i < j; i++) {
            // receivedElement[i].setAttribute('style', 'display:block;');
        }
        /*receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
        coocaaosapi.getBaseInfo(function (msg) {
            console.log("-----------baseinfo-------"+JSON.stringify(msg));
            if(msg.totalMem > 1.1*1024*1024*1024){
                showMove = true;
            }
        },function (err) {
            console.log("-----------baseinfo-------"+JSON.stringify(err));
        })
        coocaaosapi.getDeviceInfo(function(message) {
            deviceInfo = message;
            if (deviceInfo.version < '6') {
                android.getPropertiesValue("persist.service.homepage.pkg", function(data) {
                    var val = data.propertiesValue;
                    if ("com.tianci.movieplatform" == val) {
                        startActionReplace = "coocaa.intent.action.HOME.Translucent";
                    } else {
                        startActionReplace = "coocaa.intent.movie.home";
                    }
                });
            }
            coocaaosapi.getIpInfo(function (msg) {
                userIp = msg.ip;
            },function(){})
            console.log("deviceinfo=============="+JSON.stringify(deviceInfo))
            macAddress = message.mac;
            TVmodel = message.model;
            TVchip = message.chip;
            activityId = message.activeid;
            if (message.emmcid ==""||message.emmcid==null) {
                emmcId = "123456";
            } else{
                emmcId = message.emmcid;
            }
            var a ={MAC:macAddress,cChip:TVchip,cModel:TVmodel,cEmmcCID:emmcId,cUDID:activityId,cSize:message.panel,cChannel:"coocaa"};
            console.log("data====="+JSON.stringify(a))
            $.ajax({
                type: "post",
                async: true,
                url: adressIp + "/light/active/tv/source",
                data: {cNickName:nick_name,MAC:macAddress,cChip:TVchip,cModel:TVmodel,cEmmcCID:emmcId,cUDID:activityId,cSize:message.panel,cChannel:"coocaa",aSdk:message.androidsdk,cTcVersion:message.version.replace(/\.*/g,""),cBrand:message.brand},
                dataType: "json",
                // timeout: 20000,
                success: function(data) {
                    console.log("电视源返回状态：" + JSON.stringify(data));
                    if(data.code == 0){
                        movieSource = data.data.source;
                        if(movieSource == "tencent"){
                            needQQ = true;
                        }
                    }
                    hasLogin(needQQ,true,true);

                    // listenCommon();
                },
                error: function(error) {
                    hasLogin(needQQ,true,true);
                    console.log("-----------访问失败---------"+JSON.stringify(error));
                }
            });
        }, function(error) { console.log("get deviceinfo error") })
    },
    triggleButton: function() {
        cordova.require("coocaaosapi");
    }
};


app.initialize();


function exit() {
    navigator.app.exitApp();
}
var appDown = {
    //移除监听
    removeApklisten: function() {
        coocaaosapi.removeAppTaskListener(function(message){});
    },
    //监听下载状态
    listenApp:function(){
        coocaaosapi.addAppTaskListener(function(message) {
            console.log("msg.status ==" + message.status + "======url======" + message.url + "=========num=====" + showprogress);
            if (message.status == "ON_DOWNLOADING") {
                if (showprogress != message.progress) {
                    showprogress = message.progress;
                }
            }
            else if (message.status == "ON_COMPLETE") {
                waitApkInstallFunc =  setTimeout('appDown.downFail()', 120000);
            } else if (message.status == "ON_STOPPED") {
                appDown.downFail()
            } else if (message.status == "ON_REMOVED"&& message.url == "https://apk-sky-fs.skysrt.com/uploads/20181030/20181030114924347482.apk") {
                clearTimeout(waitApkInstallFunc);
                var a = '{ "pkgList": ["com.coocaa.ie"] }'
                coocaaosapi.getAppInfo(a, function(message) {
                    console.log("getAppInfo====" + message);
                    var b = "com.coocaa.ie";
                    gameVersion = JSON.parse(message)[b].versionCode;
                }, function(error) {
                    console.log("getAppInfo----error" + JSON.stringify(error))
                });
                appDown.removeApklisten();
            }
        });
    },

    //下载安装失败
    downFail: function() {
        downToast = "游戏加载失败，正在重试...";
        downGameFalse = true;
        clearTimeout(waitApkInstallFunc);
        appDown.removeApklisten();
    },

    //下载安装apk
    createDownloadTask: function(apkurl, md5, title, pkgname, appid, iconurl) {
        coocaaosapi.createDownloadTask(
            apkurl, md5, title, pkgname, appid, iconurl,
            function(message) {
               downToast = "游戏正在努力加载中~请在加载完毕后再次点击进入";
            },
            function(error) {
                console.log(error);
                console.log("调用失败");
            }
        )
    },
}

function initMap(setFocus) {
    initBtn();
    var setFocus = setFocus;
    if(needRememberFocus){
        needRememberFocus = false;
        setFocus = rememberBtn;
    }
    console.log("--------"+setFocus);
    map = new coocaakeymap($(".coocaabtn"), $(setFocus), "btnFocus", function() {}, function(val) {}, function(obj) {});
    $(setFocus).trigger("itemFocus");
}
function initBtn() {
    $("#rule").unbind("itemClick").bind("itemClick",function () {
        sentLog("shopping_mall_page_button_click",'{"button_name":"活动规则","page_name":"福利街页面","activity_name":"双旦活动-福利街","page_type":"'+page_type+'","topblock_type":"'+topblock_type+'","link_type":"'+link_type+'"}');
        _czc.push(['_trackEvent', '双旦活动-福利街', '福利街页面', '活动规则点击', '', '']);
        $("#mainbox").hide();
        $("#rulePage").show();
        sentLog("main_rule_page_show",'{"page_name":"活动规则","activity_name":"双旦活动-福利街","last_page_name":"福利街"}');
        _czc.push(['_trackEvent', '双旦活动-福利街', '活动规则曝光', '', '', '']);
        map = new coocaakeymap($("#ruleInner"),null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    })

    $("#mygift").unbind("itemClick").bind("itemClick",function () {
        sentLog("shopping_mall_page_button_click",'{"button_name":"我的礼物","page_name":"福利街页面","activity_name":"双旦活动-福利街","page_type":"'+page_type+'","topblock_type":"'+topblock_type+'","link_type":"'+link_type+'"}');
        _czc.push(['_trackEvent', '双旦活动-福利街', '福利街页面', '我的礼物点击', '', '']);
        sentLog("main_reward_page_show",'{"page_name":"我的礼物","activity_name":"双旦活动-我的礼物页面","last_page_name":"福利街"}');
        _czc.push(['_trackEvent', '双旦活动-福利街', '我的礼物曝光', '', '', '']);
        coocaaosapi.startNewBrowser3(awardurl+"&actEnd="+actEnd+"&awardToast="+awardToast,function(){needFresh=true;rememberBtn="#mygift";needRememberFocus=true;},function(){});
    })

    $("#packlist").unbind("itemClick").bind("itemClick",function () {
        sentLog("shopping_mall_page_button_click",'{"button_name":"打包清单","page_name":"福利街页面","activity_name":"双旦活动-福利街","page_type":"'+page_type+'","topblock_type":"'+topblock_type+'","link_type":"'+link_type+'"}');
        _czc.push(['_trackEvent', '双旦活动-福利街', '福利街页面', '打包清单点击', '', '']);
        sentLog("pack_list_page_show",'{"page_name":"打包清单页面","activity_name":"双旦活动-打包任务页面","last_page_name":"福利街","page_type":"'+page_type+'"}');
        _czc.push(['_trackEvent', '双旦活动-福利街', '打包清单页面曝光', '', '', '']);
        coocaaosapi.startNewBrowser4(homeurl+"?pagename=pack",function(){needSentADLog=true;},function(){});

    })

    $("#topBanner").unbind("itemClick").bind("itemClick",function () {
        sentLog("shopping_mall_page_button_click",'{"button_name":"'+bannerBtnName+'","page_name":"福利街页面","activity_name":"双旦活动-福利街","page_type":"'+page_type+'","topblock_type":"'+topblock_type+'","link_type":"'+link_type+'"}');
        _czc.push(['_trackEvent', '双旦活动-福利街', '福利街页面', '打包清单点击', '', '']);
        coocaaosapi.startNewBrowser4(homeurl+"?pagename=gold",function(){needFresh=true;},function(){});

    })
    $("#topBanner").unbind("itemFocus").bind("itemFocus",function () {
        if(bannerBtnName == "马上领取"){
            $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/getNow.png)");
        }else{
            $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/enterNow.png)");
        }
    })
    $("#topBanner").unbind("itemBlur").bind("itemBlur",function () {
        if(bannerBtnName == "马上领取"){
            $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/nofocusgetNow.png)");
        }else{
            $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/nofocusenterNow.png)");
        }
    })
    $(".block").unbind("itemClick").bind("itemClick",function(){
        var block_name = $(this).attr("block_name");
        var block_bussiness_type = $(this).attr("business");
        var blockNum = $(".block").index($(this));
        remembernum = $(".block").index($(this));
        var block_order="入口一";
        if((blockNum+1)%3==0){
            block_order = "入口三";
        }else if((blockNum+1)%3==2){
            block_order = "入口二";
        }
        sentLog("shopping_mall_page_button_click",'{"button_name":"各业务入口","page_name":"福利街页面","activity_name":"双旦活动-福利街","page_type":"'+page_type+'","topblock_type":"'+topblock_type+'","link_type":"'+link_type+'","block_name":"'+block_name+'","block_order":"'+block_order+'","block_bussiness_type":"'+block_bussiness_type+'"}');
        _czc.push(['_trackEvent', '双旦活动-福利街', '福利街页面', '打包清单点击', '', '']);
        var startAction = $(this).attr("action");
        var pkgname = JSON.parse(startAction).packagename;
        var bywhat = JSON.parse(startAction).bywhat;
        var byvalue = JSON.parse(startAction).byvalue;
        var needversioncode = JSON.parse(startAction).versioncode;
        var hasversioncode = "";
        var a = '{ "pkgList": ["'+pkgname+'"] }';
        var param1="",param2="",param3="",param4="",param5="";
        var str = "[]";
        coocaaosapi.getAppInfo(a, function(message) {
            console.log("getAppInfo====" + message);
            if(JSON.parse(message)[pkgname].status == -1){
                coocaaosapi.startAppStoreDetail(pkgname,function(){},function(){});
            }else{
                hasversioncode = JSON.parse(message)[pkgname].versionCode;
                // hasversioncode = "307";
                if(bywhat == "activity"||bywhat == "class"){
                    param1 = pkgname;
                    param2 = byvalue;
                }else if(bywhat == "uri"){
                    param1 = pkgname;
                    param5 = byvalue
                }else if(bywhat == "pkg"){
                    param1 = pkgname;
                }else if(bywhat == "action"){
                    param1 = "action";
                    param2 = byvalue;
                    param3 = pkgname;
                }
                if(JSON.stringify(JSON.parse(startAction).params) != "{}"){
                    str = '['+JSON.stringify(JSON.parse(startAction).params).replace(/,/g,"},{")+']'
                }
                if(hasversioncode < needversioncode){
                    var appName = "";
                    if(block_bussiness_type == "教育" || block_bussiness_type == "影视"){
                        appName = "影视-教育（YSJY）";
                        $("#needUpdate").show();
                        $("#blackBg").show();
                        $("#needUpdate").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/movieupdate.png)");
                        map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                        toastTimeout = setTimeout(hideToast,5000);
                    }else if(block_bussiness_type == "购物"){
                        appName = "优选购物（YXGW）";
                        $("#needUpdate").show();
                        $("#blackBg").show();
                        $("#needUpdate").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/mallupdate.png)");
                        map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                        toastTimeout = setTimeout(hideToast,5000);
                    }
                    console.log("当前版本过低，请前往应用圈搜索进行"+appName+"升级");
                }else{
                    coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){needSentADLog=true;},function(){});
                }
            }
        }, function(error) {
            console.log("getAppInfo----error" + JSON.stringify(error));
            coocaaosapi.startAppStoreDetail(pageid,function(){},function(){});
        });
    })
    $(".block").unbind("itemFocus").bind("itemFocus",function () {
        var num = $(".block").index($(this));
        var x = 0;
        switch (num)
        {
            case 0:case 1:case 2:
            x="0";
            break;
            case 3:case 4:case 5:
            x="540";
            break;
            case 6:case 7:case 8:
            x="900";
            break;
            case 9:case 10:case 11:
            x="1150";
            break;
        }
        $("#mainbox").css("transform", "translate3D(0, -" + x + "px, 0)");
    })
    $(".block").unbind("itemBlur").bind("itemBlur",function () {
        $("#mainbox").css("transform", "translate3D(0, -" + 0 + "px, 0)");
    })
}

function showAwardlist(box,inner,name) {
    if(name == "1"){
        clearInterval(marqueeInterval1);
    }else{
        clearInterval(marqueeInterval2);
    }
    var boxHeight = $(box).height();
    var listHeight = $(inner).height();
    var screenNum = Math.ceil(listHeight/boxHeight);
    console.log("---"+boxHeight+"---"+listHeight+"----"+screenNum+"---")
    var a=1;
    if(screenNum>1){
        if(name == "1"){
            marqueeInterval1 = setInterval(marquee,3000);
        }else{
            marqueeInterval2 = setInterval(marquee,3000);
        }
    }
    function marquee() {
        $(inner).css("transform", "translate3D(0, -" + a * boxHeight + "px, 0)");
        a++;
        if(a==screenNum){a=0}
    }
}

function hideToast() {
    clearTimeout(toastTimeout);
    $("#blackBg").hide();
    $("#needUpdate").hide();
    map = new coocaakeymap($(".coocaabtn"), $(".block:eq("+remembernum+")"), "btnFocus", function() {}, function(val) {}, function(obj) {});
}

//页面初始化或刷新
function showPage(first,resume) {
    console.log("$$$$$$$$$$$$$$$$$$===="+first+"==========="+resume);
    console.log("---"+macAddress+"------"+TVchip+"-----"+TVmodel+"------"+emmcId+"--------"+activityId + "---------"+access_token+"-------"+cOpenId);
    $.ajax({
        type: "post",
        async: true,
        url: adressIp + "/light/xmas/init",
        data: {buyActiveId:buyActiveId,id:actionId,cChip:TVchip,cModel:TVmodel,cUDID:activityId,MAC:macAddress,cEmmcCID:emmcId,cOpenId:cOpenId,goldActiveId:goldActionId,initSource:1,accessToken:access_token,cNickName:nick_name},
        dataType: "json",
        // timeout: 20000,
        success: function(data) {
            console.log("初始化返回状态：" + JSON.stringify(data));
            showOperation();
            showAwardInfo();
            selectAd("adStation","CCADTV10017","G0003","1","1","1","","");
            var remainNum = 0;
            if(data.data.chanceResult != undefined){
                var remainNum = data.data.chanceResult.remainingNumber||"0";
            }
            $("#hasRingNum span").html(remainNum);
            if(data.code == "50100"){
                var firstIn = data.data.chanceResult.firstIn;
                if(firstIn == "0" || firstIn == "2"){
                    // $("#differentWord").html("您有一个圣诞见面礼待领取");
                    $("#innerBanner").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/firstin.png)");
                    $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/nofocusgetNow.png)");
                    awardToast = true;
                    topblock_type = "活动期间第一次进入";
                    bannerBtnName = "马上领取";
                }else{
                    var  chanceSource = data.data.chanceResult.chanceSource;
                    if(chanceSource.length>1){
                        // $("#differentWord").html("您有奖励待领取");
                        $("#innerBanner").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/someawards.png)");
                        $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/nofocusgetNow.png)");
                        awardToast = true;
                        topblock_type = "完成多个任务进入";
                        bannerBtnName = "马上领取";
                    }else if(chanceSource[0] == "1"){
                        // $("#differentWord").html("您有一个返利红包待领取");
                        $("#innerBanner").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/redpack.png)");
                        $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/nofocusgetNow.png)");
                        awardToast = true;
                        topblock_type = "完成付费任务后首次进入";
                        bannerBtnName = "马上领取";
                    }else if(chanceSource[0] == "2"){
                        // $("#differentWord").html("您有一个奖励待领取");
                        $("#innerBanner").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/award.png)");
                        $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/nofocusgetNow.png)");
                        awardToast = true;
                        topblock_type = "完成麋鹿任务首次进入";
                        bannerBtnName = "马上领取";
                    }else{
                        if(new Date(data.data.sysTime) > new Date(data.data.goldActiveBeginTime)){
                            // $("#differentWord").html("进入召唤超级锦鲤");
                            $("#innerBanner").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/open.png)");
                            $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/nofocusenterNow.png)");
                            topblock_type = "黄金屋开启后";
                            bannerBtnName = "马上进入";
                        }else{
                            // $("#differentWord").html("集铃铛成为超级锦鲤");
                            $("#innerBanner").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/close.png)");
                            $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/nofocusenterNow.png)");
                            topblock_type = "黄金小屋未开启的普通状态（无待领取奖励）";
                            bannerBtnName = "马上进入";
                        }
                    }
                }
                if(new Date(data.data.sysTime) > new Date(data.data.goldActiveBeginTime)){
                   if(new Date(data.data.sysTime) > new Date(data.data.goldActiveEndTime)){
                       page_type = "黄金小屋已关闭";
                   }else{
                       page_type = "黄金小屋已开启";
                   }
                }else{
                    page_type = "黄金小屋未开启";
                }
            }else{
                // $("#differentWord").html("快来领走您的双旦礼物吧");
                console.log("*********end---------------");
                actEnd = true;
                $("#innerBanner").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/finish.png)");
                $("#bannerBtn").css("background","url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/index/nofocusenterNow.png)");
                topblock_type = "活动已结束";
                page_type = "黄金小屋已关闭";
                bannerBtnName = "马上进入";
            }

        },
        error: function(error) {
            console.log("-----------访问失败---------"+JSON.stringify(error));
        }
    });
}

function showOperation() {
    var couponStation = {};
    var businessOrder = ["影视","购物","教育","应用"];
    var tag_id="";
    // if(needQQ){tag_id = 103188}else {tag_id = 103187}
    if(needQQ){tag_id = 103228}else {tag_id = 103229}
    $("#street").html("");
    $.ajax({
        type: "get",
        async: true,
        url: operationurl,
        data: {page:1,page_size:6,tag_id:tag_id},
        dataType: "json",
        timeout: 3000,
        success: function(data) {
            homepage = data;
            var operationArr = [];
            var movieOperation = homepage.data.content.contents[0];
            var mallOperation = homepage.data.content.contents[1];
            var eduOperation = homepage.data.content.contents[2];
            var apkOperation = homepage.data.content.contents[3];
            var pagefrom = getUrlParam("from");
            if(pagefrom == "edu"){
                link_type = "首行教育链接";
            }else if(pagefrom=="mall"){
                link_type = "首行购物链接";
            }else if(pagefrom == "apk"){
                link_type = "首行应用链接";
            }else{
                link_type = "首行影视链接";
            }
            switch (pagefrom){
                case "edu":
                    operationArr.push(eduOperation);
                    operationArr.push(movieOperation);
                    operationArr.push(mallOperation);
                    operationArr.push(apkOperation);
                    couponStation = {eduCoupon:1,movieCoupon:2,tvmallCoupon:3};
                    businessOrder = ["教育","影视","购物","应用"];
                    break;
                case "mall":
                    operationArr.push(mallOperation);
                    operationArr.push(movieOperation);
                    operationArr.push(eduOperation);
                    operationArr.push(apkOperation);
                    couponStation = {eduCoupon:3,movieCoupon:2,tvmallCoupon:1};
                    businessOrder = ["购物","教育","影视","应用"];
                    break;
                case "apk":
                    operationArr.push(apkOperation);
                    operationArr.push(movieOperation);
                    operationArr.push(mallOperation);
                    operationArr.push(eduOperation);
                    couponStation = {eduCoupon:4,movieCoupon:2,tvmallCoupon:3};
                    businessOrder = ["应用","教育","影视","购物"];
                    break;
                default :
                    operationArr.push(movieOperation);
                    operationArr.push(mallOperation);
                    operationArr.push(eduOperation);
                    operationArr.push(apkOperation);
                    couponStation = {eduCoupon:3,movieCoupon:1,tvmallCoupon:2};
                    break;
            }
            console.log("----"+operationArr)
            var street = document.getElementById("street");
            for(var i=0;i<operationArr.length;i++){
                var pannelDiv = document.createElement("div");
                pannelDiv.setAttribute('class', 'panel');
                pannelDiv.setAttribute('id', 'panel'+(i+1));
                for(var j=0;j<3;j++){
                    var blockDiv = document.createElement("div");
                    var blockDivImg = document.createElement("div");
                    blockDiv.setAttribute('class', 'block coocaabtn');
                    blockDivImg.setAttribute('class', 'blockimg');
                    // console.log(i+"====="+operationArr[i]);
                    blockDiv.setAttribute('action', operationArr[i].contents[j].extra.block_content_info.action);
                    blockDiv.setAttribute('business', businessOrder[i]);
                    blockDiv.setAttribute('block_name', operationArr[i].contents[j].extra.block_content_info.title);
                    // blockDiv.style.backgroundImage = "url("+operationArr[i].contents[j].extra.block_content_info.imgs.poster.images[0]+")";
                    blockDivImg.style.backgroundImage = "url("+operationArr[i].contents[j].extra.block_content_info.imgs.poster.images[0]+")";
                    var couponDiv = document.createElement("div");
                    couponDiv.setAttribute('class', 'couponDiv');
                    couponDiv.innerHTML="&nbsp";
                    blockDivImg.appendChild(couponDiv);
                    blockDiv.appendChild(blockDivImg);
                    pannelDiv.appendChild(blockDiv);
                }
                street.appendChild(pannelDiv);
            }
            if(pagefrom!=null&&pagefrom!=undefined){
                initMap("#panel1 .block:eq(0)");
            }else{
                initMap("#topBanner")
            }
            // banner位置优惠券
            $.ajax({
                type: "get",
                async: true,
                url: adressIp+"/light/xmas/u-coupon",
                data: {id:actionId,goldActiveId:goldActionId,cUDID:activityId,MAC:macAddress,cEmmcCID:emmcId},
                dataType: "json",
                success: function(data) {
                    console.log("-----------优惠券返回状态-u-coupon----result-------------"+JSON.stringify(data));
                    // var data = {"code":"50100","msg":"成功","data":{"tvmallCoupon":["购物"],"eduCoupon":["教育"],"movieCoupon":["影视"]}}
                    var showEdu = data.data.eduCoupon[0];
                    // var showMall = data.data.tvmallCoupon[0];
                    var showMovie = data.data.movieCoupon[0];
                    showcoupon(showEdu,couponStation["eduCoupon"]);
                    // showcoupon(showMall,couponStation["tvmallCoupon"]);
                    showcoupon(showMovie,couponStation["movieCoupon"]);
                    function showcoupon(name,stationID) {
                        if(name!=""&&name!=null){
                            $("#panel"+stationID+" .block:eq(0) .couponDiv").show();
                            $("#panel"+stationID+" .block:eq(0) .couponDiv").html("<div class='konw'>现在购买有机会再减<span class='couponname'>"+name+"</span>元</div>").addClass('zy_coupon');
                        }
                    }

                },
                error: function(error) {
                    console.log("--------访问失败" + JSON.stringify(error));
                }
            });
            sentLog("shopping_mall_page_show",'{"page_name":"福利街页面","activity_name":"双旦活动-福利街","page_type":"'+page_type+'","topblock_type":"'+topblock_type+'","link_type":"'+link_type+'"}');
            _czc.push(['_trackEvent', '双旦活动-福利街', '福利街页面', '福利街曝光', '', '']);
        },
        error: function(error) {
            initMap("#topBanner")
            console.log("-----------访问失败---------"+JSON.stringify(error));
        }
    });
}

function showAwardInfo() {
    $("#koiNewsul").html("");
    $("#fakeNewsul").html("");
    $.ajax({
        type: "get",
        async: true,
        url: adressIp + "/light/xmas/news",
        data: {id:actionId,goldActiveId:goldActionId},
        dataType: "json",
        // timeout: 20000,
        success: function(data) {
            console.log("中奖喜讯返回状态：" + JSON.stringify(data));

            if(data.data.koiNews.code == "50100")
            {
                if(data.data.koiNews.result.length > 0){
                    var box = document.getElementById("koiNewsul");
                    for(var i=0;i<data.data.koiNews.result.length;i++){
                        var list = document.createElement("li");
                        if(data.data.koiNews.result[i].nickName == ""){
                            userIp = userIp.substr(0,7)+"...";
                            list.innerHTML="恭喜"+data.data.koiNews.result[i].province+" ip地址："+userIp+" 成为"+data.data.koiNews.result[i].queue+"号锦鲤";
                        }else{
                            var province = (data.data.koiNews.result[i].province==null)?"":data.data.koiNews.result[i].province;
                            province = province.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g,"");
                            var username = data.data.koiNews.result[i].nickName.length>7?data.data.koiNews.result[i].nickName.substr(0,7)+"...":data.data.koiNews.result[i].nickName;
                            list.innerHTML="恭喜"+province+"用户"+username+"成为"+data.data.koiNews.result[i].queue+"号锦鲤";
                        }
                        box.appendChild(list);
                    }
                    showAwardlist("#koiNews","#koiNewsul","1");
                }else{
                    $("#koiNewsul").html("超级锦鲤仍未出现，就等你来了！");
                }
            }else
                {
                    var nowTime = new Date(data.data.koiNews.sysTime).getTime();
                    var beginTime =new Date(data.data.koiNews.beginTime).getTime();
                    clearInterval(intervalForCutdown);
                    intervalForCutdown = setInterval(showTime, 1000);
                    function showTime() {
                        nowTime = nowTime + 1000;
                        var cutdown =beginTime - nowTime;
                        var transTime = Math.ceil(cutdown / 1000 / 60 / 60 / 24);
                        if (transTime > 1) {
                            $("#koiNewsul").html("距离黄金小屋开启还剩"+transTime+"天");
                        } else if (transTime == 1) {
                            var transTime = Math.ceil(cutdown / 1000 / 60 / 60);
                            if (transTime > 1) {
                                $("#koiNewsul").html("距离黄金小屋开启还剩"+transTime+"小时");
                            } else if (transTime == 1) {
                                var transTime = Math.ceil(cutdown / 1000 / 60);
                                if (transTime > 1) {
                                    $("#koiNewsul").html("距离黄金小屋开启还剩"+transTime+"分钟");
                                } else if (transTime == 1) {
                                    var transTime = Math.ceil(cutdown / 1000 );
                                    if (transTime >= 0) {
                                        $("#koiNewsul").html("距离黄金小屋开启还剩"+transTime+"秒");
                                    }else{
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
            for(var i=0;i<data.data.fakeNews.length;i++){
                var list = document.createElement("li");
                list.innerHTML=data.data.fakeNews[i].nickName+data.data.fakeNews[i].awardName;
                box.appendChild(list);
            }
            showAwardlist("#fakeNews","#fakeNewsul","2");
        },
        error: function(error) {
            console.log("-----------访问失败---------"+JSON.stringify(error));
        }
    });
}

//获取广告信息
function selectAd(boxId,appid,game_id,game_scene,game_panel,game_position,activity_id,task_id){
    console.log("@@@@@@@@@@@@@@@@@@@@@@@");
    coocaaosapi.getAdData(appid,game_id,game_scene,game_panel,game_position,activity_id,task_id,function (msg) {
        console.log("admsg===="+msg);
        ADMsg = JSON.parse(msg);
        if(JSON.parse(msg).total > 0){
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            $("#"+boxId).css("backgroundImage","url("+JSON.parse(msg).schedules[0].content+")");
            sentInnerAdshow("img",JSON.parse(msg),game_id,game_scene,game_panel,game_position,activity_id,task_id);
            sentThirdAdshow("img",JSON.parse(msg));
        }else{
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        }
    },function (error) {})
}
//广告内部提交
function sentInnerAdshow(type,msg,game_id,game_scene,game_panel,game_position,activity_id,task_id) {
    coocaaosapi.submitAdData(JSON.stringify(msg.schedules[0]),game_id,game_scene,game_panel,game_position,activity_id,task_id,function (msg) {
        console.log("sent  inner  log  success==="+msg);
    },function (err) {
        console.log("sent  inner  log  err==="+err);
    })
}
//广告第三方监测
function sentThirdAdshow(type,msg) {
    var thirdUrl = "";
    if(type == "img"){
        thirdUrl = JSON.stringify(msg.schedules[0].track_url);
    }
    else if(type == "videoStart"){
        thirdUrl = JSON.stringify(msg.schedules[0].player_start_tracks);
    }
    else if(type == "videoEnd"){
        thirdUrl = JSON.stringify(msg.schedules[0].player_end_tracks);
    }
    coocaaosapi.submitThirdAdData(thirdUrl,msg.schedules[0].schedule_id,msg.schedules[0].order_id,msg.schedules[0].adspace_id,function (msg) {
        console.log("sent  third  log  success==="+msg);
    },function (err) {
        console.log("sent  third  log  err==="+err);
    })
}




