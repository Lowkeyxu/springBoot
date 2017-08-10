// 即时聊天共通js
var ptUrl=ctx+"/static/skin/manage/images/myhead.png";// 用户默认头像
$(function () {
	var talkData = ajaxPostNoLoader("/getNowUser.ajax",null);
	if(checkNull(talkData)){
		var userId = talkData.id;// 当前登录人编号
		var sendername1 = ""; // 当前登录人昵称
		if(checkNull(talkData.nickName)){
			sendername1 = talkData.nickName;
		}else{
			sendername1 = talkData.loginName;
		}
		var senderpicurl1 = talkData.photo;
		if(checkNull(senderpicurl1)){
			senderpicurl1=ctx+talkData.photo;
		}else{
			senderpicurl1=ptUrl;
		}
		// 建立一个聊天窗口应用，并设置发送者和消息接收者
		$.WebIM({
			sender : userId,
			sendername : sendername1,
			senderpicurl : senderpicurl1,
			isInitWindow : false
			// 是否打开一个窗口
		});
		// 登陆到openfire服务器
		remote.jsjac.chat.login(userId);
		remote.jsjac.register = true;
	}

});

function clickTopMessage(shopId) {
	if(!checkNull(shopId)){
		return ;
	}
	var sendData = ajaxPostNoLoader("/getNowUser.ajax",null);
	if(checkNull(sendData)){
		var userId2=sendData.id;
		var sendername2 = ""; // 发送者昵称
		if(checkNull(sendData.nickName)){
			sendername2 = sendData.nickName;
		}else{
			sendername2 = sendData.loginName;
		}
		var senderpicurl2 = sendData.photo; // 发送者头像
		if(checkNull(senderpicurl2)){
			senderpicurl2=ctx+sendData.photo;
		}else{
			senderpicurl2=ptUrl;
		}
		var receiveData = ajaxPostNoLoader("/getShopUser.ajax",{"shopId":shopId});
		if(checkNull(receiveData)){
			var receiver = receiveData.id; // 接收者用户名
			var receivername = ""; // 接收者昵称
			if(checkNull(receiveData.nickName)){
				receivername = receiveData.nickName;
			}else{
				receivername = receiveData.loginName;
			}
			var receiverpicurl = receiveData.photo; // 接收者头像
			if(checkNull(receiverpicurl)){
				receiverpicurl=ctx+receiverpicurl;
			}else{
				receiverpicurl=ptUrl;
			}
			// 建立一个聊天窗口应用，并设置发送者和消息接收者
			$.WebIM({
				sender: userId2,
				sendername: sendername2,
				senderpicurl: senderpicurl2,
				receiver: receiver,
				receivername: receivername,
				receiverpicurl: receiverpicurl,
				isInitWindow: true
			});
			// 登陆到openfire服务器
			remote.jsjac.chat.login(userId2);
		}else{
			layer.msg("暂时无法联系到此客服 ！", {icon : 2});
		}

	}else{
		toLogin()
	}
}


function clickMessagePT(userId) {
	if(!checkNull(userId)){
		return ;
	}
	var sendData = ajaxPostNoLoader("/getNowUser.ajax",null);
	if(checkNull(sendData)){
		var userId2=sendData.id;
		var sendername2 = ""; // 发送者昵称
		if(checkNull(sendData.nickName)){
			sendername2 = sendData.nickName;
		}else{
			sendername2 = sendData.loginName;
		}
		var senderpicurl2 = sendData.photo; // 发送者头像
		if(checkNull(senderpicurl2)){
			senderpicurl2=ctx+sendData.photo;
		}else{
			senderpicurl2=ptUrl;
		}
		var receiveData = ajaxPostNoLoader("/getPtUser.ajax",{"userId":userId});
		if(checkNull(receiveData)){
			var receiver = receiveData.id; // 接收者用户名
			var receivername = ""; // 接收者昵称
			if(checkNull(receiveData.nickName)){
				receivername = receiveData.nickName;
			}else{
				receivername = receiveData.loginName;
			}
			var receiverpicurl = receiveData.photo; // 接收者头像
			if(checkNull(receiverpicurl)){
				receiverpicurl=ctx+receiverpicurl;
			}else{
				receiverpicurl=ptUrl;
			}
			// 建立一个聊天窗口应用，并设置发送者和消息接收者
			$.WebIM({
				sender: userId2,
				sendername: sendername2,
				senderpicurl: senderpicurl2,
				receiver: receiver,
				receivername: receivername,
				receiverpicurl: receiverpicurl,
				isInitWindow: true
			});
			// 登陆到openfire服务器
			remote.jsjac.chat.login(userId2);
		}else{
			layer.msg("暂时无法联系到此客服 ！", {icon : 2});
		}

	}else{
		toLogin()
	}
}