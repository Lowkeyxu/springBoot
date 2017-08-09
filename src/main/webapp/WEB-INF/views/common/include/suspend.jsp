<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>悬浮栏</title>
</head>
<body>
<!--右边菜单-->
<div class="body_right">
    <ul>
        <li class="car"><a href="javascript:void(0);" onclick="toHref('1')"><span></span></a></li>
        <li class="service"><a href="javascript:void(0)"><span></span></a>
            <div class="service_qq" style="min-height: 0px;">
                <c:forEach items="${qqService}" var="qqDict">
                    <em onclick="clickToQQ('${qqDict.value}')">${qqDict.label}</em>
                </c:forEach>
                <i><img src="${ctx}/static/skin/common/images/ar.png"></i>
            </div>
        </li>
        <li class="letter"><a href="javascript:void(0);" onclick="toLetter()"><span></span></a></li>
        <li class="return"><a href="#"><span></span></a></li>
    </ul>
</div>
<!--右边菜单 end-->

<script>
    function toHref(num){
        var data = ajaxPost("/getNowUser.ajax",null);
        if(checkNull(data)){
            if(num == '1'){
                window.location.href = ctx + "/cart.html";
            }else if(num == '2'){
                window.location.href = ctx + "m.html";
            }
        }else{
            toLogin();
        }
    }

    //弹出客服弹出框页面
    function clientServicesPage(){
        var left = (screen.width-600)/2;
        var top = (screen.height-500)/2;
        window.open('http://wpa.qq.com/msgrd?v=3&uin=1361088383&site=qq&Menu=yes','',
                'width=600,height=500,left='+left+', top='+top+',toolbar=no, status=no, menubar=no, resizable=yes, scrollbars=yes');
        return false;
    }

    //意见反馈
    function toLetter(){
        layer.open({
            title:'平台意见反馈',
            type: 2,
            area: ['800px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content: ctx+'/toLetter.html'
        });
    }

</script>

</body>
</html>
