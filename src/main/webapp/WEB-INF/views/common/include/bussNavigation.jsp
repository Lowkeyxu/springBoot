<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>供应商中心导航</title>
    <script type="text/javascript">
        function system(){
            layer.open({
                type : 2,
                title : "配置菜单",
                shadeClose : true,
                move : false,
                shade : [ 0.4 ],
                area : [ '592px', '520px' ],
                shift : 2,
                content : [ ctx + '/b/shop/systemOpen.html', 'no' ]
            });
        }
    </script>
</head>
<body>
<!-- 导航 -->
<div class="gy-navbox">
    <div class="gy-navauto">
        <dl>
            <dt>供应商首页</dt>
            <dd>
                <ul>
                    <c:if test="${empty comList}">
                        <c:set var="countMenu" value="0"></c:set>
                        <c:forEach items="${menuList}" var="menuchildList">
                            <c:forEach items="${menuchildList.childList}" var="menuchild" varStatus="s">
                                <c:if test="${countMenu lt 6}">
                                    <c:if test="${empty menuchild.childList}">
                                        <c:if test="${menuchild.navigationFlag eq '1'}">
                                            <li><a href="${ctx}${menuchild.href}">${menuchild.name}</a></li>
                                            <c:set var="countMenu" value="${countMenu+1}"></c:set>
                                        </c:if>
                                    </c:if>
                                    <c:if test="${not empty menuchild.childList}">
                                        <c:forEach items="${menuchild.childList}" var="menuthird" varStatus="ss">
                                            <c:if test="${menuthird.navigationFlag eq '1'}">
                                                <li><a href="${ctx}${menuthird.href}">${menuthird.name}</a></li>
                                                <c:set var="countMenu" value="${countMenu+1}"></c:set>
                                            </c:if>
                                        </c:forEach>
                                    </c:if>
                                </c:if>
                            </c:forEach>
                        </c:forEach>
                    </c:if>
                    <c:forEach items="${comList}" var="com">
                        <li><a href="${ctx}${com.href}">${com.name}</a></li>
                    </c:forEach>
                </ul>
                <a href="javaScript:void(0);" onclick="system();" class="system"><img src="${ctx}/static/skin/ui/images/system.png" /></a>
            </dd>
        </dl>
    </div>
</div>
<!-- 导航结束 -->
<div class="clear"></div>
</body>
</html>

