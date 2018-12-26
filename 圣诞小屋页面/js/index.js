var t1 = "";
var _testur0 = "http://beta.restful.lottery.coocaatv.com//light";
var packGoodsObj = [{"goodId": 14823,"goodImg": "images/packid/14823.png","goodName": "QUEENS'MATE面条机"
}, {"goodId": 14822,"goodImg": "images/packid/14822.png","goodName": "Queens真空破壁机"
}, {"goodId": 14821,"goodImg": "images/packid/14821.png","goodName": "奥力福80鹅绒被家有独家特供组"
}, {"goodId": 14820,"goodImg": "images/packid/14820.png","goodName": "霸王"
}, {"goodId": 14819,"goodImg": "images/packid/14819.png","goodName": "宝家洁自甩水平拖套装"
}, {"goodId": 14818,"goodImg": "images/packid/14818.png","goodName": "贝尔莱德便携熨烫机"
}, {"goodId": 14817,"goodImg": "images/packid/14817.png","goodName": "玻妞擦窗机器人"
}, {"goodId": 14816,"goodImg": "images/packid/14816.png","goodName": "德国科莱默智能电饭煲"
}, {"goodId": 14815,"goodImg": "images/packid/14815.png","goodName": "杜邦智能蒸汽烤箱"
}, {"goodId": 14814,"goodImg": "images/packid/14814.png","goodName": "拉菲波尔多红酒"
}, {"goodId": 14813,"goodImg": "images/packid/14813.png","goodName": "洛比小狸云智能学习机器人"
}, {"goodId": 14812,"goodImg": "images/packid/14812.png","goodName": "美国西屋踢脚线取暖器"
}, {"goodId": 14811,"goodImg": "images/packid/14811.png","goodName": "诺肯不锈钢浴室柜"
}, {"goodId": 14810,"goodImg": "images/packid/14810.png","goodName": "蒲尔菲富氢养生水杯"
}, {"goodId": 14809,"goodImg": "images/packid/14809.png","goodName": "荣事达智能脱糖养生煲"
}, {"goodId": 14808,"goodImg": "images/packid/14808.png","goodName": "山水触摸全钢电陶炉"
}, {"goodId": 14807,"goodImg": "images/packid/14807.png","goodName": "五粮液1918佳酿纪念酒"
}, {"goodId": 14806,"goodImg": "images/packid/14806.png","goodName": "先锋智能移动地暖"
}, {"goodId": 14803,"goodImg": "images/packid/14803.png","goodName": "芯启源太空舱按摩椅"
}, {"goodId": 14800,"goodImg": "images/packid/14800.png","goodName": "新潮流多用电动无线清洁机"}];

var couponGoodsId = "14773,14772,14771,14770,14769"; //推荐位id
var couponGoodsIdArr = [14773, 14772, 14771, 14770, 14769]; //推荐位id

var flag = false;
var index = 0;
var TextNum2;

$(function() {
	console.log("--------------------loading");
	
	$("#homePage").css("display", "block");
	map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	buttonInit();
	loopAwardList();
	packGoodsShow();
	getPackedGoodsList();
//	$("#homePage").css("display","none");
//	$("#dialogPage").css("display","block");
	//	$("#firstLoadRule").css("display","block");
	//	map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("firstLoadRule"), "btn-focus", function() {}, function(val) {}, function(obj) {});

	//showThisAward();
//	$("#startDrawBox").css("display","block");
//	map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
});

