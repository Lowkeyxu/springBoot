<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
    <title>供应商左侧菜单</title>
</head>
<body>

<!-- 左侧菜单 -->
<div class="mainleft">
    <div class="gy-lmeun">
        <c:set var="isZc" value="${user.isZc}" />
        <c:forEach items="${user.sellerMenuList}" var="buss">
            <dl>
                <dt <c:if test="${busSelectedMenuVo.pParentId eq buss.id}">class="on"</c:if> >

                    <c:choose>
                        <c:when test="${buss.zcFlag eq '1'}">
                            <c:if test="${isZc eq '1'}">
                                <a href="javascript:void(0);">${buss.name}&nbsp;</a>
                            </c:if>
                        </c:when>
                        <c:otherwise>
                            <a href="javascript:void(0);">${buss.name}&nbsp;</a>
                        </c:otherwise>
                    </c:choose>

                </dt>
                <dd <c:if test="${busSelectedMenuVo.pParentId ne buss.id}">style="display: none;"</c:if> >
                    <ul>
                        <c:forEach items="${buss.childList}" var="childbuss">
                            <li <c:if test="${busSelectedMenuVo.parentId eq childbuss.id && not empty childbuss.childList}">class="lmeun on" style="background-image:url(${ctx}/static/skin/common/images/lmenu_b.png)" </c:if>
                                <c:if test="${busSelectedMenuVo.parentId eq childbuss.id && empty childbuss.childList}">class="on" </c:if>
                                <c:if test="${busSelectedMenuVo.parentId ne childbuss.id && not empty childbuss.childList}">class="lmeun"</c:if>  >
                                <c:if test="${empty childbuss.childList}">
                                    <c:choose>
                                        <c:when test="${childbuss.zcFlag eq '1'}">
                                            <c:if test="${isZc eq '1'}">
                                                <a href="${ctx}${childbuss.href}" >${childbuss.name}&nbsp;</a>
                                            </c:if>
                                        </c:when>
                                        <c:otherwise>
                                            <a href="${ctx}${childbuss.href}" >${childbuss.name}&nbsp;</a>
                                        </c:otherwise>
                                    </c:choose>
                                </c:if>
                                <c:if test="${not empty childbuss.childList}">

                                    <c:choose>
                                        <c:when test="${childbuss.zcFlag eq '1'}">
                                            <c:if test="${isZc eq '1'}">
                                                <a href="javascript:void(0);" >${childbuss.name}&nbsp;</a>
                                            </c:if>
                                        </c:when>
                                        <c:otherwise>
                                            <a href="javascript:void(0);" >${childbuss.name}&nbsp;</a>
                                        </c:otherwise>
                                    </c:choose>

                                    <p>
                                        <c:forEach items="${childbuss.childList}" var="thirdbuss">
                                            <c:choose>
                                                <c:when test="${thirdbuss.zcFlag eq '1'}">
                                                    <c:if test="${isZc eq '1'}">
                                                        <a href="${ctx}${thirdbuss.href}">${thirdbuss.name}&nbsp;</a>
                                                    </c:if>
                                                </c:when>
                                                <c:otherwise>
                                                    <a href="${ctx}${thirdbuss.href}">${thirdbuss.name}&nbsp;</a>
                                                </c:otherwise>
                                            </c:choose>
                                            <%--<a href="${ctx}${thirdbuss.href}">${thirdbuss.name}</a>--%>
                                        </c:forEach>
                                    </p>
                                </c:if>
                            </li>
                        </c:forEach>
                    </ul>
                </dd>
            </dl>
        </c:forEach>
    </div>
</div>
<!-- 左侧菜单 -->
</body>
</html>

