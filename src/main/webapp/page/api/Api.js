$(function(){
    initSocket("user");

    $("#searchorder").validate({
        submitHandler: function(form){
            //快递编码
            var type = $("#type").val();
            //快递单号
            var number = $("#number").val();
            ajaxPostCallback("/api/queryLogistics",{"type":type,"number":number},function(data){
                if(data != "" && data != null){
                    //var json = eval('(' + data + ')');
                    var json = data;
                    if(json.status == 200){
                        var _html = "";
                        var weekday=new Array(7);
                        weekday[0]="星期天";
                        weekday[1]="星期一";
                        weekday[2]="星期二";
                        weekday[3]="星期三";
                        weekday[4]="星期四";
                        weekday[5]="星期五";
                        weekday[6]="星期六";
                        $(json.data).each(function(i,v){
                            var date = new Date(v.time);
                            _html += "<tr class=\"last\"><td class=\"row1\">";
                            _html += "<span class=\"day\">"+v.time+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"week\">"+weekday[date.getUTCDay()]+"</span>";
                            _html += "</td><td class=\"status status-check\">&nbsp;<div class=\"col2\"><span class=\"step\"><span class=\"line1\"></span>" +
                                "</span></div></td><td class=\"context\">"+ v.context+"</td></tr>";
                        });
                        $("#resultEMS").html(_html);
                    }else{
                        layer.msg(json.message, {icon: 5});
                    }
                }else{
                    layer.msg("请求失败！", {icon: 5});
                }
            });
        },
        errorContainer: "#messageBox",
        errorPlacement: function(error, element) {
            $("#messageBox").text("输入有误，请先更正。");
            if (element.is(":checkbox")||element.is(":radio")||element.parent().is(".input-append")){
                error.appendTo(element.parent().parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#searchphone").validate({
        submitHandler: function(form){
            var phone = $("#phone").val();
            ajaxPostCallback("/api/queryPhone",{"phone":phone},function(data){
                if(data != null){
                    data = eval(data);
                    var _html = "";
                    _html+="<tr class=\"last\"><td class=\"row1\">"+data.catName+"</td></tr>";
                    _html+="<tr class=\"last\"><td class=\"row1\">"+data.carrier+"</td></tr>";
                    _html+="<tr class=\"last\"><td class=\"row1\">"+data.province+"</td></tr>";
                    _html+="<tr class=\"last\"><td class=\"row1\">"+data.telString+"</td></tr>";
                    $("#resultPHONE").html(_html);
                }else{
                    layer.msg("请求失败！", {icon: 5});
                }
            });
        },
        errorContainer: "#messageBox",
        errorPlacement: function(error, element) {
            $("#messageBox").text("输入有误，请先更正。");
            if (element.is(":checkbox")||element.is(":radio")||element.parent().is(".input-append")){
                error.appendTo(element.parent().parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#searchmq").validate({
        submitHandler: function(form){
            var topicName = $("#topicName").val();
            var message = $("#message").val();
            ajaxPost("/api/sendTopicMessage",{"topicName":topicName,"message":message});
            //layer.msg("发送成功！", {icon: 6});
        },
        errorContainer: "#messageBox",
        errorPlacement: function(error, element) {
            $("#messageBox").text("输入有误，请先更正。");
            if (element.is(":checkbox")||element.is(":radio")||element.parent().is(".input-append")){
                error.appendTo(element.parent().parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
});

//快递查询
function queryEms(){
    $("#searchorder").submit();
    return false;
}

//查询号码归属地
function queryPhone(){
    $("#searchphone").submit();
    return false;
}

/**
 * 发送消息
 */
function sendMsg(){
    $("#searchmq").submit();
    return false;
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
        var _html = "";
        _html+="<tr class=\"last\"><td class=\"row1\">"+msg.data+"</td></tr>";
        $("#resultMQ").prepend(_html);
        //如果获取到消息，心跳检测重置
        //拿到任何消息都说明当前连接是正常的
        heartCheck.reset().start();
        //alert(msg.data);
        // 关闭连接
        // webSocket.onclose();
        // console.log(msg);
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
    reset: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function(){
        var self = this;
        this.timeoutObj = setTimeout(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            webSocket.send("HeartBeat");
            self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                webSocket.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
        }, this.timeout)
    }
}