function buttonInit() {
	$("#firstLoadRule").unbind("itemClick").bind("itemClick", function() {
		console.log("首次进入弹窗规则的我知道了");
		$("#firstLoadRule").css("display", "none");
		$("#firstLoadDraw").css("display", "block");
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("drawAward1"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$(".drawAwards").unbind("itemClick").bind("itemClick", function() {
		$("#firstLoadDraw").css("display", "none");
		$("#firstLoadAward").css("display", "block");
		//获取当前点击奖品的奖品类型
		$("#redAwardImg").css("display", "none");
		$("#couponAwardImg").css("display", "none");
		$("#entityAwardImg").css("display", "none");

		var _type = 0; //0-红包将   1-优惠券 2-实体将
		if(_type == 0) {
			console.log("获得红包+收下红包");
			$("#redAwardImg").css("display", "block");
			$("#getRedBag .imgBlur").attr("src", "images/dialog/orange_blur.png");
			$("#getRedBag .imgFocus").attr("src", "images/dialog/orange_focus.png");
		} else if(_type == 1) {
			$("#couponAwardImg").css("display", "block");
			var _loginStatus = "true";
			if(_loginStatus == "false") {
				console.log("获得优惠券+未登录+领取使用");
				$("#getRedBag .imgBlur").attr("src", "images/dialog/getAndUse_blur.png");
				$("#getRedBag .imgFocus").attr("src", "images/dialog/getAdnUse_focus.png");
			} else {
				console.log("获得优惠券+已登录+使用红包");
				$("#getRedBag .imgBlur").attr("src", "images/dialog/gotoUse_blur.png");
				$("#getRedBag .imgFocus").attr("src", "images/dialog/gotoUse_focus.png");
			}
		} else if(_type == 2) {
			console.log("获得实体将+收下红包");
			$("#entityAwardImg").css("display", "block");
			$("#getRedBag .imgBlur").attr("src", "images/dialog/orange_blur.png");
			$("#getRedBag .imgFocus").attr("src", "images/dialog/orange_focus.png");
		}
		$("#getRedBag").attr("curType", _type);
		map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("getRedBag"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#getRedBag").unbind("itemClick").bind("itemClick", function() {
		var _curType = $(this).attr("curType");
		console.log(_curType);
		if(_curType == 0 || _curType == 2) {
			console.log("点击了收下红包");
			$("#firstLoadAward").css("display", "none");
			$("#firstSendRed").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("redQrcode"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else if(_curType == 1) {
			var _loginStatus = "false";
			if(_loginStatus == "false") {
				console.log("点击了领取使用+启登录");
			} else {
				console.log("点击了立即使用+跳转产品包页面");
			}
		}
	});
	$("#close").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了返回+退掉弹窗");
		$("#firstLoadAward").css("display", "none");
		$("#dialogPage").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#useRedBag").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了领取使用优惠券");

	});
	$(".homeBtns").unbind("focus").bind("focus", function() {
		var _fIndex = $(".homeBtns").index($(this));
		if(_fIndex == 5) {
			console.log("落焦在打包商品上");
			$("#packGoodsBox").css("display", "block");
			$("#packDialog").css("display", "block");
			$("#packHome .imgBlur").css("display", "none");
			$("#packHome .imgFocus").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("packHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			$("#packGoodsBox").css("display", "none");
			$("#packDialog").css("display", "none");
			$("#packHome .imgBlur").css("display", "block");
			$("#packHome .imgFocus").css("display", "none");
		}
		if(_fIndex == 6) {
			console.log("落焦在锦鲤上");
			$("#koiListBox").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("koiListDiv"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			$("#koiListDiv").trigger("focus");
			$("#koiList .imgBlur").css("display", "none");
			$("#koiList .imgFocus").css("display", "block");
			//$("#koiListBox2").css("display","block");
		} else {
			$("#koiListBox").css("display", "none");
			//$("#koiListBox2").css("display","none");
		}
		if(_fIndex == 3) {
			console.log("落焦在麋鹿休息区");
			$("#restDialog").css("display", "block");
			//$("#restDialog2").css("display","block");
		} else if(_fIndex == 4) {
			console.log("落焦在黄金小屋上");
			$("#goldDialog").css("display", "block");
			//$("#goldDialog2").css("display","block");
			//$("#goldDialog3").css("display","block");
		} else if(_fIndex == 7) {
			console.log("落焦在采购小屋上");
			$("#purchaseDialog").css("display", "block");
			//$("#purchaseDialog").css("display","block");
		}
	});
	$(".homeBtns").unbind("blur").bind("blur", function() {
		var _fIndex = $(".homeBtns").index($(this));
		if(_fIndex == 3) {
			console.log("麋鹿休息区失去焦点");
			//判断活动是否结束
			$("#restDialog").css("display", "none");
			//$("#restDialog2").css("display","none");
		} else if(_fIndex == 4) {
			console.log("黄金小屋失去焦点");
			//判断活动   未开始、已开始、已结束
			$("#goldDialog").css("display", "none");
			//$("#goldDialog2").css("display","none");
			//$("#goldDialog3").css("display","none");
		} else if(_fIndex == 5) {
			console.log("打包小屋失去焦点");
			//判断活动是否结束
			$("#packDialog").css("display", "none");
			//$("#packGoodsBox2").css("display","none");
		} else if(_fIndex == 6) {
			console.log("锦鲤失去焦点");
			//判断活动是否结束
			//$("#packDialog").css("display","none");
			//$("#koiListBox2").css("display","none");
		} else if(_fIndex == 7) {
			console.log("采购小屋失去焦点");
			//判断活动是否结束
			$("#purchaseDialog").css("display", "none");
			//$("#purchaseDialog").css("display","none");
		}
	});
	$("#koiListDiv").unbind("focus").bind("focus", function() {
		console.log("锦鲤列表获得焦点");
		$("#koiList .imgBlur").css("display", "none");
		$("#koiList .imgFocus").css("display", "block");
	});
	$("#koiListDiv").unbind("blur").bind("blur", function() {
		console.log("锦鲤列表失去焦点");
		$("#koiList .imgBlur").css("display", "block");
		$("#koiList .imgFocus").css("display", "none");
	});
	$("#goldHome").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了黄金小屋");
		$("#dialogPage").css("display", "block");
		//判断用户的铃铛是否足够
		var bellNumber = 3;
		if(bellNumber < 5) {
			$("#noFiveBell").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("doTask"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		} else {
			$("#hasFiveBell").css("display", "block");
			map = new coocaakeymap($(".coocaa_btn2"), document.getElementById("fiveBellEnsure"), "btn-focus", function() {}, function(val) {}, function(obj) {});
		}
	});

	$("#activeRule").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了活动规则");

	});
	$("#fiveBellEnsure").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了黄金小屋弹窗的确定键");

	});
	$("#nextTime").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了黄金小屋弹窗的下次再说");
		$("#dialogPage").css("display", "none");
		$("#firstLoadDraw").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#fiveBellCancel").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了黄金小屋弹窗的取消键");
		$("#dialogPage").css("display", "none");
		$("#hasFiveBell").css("display", "none");
		map = new coocaakeymap($(".coocaa_btn"), document.getElementById("goldHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
	});
	$("#doTask").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了黄金小屋弹窗的去做任务");
		$("#dialogPage").css("display", "none");
		$("#noFiveBell").css("display", "none");
		//打包任务、麋鹿任务、采购任务 判断各个任务已完成次数
		var curToId = 2; //0-已完成打包任务不超过2次、1-已完成打包任务超过2次且麋鹿任务不超过2次、2-打包和麋鹿超过两次且采购不超过两次
		if(curToId == 0) {
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("packHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			$("#packHome").trigger("focus");
		} else if(curToId == 1) {
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("restArea"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			$("#restArea").trigger("focus");
		} else if(curToId == 2) {
			map = new coocaakeymap($(".coocaa_btn"), document.getElementById("purchaseHome"), "btn-focus", function() {}, function(val) {}, function(obj) {});
			$("#purchaseHome").trigger("focus");
		}
	});
	$("#restArea").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了麋鹿休息区");

	});
	$("#purchaseHome").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了采购小屋");
		getAddPack();
	});
	$("#hasEndBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("点击了活动已结束的我的礼物按钮+跳转我的礼物页面");
	});
	$("#startDrawBtn").unbind("itemClick").bind("itemClick", function() {
		console.log("开始抽奖");
		var machine7 = $("#machine7").slotMachine({
			active: 0,
			delay: 800,
			complete: function() {
				console.log("hello" + this.active);
			}
		});
		machine7.futureActive = 4;
		machine7.shuffle(3);
	});
}

