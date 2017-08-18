<%--
  Created by IntelliJ IDEA.
  User: xwc12_000
  Date: 2017/8/9
  Time: 15:04
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>免费API</title>
    <script type="text/javascript" src="${ctx}/page/api/Api.js"></script>
</head>
<body>
<div class="webtitle">
    <b>快递查询</b>
</div>
<br class="clear"/>
<form id="searchorder">
    <!-- 检索开始 -->
    <!-- 检索开始 -->
    <div class="gysearchbox clearfix">
        <dl>
            <dt>请选择快递：</dt>
            <dd>
                <c:if test="${empty code}">
                    <button type="button" class="btn">全部</button><span class="caret"></span>
                    <ul class="SIMPO_Select_content" style="display:none" >
                        <li class="SIMPO_Select_item" lval="" ><a href="javascript:void(0);" >全部</a></li>
                        <c:forEach items="${EmsList}" var="list">
                            <li class="SIMPO_Select_item" lval="${list.code}" ><a href="javascript:void(0);">${list.name}</a></li>
                        </c:forEach>
                    </ul>
                </c:if>
                <c:if test="${not empty code}">
                <button type="button" class="btn">
                    <c:forEach items="${EmsList}" var="list">
                        <c:if test="${code eq list.code}">
                            ${list.name}
                        </c:if>
                    </c:forEach>
                    全部
                </button><span class="caret"></span>
                <ul class="SIMPO_Select_content" style="display:none" >
                    <li class="SIMPO_Select_item" lval=""><a href="javascript:void(0);" >全部</a></li>
                    <c:forEach items="${EmsList}" var="list">
                        <li class="SIMPO_Select_item" lval="${list.code}"><a href="javascript:void(0);" >${list.name}</a></li>
                    </c:forEach>
                </ul>
                </c:if>
                <input type="hidden" id="type"  class="Simpo-input Simpo-input200" value=""/>
            </dd>
        </dl>
        <dl>
            <dt>快递单号：</dt>
            <dd>
                <input id="number" name="number" type="text" class="Simpo-input Simpo-input200 required" placeholder="请输入快递单号" />
            </dd>
        </dl>
        <label><input id="btnSearch" type="button" class="Edit-input  Edit-input-yellow" onclick="queryEms()" value="查询" /></label>
    </div>
    <div class="SIMPO_Table">
    <table border="0" cellspacing="0" cellpadding="0" id="resultEMS">
    </table>
    </div>
    <!-- 检索结束 -->
</form>
<br class="clear"/>
<div class="webtitle">
    <b>号码归属地查询</b>
</div>
<br class="clear"/>
<form id="searchphone">
    <!-- 检索开始 -->
    <!-- 检索开始 -->
    <div class="gysearchbox clearfix">
        <dl>
            <dt>手机号：</dt>
            <dd>
                <input id="phone" type="text" class="Simpo-input Simpo-input200 required mobile" placeholder="请输入手机号" />
            </dd>
        </dl>
        <label><input type="button" class="Edit-input  Edit-input-yellow" onclick="queryPhone()" value="查询" /></label>
    </div>
    <div class="SIMPO_Table">
        <table border="0" cellspacing="0" cellpadding="0" id="resultPHONE">
        </table>
    </div>
    <!-- 检索结束 -->
</form>
</body>
</html>
