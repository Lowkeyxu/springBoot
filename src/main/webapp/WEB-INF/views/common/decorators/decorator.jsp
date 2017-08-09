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

    <script type="text/javascript" src="${ctx}/static/js/jquery.js"></script>
    <script type="text/javascript" src="${ctx}/static/js/common.js"></script>
    <script type="text/javascript" src="${ctx}/page/api/Api.js"></script>

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