function buttonInitAfter() {
	$(".packGoodsItem").unbind("focus").bind("focus", function() {
		$("#packGoodsInfo").css("display", "block");
		console.log("打包商品获得焦点");
		var _fIndex = $(".packGoodsItem").index($(this));
		var _curName = $(this).attr("goodName");
		console.log(_curName);
		$("#packGoodName").html(_curName);
		var _itemWidth = $(".packGoodsItem:eq(0)").outerWidth(true);
		console.log(_itemWidth);
		if(_fIndex > 1) {
			var myScrollTopValue = _itemWidth * (_fIndex - 2) * (-1);
			$("#packGoodsUl").stop(true, true).animate({
				left: myScrollTopValue
			}, {
				duration: 0,
				easing: "swing"
			});
		}
		if(_fIndex == 0) {
			$("#packGoodsInfo").css("left", "733px");
			$("#packGoodsUl").stop(true, true).animate({
				left: 0
			}, {
				duration: 0,
				easing: "swing"
			});
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
		var _fIndex = $(".packGoodsItem").index($(this));
		
		if (_fIndex == 0) {
			$("#hasPackedGif").css("left","175px");
		}else if(_fIndex == 1){
			$("#hasPackedGif").css("left","355px");
		}else{
			$("#hasPackedGif").css("left","535px");
		}
		$("#hasPackedGif").css("display","block");
	});
}

//奖品展示列表循环
function loopAwardList() {
	$.ajax({
		type: "get",
		async: true,
		url: _testur0 + "/xmas/news",
		data: {
			"activeId": 87,
			"lotteryId": 88
		},
		dataType: "json",
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == 50100) {
				console.log("接口返回正常");
				document.getElementById("awardDisplayUl").innerHTML = "";
				clearInterval(t1);
				var liListItems = "";
				for(var i = 0; i < data.data.fakeNews.length; i++) {
					liListItems += '<li class="awardDisplayLi">恭喜' + data.data.fakeNews[i].nickName + '获得' + data.data.fakeNews[i].awardName + '</li>';
				}
				$("#awardDisplayUl").append(liListItems);
				marqueeTheWinnerList();
			} else if(data.code == 50001) {
				console.log("活动不存在或者已经下线");
			}
		},
		error: function(error) {
			console.log("--------访问失败" + JSON.stringify(error));
		}
	});
}

