<%--
  Created by IntelliJ IDEA.
  User: xwc12_000
  Date: 2017/8/9
  Time: 17:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>
        <sitemesh:write property='title' /> - xuwc
    </title>

    <script type="text/javascript">
        var ctx = '${ctx}';
    </script>

    <%--共通css样式--%>
    <link href="${ctx}/static/skin/common/css/Int.css?version=20161117" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/skin/manage/css/manage.css?version=20161117" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/skin/ui/css/ui.css?version=20161117" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/skin/common/css/custom.css?version=20161117" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/skin/common/css/head.css?version=20161117" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/css/common.css?version=20161117" rel="stylesheet" type="text/css" />

    <%--共通js--%>
    <%--<!-- jquery js -->--%>
    <%--<script type='text/javascript' src='${ctx}/static/js/plugins/jquery/jquery-1.12.4.js?version=20161117' ></script>--%>
    <script type='text/javascript' src='${ctx}/static/js/plugins/jquery/jquery.js' ></script>
    <%--<!--辛普自定义常用方法js -->--%>
    <script type="text/javascript" src="${ctx}/static/js/common/common.js?version=20161117"></script>

    <!-- 弹出层 -->
    <script type='text/javascript' src='${ctx}/static/js/plugins/layer/layer.min.js?version=20161117' ></script>

    <%--<!--validateCss-->--%>
    <link href='${ctx}/static/js/plugins/jquery-validation/1.11.0/jquery.validate.min.css' rel="stylesheet" type="text/css" />
    <%--<!--validate验证-->--%>
    <script type='text/javascript' src='${ctx}/static/js/plugins/jquery-validation/1.11.0/jquery.validate.min.js?version=20161117' ></script>


    <script type='text/javascript' src='${ctx}/static/skin/common/js/ui.js?version=20161117' ></script>

    <%--layui--%>
    <link rel='stylesheet' href='${ctx}/static/js/plugins/layui/css/layui.css' />
    <script style='javascript' src='${ctx}/static/js/plugins/layui/layui.js'></script>

   <%-- <script type="text/javascript" src="${ctx}/static/js/jquery.js"></script>
    <script type="text/javascript" src="${ctx}/static/js/common.js"></script>
    <script type="text/javascript" src="${ctx}/page/api/Api.js"></script>--%>

    <sitemesh:write property='head' />
</head>
<body>
<!-- 顶部开始 -->
<%--<jsp:include page="../include/head.jsp"/>--%>
<!-- 顶部结束 -->
<!-- 头部开始 -->
<%--<jsp:include page="../include/loginTop.jsp"/>--%>
<!-- 头部结束 -->
<!-- 主体内容开始 -->
<div class="mainbox clearfix">
    <sitemesh:write property='body' />
</div>
<!-- 主体内容结束 -->
<!-- 页脚 -->
<div class="mainfoot">
    <jsp:include page="../include/foot.jsp"/>
</div>
<!-- 页脚 -->
</body>
</html>
