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
function initBtn() {
    $(".module").unbind("itemFocus").bind("itemFocus",function () {
        var num = $(".module").index($(this));
        var x = 0;
        switch (num)
        {
            case 0:case 1:case 2:
                x="270";
                break;
            case 3:case 4:case 5:
                x="540";
                break;
            case 6:case 7:case 8:
                x="810";
                break;
            case 9:case 10:case 11:
                if(gameStatus == "start"){
                    x="1100"
                }else{x="920";}
                break;
        }
        $("#mainbox").css("transform", "translate3D(0, -" + x + "px, 0)");
    })
    $(".module").unbind("itemBlur").bind("itemBlur",function () {
        $("#mainbox").css("transform", "translate3D(0, -" + 0 + "px, 0)");
    })

    $("#freebtn").unbind("itemFocus").bind("itemFocus",function () {
        $(".fbtnfocus").show();
    })
    $("#freebtn").unbind("itemBlur").bind("itemBlur",function () {
        $(".fbtnfocus").hide();
    })
    $("#freebtn").unbind("itemClick").bind("itemClick",function () {
        $("#freerule").show();
        $("#blackBg").show();
        map = new coocaakeymap($("#freerule"),null, "btnFocus", function() {}, function(val) {}, function(obj) {});
        $("#freerule").unbind("itemClick").bind("itemClick",function () {
            $("#freerule").hide();
            $("#blackBg").hide();
            map = new coocaakeymap($(".coocaabtn"),$("#freebtn"), "btnFocus", function() {}, function(val) {}, function(obj) {});
        })
    })

    $("#rule").unbind("itemClick").bind("itemClick",function () {
        if(gameStatus == "start"){page_type = "游戏进行中"}
        sentLog("shopping_mall_page_button_click",'{"button_name":"游戏规则","page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
        _czc.push(['_trackEvent', '双十一活动--购物街', '活动主页面', '游戏规则点击', '', '']);
        $("#mainbox").hide();
        $("#rulePage").show();
        sentLog("free_wares_page_show",'{"page_name":"活动规则","activity_name":"双十一活动--购物街"}');
        _czc.push(['_trackEvent', '双十一活动--购物街', '活动规则曝光', '', '', '']);
        map = new coocaakeymap($("#ruleInner"),null, "btnFocus", function() {}, function(val) {}, function(obj) {});
    })

    $("#myaward").unbind("itemClick").bind("itemClick",function () {
        if(gameStatus == "start"){page_type = "游戏进行中"}
        sentLog("shopping_mall_page_button_click",'{"button_name":"我的奖励","page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
        _czc.push(['_trackEvent', '双十一活动--购物街', '活动主页面', '我的奖励点击', '', '']);
        resumeAndFresh = true;
        coocaaosapi.startNewBrowser2(awardurl,function(){},function(){});
    })

    $("#freeList").unbind("itemClick").bind("itemClick",function () {
        if(gameStatus == "start"){page_type = "游戏进行中"}
        sentLog("shopping_mall_page_button_click",'{"button_name":"免单专区入口","page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
        _czc.push(['_trackEvent', '双十一活动--购物街', '活动主页面', '免单专区入口点击', '', '']);
        $("#mainbox").hide();
        $("#freePage").show();
        sentLog("free_wares_page_show",'{"page_name":"免单专区页面","activity_name":"双十一活动--购物街"}');
        _czc.push(['_trackEvent', '双十一活动--购物街', '免单专区页面曝光', '', '', '']);
        $(".freshList").html("");
        $("#freeDiv").css("transform", "translate3D(0, -0px, 0)");
        if(true){
            $("#specialFree").show();
            $("#normalFree").hide();
            var specialbox = document.getElementById("specialList");
            for(var i=1;i<=10;i++){
                var pkg = "pkg"+i;
                var specialli = document.createElement("div");
                specialli.setAttribute("class","product coocaabtn");
                specialli.setAttribute("price",_freeList3[pkg].price);
                specialli.setAttribute("product_id",_freeList3[pkg].product_id);
                specialli.setAttribute("pageid",_freeList3[pkg].id);
                specialli.setAttribute("pagename",_freeList3[pkg].name);
                specialli.setAttribute("pageType",_freeList3[pkg].type);
                specialli.style.background = "url("+_freeList3[pkg].img+")";
                specialbox.appendChild(specialli);
            }
        }else{
            $("#normalFree").css("top","0");
        }
        var normalbox = document.getElementById("normalList");
        for(var i=1;i<=10;i++){
            var pkg = "pkg"+i;
            var freelist = null;
            var normalli = document.createElement("div");
            normalli.setAttribute("class","product coocaabtn");
            if(movieSource == "tencent"){
                freelist = _freeList2;
            }else{
                freelist = _freeList;
            }
            normalli.setAttribute("price",freelist[pkg].price);
            normalli.setAttribute("product_id",freelist[pkg].product_id);
            normalli.setAttribute("pageid",freelist[pkg].id);
            normalli.setAttribute("pagename",freelist[pkg].name);
            normalli.setAttribute("pageType",freelist[pkg].type);
            normalli.style.background = "url("+freelist[pkg].img+")";
            normalbox.appendChild(normalli);
        }
        $(".product").unbind("itemFocus").bind("itemFocus",function () {
            var changeY = 0;
            var specialnum = $("#specialList .product").index($(this));
            var normalnum = $("#normalList .product").index($(this));
            if($("#specialFree").css("display") == "none"){
                changeY = Math.floor(normalnum/5)*398;
            }else{
                if(specialnum!=-1){
                    changeY = Math.floor(specialnum/5)*398;
                }else{
                    changeY = Math.floor(normalnum/5)*398 + Math.ceil($("#specialList .product").length/5)*398;
                }
            }
            $("#freeDiv").css("transform", "translate3D(0, -" + changeY + "px, 0)");
        })
        $(".product").unbind("itemClick").bind("itemClick",function () {
            var _this = this;
            rememberGood = $(_this).attr("pagename");
            sentLog("free_wares_click",'{"product_name":"'+$(_this).attr("pagename")+'","page_name":"免单专区页面","activity_name":"双十一活动--购物街"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '免单专区',$(_this).attr("pagename")+'点击', '', '']);
            if($(this).attr("pageType") == "1"){
                coocaaosapi.startAppShopDetail($(this).attr("pageid"),function(){},function(){});
            }else{
                if(loginstatus == "true"){
                    order($(this).attr("product_id"),$(this).attr("price"));
                }else{
                    jr_loginClick = true;
                    sentLog("landing_page_show",'{"last_page_name":"免单页面","page_name":"双十一登录弹窗","activity_name":"双十一活动--购物街"}');
                    _czc.push(['_trackEvent', '双十一活动--购物街', '免单页面','登录弹窗', '', '']);
                    startLogin(needQQ);
                }
            }
        })
        map = new coocaakeymap($(".coocaabtn"),$(".product:eq(0)"), "btnFocus", function() {}, function(val) {}, function(obj) {});
    })


    $("#gameing,#waitgame").unbind("itemClick").bind("itemClick",function () {
        console.log("rank_to_game============"+rank_to_game);
        if(gameStatus == "start"){page_type = "游戏进行中"}
        if(rank_to_game == "again"){
            rank_to_game = "";
            sentLog("top_list_page_button_click",'{"button_name":"再玩一次","page_name":"排行榜页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '排行榜页面','再玩一次', '', '']);
        }else if(rank_to_game == "start"){
            rank_to_game = "";
            sentLog("top_list_page_button_click",'{"button_name":"开启红包雨","page_name":"排行榜页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '排行榜页面','开启红包雨', '', '']);
        }else if(rank_to_game == "free"){
            rank_to_game = "";
            sentLog("top_list_page_button_click",'{"button_name":"我要赢免单","page_name":"排行榜页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '排行榜页面','我要赢免单', '', '']);
        }else{
            sentLog("shopping_mall_page_button_click",'{"button_name":"游戏入口","page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '排行榜页面','游戏入口', '', '']);
        }
        console.log("++++++++++"+gameVersion);
        if(gameVersion < 101044){
            console.log("+++++++++++++++++"+downToast);
            $("#msgToast").html("<div>"+downToast+"</div>");
            $("#msgToastBox").show();
            setTimeout("document.getElementById('msgToastBox').style.display = 'none'", 3000);
            if(downGameFalse){
                downGameFalse = false;
                appDown.listenApp();
                appDown.createDownloadTask("https://apk-sky-fs.skysrt.com/uploads/20181030/20181030114924347482.apk", "1D4CB3A15516FA1A102C4116B3F9A2D1", "红包游戏", "com.coocaa.ies", "101044", "http://img.sky.fs.skysrt.com//uploads/20170415/20170415110115834369.png");
            }
        }else{
            console.log("+++++++++++已安装最新版游戏");
            //判断是否在游戏期内；是否还有游戏机会；
            //增加接口，点击时判断是否在游戏期内
            $.ajax({
                type: "get",
                async: true,
                url: adressIp + "/light/eleven/game-start",
                data: {cNickName:nick_name,activeId:actionId},
                dataType: "json",
                success: function(data) {
                    console.log("------------ifStart----result-------------"+JSON.stringify(data));
                    if (data.code == 50100) {
                        if(data.data.ifStart){
                            if(gameChance > 0){
                                //todo Start Game------
                                resumeAndFresh = true;
                                document.getElementById("rankbox").style.display = "none";
                                coocaaosapi.startRedGame(""+gameChance,userKeyIdinit,function(){
                                    console.log("success");
                                    sentLog("money_rain_page_show",'{"page_name":"红包雨游戏页面","activity_name":"双十一活动--购物街"}');
                                    _czc.push(['_trackEvent', '双十一活动--购物街', '红包雨游戏页面曝光','', '', '']);
                                },function(err){console.log("--------------openGameError"+err)});
                            }else{
                                //todo show windown for mission or qrcode
                                sentLog("get_game_go_on_page_show",'{"page_name":"获取游戏机会弹窗","activity_name":"双十一活动--购物街"}');
                                _czc.push(['_trackEvent', '双十一活动--购物街', '获取游戏机会弹窗曝光','', '', '']);
                                $("#nochancebox").show();
                                $("#blackBg").show();
                                $("#gotoMissionborder").show();
                                $("#helpFriendborder").hide();
                                map = new coocaakeymap($(".coocaabtn2"),null, "btnFocus", function() {}, function(val) {}, function(obj) {});
                                $("#gotoMission").unbind("itemFocus").bind("itemFocus",function () {
                                    $("#gotoMissionborder").show();
                                    $("#helpFriendborder").hide();
                                })
                                $("#helpFriend").unbind("itemFocus").bind("itemFocus",function () {
                                    $("#gotoMissionborder").hide();
                                    $("#helpFriendborder").show();
                                })
                                $("#gotoMission").unbind("itemClick").bind("itemClick",function () {
                                    sentLog("get_game_go_on_button_click",'{"button_name":"做任务","page_name":"获取游戏机会弹窗","activity_name":"双十一活动--购物街"}');
                                    _czc.push(['_trackEvent', '双十一活动--购物街', '获取游戏机会弹窗','做任务点击', '', '']);
                                    if(isTaskOver == taskList.length){
                                        $("#mission2").trigger("itemClick");
                                    }else{
                                        $("#mission1").trigger("itemClick");
                                    }
                                })
                                $("#helpFriend").unbind("itemClick").bind("itemClick",function () {
                                    sentLog("get_game_go_on_button_click",'{"button_name":"求助好友","page_name":"获取游戏机会弹窗","activity_name":"双十一活动--购物街"}');
                                    _czc.push(['_trackEvent', '双十一活动--购物街', '获取游戏机会弹窗','求助好友点击', '', '']);
                                    $("#nochancebox").hide();
                                    $("#helpQrcode").show();
                                    sentLog("get_game_go_on_page_show",'{"page_name":"分享二维码弹窗","activity_name":"双十一活动--购物街"}');
                                    _czc.push(['_trackEvent', '双十一活动--购物街', '分享二维码弹窗曝光','', '', '']);
                                    $("#qrcodeBox").html("");
                                    var qrcode = new QRCode(document.getElementById("qrcodeBox"),{width:200,height:200,correctLevel: 3});
                                    qrcode.makeCode(helpurl+"?activeId="+actionId+"&macAddress="+macAddress+"&emmcId="+emmcId+"&cUDID="+activityId+"&cOpenId="+cOpenId);
                                })

                            }
                        }else{
                            if(actionStatus == "end"|| (timePart.nextTimePart == null&& !timePart.ifStart)){
                                $("#msgToast").html("<div>本次活动已结束，快去“我的奖励”页面查看你的战利品吧</div>");
                            }else{
                                $("#msgToast").html("<div>抱歉，游戏未开始~可先做任务提前累积游戏机会哦</div>");
                            }
                            $("#msgToastBox").show();
                            setTimeout("document.getElementById('msgToastBox').style.display = 'none'", 3000);
                        }
                    } else{
                        if(actionStatus == "end"|| (timePart.nextTimePart == null&& !timePart.ifStart)){
                            $("#msgToast").html("<div>本次活动已结束，快去“我的奖励”页面查看你的战利品吧</div>");
                        }else{
                            $("#msgToast").html("<div>抱歉，游戏未开始~可先做任务提前累积游戏机会哦</div>");
                        }
                        $("#msgToastBox").show();
                        setTimeout("document.getElementById('msgToastBox').style.display = 'none'", 3000);
                    }
                },
                error: function(error) {
                    console.log("--------访问失败" + JSON.stringify(error));
                }
            });
        }
    })

    $("#again_btn").unbind("itemClick").bind("itemClick",function () {
        needgotoRankList = true;
        rank_to_game = "again";
        $("#gameing").trigger("itemClick");
    })

    $("#start_game").unbind("itemClick").bind("itemClick",function () {
        needgotoRankList = true;
        rank_to_game = "start";
        $("#gameing").trigger("itemClick");
    })
    $("#free_btn").unbind("itemClick").bind("itemClick",function () {
        needgotoRankList = true;
        rank_to_game = "free";
        $("#gameing").trigger("itemClick");
    })
    $("#mission1").unbind("itemClick").bind("itemClick",function () {
        if(clickFast){
            return;
        }else {
            clickFast = true;
        }

        if(actionStatus == "end"|| (timePart.nextTimePart == null&& !timePart.ifStart)){
            $("#msgToast").html("<div>本次活动已结束，快去“我的奖励”页面查看你的战利品吧</div>");
            $("#msgToastBox").show();
            setTimeout("document.getElementById('msgToastBox').style.display = 'none'", 3000);
            return;
        }

        resumeAndFresh = true;
        function startMission1(obj) {
            var startType = $(obj).attr("taskType");
            switch (startType)
            {
                case "movieDetail"://影视详情页
                    var pageid = $(obj).attr("pageid");
                    coocaaosapi.startMovieDetail(pageid,function(){clickFast = false;},function(){});
                    break;
                case "layout"://版面
                    var pageid = $(obj).attr("pageid");
                    coocaaosapi.startHomeCommonList(pageid,function(msg){clickFast = false;exit()},function(error){});
                    break;
                case "eduEquity"://产品包页面
                    var pageid = $(obj).attr("pageid");
                    coocaaosapi.startMovieMemberCenter("1",pageid,function(){clickFast = false;},function(){});
                    break;
                case "movieEquity"://产品包页面
                    var pageid = $(obj).attr("pageid");
                    coocaaosapi.startMovieMemberCenter("0",pageid,function(){clickFast = false;},function(){});
                    break;
                case "tvmallTopic"://购物专题
                    var pageid = $(obj).attr("pageid");
                    coocaaosapi.startAppShopZone2(pageid,function(){clickFast = false;},function(){});
                    break;
                case "movieTopic"://影视专题
                    var pageid = $(obj).attr("pageid");
                    coocaaosapi.startMovieSomePage(pageid,function(){clickFast = false;},function(){});
                    break;
            }
        }
        var _this = this;
        if(gameStatus == "start"){page_type = "游戏进行中"}
        if(rank_to_tast == "true"){
            rank_to_tast = "false";
            sentLog("top_list_page_button_click",'{"button_name":"做任务","page_name":"排行榜页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '排行榜页面'+page_type,'做任务', '', '']);
        }else{
            sentLog("shopping_mall_page_button_click",'{"button_type":"'+$(_this).attr("taskname")+'","button_name":"任务一","page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '活动主页面'+page_type,'任务一'+$(_this).attr("taskname"), '', '']);
        }

        console.log("--------"+_this);
        if(isTaskOver == taskList.length){
            sentLog("shopping_mall_taskone_result",'{"button_type":"'+$(_this).attr("taskname")+'","task_result":"任务一完成","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '任务一完成'+page_type,'任务一'+$(_this).attr("taskname"), '', '']);
            startMission1(_this);
        }else{
            sentLog("shopping_mall_taskone_result",'{"button_type":"'+$(_this).attr("taskname")+'","task_result":"任务一未完成","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '任务一未完成'+page_type,'任务一'+$(_this).attr("taskname"), '', '']);
            $.ajax({
                type: "post",
                async: true,
                url: adressIp + "/light/eleven/add-chance",
                data: {cNickName:nick_name,activeId:actionId, MAC:macAddress,cChip:TVchip,cModel:TVmodel,cEmmcCID:emmcId,cUDID:activityId,cOpenId:cOpenId,source:movieSource,chanceSource:3},
                dataType: "json",
                success: function(data) {
                    console.log("------------accChance----result-------------"+JSON.stringify(data));
                    if (data.code == 50100) {
                        $("#msgToast").html("<div>跳转浏览指定页面回到活动主页面即可增加<span>1</span>次游戏机会哦~</div>");
                        $("#msgToastBox").show();
                        setTimeout(gotomission1, 5000);
                        function gotomission1() {
                            // clickFast = false;
                            document.getElementById('msgToastBox').style.display = 'none';
                            startMission1(_this);
                        }
                    } else{
                        startMission1(_this);
                    }
                },
                error: function(error) {
                    console.log("--------访问失败" + JSON.stringify(error));
                }
            });
        }
    })

    $("#mission2").unbind("itemClick").bind("itemClick",function () {
        if(gameStatus == "start"){page_type = "游戏进行中"}
        if(rank_to_tast == "true"){
            rank_to_tast = "false";
            sentLog("top_list_page_button_click",'{"button_name":"做任务","page_name":"排行榜页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '排行榜页面'+page_type,'做任务', '', '']);
        }else{
            sentLog("shopping_mall_page_button_click",'{"button_name":"任务二","page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
            _czc.push(['_trackEvent', '双十一活动--购物街', '活动主页面'+page_type,'任务二', '', '']);
        }
        var _this = this;
        if(actionStatus == "end"|| (timePart.nextTimePart == null&& !timePart.ifStart)){
            $("#msgToast").html("<div>本次活动已结束，快去“我的奖励”页面查看你的战利品吧</div>");
            $("#msgToastBox").show();
            setTimeout("document.getElementById('msgToastBox').style.display = 'none'", 3000);
        }else{
            $("#msgToast").html("<div>正在前往福利场，付费满50元回到活动主页面可增加<span>5</span>次游戏机会哦！</div>");
            $("#msgToastBox").show();
            setTimeout(gotomission2, 5000);
            function gotomission2() {
                document.getElementById('msgToastBox').style.display = 'none';
                if(movieSource == "tencent"){
                    coocaaosapi.startMovieHomeSpecialTopic("102829",function(msg){exit()},function(error){});
                }else{
                    coocaaosapi.startMovieHomeSpecialTopic("102830",function(msg){exit()},function(error){});
                }
            }
        }
    })
    $(".module").unbind("itemClick").bind("itemClick",function () {
        var _this = this;
        remembernum = $(".module").index($(this));
        var remembernum123 = $(".module").index($(this))+"";
        // console.log(remembernum+"****************"+(_this).parentNode.getAttribute("bannerType"));
        var business = (_this).parentNode.getAttribute("bannerType");
        var block_bussiness_type=null,block_order=null,block_name=null;
        switch (business){
            case "movie":
                block_bussiness_type = "影视";
                break;
            case "edu":
                block_bussiness_type = "教育";
                break;
            case "mall":
                block_bussiness_type = "购物";
                break;
            case "apk":
                block_bussiness_type = "应用";
                break;
            default:
                block_bussiness_type = "影视";
                break;
        }
        switch (remembernum123){
            case "0":case "3":case "6":case "9":
                block_order = "入口一";
                break;
            case "1":case "4":case "7":case "10":
                block_order = "入口二";
                break;
            case "2":case "5":case "8":case "11":
                block_order = "入口三";
                break;
            default:
                block_order = "入口一";
                break;
        }
        // console.log(remembernum+"****************"+(_this).parentNode.getAttribute("bannerType"));
        console.log("=======block_order======="+block_order);
        block_name = $(_this).attr("missionname");
        if(gameStatus == "start"){page_type = "游戏进行中"};
        sentLog("shopping_mall_page_button_click",'{"block_bussiness_type":"'+block_bussiness_type+'","block_order":"'+block_order+'","block_name":"'+block_name+'","button_name":"各业务入口","page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
        _czc.push(['_trackEvent', '双十一活动--购物街', '活动主页面'+page_type,block_bussiness_type+block_order+block_name, '', '']);
        // console.log("------------startOperate-------- "+$(_this).attr("missionparam")+"========"+JSON.parse($(_this).attr("missionparam")).params);
        startOperate(_this);
    })

    //======================zy===================
    $("#login_btn").unbind("itemClick").bind("itemClick",function () {
        click_login = true;
        sentLog("top_list_page_button_click",'{"button_name":"立即登录","page_name":"排行榜页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
        _czc.push(['_trackEvent', '双十一活动--购物街', '排行榜页面'+page_type,'立即登录', '', '']);
        startLogin(needQQ)
    })

    $("#rank_btn,#11_rank_btn,#task_btn").unbind("itemClick").bind("itemClick",function () {//做任务
        rank_to_tast = "true";
        if(isTaskOver == taskList.length){
            $("#mission2").trigger("itemClick");
        }else{
            $("#mission1").trigger("itemClick");
        }
    })

    $("#awardlist").unbind("itemClick").bind("itemClick",function () {
        if(gameStatus == "start"){page_type = "游戏进行中"}
        sentLog("shopping_mall_page_button_click",'{"button_name":"排行榜、免单榜","page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
        _czc.push(['_trackEvent', '双十一活动--购物街', '活动主页面'+page_type,'排行榜、免单榜点击', '', '']);

        if(actionStatus == "end" || (timePart.nextTimePart == null&& !timePart.ifStart)){
            $("#msgToast").html("<div>本次活动已结束，快去“我的奖励”页面查看你的战利品吧</div>");
            $("#msgToastBox").show();
            setTimeout("document.getElementById('msgToastBox').style.display = 'none'", 3000);
        }else{
            rankingList();
        }
    })
}

function order(productid,price) {
    console.log("-------------"+productid+"============"+price);
    var data = JSON.stringify({
        user_id: access_token, //accesstoken
        user_flag: 1,
        third_user_id: qqtoken,
        product_id: productid, //需改
        movie_id: "",
        node_type: "res",
        client_type: 1,
        title: "双十一产品包",
        price: price, //需改
        count: 1,
        discount_price: "", //需改
        coupon_codes: "",
        auth_type: 0,
        mac: macAddress,
        chip: TVchip,
        model: TVmodel,
        extend_info: { "login_type": login_type, "wx_vu_id": vuserid },
    })
    var data1 = encodeURIComponent(data);
    console.log(data);
    $.ajax({
        type: "get",
        async: true,
        url: orderUrl + data1, //需改
        dataType: "jsonp",
        jsonp: "callback",
        timeout: 20000,
        success: function(data) {
            console.log("返回状态：" + JSON.stringify(data));
            if (data.code == 0) {
                orderId = data.data.orderId;
                console.log("订单编号1：" + orderId);
                coocaaosapi.purchaseOrder2(data.data.appcode, data.data.orderId, data.data.orderTitle, data.data.back_url, data.data.total_pay_fee, "虚拟", "com.webviewsdk.action.pay", "pay", access_token, mobile,
                    function(success){console.log("----------startpaysuccess------------" + success);},
                    function(error){console.log(error);});
            } else {
                console.log("-----------异常---------" + data.msg);
            }
        },
        error: function() {
            console.log("-----------访问失败---------");
        }
    });
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

function startOperate(obj) {
    var startType = $(obj).attr("missionType");
    switch (startType)
    {
        case "movieDetail"://影视详情页
            var pageid = $(obj).attr("pageid");
            coocaaosapi.startMovieDetail(pageid,function(){},function(){});
            break;
        case "goodsImgDetail"://商品图文详情页
            var pageid = $(obj).attr("pageid");
            coocaaosapi.startAppShopDetail(pageid,function(){},function(){});
            break;
        case "apkDetail"://应用
            var pageid = $(obj).attr("pageid");
            var pkgname = JSON.parse($(obj).attr("missionparam")).packagename;
            var bywhat = JSON.parse($(obj).attr("missionparam")).bywhat;
            var byvalue = JSON.parse($(obj).attr("missionparam")).byvalue;
            var a = '{ "pkgList": ["'+pkgname+'"] }';
            var param1="",param2="",param3="",param4="",param5="";
            var str = "[]";
            coocaaosapi.getAppInfo(a, function(message) {
                console.log("getAppInfo====" + message);
                if(JSON.parse(message)[pkgname].status == -1){
                    coocaaosapi.startAppStoreDetail(pageid,function(){},function(){});
                }else{
                    if(bywhat == "activity"||bywhat == "class"){
                        param1 = pkgname;
                        param2 = byvalue;
                    }else if(bywhat == "uri"){
                        param1 = pkgname;
                        param5 = byvalue
                    }else if(bywhat == "pkg"){
                        param1 = pkgname;
                    }
                    if(JSON.stringify(JSON.parse($(obj).attr("missionparam")).params) != "{}"){
                        str = '['+JSON.stringify(JSON.parse($(obj).attr("missionparam")).params).replace(/,/g,"},{")+']'
                    }
                    coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
                }
            }, function(error) {
                console.log("getAppInfo----error" + JSON.stringify(error));
                coocaaosapi.startAppStoreDetail(pageid,function(){},function(){});
            });
            break;
        case "movieTurnTopic"://轮播专题
            var pageid = $(obj).attr("pageid");
            if(cAppVersion < 3300000){
                $("#needUpdate").show();
                map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                setTimeout(hideToast,3000);
            }else{
                coocaaosapi.startVideospecial(pageid,function(){},function(){});
            }

            break;
        case "eduTurnTopic": //教育轮播
            var pageid = $(obj).attr("pageid");
            console.log("=========================="+pageid);
            if(cAppVersion < 3300000){
                $("#needUpdate").show();
                map = new coocaakeymap($("#needUpdate"), $("#needUpdate"), "btnFocus", function() {}, function(val) {}, function(obj) {});
                setTimeout(hideToast,3000);
            }else{
                coocaaosapi.startVideospecial2(pageid,function(){},function(){});
            }
            break;
        case "layout"://版面
            var pageid = $(obj).attr("pageid");
            coocaaosapi.startHomeCommonList(pageid,function(msg){exit()},function(error){});
            break;
        case "mallHome"://购物主页
            var pageid = $(obj).attr("pageid");
            coocaaosapi.startAppShop(function(msg){},function(error){});
            break;
        case "movieEquity"://产品包页面
            var pageid = $(obj).attr("pageid");
            coocaaosapi.startMovieMemberCenter("0",pageid,function(){},function(){});
            break;
        case "eduEquity"://产品包页面
            var pageid = $(obj).attr("pageid");
            coocaaosapi.startMovieMemberCenter("1",pageid,function(){},function(){});
            break;
        case "movieTopic"://影视专题
            var pageid = $(obj).attr("pageid");
            coocaaosapi.startMovieSomePage(pageid,function(){},function(){});
            break;
    }
}

function hideToast() {
    $("#needUpdate").hide();
    map = new coocaakeymap($(".coocaabtn"), $(".module:eq("+remembernum+")"), "btnFocus", function() {}, function(val) {}, function(obj) {});
}

function initGameStatus(resume) {
    if(actionStatus == "end"){
        $("#waitgame").show();
        $("#gameing").hide();
        $("#movebanner").hide();
        $("#opacityBg2").show();
        $("#opacityBg1").hide();
        $("#waitInfo").hide();
        $("#endbtn").show();
        $("#waitgame .gametime").hide();
        $("#waitgame").css("background","url('http://sky.fs.skysrt.com/statics/webvip/webapp/double11/mainpage/endbanner.jpg')");
        $("#freeList").css('background','url("http://sky.fs.skysrt.com/statics/webvip/webapp/double11/mainpage/freebanner2.png")');
        $("#mission1").html("活动已结束")
    }else if(actionStatus == "start"){
        if(timePart.ifStart){
            gameStatus = "start";
            if(sentMainpageLog){
                sentMainpageLog = false;
                sentLog("shopping_mall_page_show",'{"page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"游戏进行中"}');
                _czc.push(['_trackEvent', '双十一活动--购物街', '活动主页面游戏进行中曝光','', '', '']);
            }
            $("#waitgame").hide();
            $("#gameing").show();
            if(showMove){
                $("#movebanner").show();
                $(".move1").addClass("showmove");
                $(".move2").addClass("showmove");
                $(".move3").addClass("showmove");
            }
            $("#opacityBg1").show();
            $("#opacityBg2").hide();
            beginTime = new Date(timePart.beginTime).getHours();
            endTime = new Date(timePart.endTime).getHours();
            $("#gameing .gametime").html("本场游戏时间："+beginTime+":00--"+endTime+":00");
            // $("#startbtn span").html(gameResult.chance);
            $("#startbtn span").html("99+");
            if(double11 == false){
                if(zy_todayMaxScore != 0){
                    document.getElementById("todayrecord").style.display = "block";
                    $(".todayscore").html(gameResult.todayMaxScore);
                }else{
                    document.getElementById("todayrecord").style.display = "none";
                    $(".todayscore").html("");
                }
            }

            if(loginstatus == "true" && gameResult.todayMaxScore > 0){
                $(".todaylistnum").show();
                if(gameResult.userRanking <= 100&&gameResult.userRanking>0){
                    $(".todaylistnum").html("排名："+gameResult.userRanking);
                }else{
                    $(".todaylistnum").html("排名：100+");
                }
            }

            $.ajax({
                type: "get",
                async: true,
                url: adressIp + "/light/eleven/news",
                data: {cNickName:nick_name,activeId:actionId},
                dataType: "json",
                success: function(data) {
                    console.log("------------todayAward----result-------------"+JSON.stringify(data));
                    if (data.code == 50100) {
                        $("#todayawardul").html("");
                        var box = document.getElementById("todayawardul");

                        var listlength = data.data.awardNews.length;
                        var recordlength = data.data.gameRecords.length;
                        var pushNum = listlength>recordlength?listlength:recordlength;
                        var pushArr = [];
                        var maxwidth=6;
                        var maxwidth1=6;
                        for(var a=0;a<pushNum;a++){
                            if(data.data.awardNews[a]!=undefined){
                                if(data.data.awardNews[a].cNickName == null || data.data.awardNews[a].cNickName == ""){
                                    cNickName = "匿名用户";
                                }else{
                                    cNickName = data.data.awardNews[a].cNickName;

                                    if(cNickName.length>maxwidth){
                                        cNickName = cNickName.substring(0,maxwidth);
                                        cNickName = cNickName + '...';
                                    }
                                }
                                awardName = data.data.awardNews[a].awardName;
                                if(awardName.length>maxwidth1){
                                    awardName = awardName.substring(0,maxwidth1);
                                    awardName = awardName + '...';
                                }
                                pushArr.push(cNickName+"  获得  "+awardName);
                            }
                            if(data.data.gameRecords[a]!=undefined){
                                if(data.data.gameRecords[a].cNickName == null || data.data.gameRecords[a].cNickName == ""){
                                    cNickName = "匿名用户";
                                }else{
                                    cNickName = data.data.gameRecords[a].cNickName;

                                    if(cNickName.length>maxwidth){
                                        cNickName = cNickName.substring(0,maxwidth);
                                        cNickName = cNickName + '...';
                                    }
                                }
                                score = data.data.gameRecords[a].score;
                                pushArr.push(cNickName+"  在游戏中获得  "+score+"个红包");
                            }
                        }
                        for(var i=0;i<pushArr.length;i++){
                            var list = document.createElement("li");
                            list.innerHTML=pushArr[i];
                            box.appendChild(list);
                        }
                        if(showMove){
                            $("#todaymarquee").show();
                            showAwardlist("#todaymarquee","#todayawardul",setInterv1);
                        }
                    }
                    else{}
                },
                error: function(error) {
                    console.log("--------访问失败" + JSON.stringify(error));
                }
            });


        }else{
            if(timePart.nextTimePart == null){
                $("#waitgame").show();
                $("#gameing").hide();
                $("#movebanner").hide();
                $("#opacityBg2").show();
                $("#opacityBg1").hide();
                $("#waitInfo").hide();
                $("#endbtn").show();
                $("#waitgame .gametime").hide();
                $("#waitgame").css("background","url('http://sky.fs.skysrt.com/statics/webvip/webapp/double11/mainpage/endbanner.jpg')");
                $("#freeList").css('background','url("http://sky.fs.skysrt.com/statics/webvip/webapp/double11/mainpage/freebanner2.png")');
                $("#mission1").html("活动已结束")
            }else{
                gameStatus = "wait";
                if(sentMainpageLog){
                    sentMainpageLog = false;
                    sentLog("shopping_mall_page_show",'{"page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"游戏未开始"}');
                    _czc.push(['_trackEvent', '双十一活动--购物街', '活动主页面游戏未开始曝光','', '', '']);
                }
                $("#waitgame").show();
                $("#gameing").hide();
                $("#movebanner").hide();
                $("#opacityBg2").show();
                $("#opacityBg1").hide();
                // $("#waitOvertimes span").html(gameResult.chance);
                $("#waitOvertimes span").html("99+");
                $("#waitBest span").html(gameResult.todayMaxScore);
                if(loginstatus == "true" && gameResult.todayMaxScore > 0 ){
                    $("#waitTop").show();
                    if(gameResult.userRanking <= 100&&gameResult.userRanking>0){
                        $("#waitTop span").html(gameResult.userRanking)
                    }else{
                        $("#waitTop span").html("100+")
                    }
                }else{
                    $("#waitTop").hide();
                }
                beginTime = new Date(timePart.nextTimePart.beginTime).getHours();
                endTime = new Date(timePart.nextTimePart.endTime).getHours();
                if(timePart.nextTimePart.ifNextDay){
                    $("#waitgame .gametime").html("下一场游戏时间：明天"+beginTime+":00--"+endTime+":00");
                }else{
                    $("#waitgame .gametime").html("下一场游戏时间："+beginTime+":00--"+endTime+":00");
                }
            }

        }
    }else{

    }
//获取运营位
    console.log("========================"+adressIp + "/light/task/"+actionId+"/banner")
    $.ajax({
        type: "get",
        async: true,
        url: adressIp + "/light/task/"+actionId+"/banner",
        data: {source:movieSource},
        dataType: "json",
        success: function(data) {
            console.log("------------getBanner----result-------------"+JSON.stringify(data));
            if (data.code == 50100) {
                $(".listbox").html("");
                apkBanner = data.data.apkBanner;
                eduBanner = data.data.eduBanner;
                tvMallBanner = data.data.tvMallBanner;
                movieBanner = data.data.movieBanner;
                var pagefrom = getUrlParam("from");
                switch (pagefrom){
                    case "edu":
                        arrBanner.push(eduBanner);
                        arrBanner.push(movieBanner);
                        arrBanner.push(tvMallBanner);
                        arrBanner.push(apkBanner);
                        bannerNanme.push("eduBanner");
                        bannerNanme.push("movieBanner");
                        bannerNanme.push("tvMallBanner");
                        bannerNanme.push("apkBanner");
                        $("#list1").attr("bannerType","edu");
                        $("#list2").attr("bannerType","movie");
                        $("#list3").attr("bannerType","mall");
                        $("#list4").attr("bannerType","apk");
                        break;
                    case "mall":
                        arrBanner.push(tvMallBanner);
                        arrBanner.push(movieBanner);
                        arrBanner.push(eduBanner);
                        arrBanner.push(apkBanner);
                        bannerNanme.push("tvMallBanner");
                        bannerNanme.push("movieBanner");
                        bannerNanme.push("eduBanner");
                        bannerNanme.push("apkBanner");
                        $("#list1").attr("bannerType","mall");
                        $("#list2").attr("bannerType","movie");
                        $("#list3").attr("bannerType","edu");
                        $("#list4").attr("bannerType","apk");
                        break;
                    case "apk":
                        arrBanner.push(apkBanner);
                        arrBanner.push(movieBanner);
                        arrBanner.push(eduBanner);
                        arrBanner.push(tvMallBanner);
                        bannerNanme.push("apkBanner");
                        bannerNanme.push("movieBanner");
                        bannerNanme.push("eduBanner");
                        bannerNanme.push("tvMallBanner");
                        $("#list1").attr("bannerType","apk");
                        $("#list2").attr("bannerType","movie");
                        $("#list3").attr("bannerType","edu");
                        $("#list4").attr("bannerType","mall");
                        break;
                    default :
                        arrBanner.push(movieBanner);
                        arrBanner.push(eduBanner);
                        arrBanner.push(tvMallBanner);
                        arrBanner.push(apkBanner);
                        bannerNanme.push("movieBanner");
                        bannerNanme.push("eduBanner");
                        bannerNanme.push("tvMallBanner");
                        bannerNanme.push("apkBanner");
                        $("#list1").attr("bannerType","movie");
                        $("#list2").attr("bannerType","edu");
                        $("#list3").attr("bannerType","mall");
                        $("#list4").attr("bannerType","apk");
                        break;
                }
                for(var i=0;i<4;i++){
                    var bannerBox = document.getElementById("list"+(i+1));
                    for (var j=1;j<=3;j++){
                        var bannerNum=bannerNanme[i]+""+j;
                        var bannerDiv = document.createElement("div");
                        var bannerImg = document.createElement("img");
                        var bannerCouponDiv = document.createElement("div");
                        bannerImg.setAttribute("src",arrBanner[i][bannerNum].imgUrl);
                        bannerCouponDiv.setAttribute("class","coupon");
                        bannerCouponDiv.innerHTML="&nbsp";
                        bannerDiv.setAttribute('class', 'coocaabtn module module'+j);
                        bannerDiv.setAttribute('missionType', arrBanner[i][bannerNum].taskType);
                        bannerDiv.setAttribute('missionName', arrBanner[i][bannerNum].name);
                        bannerDiv.setAttribute('pageid', arrBanner[i][bannerNum].id);
                        bannerDiv.setAttribute('missionUrl', arrBanner[i][bannerNum].url);
                        bannerDiv.setAttribute('missionbusinessType', arrBanner[i][bannerNum].businessType);
                        bannerDiv.setAttribute('missionparam', arrBanner[i][bannerNum].param);
                        // bannerDiv.setAttribute('pkgname', arrBanner[i][bannerNum].param == null?"":JSON.parse(arrBanner[i][bannerNum].param).packagename);
                        bannerDiv.appendChild(bannerImg);
                        bannerDiv.appendChild(bannerCouponDiv);
                        bannerBox.appendChild(bannerDiv);
                    }
                }
            } else{

            }
            if(getUrlParam("from")!=null&&getUrlParam("from")!=undefined&&!resume){
                initMap("#list1 .module:eq(0)");
                $("#mainbox").css("transform", "translate3D(0, -270px, 0)");
            }else if(gameStatus == "start" && gameChance > 0){
                initMap("#gameing");
            }else {
                if(actionStatus == "end"){
                    initMap(null);
                }else{
                    //判断任务一是否完成
                    if(isTaskOver == taskList.length){
                        initMap("#mission2");
                    }else{
                        initMap("#mission1");
                    }
                }
            }
        },
        error: function(error) {
            console.log("--------运营位访问失败" + JSON.stringify(error));
        }
    });
    //获取优惠券展示{"code":"50100","msg":"成功","data":{"tvmallCoupon":["购物10元优惠券"],"eduCoupon":["教育40元优惠券"],"movieCoupon":["影视30元优惠券"]}}
    $.ajax({
        type: "get",
        async: true,
        url: adressIp + "/light/eleven/"+actionId+"/u-coupon",
        data: {cNickName:nick_name,activeId:actionId, MAC:macAddress,cChip:TVchip,cModel:TVmodel,cEmmcCID:emmcId,cUDID:activityId},
        dataType: "json",
        success: function(data) {
            console.log("------------showCoupon----result-------------"+JSON.stringify(data));
            if (data.code == 50100) {
               var showEdu = data.data.eduCoupon[0];
               var showMall = data.data.tvmallCoupon[0];
               var showMovie = data.data.movieCoupon[0];
               showcoupon(showEdu,"edu");
               showcoupon(showMall,"mall");
               showcoupon(showMovie,"movie");
               function showcoupon(name,type) {
                   if(name!=""&&name!=null){
                       $("[bannerType="+type+"] .module1 .coupon").html("<div class='konw'>已获<span class='couponname'>"+name+"</span>优惠券,可马上使用</div>").addClass('zy_coupon');
                   }
               }
            }
            else{}
        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        }
    });
}

//页面初始化或刷新
function showPage(first,resume) {
    console.log("$$$$$$$$$$$$$$$$$$===="+first+"==========="+resume);
    console.log("---"+macAddress+"------"+TVchip+"-----"+TVmodel+"------"+emmcId+"--------"+activityId + "---------"+access_token+"-------"+cOpenId);
    var data = JSON.stringify({"goodsId":"14773","token":access_token,"cudid":activityId+"_"+macAddress});
    $.ajax({
        type: "get",
        async: true,
        url: "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/packGoodsList",
        data: {param:data},
        dataType: "json",
        success: function(data) {
            console.log("------------packGoodsList----result-------------"+JSON.stringify(data));

        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        }
    });
}



//排行榜
function rankingList(){}

//打包接口
function addpackage() {
    var data = JSON.stringify({"goodsId":"14773","token":access_token,"cudid":activityId+"_"+macAddress});
    $.ajax({
        type: "get",
        async: true,
        url: "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/addCartFromAct",
        data: {param:data},
        dataType: "json",
        success: function(data) {
            console.log("------------addPackage----result-------------"+JSON.stringify(data));

        },
        error: function(error) {
            console.log("--------访问失败" + JSON.stringify(error));
        }
    });
}