function marqueeTheWinnerList() {
	var screenNum = $(".awardDisplayLi").length;
	var eachHeight = $(".awardDisplayLi:eq(0)").height();
	console.log(screenNum + "--" + eachHeight);
	var a = 1;
	if(screenNum > 1) {
		t1 = setInterval(marquee, 3000);
	}

	function marquee() {
		$("#awardDisplayUl").stop(true, true).animate({
			top: a * eachHeight * (-1)
		}, {
			duration: 0,
			easing: "swing"
		});
		a++;
		if(a == screenNum) {
			a = 0
		}
	}
}

function packGoodsShow() {
	var packGoodsObj2 = [14800, 14803, 14806, 14807, 14808, 14809];
	var newGoodsIdArray = [];
	var newGoodsNameArray = [];
	var newGoodsImgArray = [];
	var newGoodsPacked = [];
	for(var i = 0; i < packGoodsObj.length; i++){
		var _curGoodId = packGoodsObj[i].goodId;
		console.log(packGoodsObj2.indexOf(_curGoodId));
		if(packGoodsObj2.indexOf(_curGoodId) >= 0) {
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
	console.log(newGoodsIdArray);
	for (var j = 0; j < newGoodsIdArray.length; j++) {
		$(".packGoodsItem:eq("+j+")").attr("curId",newGoodsIdArray[j]);
		$(".packGoodsItem:eq("+j+")").attr("goodName",newGoodsNameArray[j]);
		$(".packGoodsItem:eq("+i+")").attr("packstate",newGoodsPacked[j]);
		if (newGoodsPacked[j] == 1) {
			var _innerHtml = '<img class="goodsImages" src="' + newGoodsImgArray[j] + '"/><img class="hasPackedImages" src="images/haspacked.png"/>';
		} else{
			var _innerHtml = '<img class="goodsImages" src="' + newGoodsImgArray[j] + '"/>';
		}
		$(".packGoodsItem:eq("+j+")").html(_innerHtml);
	}
	buttonInitAfter();
}

function showThisAward() {
	$("#thanks_Bg").css("display", "block");
	var a = 2; //1-打包任务  2-支付任务 3-游玩任务
	var b = 3; //1-购物优惠红包  2-现金红包 3-实物奖
	if(a == 1) {
		$("#thanks_info1").html("感谢你帮圣诞爷爷打包礼物");
	} else if(a == 2) {
		$("#thanks_info1").html("感谢你帮圣诞爷爷采购礼物");
	} else if(a == 3) {
		$("#thanks_info1").html("感谢你带麋鹿玩耍");
	}
	if(b == 1) {
		$("#thanks_btn2 .imgBlur").attr("src", "images/dialog/button/checkpacklist_blur.png");
		$("#thanks_btn2 .imgFocus").attr("src", "images/dialog/button/checkpacklist_focus.png");
		$("#btnName").html("使用红包");
		$("#btnName2").html("查看打包清单");
		$("#thanks_btn2").css("left", "945px");
		$("#thanks_btn2").css("width", "210px");
		$("#thanks_info3").html("*特价购买打包商品特权已生效，限时福利快去看看");
	} else if(b == 2) {
		$("#thanks_btn2 .imgBlur").attr("src", "images/dialog/button/red_blur.png");
		$("#thanks_btn2 .imgFocus").attr("src", "images/dialog/button/red_focus.png");
		$("#btnName").html("收下红包");
		$("#btnName2").html("返回");
		$("#thanks_btn2").css("left", "990px");
		$("#thanks_btn2").css("width", "147px");
		$("#thanks_info3").html('*目前累计获得红包<span id="allRedNumber">XXX</span>元');
	} else if(b == 3) {
		$("#thanks_btn2 .imgBlur").attr("src", "images/dialog/button/checkpacklist_blur.png");
		$("#thanks_btn2 .imgFocus").attr("src", "images/dialog/button/checkpacklist_focus.png");
		$("#btnName").html("立即使用");
		$("#btnName2").html("返回");
		$("#thanks_btn2").css("left", "990px");
		$("#thanks_btn2").css("width", "147px");
		$("#thanks_info3").html("*特价购买打包商品特权已生效，限时福利快去看看");
	}
	map = new coocaakeymap($(".coocaa_btn2"), null, "btn-focus", function() {}, function(val) {}, function(obj) {});
}

//获取打包清单
function getAddPack() {
	var data = JSON.stringify({
		"token": _accessToken,
		"cudid": _udid + "_" + _mac
	});
	console.log("=============" + data);
	var haspack = false;
	$.ajax({
		type: "get",
		async: true,
		url: "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/packGoodsList",
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
						packDiv.setAttribute('goodsName', arrPack[i].goodsInfo.goodsName);
						packDiv.setAttribute('goodsThumb', arrPack[i].goodsInfo.goodsThumb);
						packDiv.setAttribute('promotePrice', arrPack[i].goodsInfo.promotePrice);
						packDiv.setAttribute('shopPrice', arrPack[i].goodsInfo.shopPrice);
						packDiv.setAttribute('type', "packnormal");
						packDiv.style.backgroundImage = "url(" + arrPack[i].goodsInfo.goodsThumb + ")";
						var goodsName = document.createElement("div");
						goodsName.setAttribute('class', 'goodsName');
						goodsName.innerHTML = arrPack[i].goodsInfo.goodsName;
						var nowPrice = document.createElement("div");
						nowPrice.setAttribute('class', 'nowPrice');
						nowPrice.innerHTML = "￥" + arrPack[i].goodsInfo.shopPrice;
						var oldPrice = document.createElement("div");
						oldPrice.setAttribute('class', 'oldPrice');
						oldPrice.innerHTML = "原价：" + arrPack[i].goodsInfo.promotePrice;
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
			} else {
				console.log("----------访问失败------");
			}
			if(access_token != "" && access_token != null && access_token != undefined) {
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
		"token": access_token
	});
	$.ajax({
		type: "get",
		async: true,
		url: "http://beta.api.tvshop.coocaa.com/cors/tvUsersAPI/goodsCoupon",
		data: {
			param: data
		},
		dataType: "json",
		success: function(data) {
			console.log("------------selectGoodsCoupon----result-------------" + JSON.stringify(data));
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
	$("._jrgoods").unbind("focus").bind("focus", function() {
		$(this).prev("._jrborder").show();
		var changeY = 0;
		var firstnum = $("#_jrpackbox ._jrgoodsbox ._jrcoocaabtn").index($(this));
		var secondnum = $("#_jrrecommendbox ._jrgoodsbox ._jrcoocaabtn").index($(this));
		if($("#_jrpackzone").css("display") == "none") {
			changeY = Math.floor(secondnum / 5) * 100;
		} else {
			if(firstnum != -1) {
				changeY = 0;
			} else {
				changeY = Math.floor(secondnum / 5) * 100 + 450;
			}
		}
		$("#_jrbuyZoneInner").css("transform", "translate3D(0, -" + changeY + "px, 0)");
	})

	$("._jrgoods").unbind("blur").bind("blur", function() {
		$(this).prev("._jrborder").hide();
	})

	if(haspack) {
		map = new coocaakeymap($("._jrcoocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
		$("._jrcoocaabtn:eq(0)").trigger("focus");
	} else {
		map = new coocaakeymap($("._jrcoocaabtn"), $("#_jrrecommendbox ._jrgoodsbox ._jrcoocaabtn:eq(0)"), "btnFocus", function() {}, function(val) {}, function(obj) {});
		$("#_jrrecommendbox ._jrgoodsbox ._jrcoocaabtn:eq(0)").trigger("focus");
	}
	$("._jrgoods").unbind("itemClick").bind("itemClick", function() {
		var _thisType = $(this).attr("type");
		var _thisGoodsId = $(this).attr("goodsId");
		if(_thisType == "packnormal") {
			coocaaosapi.startAppShopDetail(_thisGoodsId, function() {
				console.log("====")
			}, function() {
				console.log("error-----")
			});
		} else if(_thisType == "packmore") {
			console.log("goto PACKList Page====");
		} else if(_thisType == "goodsnormal") {
			coocaaosapi.startAppShopDetail(_thisGoodsId, function() {
				console.log("====")
			}, function() {
				console.log("error-----")
			});
		} else if(_thisType == "goodsmore") {

		}
	})
}

function getPackedGoodsList() {
	$("#packGoodState").html("按“确定”完成打包任务");
	var data = JSON.stringify({
		"token": "2.6d36e1aaa8a24cafa960f1c28aab8eb1",
		"cudid": "49971737_001a9ae2ff79"
	});
	console.log(data);
	$("#hasPackedGif").css("display","none");
	$.ajax({
		type: "get",
		async: true,
		url: "http://beta.api.tvshop.coocaa.com/cors/tvCartAPI/packGoodsList",
		data: {
			param: data
		},
		dataType: "json",
		success: function(data) {
			console.log(JSON.stringify(data));
			if(data.code == 0) {
				packGoodsObj2 = [];
				if(data.data == null) {
					console.log("未打包过商品");
					console.log("黄金屋页面的打包商品部分的逻辑");
					packGoodsShow();
					console.log("打包清单页面的逻辑");
					$("#toastEmpty").css("display", "block");
				} else {
					for(var i = 0; i < data.data.length; i++) {
						console.log("黄金屋页面的打包商品部分的逻辑");
						packGoodsObj2.push(data.data[i].goodsId);
						console.log("打包清单页面部分的逻辑");
						var goodsInfo = (data.data[i].goodsInfo);
						console.log("i:"+i+", "+goodsInfo.goodsName+" "+ goodsInfo.promotePrice + " "+goodsInfo.shopPrice+" "+goodsInfo.goodsThumb);
						var goodsItem = '<div  class="goodsItemClass coocaa_btn_pack" goodsid=" ' + data.data[i].goodsId + ' "> \
											<div class="packGoodsItemPic"></div>										\
											<div class="packGoodsItemName">' + goodsInfo.goodsName + '</div>\
											<div class="packGoodsItemLabel">\
												<div class="packGoodsItemLabelPriceNow">￥' + goodsInfo.shopPrice + '</div>\
												<div class="packGoodsItemLabelTip">原价：</div>\
												<div class="packGoodsItemLabelPriceOld">￥' + goodsInfo.promotePrice + '</div>\
											</div>\
										</div>';
						$("#packGoodsList").append(goodsItem);
						var thumb = "url(http://sky.fs.skysrt.com/statics/webvip/webapp/christmas/img/p"+data.data[i].goodsId+".jpg)";
						$("#packGoodsList .goodsItemClass:last-of-type .packGoodsItemPic").css("background-image", "url("+thumb+")");
					}
					packGoodsShow();
					$("#packGoodsContainer").css("display", "block");
					if(data.data.length <= 5) { //显示更多商品
						var list = $("#moreGoodsContainer .goodsItemClass");
						var len2 = list.length;
						for(var i=0; i<len2; i++) {
							list.eq(i).attr("goodsid", _moreGoodsIdArr[i]);
						}
						$("#moreGoodsContainer").css("display", "block");
					}else{
						$("#moreGoodsContainer").css("display", "none");
					}
				}
				buttonInitAfter2();
			} else {
				console.log("----------访问失败------");
			}
		},
		error: function(error) {
			console.log("--------访问失败" + JSON.stringify(error));
		}
	});
}