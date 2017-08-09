<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <script type="text/javascript" src="${ctx }/static/js/common/placeholder.js"></script>
</head>
<body>

<!-- 搜索区域 -->
<div class="bg_f">
    <div class="w1200 mr pad10" style="height: 100px;">
        <div class="logo fl " style="margin-top: 0px;"><a href="${ctx}/index.html">
            <c:if test="${not empty logo && not empty logo.logo}">
                <img src="${ctx}${logo.logo}" style="width:224px;height:80px;"/>
            </c:if>
            <c:if test="${ empty logo || empty logo.logo}">
                <img src="${ctx}/static/skin/common/images/logo.png" />
            </c:if></a>
        </div>
        <div class="fl topsearch ml20" style="width:700px;">
            <input type="hidden" id="searchType" value="${searchType}">
            <ul>
                <li><a href="javascript:void(0)" id="liCur_1" style="text-decoration:blink;" onclick="changeSearch(this,'1')" class="cur">产品</a></li>
                <li class="line"></li>
                <li><a href="javascript:void(0)" id="liCur_2" style="text-decoration:blink;" onclick="changeSearch(this,'2')">供应商</a></li>
                <li class="line"></li>
                <li><a href="javascript:void(0)" id="liCur_3" style="text-decoration:blink;" onclick="changeSearch(this,'3')">求购</a></li>
                <div class="clear"></div>
            </ul>
            <div class="search_box" style="width:700px;">
                <input type="text" class="fl" id="ButSearch" placeholder="请输入商品名称" style="width: 650px;" value="${goodsName}">
                <button class="fr" onclick="search(this)" id="searchButton"></button>
            </div>
            <c:if test="${not empty hotWords}">
                <p class="font12 mt10" id="typeOne" style="display: none;">热门搜索:
                    <c:forEach items="${hotWords.goodsList}" var="hotWords" varStatus="status" begin="0" end="4" >
                    <a style="text-decoration:blink;" href="${ctx}/item/search.html?m=${hotWords.hotwords}" title="${hotWords.hotwords}">
                        <c:choose>
                            <c:when test="${fn:length(hotWords.hotwords) > 4}">
                                <c:out value="${fn:substring(hotWords.hotwords, 0, 4)}" />
                            </c:when>
                            <c:otherwise>
                                <c:out value="${hotWords.hotwords}" />
                            </c:otherwise>
                        </c:choose>
                    </a>
                    </c:forEach>
                <div class="clear"></div>
                </p>


                <p class="font12 mt10" id="typeTwo" style="display: none;">热门搜索:
                    <c:forEach items="${hotWords.shopsList}" var="hotWords" varStatus="status" begin="0" end="4">
                        <a style="text-decoration:blink;" href="${ctx}/company/search.html?getIn=${hotWords.hotwords}" title="${hotWords.hotwords}">
                            <c:choose>
                                <c:when test="${fn:length(hotWords.hotwords) > 4}">
                                    <c:out value="${fn:substring(hotWords.hotwords, 0, 4)}" />
                                </c:when>
                                <c:otherwise>
                                    <c:out value="${hotWords.hotwords}" />
                                </c:otherwise>
                            </c:choose>
                        </a>
                    </c:forEach>
                </p>


                <p class="font12 mt10" id="typeThree" style="display: none;">热门搜索:
                    <c:forEach items="${hotWords.qgList}" var="hotWords" varStatus="status" begin="0" end="4">
                        <a style="text-decoration:blink;" href="${ctx}/buy/search.html?name=${hotWords.hotwords}" title="${hotWords.hotwords}">
                            <c:choose>
                                <c:when test="${fn:length(hotWords.hotwords) > 4}">
                                    <c:out value="${fn:substring(hotWords.hotwords, 0, 4)}" />
                                </c:when>
                                <c:otherwise>
                                    <c:out value="${hotWords.hotwords}" />
                                </c:otherwise>
                            </c:choose>
                        </a>
                    </c:forEach>
                </p>

            </c:if>
        </div>
        <div class="fr">
            <button class="release" onclick="pubilsh()">发布询价单</button>
        </div>
        <div class="clear"></div>
    </div>
</div>

<!-- 头部结束 -->

