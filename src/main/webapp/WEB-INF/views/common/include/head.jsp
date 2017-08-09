<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%--
  Created by IntelliJ IDEA.
  User: ypq
  Date: 2016/11/7
  Time: 16:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
</head>
<body>
<!-- 顶部 -->
<div class="headtop">
    <div class="w1200 mr" >
        <p class="fl">欢迎来到Spring<em>|</em>
            <c:if test="${empty userVo}"><a href="${ctx}/login.html">登录</a><em>|</em><a href="${ctx}/reg.html">注册</a></c:if>
        </p>
    </div>
</div>
<div class="clear"></div>
<!-- 顶部 -->

</body>
</html>

