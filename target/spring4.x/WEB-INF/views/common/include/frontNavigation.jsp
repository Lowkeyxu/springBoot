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

<!-- 导航 -->
<div class="bg_f">
    <div class="mt10 topnav" style="margin-top: 0px;">
        <div class="w1200 mr">
            <div class="hq_nav">
                <div class="hq_nav_b" >
                    <em onclick="goodsClassify();">全部商品分类</em>
                    <ul>
                        <input type="hidden" id="navationAllUrl" value="${navationAllUrl}">
                        <c:forEach items="${moduleList}" var="list" varStatus="status" begin="0" end="6">
                            <li><a href="${ctx}${list.linkUrl}" name="navationLi" <c:if test="${navationUrl eq list.linkUrl}">class="nav_over"</c:if> >
                                    <%--${list.moduleName}--%>
                                <c:choose>
                                    <c:when test="${fn:length(list.moduleName) > 6}">
                                        <c:out value="${fn:substring(list.moduleName, 0, 6)}" />
                                    </c:when>
                                    <c:otherwise>
                                        <c:out value="${list.moduleName}" />
                                    </c:otherwise>
                                </c:choose>
                            </a></li><%--<c:if test="${status.index == 0}">class="nav_over"</c:if> onclick="daoHangClass(this,'${list.linkUrl}');"--%>
                        </c:forEach>
                    </ul>
                </div>
            </div>


            <%--首页导航--%>
            <div style="position:relative; z-index:9999;display: none;" id="oneDivDis">
                <!--分类-->
                <div class="nav_left" style="display:block; position:absolute; top:0px; left:0px;" >
                    <div class="hq_nav_left fl">
                        <c:forEach items="${listType}" var="oneType" varStatus="status"  begin="0" end="5">
                            <c:if test="${not empty oneType}">
                                <!--1F分类 -->
                                <dl class="nav_dl">
                                    <dt class="nav_dt"><span class="tab${status.index+1}"><a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${oneType.id}')">${oneType.typeName}</a></span>
                                    <p style="height:30px;line-height:30px;overflow: hidden;">
                                        <c:forEach items="${oneType.childList}" var="twoType" varStatus="i">
                                            <a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${twoType.id}')">${twoType.typeName}<c:if test="${!i.last}">&nbsp;|</c:if></a>
                                        </c:forEach>
                                    </p>
                                    </dt>
                                    <div class="list_item hiddendiv" id="twoDivDis" style="display: none;height: auto;">
                                        <div class="itemleft">
                                            <div class="classify" style="height: auto;min-height: 450px">
                                                <c:forEach items="${oneType.childList}" var="twoType" varStatus="v">
                                                    <dl>
                                                        <dt><a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${twoType.id}')">${twoType.typeName}</a></dt>
                                                        <dd>
                                                            <c:forEach items="${twoType.childList}" var="threeType">
                                                                <a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${threeType.id}')">${threeType.typeName}</a>
                                                            </c:forEach>
                                                        </dd>
                                                    </dl>
                                                </c:forEach>
                                            </div>
                                        </div>
                                    </div>
                                </dl>
                                <!--1F分类 end-->
                            </c:if>
                        </c:forEach>
                        <c:forEach items="${listType}" var="oneType" varStatus="status"  begin="6">
                            <c:if test="${not empty oneType}">
                                <!--1F分类 -->
                                <dl class="nav_dl" name="dlNone" style="display: none">
                                    <dt class="nav_dt"> <span class="tab${status.index+1}"><a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${oneType.id}')">${oneType.typeName}</a></span>
                                    <p style="height:30px;line-height:30px;overflow: hidden;">
                                        <c:forEach items="${oneType.childList}" var="twoType" varStatus="i">
                                            <a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${twoType.id}')">${twoType.typeName}<c:if test="${!i.last}">&nbsp;|</c:if></a>
                                        </c:forEach>
                                    </p>
                                    </dt>
                                    <div class="list_item hiddendiv" id="twoDivDis" style="display: none;height: auto;">
                                        <div class="itemleft">
                                            <div class="classify" style="height: auto;min-height: ${listType.size()*70}px">
                                                <c:forEach items="${oneType.childList}" var="twoType" varStatus="v">
                                                    <dl>
                                                        <dt><a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${twoType.id}')">${twoType.typeName}</a></dt>
                                                        <dd>
                                                            <c:forEach items="${twoType.childList}" var="threeType">
                                                                <a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${threeType.id}')">${threeType.typeName}</a>
                                                            </c:forEach>
                                                        </dd>
                                                    </dl>
                                                </c:forEach>
                                            </div>
                                        </div>
                                    </div>
                                </dl>
                                <!--1F分类 end-->
                                <!--6F分类 end-->

                            </c:if>

                        </c:forEach>
                        <c:if test="${listType.size()>6}">
                            <div class="clear" id="divClear"></div>
                            <div class="left_more" id="dd" onclick="showDl(this);" style="margin-top: auto;" >更多分类</div>
                        </c:if>


                    </div>
                </div>
            </div>

            <%--金格商城导航--%>
            <div style="position:relative; z-index:9999;display: none;" id="oneJinDivDis">
                <!--分类-->
                <div class="nav_left" style="display:block; position:absolute; top:0px; left:0px;">
                    <div class="hq_nav_left fl">
                        <!--1F分类 -->
                        <c:forEach items="${listJinType}" var="oneType" varStatus="status" begin="0" end="4">
                            <c:if test="${not empty oneType}">
                                <!--1F分类 -->
                                <dl class="nav_dl">
                                    <dt class="nav_dt"><span class="tab${status.index+1}"><a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${oneType.id}')">${oneType.typeName}</a></span>
                                    <p style="height:30px;line-height:30px;overflow: hidden;">
                                        <c:forEach items="${oneType.childList}" var="twoType" varStatus="i">
                                            <a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${twoType.id}')">${twoType.typeName}<c:if test="${!i.last}">&nbsp;|</c:if></a>
                                        </c:forEach>
                                    </p>
                                    </dt>
                                    <div class="list_item hiddendiv" id="twoJinDivDis" style="display: none;height: auto;">
                                        <div class="itemleft">
                                            <div class="classify" style="height: auto;min-height: 420px;">
                                                <c:forEach items="${oneType.childList}" var="twoType" varStatus="v">
                                                    <dl>
                                                        <dt><a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${twoType.id}')">${twoType.typeName}</a></dt>
                                                        <dd>
                                                            <c:forEach items="${twoType.childList}" var="threeType">
                                                                <a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${threeType.id}')">${threeType.typeName}</a>
                                                            </c:forEach>
                                                        </dd>
                                                    </dl>
                                                </c:forEach>
                                            </div>
                                        </div>
                                    </div>
                                </dl>
                                <!--1F分类 end-->
                            </c:if>
                        </c:forEach>
                        <c:forEach items="${listJinType}" var="oneType" varStatus="status"  begin="5">
                            <c:if test="${not empty oneType}">
                                <!--1F分类 -->
                                <dl class="nav_dl" name="dlJinNone" style="display: none">
                                    <dt class="nav_dt"> <span class="tab${status.index+1}"><a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${oneType.id}')">${oneType.typeName}</a></span>
                                    <p style="height:30px;line-height:30px;overflow: hidden;">
                                        <c:forEach items="${oneType.childList}" var="twoType" varStatus="i">
                                            <a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${twoType.id}')">${twoType.typeName}<c:if test="${!i.last}">&nbsp;|</c:if></a>
                                        </c:forEach>
                                    </p>
                                    </dt>
                                    <div class="list_item hiddendiv" id="twoJinDivDis" style="display: none;height: auto;">
                                        <div class="itemleft">
                                            <div class="classify" style="height: auto;min-height:${listJinType.size()*70}px">
                                                <c:forEach items="${oneType.childList}" var="twoType" varStatus="v">
                                                    <dl>
                                                        <dt><a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${twoType.id}')">${twoType.typeName}</a></dt>
                                                        <dd>
                                                            <c:forEach items="${twoType.childList}" var="threeType">
                                                                <a href="javascript:void(0);" onclick="jumpGgUrl('${ctx}/item/search.html?t=${threeType.id}')">${threeType.typeName}</a>
                                                            </c:forEach>
                                                        </dd>
                                                    </dl>
                                                </c:forEach>
                                            </div>
                                        </div>
                                    </div>
                                </dl>
                                <!--1F分类 end-->
                                <!--6F分类 end-->
                            </c:if>
                        </c:forEach>

                        <c:if test="${listJinType.size()>6}">
                            <div class="clear"></div>
                            <div class="left_more" style="margin-top: 27px;" id="dd2" onclick="showDl(this)">更多分类</div>
                        </c:if>
                        <!--1F分类 end-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 导航结束 -->
