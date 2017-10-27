$(function(){
    initSocket("chat");
});


//发送消息
function sendMsg(){
    //消息内容
    var message = $("#message").val();
    //随机用户名
    var userName = $("#userName").val();
    //主题名称
    var topicName = $("#topicName").val();
    if(message == "" || message == null){
        layer.msg("内容不能为空！", {icon: 5});
        return;
    }
    //请求后台
    ajaxPost("/api/chat",{"topicName":topicName,"message":userName+":"+message});
}

var webSocket = null;
var lockReconnect = false;//避免重复连接

function initSocket(myWebsocket) {

    window.onbeforeunload = function () {
        //离开页面时的其他操作
        alert("bye");
    };

    if (!window.WebSocket) {
        console("您的浏览器不支持websocket！");
        return false;
    }

    var target = 'ws://' + window.location.host + ctx+"/websocket/"+myWebsocket;

    if ('WebSocket' in window) {
        webSocket = new WebSocket(target);
    } else if ('MozWebSocket' in window) {
        webSocket = new MozWebSocket(target);
    } else {
        alert('WebSocket is not supported by this browser.');
        return;
    }


    // 收到服务端消息
    webSocket.onmessage = function (msg) {
        var div =document.getElementById('xwc_div');
        //var div = $("#xwc_div");
        var _html = "";
        _html+="<div class=\"last\" style='color: #666666;font-size: 16px;padding: 5px 0;'><span class=\"row1\" style='padding-left: 5px'>"+msg.data+"</span><span class=\"row1\" style='float:right;padding-right: 10px'>"+new Date().toLocaleString()+"</span></div>";
        $(".xwc_div").append(_html);
        div.scrollTop = div.scrollHeight;
        //如果获取到消息，心跳检测重置
        //拿到任何消息都说明当前连接是正常的
        heartCheck.reset().start();
    };

    // 异常
    webSocket.onerror = function (event) {
        console.log(event);
        reconnect(myWebsocket);
    };

    // 建立连接
    webSocket.onopen = function (event) {
        console.log(event);
        //心跳检测重置
        heartCheck.reset().start();
    };

    // 断线
    webSocket.onclose = function () {
        console.log("websocket断开连接");
        reconnect(myWebsocket);
    };
}

function reconnect(myWebsocket) {
    if(lockReconnect) return;
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
        initSocket(myWebsocket);
        lockReconnect = false;
    }, 2000);
}

//心跳检测
var heartCheck = {
    timeout: 60000,//60秒
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function () {
        var self = this;
        this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            webSocket.send("HeartBeat");
            self.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
                webSocket.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
        }, this.timeout)
    }
};

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}