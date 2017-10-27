<%--
  Created by IntelliJ IDEA.
  User: xwc12_000
  Date: 2017/10/27
  Time: 10:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>聊天室</title>
    <style type="text/css">
        .xwc_div{
            margin:10px 0px 0px 80px;
            width:800px;
            height:400px;
            border:1px solid #ccc;
            overflow-y :scroll;
        }
    </style>
    <script type="text/javascript" src="${ctx}/page/api/chat.js"></script>
</head>
<body>
<div class="webtitle">
    <b>聊天室</b>
</div>
<form id="chatroom">
    <!-- 检索开始 -->
    <div class="xwc_div" id="xwc_div">

    </div>
    <!-- 检索开始 -->
    <div class="gysearchbox clearfix">
        <dl>
            <dt>主题名称：</dt>
            <dd>
                <input id="topicName" name="topicName" type="text" class="Simpo-input Simpo-input200 required" placeholder="请输入主题名称" value="xwc"/>
                <a href="http://localhost:8161/admin/topics.jsp" target="_blank">查询</a>
            </dd>
        </dl>
        <dl>
            <dt>消息内容：</dt>
            <dd>
                <textarea id="message"  name="message" rows="4" placeholder="请输入聊天内容" class="Simpo-input required" style="width: 360px"></textarea>
            </dd>
        </dl>
        <label><input type="button" class="Edit-input  Edit-input-yellow" onclick="sendMsg()" value="发送" /></label>
    </div>
    <div class="gysearchbox clearfix">
        <dl>
            <dt>用户名：</dt>
            <dd>
                <input type="hidden" id="userName" value="${userName}" />
                <dt>${userName}</dt>
            </dd>
        </dl>
    </div>
</form>
</body>
</html>
