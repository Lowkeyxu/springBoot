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
</head>
<body>
    <div>
        <label>请选择快递</label>
        <select id="emsname">
            <c:forEach items="${EmsList}" var="list">
               <option value="${list.code}">${list.name}</option>
            </c:forEach>
        </select>
    </div>
    <div>
        <label>请输入快递单号</label>
        <input type="text" id="number" value=""/>
    </div>
    <input type="button" value="查询" onclick="queryEms()"/>
</body>
</html>