<script type="text/javascript">

    var JPlaceHolder = {
        //检测
        _check : function(){
            return 'placeholder' in document.createElement('input');
        },
        //初始化
        init : function(){
            if(!this._check()){
                this.fix();
            }
        },
        //修复
        fix : function(){
            jQuery(':input[placeholder]').each(function(index, element) {
                var self = $(this), txt = self.attr('placeholder');
                self.parent().find("span").remove();
                self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
                var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
                var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
                self.focusin(function(e) {
                    holder.hide();
                }).focusout(function(e) {
                    if(!self.val()){
                        holder.show();
                    }
                });
                holder.click(function(e) {
                    holder.hide();
                    self.focus();
                });
            });
        }
    };

    $(function(){

        JPlaceHolder.init();
//       $('#ButSearch').placeholder();
        $(document).keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == 13) {
                if($("#ButSearch").is(":focus")==true){
                    search($("#searchButton"));
                    return false;
                }
            }
        });

        //默认商品
        var searchType = $("#searchType").val();
        if(!checkNull(searchType)){
            searchType="1";
        }
        changeSearch($("#liCur_"+searchType),searchType)
    });

    function pubilsh(){
        var data = ajaxPostNoLoader("/getNowUser.ajax",null);

        if(checkNull(data)){
            var userVo = ajaxPostNoLoader("/getNowBuser.ajax",{"userId":data.id});
            if('0' == data.isComplete){   //资料未完善 禁止访问
                layer.confirm('发布资料前，请先完善个信息，是否前往个人中心完善个人资料？', {
                    btn: ['确认','取消'] //按钮
                }, function(){
                    window.location.href = ctx + "/m/info.html";
                },function(){
                });

                /*layer.msg("资料未完善，不允许发布，请先前往个人中心完善资料",{icon:2},function(){
                    window.location.href = ctx + "/m/info.html";
                });*/

            }else if('0' == userVo.isUsed){
                layer.msg("供应商账号被停用，不允许发布",{icon:2});
                return false;
            }else{
                window.location.href = ctx + "/m/buy/form.html";
            }

        }else {
            toLogin();
        }
    }

    //搜索更换  1  产品  2 供应商 3 求购
    function changeSearch(obj,type){
        //执行
//        JPlaceHolder.init();
        $(obj).parent().parent().find("a").attr("class", "");
        $(obj).attr("class", "cur");
        $("#searchType").val(type);
        $("#ButSearch").attr("placeholder", "");
//        $("#ButSearch").removeAttr("placeholder");
        if(type == 1){
            $("#ButSearch").attr("placeholder", "请输入商品名称");
            //热搜词显示
            $("#typeOne").show();
            $("#typeTwo").hide();
            $("#typeThree").hide();
        }else if(type == 2){
            $("#ButSearch").attr("placeholder", "请输入供应商名称");
            //热搜词显示
            $("#typeOne").hide();
            $("#typeTwo").show();
            $("#typeThree").hide();
        }else{
            $("#ButSearch").attr("placeholder", "请输入求购名称");
            //热搜词显示
            $("#typeOne").hide();
            $("#typeTwo").hide();
            $("#typeThree").show();
        }
        JPlaceHolder.init();
    }

    //搜索
    function search(obj){

        var type = $("#searchType").val();
        var searchName = $("#ButSearch").val();

        //将type放入session  1 产品  2  供应商  3  求购
        ajaxPostNoLoader("/setTypeSession.ajax",{"type":type});

        if (checkNull(searchName)) {
            if (!checkNull(type) || type == '1') {  //产品
                location.href = ctx + "/item/search.html?m=" + searchName;
            } else if (type == '2') {       //供应商
                location.href = ctx + "/company/search.html?getIn=" + searchName;
            } else if (type == '3') {       //求购
                location.href = ctx + "/buy/search.html?companyName=" + searchName;
            }
        } else {
            if (!checkNull(type) || type == '1') {
                location.href = ctx + "/item/search.html";
            } else if (type == '2') {
                location.href = ctx + "/company/search.html";
            } else if (type == '3') {
                location.href = ctx + "/buy/search.html";
            }
        }
    }

</script>

</body>
</html>

