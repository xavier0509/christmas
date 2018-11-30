var browserVersion = 0;
var cAppVersion = 0;
var activityCenterVersion = 0;
var mallVersion = 0;

var missionlistTencent = [
    {business:"movie",type:"vip",param:{"source_id":"5"},action:"coocaa.intent.vip.center",countDownTime:30,"subTask":1},
    {business:"movie",type:"detail",param:{"id":"_otx_of1afaffrf5p4s7"},action:"coocaa.intent.movie.detailinfo",countDownTime:30,"subTask":1},
    {business:"movie",type:"specialtopic",param:{"id":"10209"},action:"coocaa.intent.action.HOME_SPECIAL_TOPIC",countDownTime:30,"subTask":1},
    {business:"ad",type:"video",url:"http://v-play.coocaatv.com/0915/dongwushijie.mp4",countDownTime:30,"subTask":1},
    {business:"movie",type:"videospecial",param:{"topicCode":"1541"},action:"coocaa.intent.movie.videospecial",countDownTime:30,"subTask":1},
    {business:"edu",type:"commonlist",param:{"id":"10711"},action:"coocaa.intent.action.HOME_COMMON_LIST",countDownTime:30,"subTask":1},
    {business:"mall",type:"mallHome",param:{},action:"coocaa.intent.action.MALL_HOME",countDownTime:30,"subTask":1},
    {business:"mall",type:"listzone",param:{"pageId":"177"},action:"coocaa.intent.action.MALL_LIST_ZONE",countDownTime:30,"subTask":1},
    {business:"mall",type:"malldetail",param:{"id":"17768"},action:"coocaa.intent.action.MALL_DETAIL",countDownTime:30,"subTask":1}
]
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

    },
    handlepause: function() {
        console.log("===========================pause==========");
    },
    handleBackButton: function() {

    },
    handleBackButtonDown: function() {
        exit();
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
                    console.log("返回状态：" + JSON.stringify(data));
                    if(data.code == 0){
                        movieSource = data.data.source;
                        if(movieSource == "tencent"){
                            needQQ = true;
                        }
                    }
                    hasLogin(needQQ,true,true);

                    listenUser();
                    listenPay();
                    // listenCommon();
                },
                error: function(error) {
                    console.log("-----------访问失败---------"+JSON.stringify(error));
                    showPage();
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

//监听账户状态变化
function listenUser() {
    coocaaosapi.addUserChanggedListener(function(message) {
        console.log("账户状态变化")
        //刷新前的逻辑判断
        needSentUserLog = true;
        jr_loginChange = true;
    });
}

//监听支付状态
function listenPay() {
    coocaaosapi.addPurchaseOrderListener(function(message) {
        console.log("xjr----------->startpurcharse message  支付结果 " + JSON.stringify(message));
        if (message.presultstatus == 0) {//支付完成~~~~~~
            sentLog("free_wares_pay_succsse",'{"page_name":"免单专区页面","activity_name":"双十一活动--购物街","product_name":"'+rememberGood+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '支付成功'+rememberGood, '', '', '']);
        }else{
            sentLog("nalm_buy_for_view_card_pay_result",'{"pay_result":"0"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '支付失败', '', '', '']);
        }
    });
}

//通用播放器监听
function listenCommon() {
    coocaaosapi.addCommonListener(function(message) {
        console.log("addCommonListener==" + JSON.stringify(message));
        if(message.web_player_event == "on_complete") {

        }
    })
}

function initMap(setFocus) {
    initBtn();

    map = new coocaakeymap($(".coocaabtn"), $(setFocus), "btnFocus", function() {}, function(val) {}, function(obj) {});
    // $(setFocus).trigger("itemFocus");
    if(needgotoshop){
        needgotoshop = false;
        $("#freeList").trigger("itemClick");
    }else if(needgotogame){
        needgotogame = false;
        if(gameStatus == "start"){
            $("#gameing").trigger("itemClick");
        }else{
            console.log("----------------从弹窗进入，但不在游戏期内，不触发点击----------------");
        }
    }
}




function showAwardlist(box,inner,name) {
    var boxHeight = $(box).height();
    var listHeight = $(inner).height();
    var screenNum = Math.ceil(listHeight/boxHeight);
    var a=1;
    if(screenNum>1){
       name =  setInterval(marquee,3000);
    }
    function marquee() {
        $(inner).css("transform", "translate3D(0, -" + a * boxHeight + "px, 0)");
        a++;
        if(a==screenNum){a=0}
    }
}

//页面初始化或刷新
function showPage(first,resume) {
    console.log("$$$$$$$$$$$$$$$$$$===="+first+"==========="+resume);
    console.log("---"+macAddress+"------"+TVchip+"-----"+TVmodel+"------"+emmcId+"--------"+activityId + "---------"+access_token+"-------"+cOpenId);
    // 打包接口
    //     var data = JSON.stringify({"goodsId":"14769","token":access_token,"cudid":activityId+"_"+macAddress});
    //     console.log("============="+data);
    //     $.ajax({
    //         type: "get",
    //         async: true,
    //         url: "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/addCartFromAct",
    //         data: {param:data},
    //         dataType: "json",
    //         success: function(data) {
    //             console.log("------------addPack----result-------------"+JSON.stringify(data));
    //
    //         },
    //         error: function(error) {
    //             console.log("--------访问失败" + JSON.stringify(error));
    //         }
    //     });
    selectAd("adStation","CCADTV10017","G0003","1","1","1","","");
    //获取广告信息
    function selectAd(boxId,appid,game_id,game_scene,game_panel,game_position,activity_id,task_id){
        coocaaosapi.getAdData(appid,game_id,game_scene,game_panel,game_position,activity_id,task_id,function (msg) {
            console.log("admsg===="+msg);
            // msg = {"ad_setting":{"client_req_timeout":"800","min_space":"50","monitor_test":"","monitor_type":"0","power_off_ad":"0","sdk_download_type":"9000001","system_time":"","view_req_timeout":"1500"},"client_ip":"202.105.137.34","data_type":"json","db_path":"","general_track_url":"","interval":19395,"next_time":1543501683,"package_md5":"","schedules":[{"adspace_id":"CCADTV10007","app_type_id":-1,"begin_time":1542902400,"bootAd":false,"bootImage":false,"bootVideo":false,"caption":"","click_event":"","click_tracks":[],"content":"http://beta.v2.res.hoisin.coocaatv.com/img/20170711/20170711100935158687.jpg","currHourRes":true,"effect":"","end_time":1574524799,"extend_param":{},"height":1080,"isAssertFile":false,"isLocalScreensaver":false,"media_md5":"2802e2e9649fef32283752fe92425d13","media_size":482603,"media_type":"image","needSyncRes":false,"nextHourRes":true,"onlineAd":true,"order_id":"M20181116002150","player_end_tracks":[],"player_start_tracks":[],"position_x":0,"position_y":0,"relationInfo":{"content":[],"relationInfoContent":[],"type":""},"relation_info":"{\"content\":[],\"type\":\"\"}","resSavePath":"/data/user/0/com.coocaa.app_browser/files/cc_ad_sdk/20170711100935158687.jpg","resTempSavePath":"/data/user/0/com.coocaa.app_browser/files/cc_ad_sdk/temp/20170711100935158687.jpg","scheduleStatus":"UNKNOWN","schedule_id":"Y20181123013254","schedule_md5":"15f461495a9fc727b7c114c1f51869fe","sdk_track":[],"show_time":4,"subscript":{"show_time":0,"text":"","type":"","vice_text":""},"time_offset":0,"track_url":["https://data-hoisin.coocaa.com/track?mac=e2f62df9351f2df2488efe573547bdb5&model=Q4A&sid=201811231&adspace_id=CCADTV10007","https://data-hoisin.coocaa.com/track?mac=e2f62df9351f2df2488efe573547bdb5&model=Q4A&sid=201811241&adspace_id=CCADTV10007"],"videoPausedAd":false,"videoTimelineAd":false,"webpAnimate":false,"width":1920}],"sys_tracker":"http://tv.cctracker.com/hoisin/","total":1}
            if(JSON.parse(msg).total > 0){
                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
                $("#"+boxId).css("background","url("+JSON.parse(msg).schedules[0].content+")");
                sentInnerAdshow("img",JSON.parse(msg),appid,game_id,game_scene,game_panel,game_position,activity_id,task_id);
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

    checkVersion();


    map = new coocaakeymap($(".gotobtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});

    $("#gotoBuyHome").bind("itemClick",function () {
        $("#_jrbuyZone").show();
        getAddPack();
    })
    $("#gotoMissionHome").bind("itemClick",function () {
        var apkVersion = [];
        var apkArry = ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"];
        var a = '{ "pkgList": ["com.coocaa.activecenter","com.coocaa.app_browser","com.coocaa.mall","com.tianci.movieplatform"] }';
        var randomMax = 9;//任务数
        var randomNum = Math.floor(Math.random()*(randomMax));
        console.log("做任务：======="+randomNum);
        // return;
        coocaaosapi.getAppInfo(a, function(message) {
            console.log("getAppInfo====" + message);
            for(var i=0;i<4;i++){
                apkVersion.push(JSON.parse(message)[apkArry[i]].versionCode);
            }
            activityCenterVersion = apkVersion[0];
            browserVersion = apkVersion[1];
            mallVersion = apkVersion[2];
            cAppVersion = apkVersion[3];
            console.log("===activityCenterVersion=="+activityCenterVersion+"===browserVersion=="+browserVersion+"==mallVersion=="+mallVersion+"==cAppVersion=="+cAppVersion);
            if(needQQ){
                missionlist = missionlistTencent;
            }else{
                missionlist = missionlistTencent;
            }
            if(activityCenterVersion<102026){
                console.log("活动中心版本过低！！！！");
                return;
            }else if(missionlist[randomNum].business == "ad"){
                if(browserVersion < 104021){
                    console.log("浏览器版本过低！！！！");
                    return;
                }else {
                    coocaaosapi.startCommonWebview("test_123", missionlist[randomNum].url, "这是一个测试播放地址", "596", "967", "", "视频广告", "赢机会任务弹窗", function(message) {
                        console.log(message);
                    }, function(error) {
                        console.log("commonTask----error")
                    });
                }
            }else if(missionlist[randomNum].business == "movie" || missionlist[randomNum].business == "edu"){
                var pageid =missionlist[randomNum].id;
                if(cAppVersion < 99999999){
                    if(missionlist[randomNum].type == "videospecial"){
                        if(cAppVersion<3300000){
                            $("#needUpdate").show();
                            map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            setTimeout(hideToast,3000);
                        }else{
                            startLowVersionAction();
                        }
                    }else if(missionlist[randomNum].type == "specialtopic"){
                        if(cAppVersion<3170001){
                            $("#needUpdate").show();
                            map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                            setTimeout(hideToast,3000);
                        }else{
                            startLowVersionAction();
                        }
                    }else{
                        startLowVersionAction();
                    }
                    function startLowVersionAction(){
                        var param1="action",param2=missionlist[randomNum].action,param3="",param4="",param5="";
                        var str = "[]";
                        if(JSON.stringify(missionlist[randomNum].param) != "{}"){
                            str = '['+JSON.stringify(missionlist[randomNum].param).replace(/,/g,"},{")+']'
                        }
                        coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
                    }
                }else{
                    var param1="action",param2=missionlist[randomNum].action,param3="",param4="",param5="";
                    var str = "[]";
                    if(JSON.stringify(missionlist[randomNum].param) != "{}"){
                        str = '['+JSON.stringify(missionlist[randomNum].param).replace(/,/g,"},{")+']'
                    }
                    str = JSON.parse(str);
                    var actionId = "520";
                    var cOpenId = "123456";
                    var external = {"id":actionId,"userKeyId":cOpenId,"subTask":missionlist[randomNum].subTask,"countDownTime":missionlist[randomNum].countDownTime}
                    var doubleEggs_Active = {"doubleEggs_Active":external};
                    str.push(doubleEggs_Active);
                    str = JSON.stringify(str);
                    coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
                }
            }else if(missionlist[randomNum].business == "mall"){
                if(mallVersion < 99999999){
                    console.log("商城版本不支持apk添加=======调用加机会接口");
                    var param1="action",param2=missionlist[randomNum].action,param3="",param4="",param5="";
                    var str = "[]";
                    if(JSON.stringify(missionlist[randomNum].param) != "{}"){
                        str = '['+JSON.stringify(missionlist[randomNum].param).replace(/,/g,"},{")+']'
                    }
                    coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
                }else{
                    var param1="action",param2=missionlist[randomNum].action,param3="",param4="",param5="";
                    var str = "[]";
                    if(JSON.stringify(missionlist[randomNum].param) != "{}"){
                        str = '['+JSON.stringify(missionlist[randomNum].param).replace(/,/g,"},{")+']'
                    }
                    str = JSON.parse(str);
                    var actionId = "520";
                    var cOpenId = "123456";
                    var external = {"id":actionId,"userKeyId":cOpenId,"subTask":missionlist[randomNum].subTask,"countDownTime":missionlist[randomNum].countDownTime}
                    var doubleEggs_Active = {"doubleEggs_Active":external};
                    str.push(doubleEggs_Active);
                    str = JSON.stringify(str);
                    coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
                }
            }

        }, function(error) {
            console.log("getAppInfo----error" + JSON.stringify(error));
        });
    })


    // getAddPack();
}

//排行榜
function rankingList(){}




//加载立即检测版本
function checkVersion() {
    if(activityCenterVersion<102026){
        coocaaosapi.createDownloadTask(
            "https://apk-sky-fs.skysrt.com/uploads/20181101/20181101194626718711.apk",
            "9BFEA4B327183FE91C93A59323F39BE2",
            "优选购物",
            "com.coocaa.mall",
            "26040",
            "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
            function () {},function () {});
    }
    if(browserVersion<104021){
        coocaaosapi.createDownloadTask(
            "https://apk-sky-fs.skysrt.com/uploads/20181101/20181101194626718711.apk",
            "9BFEA4B327183FE91C93A59323F39BE2",
            "优选购物",
            "com.coocaa.mall",
            "26040",
            "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
            function () {

            },function () {})
    }
    // if(mallVersion<31000005){
    //     coocaaosapi.createDownloadTask(
    //         "https://apk-sky-fs.skysrt.com/uploads/20181101/20181101194626718711.apk",
    //         "9BFEA4B327183FE91C93A59323F39BE2",
    //         "优选购物",
    //         "com.coocaa.mall",
    //         "26040",
    //         "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png",
    //         function () {
    //
    //         },function () {})
    // }
}

//获取打包清单
function getAddPack() {
    var data = JSON.stringify({"token":access_token,"cudid":activityId+"_"+macAddress});
    console.log("============="+data);
    var haspack = false;
    $.ajax({
        type: "get",
        async: true,
        url: "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/packGoodsList",
        data: {param:data},
        dataType: "json",
        success: function(data) {
            console.log("------------packGoodsList----result-------------"+JSON.stringify(data));
            if(data.code==0){
                if(data.data == null){
                    haspack = false;
                }else{
                    haspack = true;
                    $("#_jrpackbox").html("");
                    $("#_jrpackzone").show();
                    var packLength = data.data.length>4?4:data.data.length;
                    console.log("========"+packLength);
                    var arrPack = data.data;
                    var packBox = document.getElementById("_jrpackbox");
                    for(var i=0;i<packLength;i++){
                        var _jrgoodsbox = document.createElement("div");
                        _jrgoodsbox.setAttribute('class', '_jrgoodsbox');
                        var _jrborder = document.createElement("div");
                        _jrborder.setAttribute('class', '_jrborder');
                        var packDiv = document.createElement("div");
                        packDiv.setAttribute('class', '_jrcoocaabtn _jrgoods _jrgoods'+i);
                        packDiv.setAttribute('goodsId', arrPack[i].goodsId);
                        packDiv.setAttribute('goodsName', arrPack[i].goodsInfo.goodsName);
                        packDiv.setAttribute('goodsThumb', arrPack[i].goodsInfo.goodsThumb);
                        packDiv.setAttribute('promotePrice', arrPack[i].goodsInfo.promotePrice);
                        packDiv.setAttribute('shopPrice', arrPack[i].goodsInfo.shopPrice);
                        packDiv.setAttribute('type', "packnormal");
                        packDiv.style.backgroundImage = "url("+arrPack[i].goodsInfo.goodsThumb+")";
                        var goodsName = document.createElement("div");
                        goodsName.setAttribute('class', 'goodsName');
                        goodsName.innerHTML = arrPack[i].goodsInfo.goodsName;
                        var nowPrice = document.createElement("div");
                        nowPrice.setAttribute('class', 'nowPrice');
                        nowPrice.innerHTML = "￥"+arrPack[i].goodsInfo.shopPrice;
                        var oldPrice = document.createElement("div");
                        oldPrice.setAttribute('class', 'oldPrice');
                        oldPrice.innerHTML = "原价："+arrPack[i].goodsInfo.promotePrice;
                        packDiv.appendChild(goodsName);
                        packDiv.appendChild(nowPrice);
                        packDiv.appendChild(oldPrice);
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
                    packDiv.setAttribute('type', "packmore");
                    packDiv.style.backgroundImage = "url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/buyzone/more.png)";
                    _jrgoodsbox.appendChild(_jrborder);
                    _jrgoodsbox.appendChild(packDiv);
                    packBox.appendChild(_jrgoodsbox);
                }
            }else{
                console.log("----------访问失败------");
            }
            if(access_token!=""&&access_token!=null&&access_token!=undefined){
                setFocusInPack(haspack);
                selectGoodsCoupon();
            }else{
                setFocusInPack(haspack);
            }

        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        }
    });
}

var couponGoodsId = "14773,14772,14771,14770,14769";
var couponGoodsIdArr = [14773,14772,14771,14770,14769];

//获取优惠券接口
function selectGoodsCoupon() {
    var data = JSON.stringify({"ids":couponGoodsId,"token":access_token});
    $.ajax({
        type: "get",
        async: true,
        url: "http://beta.api.tvshop.coocaa.com/cors/tvUsersAPI/goodsCoupon",
        data: {param:data},
        dataType: "json",
        success: function(data) {
            console.log("------------selectGoodsCoupon----result-------------"+JSON.stringify(data));
            for(var i=0;i<couponGoodsIdArr.length;i++){
                $("[goodsId="+couponGoodsIdArr[i]+"] .couponword").html(data.data[couponGoodsIdArr[i]]);
            }
        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        }
    });
}

//设置焦点以及事件
function setFocusInPack(haspack) {
    console.log("***************************************");
    $("._jrgoods").unbind("itemFocus").bind("itemFocus",function(){
        $(this).prev("._jrborder").show();

        var changeY = 0;
        var firstnum = $("#_jrpackbox ._jrgoodsbox ._jrcoocaabtn").index($(this));
        var secondnum = $("#_jrrecommendbox ._jrgoodsbox ._jrcoocaabtn").index($(this));
        if($("#_jrpackzone").css("display") == "none"){
            changeY = Math.floor(secondnum/5)*100;
        }else{
            if(firstnum!=-1){
                changeY = 0;
            }else{
                changeY = Math.floor(secondnum/5)*100 + 450;
            }
        }
        $("#_jrbuyZoneInner").css("transform", "translate3D(0, -" + changeY + "px, 0)");

    })
    $("._jrgoods").unbind("itemBlur").bind("itemBlur",function(){
        $(this).prev("._jrborder").hide();
    })

    if(haspack){
        map = new coocaakeymap($("._jrcoocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
        $("._jrcoocaabtn:eq(0)").trigger("itemFocus");
    }else{
        map = new coocaakeymap($("._jrcoocaabtn"), $("#_jrrecommendbox ._jrgoodsbox ._jrcoocaabtn:eq(0)"), "btnFocus", function() {}, function(val) {}, function(obj) {});
        $("#_jrrecommendbox ._jrgoodsbox ._jrcoocaabtn:eq(0)").trigger("itemFocus");
    }
    $("._jrgoods").unbind("itemClick").bind("itemClick",function(){
        var _thisType = $(this).attr("type");
        var _thisGoodsId = $(this).attr("goodsId");
        if(_thisType == "packnormal"){
            coocaaosapi.startAppShopDetail(_thisGoodsId,function(){console.log("====")},function(){console.log("error-----")});
        }else if(_thisType == "packmore"){
            console.log("goto PACKList Page====");
        }else if(_thisType == "goodsnormal"){
            coocaaosapi.startAppShopDetail(_thisGoodsId,function(){console.log("====")},function(){console.log("error-----")});
        }else if(_thisType == "goodsmore"){

        }
    })
}



