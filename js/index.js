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
        if($("#rulePage").css("display") == "block"){
            $("#mainbox").show();
            $("#rulePage").hide();
            map = new coocaakeymap($(".coocaabtn"),$("#rule"), "btnFocus", function() {}, function(val) {}, function(obj) {});
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
        if (message.presultstatus == 0) {
            //支付完成~~~~~~
        }else{}
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
    console.log("--------"+setFocus);
    map = new coocaakeymap($(".coocaabtn"), $(setFocus), "btnFocus", function() {}, function(val) {}, function(obj) {});
    $(setFocus).trigger("itemFocus");
}
function initBtn() {
    $("#rule").unbind("itemClick").bind("itemClick",function () {
        // if(gameStatus == "start"){page_type = "游戏进行中"}
        // sentLog("shopping_mall_page_button_click",'{"button_name":"游戏规则","page_name":"活动主页面","activity_name":"双十一活动--购物街","page_type":"'+page_type+'"}');
        _czc.push(['_trackEvent', '双十一活动--购物街', '活动主页面', '游戏规则点击', '', '']);
        $("#mainbox").hide();
        $("#rulePage").show();
        sentLog("free_wares_page_show",'{"page_name":"活动规则","activity_name":"双十一活动--购物街"}');
        _czc.push(['_trackEvent', '双十一活动--购物街', '活动规则曝光', '', '', '']);
        map = new coocaakeymap($("#ruleInner"),null, "btnFocus", function() {}, function(val) {}, function(obj) {});
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
    console.log("---"+boxHeight+"---"+listHeight+"----"+screenNum+"---")
    var a=1;
    if(screenNum>1){
       setInterval(marquee,3000);
    }
    function marquee() {
        $(inner).css("transform", "translate3D(0, -" + a * boxHeight + "px, 0)");
        a++;
        if(a==screenNum){a=0}
    }
}

function hideToast() {
    $("#needUpdate").hide();
    map = new coocaakeymap($(".coocaabtn"), $(".module:eq("+remembernum+")"), "btnFocus", function() {}, function(val) {}, function(obj) {});
}

//页面初始化或刷新
function showPage(first,resume) {
    console.log("$$$$$$$$$$$$$$$$$$===="+first+"==========="+resume);
    console.log("---"+macAddress+"------"+TVchip+"-----"+TVmodel+"------"+emmcId+"--------"+activityId + "---------"+access_token+"-------"+cOpenId);
    $.ajax({
        type: "post",
        async: true,
        url: adressIp + "/light/xmas/init",
        data: {id:actionId,cChip:TVchip,cModel:TVmodel,cUDID:activityId,MAC:macAddress,cEmmcCID:emmcId,cOpenId:cOpenId,goldActiveId:goldActionId,initSource:1,accessToken:access_token,cNickName:nick_name},
        dataType: "json",
        // timeout: 20000,
        success: function(data) {
            console.log("返回状态：" + JSON.stringify(data));
            showOperation();
            showAwardInfo();
            $("#hasRingNum").html("铃铛数："+data.data.chanceResult.remainingNumber);
            if(data.code == "50100"){
                var firstIn = data.data.chanceResult.firstIn;
                if(firstIn == "0" || firstIn == "2"){
                    $("#differentWord").html("您有一个圣诞见面礼待领取");
                }else{
                    var  chanceSource = data.data.chanceResult.chanceSource;
                    if(chanceSource.split(",").length>1){
                        $("#differentWord").html("您有奖励待领取");
                    }else if(chanceSource.split(",")[0] == "1"){
                        $("#differentWord").html("您有一个返利红包待领取");
                    }else if(chanceSource.split(",")[0] == "2"){
                        $("#differentWord").html("您有一个奖励待领取");
                    }else{
                        if(new Date(data.data.sysTime) > new Date(data.data.goldActiveBeginTime)){
                            $("#differentWord").html("进入召唤超级锦鲤");
                        }else{
                            $("#differentWord").html("集铃铛成为超级锦鲤");
                        }
                    }
                }
            }else{
                $("#differentWord").html("快来领走您的双旦礼物吧");
            }

        },
        error: function(error) {
            console.log("-----------访问失败---------"+JSON.stringify(error));
        }
    });
}

function showOperation() {
    var couponStation = {};
    var tag_id="";
    if(needQQ){tag_id == "103100"}else {tag_id == "103100"}
    $.ajax({
        type: "get",
        async: true,
        url: "http://172.20.155.91:8080/tvos/getWebPageContent",
        data: {tag_id:103100},
        dataType: "json",
        // timeout: 20000,
        success: function(data) {
            homepage = data;
            var operationArr = [];
            var movieOperation = homepage.data.content.contents[0];
            var mallOperation = homepage.data.content.contents[1];
            var eduOperation = homepage.data.content.contents[2];
            var apkOperation = homepage.data.content.contents[3];
            var pagefrom = getUrlParam("from");
            switch (pagefrom){
                case "edu":
                    operationArr.push(eduOperation);
                    operationArr.push(movieOperation);
                    operationArr.push(mallOperation);
                    operationArr.push(apkOperation);
                    couponStation = {eduCoupon:1,movieCoupon:2,tvmallCoupon:3};
                    break;
                case "mall":
                    operationArr.push(mallOperation);
                    operationArr.push(movieOperation);
                    operationArr.push(eduOperation);
                    operationArr.push(apkOperation);
                    couponStation = {eduCoupon:3,movieCoupon:2,tvmallCoupon:1};
                    break;
                case "apk":
                    operationArr.push(apkOperation);
                    operationArr.push(movieOperation);
                    operationArr.push(mallOperation);
                    operationArr.push(eduOperation);
                    couponStation = {eduCoupon:4,movieCoupon:2,tvmallCoupon:3};
                    break;
                default :
                    operationArr.push(movieOperation);
                    operationArr.push(mallOperation);
                    operationArr.push(eduOperation);
                    operationArr.push(apkOperation);
                    couponStation = {eduCoupon:3,movieCoupon:1,tvmallCoupon:2};
                    break;
            }
            var street = document.getElementById("street");
            for(var i=0;i<operationArr.length;i++){
                var pannelDiv = document.createElement("div");
                pannelDiv.setAttribute('class', 'panel');
                pannelDiv.setAttribute('id', 'panel'+(i+1));
                for(var j=0;j<3;j++){
                    var blockDiv = document.createElement("div");
                    blockDiv.setAttribute('class', 'block coocaabtn');
                    blockDiv.setAttribute('action', operationArr[i].contents[j].extra.block_content_info.action);
                    blockDiv.style.backgroundImage = "url("+operationArr[i].contents[j].extra.block_content_info.imgs.poster.images[0]+")";
                    var couponDiv = document.createElement("div");
                    couponDiv.setAttribute('class', 'couponDiv');
                    couponDiv.innerHTML="&nbsp";
                    blockDiv.appendChild(couponDiv);
                    pannelDiv.appendChild(blockDiv);
                }
                street.appendChild(pannelDiv);
            }
            $(".block").unbind("itemClick").bind("itemClick",function(){
                var startAction = $(this).attr("action");
                var pkgname = JSON.parse(startAction).packagename;
                var bywhat = JSON.parse(startAction).bywhat;
                var byvalue = JSON.parse(startAction).byvalue;
                var a = '{ "pkgList": ["'+pkgname+'"] }';
                var param1="",param2="",param3="",param4="",param5="";
                var str = "[]";
                coocaaosapi.getAppInfo(a, function(message) {
                    console.log("getAppInfo====" + message);
                    if(JSON.parse(message)[pkgname].status == -1){
                        coocaaosapi.startAppStoreDetail(pkgname,function(){},function(){});
                    }else{
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
                        coocaaosapi.startCommonNormalAction(param1,param2,param3,param4,param5,str,function(){},function(){});
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
                    console.log("------------u-coupon----result-------------"+JSON.stringify(data));
                    var data = {"code":"50100","msg":"成功","data":{"tvmallCoupon":["购物"],"eduCoupon":["教育"],"movieCoupon":["影视"]}}
                    var showEdu = data.data.eduCoupon[0];
                    var showMall = data.data.tvmallCoupon[0];
                    var showMovie = data.data.movieCoupon[0];
                    showcoupon(showEdu,couponStation["eduCoupon"]);
                    showcoupon(showMall,couponStation["tvmallCoupon"]);
                    showcoupon(showMovie,couponStation["movieCoupon"]);
                    function showcoupon(name,stationID) {
                        if(name!=""&&name!=null){
                            $("#panel"+stationID+" .block:eq(0) .couponDiv").html("<div class='konw'>已获<span class='couponname'>"+name+"</span>优惠券,可马上使用</div>").addClass('zy_coupon');
                        }
                    }

                },
                error: function(error) {
                    console.log("--------访问失败" + JSON.stringify(error));
                }
            });
        },
        error: function(error) {
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
            console.log("返回状态：" + JSON.stringify(data));

            if(data.data.koiNews.code == "50100")
            {
                if(data.data.koiNews.result.length > 0){
                    var box = document.getElementById("koiNewsul");
                    for(var i=0;i<data.data.koiNews.result.length;i++){
                        var list = document.createElement("li");
                        list.innerHTML="恭喜"+data.data.koiNews[i].result.province+data.data.koiNews[i].result.city+" 用户"+data.data.koiNews[i].result.nickName+" 成为"+data.data.koiNews[i].result.queue+"号锦鲤";
                        box.appendChild(list);
                    }
                    showAwardlist("#koiNews","#koiNewsul");
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
                            $("#koiNewsul").html("距离超级锦鲤诞生 还剩："+transTime+"天");
                        } else if (transTime == 1) {
                            var transTime = Math.ceil(cutdown / 1000 / 60 / 60);
                            if (transTime > 1) {
                                $("#koiNewsul").html("距离超级锦鲤诞生 还剩："+transTime+"小时");
                            } else if (transTime == 1) {
                                var transTime = Math.ceil(cutdown / 1000 / 60);
                                if (transTime > 1) {
                                    $("#koiNewsul").html("距离超级锦鲤诞生 还剩："+transTime+"分钟");
                                } else if (transTime == 1) {
                                    var transTime = Math.ceil(cutdown / 1000 );
                                    if (transTime >= 0) {
                                        $("#koiNewsul").html("距离超级锦鲤诞生 还剩："+transTime+"秒");
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
                list.innerHTML=data.data.fakeNews[i].nickName+" 带麋鹿散步 获得"+data.data.fakeNews[i].awardName;
                box.appendChild(list);
            }
            showAwardlist("#fakeNews","#fakeNewsul");
        },
        error: function(error) {
            console.log("-----------访问失败---------"+JSON.stringify(error));
        }
    });
}