<script>

    $(function(){
        var url = window.location.href;
        var getUrl = url.substring(0, url.indexOf('/', url.indexOf('/') + 2)) + ctx + "/index.html";
        if (getUrl == url || url == (url.substring(0, url.indexOf('/', url.indexOf('/') + 2)) + ctx + "/")) {
            $("#oneDivDis").show();
        }else if(url.indexOf(ctx + "/jkmall/index") >= 0){
            $("#oneJinDivDis").show();
        }

        if (getUrl != url && url.indexOf(ctx + "/jkmall/index") < 0) {
            //首页显示隐藏
            $(".hq_nav_b em,#oneDivDis").hover(function(){
                if (getUrl != url && url != (url.substring(0, url.indexOf('/', url.indexOf('/') + 2)) + ctx + "/")) {
                    $("#oneDivDis").show();
                }
            },function(){
                if (getUrl != url  && url != (url.substring(0, url.indexOf('/', url.indexOf('/') + 2)) + ctx + "/")) {
                    $("#oneDivDis").hide();
                }
            });
        }

        if (url.indexOf(ctx + "/jkmall/index") >= 0 && url.indexOf(ctx + "/index") < 0) {
            //金格商城显示隐藏
            $(".hq_nav_b em,#oneJinDivDis").hover(function(){
                if (url.indexOf(ctx + "/jkmall/index") < 0) {
                    $("#oneJinDivDis").show();
                }
            },function(){
                if (url.indexOf(ctx + "/jkmall/index") < 0) {
                    $("#oneJinDivDis").hide();
                }
            });
        }


        //显示隐藏
        $(".nav_dt,#twoJinDivDis").hover(function(){
            $(this).parent().find("#twoJinDivDis").show();
        },function(){
            $("div #twoJinDivDis").each(function(){
                $(this).hide();
            })
        });

        //显示隐藏
        $(".nav_dt,#twoDivDis").hover(function(){
            $(this).parent().find("#twoDivDis").show();
        },function(){
            $("div #twoDivDis").each(function(){
                $(this).hide();
            })
        });

        //给金恪加样式
        if($("#oneJinDivDis").css("display")=="block"){
            var head=document.getElementsByTagName('head')[0];　　　　　//获取到head元素　
            var link=document.createElement('link');　　　　　　　　　　　　 //创建link元素节点，也就是link标签
            link.rel="stylesheet";　　　　　　　　　　　　　　　　　　　　//为link标签添加rel属性
            link.href="${ctx}/static/css/channelJinKe.css";　　　//为link标签添加href属性 ， 属性值是css外链样式表的路径
            head.appendChild(link);
        }

        //展开后光标离开收起
        $("#dd").parent().parent().hover(function(e){
//            e.stopPropagation();
        },function(e){
//            e.stopPropagation();
            if($("#dd").text()=="收起"){
                showDl($("#dd"));
            }
        });

        //展开后光标离开收起
        $("#dd2").parent().parent().hover(function(e){
//            e.stopPropagation();
        },function(e){
//            e.stopPropagation();
            if($("#dd2").text()=="收起"){
                showDl($("#dd2"));
            }
        });

        //去掉导航高亮样式
//        var navation = $("#navationAllUrl").val();
       var navation = "${ctx}/index.html,${ctx}/bids/index.html,${ctx}/buy/search.html,${ctx}/jkmall/index.html,${ctx}/enterprises/index.html,${ctx}/brand/index.html,${ctx}/investment/index.html";

        if(navation.indexOf(url.substring(url.indexOf('/', url.indexOf('/') + 2),url.length-1))<0 && url != (url.substring(0, url.indexOf('/', url.indexOf('/') + 2)) + ctx + "/")){
            $(".hq_nav_b em ,a[name='navationLi']").removeClass("nav_over");
//            $(".hq_nav_b em ,a[name='navationLi']").eq(1).addClass("nav_over");       //其他页面定位到首页
        }
    });

    //商品分类展开关闭
    function goodsClassify() {
        var url = window.location.href;
        var getUrl = url.substring(0, url.indexOf('/', url.indexOf('/') + 2)) + ctx + "/index.html";
        if(getUrl == url || url == (url.substring(0, url.indexOf('/', url.indexOf('/') + 2)) + ctx + "/")){
            $("#oneDivDis").show();
        }else if (url.indexOf(ctx + "/jkmall/index") >= 0) {
            if ($('#oneJinDivDis').css('display') == 'none') {
                $("#oneJinDivDis").show();
            } else {
                $("#oneJinDivDis").hide();
            }
        }else{
            if ($('#oneDivDis').css('display') == 'none') {
                $("#oneDivDis").show();
            } else {
                $("#oneDivDis").hide();
            }
        }
    }

    //导航样式
    /*function daoHangClass(obj,url) {
        window.location.href = ctx + url;
        $(obj).parent().find("li").find("a").attr("class","");
        $(obj).attr("class","nav_over");
    }*/

    //更多分类
    function showDl(obj){
        var url = window.location.href;
        if (url.indexOf(ctx + "/jkmall/index") >= 0) {
            if($("dl[name='dlJinNone']").css('display')=='none'){
                $("dl[name='dlJinNone']").show();
                $(obj).text("收起");
                $(obj).attr("style","margin-top: auto;");
                $(obj).addClass("left_more_cur");
            }else{
                $("dl[name='dlJinNone']").hide();
                $(obj).text("更多分类");
                $(obj).attr("style","margin-top: 27px;");
                $(obj).removeClass("left_more_cur");
            }
        }else{
            if($("dl[name='dlNone']").css('display')=='none'){
                $("dl[name='dlNone']").show();
                $(obj).text("收起");
                $(obj).attr("style","margin-top: auto;");
                $(obj).addClass("left_more_cur");
            }else{
                $("dl[name='dlNone']").hide();
                $(obj).text("更多分类");
                $(obj).attr("style","margin-top: auto;");
                $(obj).removeClass("left_more_cur");
            }
        }

    }

    //链接跳转
    function jumpGgUrl(url){
        window.open(url);
    }
</script>

</body>
</html>

