// 将form序列化结果转为json
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push($.trim(this.value) || '');
        } else {
            o[this.name] = $.trim(this.value) || '';
        }
    });
    return o;
};

/**
 * 提示框alert弹出
 *
 */
(function($) {
    $.extend({
        /**
         * @parem msg 消息内容
         * @parem title 消息标题 可以为null
         * @parem lockFlag 是否锁屏
         * @parem func 回调函数 可以为bool
         */
        iAlert : function(msg, title, lockFlag, func) {
            var api, W;
            if (!frameElement) { // 不在Iframe中
                api = null;
                W = window;
            } else if (frameElement.api) {
                api = frameElement.api;
                W = api.opener;
            } else {
                api = null;
                W = window;
            }
            if (!func) {
                W.$.dialog({
                    id : "iAlert",
                    title : title ? title : "提示",
                    lock : lockFlag ? true : lockFlag,
                    content : '<p style="font-size:14px;">' + msg + '</p>',
                    max : false,
                    drag : false,
                    min : false,
                    resize : false,
                    parent : api,
                    icon : '32X32/hits.png',
                    ok : true
                });
            } else {
                W.$.dialog({
                    id : "iAlert",
                    title : title ? title : "提示",
                    lock : lockFlag ? true : lockFlag,
                    content : '<p style="font-size:14px;">' + msg + '</p>',
                    max : false,
                    drag : false,
                    min : false,
                    parent : api,
                    resize : false,
                    icon : '32X32/hits.png',
                    ok : func
                });
            }

        }
    });
})(jQuery);

/**
 * 确认框 confirm 弹出
 *
 * @param $
 */
(function($) {
    $.extend({
        /**
         * @parem content 内容
         * @parem title 标题 可以为null
         * @parem yes 点击确定时的回调函数
         * @parem no 点击取消时的回调函数
         * @parem parent 参数 格式{name:valeue,name:valeue}
         */
        iConfirm : function(content, title, yes, no, parent) {
            var api, W;
            if (!frameElement) { // 不在Iframe中
                api = null;
                W = window;
            } else if (frameElement.api) {
                api = frameElement.api;
                W = api.opener;
            } else {
                api = null;
                W = window;
            }

            var defaultParam = $.extend({
                id : "iConfirm",
                title : title ? title : "确认",
                icon : '32X32/i.png',
                fixed : true,
                lock : true,
                content : '<p style="font-size:14px;">' + content + '</p>',
                resize : false,
                parent : api,
                ok : function(here) {
                    return yes.call(this, here);
                },
                cancel : function(here) {
                    return no && no.call(this, here);
                }
            }, parent);

            W.$.dialog(defaultParam);
        }
    });
})(jQuery);

/**
 *
 * 弹出框
 *
 * @param 参数
 */
(function($) {

    $.extend({
        iDialog : function(param) {
            var api, W;
            if (!frameElement) { // 不在Iframe中
                api = null;
                W = window;
            } else if (frameElement.api) {
                api = frameElement.api;
                W = api.opener;
            } else {
                api = null;
                W = window;
            }
            W.creater = window;
            var defaultParam = $.extend({
                max : false,
                min : false,
                drag : false,
                lock : true,
                top : "30%",
                width : '600px',
                height : "400px",
                resize : false,
                ok : true,
                okVal : "保存",
                cancelVal : "关闭",
                cancel : true, /* 为true等价于function(){} */
                parent : api
            }, param);
            return W.$.dialog(defaultParam);
        }
    });

    /* 右下脚滑动通知 */
    $.iDialog.notice = function(options) {
        var opts = options || {}, api, aConfig, hide, wrap, top, duration = opts.duration || 800;

        var config = {
            id : 'Notice',
            left : '100%',
            top : '100%',
            fixed : true,
            drag : false,
            resize : false,
            init : function(here) {
                api = this;
                aConfig = api.config;
                wrap = api.DOM.wrap;
                top = parseInt(wrap[0].style.top);
                hide = top + wrap[0].offsetHeight;

                wrap.css('top', hide + 'px').animate({
                    top : top + 'px'
                }, duration, function() {
                    opts.init && opts.init.call(api, here);
                });
            },
            close : function(here) {
                wrap.animate({
                    top : hide + 'px'
                }, duration, function() {
                    opts.close && opts.close.call(this, here);
                    aConfig.close = $.noop;
                    api.close();
                });
                return false;
            }
        };

        for ( var i in opts) {
            if (config[i] === undefined)
                config[i] = opts[i];
        }
        return $.iDialog(config);
    };

})(jQuery);

/**
 * 分页共通
 *
 * @param url
 *            请求的url
 * @param condition
 *            请求的参数
 * @param pageNum
 *            当前页
 * @param scollTop
 *            分页页面滚动位置  1-移到页面结果集div顶部
 * @param result
 *            结果所 填充的Div 返回的html代码
 * @param callback
 *            请求完成的回调函数
 */
function commonPagination(url, condition, pageNum, pageSize,result, callback) {
    if (typeof (condition) == "undefined" || condition == null)
        condition = {};
    var res = "#searchResult";
    if (result != undefined) {
        res = result;
    }
    var java_pager_pageSize = 10;

    if ($(res).find("input[name='pageSize']").length > 0){// 每页条数
        java_pager_pageSize = $(res).find("input[name='pageSize']").val();
    } else if (pageSize != undefined && parseInt(pageSize) > 0) {
        java_pager_pageSize = parseInt(pageSize);
    }

    $.ajax({
        type : "POST",
        url : ctx + url,
        data : $.extend(condition, {
            pageNo : pageNum,
            pageSize : java_pager_pageSize,
            pageType:"0"
        }),
        success : function(data) {
            $(res).html(data);
        },
        complete : function(XMLHttpRequest, textStatus) {
            if (callback && typeof (callback) == "function") {
                callback();
            }
        }
    });
}

/**
 * 判断参数是否为空
 *
 * @param param
 * @returns true:有值,false:无值
 */
function checkNull(param) {
    if (param != undefined && param != "" && param != null) {
        return true;
    }
    return false;
}

/**
 * 短消息提示 msgTips
 *
 * @param $
 */
(function($) {
    $
        .extend({
            /**
             *
             * @param msg
             *            消息内容
             * @param callback
             *            回调函数
             * @param type
             *            消息类型 0:info 1：warning
             * @param showTime
             *            显示的时长 默认 3秒钟
             */
            msgTips : function(msg, callback, type, showTime) {

                if (callback && typeof (callback) != "function"
                    && !isNaN(callback)) { // 判断第二个参数 是否传递的是消息类型
                    type = callback;
                }

                // 如果第三个参数为空 则默认为 0：info
                if (typeof (type) == "undefined" || type == null)
                    type = 0;

                if ($("#msgTipsDiv", $(top.window.document.body)).length > 0) {
                    return;
                }
                // **********************添加遮罩层-开始*********************************//
                var coverObj = $("<div id='cover-msgTipsDiv'></div>");
                coverObj.css({
                    "display" : "none",
                    'z-index' : 9998,
                    "position" : "fixed",
                    "top" : 0,
                    "left" : 0,
                    "bottom" : 0,
                    "width" : "100%",
                    "height" : "100%",
                    "background-color" : "#000000",
                    "-moz-opacity" : 0.3, /* for ff */
                    "opacity" : 0.3, /* for ff3.5+ css3.0标准的 */
                    "filter" : "alpha(opacity = 30)" /* z-index:900; */
                });
                coverObj.appendTo($(top.window.document.body));
                $("#cover-msgTipsDiv", $(top.window.document.body)).show();

                /*下面是给遮罩层增加单击事件，单击就立刻关闭*/
                $('#cover-msgTipsDiv').click(function () {
                    $("#cover-msgTipsDiv",
                        $(top.window.document.body))
                        .remove();
                    $("#msgTipsDiv",
                        $(top.window.document.body))
                        .remove();
                    if (callback
                        && typeof (callback) == "function") {
                        callback();
                    }
                });

                // **********************添加遮罩层-结束*********************************//

                var msgObj = $("<div id='msgTipsDiv'></div>");
                var left = ($(top.window).width() * 0.6) / 2;

                msgObj.css({
                    "display" : "none",
                    "border-radius" : "0.8em",
                    "font-size" : "120%",
                    "font-weight" : "bold",
                    "padding" : "8px",
                    "text-align" : "center",
                    "vertical-align" : "middle",
                    "white-space" : "nowrap",
                    "position" : 'fixed',
                    "top" : "50%",
                    "left" : left,
                    "width" : $(top.window).width() * 0.4,
                    "z-index" : 9999
                });

                /**
                 * info 的样式
                 *
                 * @type {{}}
                 */
                var msgInfoStyle = {
                    "background-color" : "#46c01c",
                    "color" : "#fff"
                };

                /**
                 * warning 的样式
                 *
                 * @type {{}}
                 */
                var msgWarnStyle = {
                    "background-color" : "red",
                    "color" : "#fff"
                };
                if (type == 0) {
                    msgObj.css(msgInfoStyle);
                } else {
                    msgObj.css(msgWarnStyle);
                }

                msgObj.html(msg);
                msgObj.appendTo($(top.window.document.body));

                // 淡入
                $("#msgTipsDiv", $(top.window.document.body)).fadeIn();
                // 如果第四个参数为空 则默认为 1500毫秒
                if (typeof (showTime) == "undefined" || showTime == null)
                    showTime = 1500;

                // 淡出
                $("#msgTipsDiv", $(top.window.document.body))
                    .fadeOut(
                        showTime,
                        function() {
                            $("#cover-msgTipsDiv",
                                $(top.window.document.body))
                                .remove();
                            $("#msgTipsDiv",
                                $(top.window.document.body))
                                .remove();
                            if (callback
                                && typeof (callback) == "function") {
                                callback();
                            }
                        });
            }
        });
})(jQuery);

// 添加加载状态
function showLoaderBar() {
    var loaderBarCss = {
        "margin-top" : "-28px",
        "width" : "180px",
        "left" : "50%",
        "top" : "50%",
        "position" : "absolute",
        "margin-left" : "-90px",
        'z-index' : 9999
    };

    var loaderContentCss = {
        "text-align" : "center",
        "max-height" : "515px",
        "padding" : "15px",
        "box-shadow" : "0 5px 15px rgba(0, 0, 0, 0.5)",
        "background-color" : "#fff",
        "border" : "1px solid rgba(0, 0, 0, 0.2)",
        "border-radius" : "6px"
    };

    var html = '<div id="globalLoadingBar" >'
        + '           <div id="globalLoadContent">'
        + '             <img src="' + ctx
        + '/static/skin/common/images/loading.gif">Loading...' + '           </div>'
        + '       </div>';

    // **********************添加遮罩层-开始*********************************//
    var coverObj = $("<div id='cover-globalLoading'></div>");
    coverObj.css({
        "display" : "none",
        'z-index' : 9998,
        "position" : "fixed",
        "top" : 0,
        "left" : 0,
        "bottom" : 0,
        "width" : "100%",
        "height" : "100%",
        "background-color" : "#000000",
        "-moz-opacity" : 0.3, /* for ff */
        "opacity" : 0.3, /* for ff3.5+ css3.0标准的 */
        "filter" : "alpha(opacity = 30)" /* z-index:900; */
    });
    coverObj.appendTo($(top.window.document.body));
    $("#cover-globalLoading", $(top.window.document.body)).show();
    // **********************添加遮罩层-结束*********************************//

    var loaderObj = $(html).css(loaderBarCss);
    $("#globalLoadContent", loaderObj).css(loaderContentCss);
    loaderObj.appendTo($(top.window.document.body));
}

// 移除加载状态
function removeLoaderBar() {
    $("#globalLoadingBar", $(top.window.document.body)).remove();
    $("#cover-globalLoading", $(top.window.document.body)).remove();
}

/**
 * 根据url获得Ajax请求的返回值 返回text 类型的
 */
var ajaxPost = function(url, params) {
    var returnVal;
    if (typeof (params) == "undefined" || params == null) {
        params = "";
    }
    $.ajax({
        type : "post",
        url : ctx + url,
        data : params,
        cache : false,
        async : false,
        // dataType: "text",
        timeout : 30000,
        beforeSend : showLoaderBar,
        success : function(data) {
            returnVal = data;
        },
        complete : function(xhr, textStatus) {
            removeLoaderBar();
            if (xhr.status == 402) {// 未登录
                window.top.location = ctx + "/login.html";// 返回登陆
                return;
            } else if (xhr.status == 403) {// 未授权
                $.msgTips("没有此权限！", 1);
                return;
            } else if (xhr.status == 408) {// 商户没有权限
                $.msgTips("商户没有此权限！", 1);
                return;
            }
        }
    });
    return returnVal;
};

/*******************************************************************************
 * 根据url获得Ajax,并回调函数
 *
 * @param url
 * @param params
 *            参数
 * @param callback
 *            回调函数 参数(data)
 */
var ajaxPostCallback = function(url, params, callback) {
    if (typeof (params) == "undefined" || params == null) {
        params = "";
    }
    $.ajax({
        type : "post",
        url : ctx + url,
        data : params,
        cache : false,
        // dataType: "text",
        timeout : 30000,
        beforeSend : showLoaderBar,
        success : callback,
        complete : function(xhr, textStatus) {
            removeLoaderBar();
            if (xhr.status == 402) {// 未登录
                window.top.location = ctx + "/login.html";// 返回登陆
                return;
            } else if (xhr.status == 422) {// 微信未登录
                window.top.location = ctx + "/wechat/wechatlogin/loginIndex.html";// 返回登陆
                return;
            } else if (xhr.status == 403) {// 未授权
                $.msgTips("没有此权限！", 1);
                return;
            } else if (xhr.status == 408) {// 商户没有权限
                $.msgTips("商户没有此权限！", 1);
                return;
            }
        }
    });
};

/**
 * 根据url获得Ajax请求的返回值 返回text 类型的(没有loaderBar)
 */
var ajaxPostNoLoader = function(url, params) {
    var returnVal;
    if (typeof (params) == "undefined" || params == null) {
        params = "";
    }
    $.ajax({
        type : "post",
        url : ctx + url,
        data : params,
        cache : false,
        async : false,
        // dataType: "text",
        timeout : 30000,
        success : function(data) {
            returnVal = data;
        },
        complete : function(xhr, textStatus) {
            if (xhr.status == 402) {// 未登录
                window.top.location = ctx + "/login.html";// 返回登陆
                return;
            } else if (xhr.status == 403) {// 未授权
                $.msgTips("没有此权限！", 1);
                return;
            } else if (xhr.status == 408) {// 商户没有权限
                $.msgTips("商户没有此权限！", 1);
                return;
            }
        }
    });
    return returnVal;
};

/*******************************************************************************
 * 根据url获得Ajax,并回调函数(没有loaderBar)
 *
 * @param url
 * @param params
 *            参数
 * @param callback
 *            回调函数 参数(data)
 */
var ajaxPostCallbackNoLoader = function(url, params, callback) {
    if (typeof (params) == "undefined" || params == null) {
        params = "";
    }
    $.ajax({
        type : "post",
        url : ctx + url,
        data : params,
        cache : false,
        // dataType: "text",
        timeout : 30000,
        success : callback,
        complete : function(xhr, textStatus) {
            if (xhr.status == 402) {// 未登录
                window.top.location = ctx + "/login.html";// 返回登陆
                return;
            } else if (xhr.status == 403) {// 未授权
                $.msgTips("没有此权限！", 1);
                return;
            } else if (xhr.status == 408) {// 商户没有权限
                $.msgTips("商户没有此权限！", 1);
                return;
            }
        }
    });
};

/**
 * 格式化String值显示
 *
 * @param obj
 * @returns {*}
 */
function formatStrVal(obj) {
    if (obj == null || obj == "null" || obj == undefined
        || typeof (obj) == "undefined")
        return "";
    else
        return obj.toString();
}

/**
 * 格式化数字值显示
 *
 * @param obj
 * @returns {*}
 */
function formatNumVal(obj) {
    if (obj == null || obj == "null" || obj == undefined
        || typeof (obj) == "undefined")
        return "0";
    else
        return obj.toString();
}

/**
 * 删除图片
 *
 * @param obj
 */
function deleteImageFile(obj) {
    var aObj = $(obj).parent().find("a").eq(0);
    var fileInfo = aObj.find("input.fileInfo");
    if (fileInfo.val() == "")
        return;
    fileInfo.val("");
    aObj.css("background-image", "");
    aObj.find("span[name='fileAdd']").eq(0).html("+");
    $(obj).parent().find("label[name='fileName']").html("");
}

/**
 * 设置文件上传成功后的 封面 图标 及文件名显示
 *
 * @param fileType
 *            上传的类型
 * @param path
 *            上传成功后的 相对路径
 * @param obj
 *            最外层div
 * @param fileName
 *            文件名
 */
function showFileInfo(fileType, path, obj, fileName) {
    var pos = fileName.lastIndexOf("\\");
    if (pos >= 0) {
        fileName = fileName.substring(pos + 1);
    }
    if (fileType == 0) { // 图片
        $(obj).find("a.add-img").css("background-image",
            "url(" + ctx + path + ")");
    }
    if (fileType == 1) { // 视频
        $(obj).find("a.add-img").css("background-image",
            "url(" + ctx + "/skin/images/common/file_ico_sp.png)");
    }
    if (fileType == 2) { // 文档
        $(obj).find("a.add-img").css("background-image",
            "url(" + ctx + "/skin/images/common/file_ico_wd.png)");
    }
    if (fileType == 3) { // 其他
        if (/.(gif|jpg|bmp|jpeg|png)$/i.test(fileName)) { // 检测是图片
            $(obj).find("a.add-img").css("background-image",
                "url(" + ctx + path + ")");
        } else if (/.(rmvb|avi|mp4|flv)$/i.test(fileName)) {// //检测是视频
            $(obj).find("a.add-img").css("background-image",
                "url(" + ctx + "/skin/images/common/file_ico_sp.png)");
        } else if (/.(txt|doc|docx|xls|xlsx|rar|zip)$/i.test(fileName)) { // 检测是文档
            $(obj).find("a.add-img").css("background-image",
                "url(" + ctx + "/skin/images/common/file_ico_wd.png)");
        } else {
            $(obj).find("a.add-img").css("background-image",
                "url(" + ctx + "/skin/images/common/file_ico_qt.png)");
        }
    }
    // 解决名字过长问题
    var subFileName = fileName.length > 20 ? "..." + fileName.substring(fileName.length - 20):fileName;
    $(obj).find("label[name='fileName']").html(subFileName).attr("title", fileName);
    $(obj).find("span[name='fileAdd']").html("");
}

/**
 * 按钮调用Ajax文件上传方法
 *
 * @param obj
 *            点击上传的按钮 A链接
 * @param upOk
 *            上传成功 回调的事件
 * @param fileType
 *            0:图片 1:视频 2:文档 3:其他
 */
function fileUpload(obj, upOk, fileType) {
    var file = $(obj).find("input[type='file']");
    if (file.val() == "") {
        $.msgTips("请选择文件！");
        return;
    }
    if (fileType == 0 || fileType == undefined) {
        if (!/.(gif|jpg|bmp|jpeg|png)$/i.test(file.val())) {
            $.msgTips("请选择正确的图片格式!", 1);
            return;
        }
    } else if (fileType == 1) {
        if (!/.(rmvb|avi|mp4|flv)$/i.test(file.val())) {
            $.msgTips("请选择正确的视频格式!", 1);
            return;
        }
    } else if (fileType == 2) {
        if (!/.(txt|doc|docx|xls|xlsx|rar|zip)$/i.test(file.val())) {
            $.msgTips("请选择正确的文档格式!", 1);
            return;
        }
    } else if (fileType == 4) {
        if (!/.(png)$/i.test(file.val())) {
            $.msgTips("图片格式只能为png!", 1);
            return;
        }
    } else if (fileType == 5) {
        if (!/.(gif|jpg|bmp|jpeg|png|txt|doc|docx|xls|xlsx|rar|zip)$/i.test(file.val())) {
            $.msgTips("请上传正确的文档或者图片", 1);
            return;
        }
    } else {
        if (/.(exe|bat|sh|sql|html|js|mis|ini|dll)$/i.test(file.val())) {
            $.msgTips("文件格式不支持上传", 1);
            return;
        }
    }

    var fileInfo = $(obj).find("input.fileInfo");
    fileInfo.attr("fileName", file.val());
    $.ajaxFileUpload({
        url : ctx + "/upload/uploadFile.ajax",
        secureuri : false,
        fileElementId : file.attr("id"),
        dataType : 'text',
        success : function(data) {
            data = $.parseJSON(data);
            if (data.result) {
                fileInfo.val(data.dataObj);
                upOk(data.dataObj);// 回调上传成功的方法
            } else {
                $.msgTips(data.message, 1);
            }
        },
        error : function(data) {
            $.msgTips("文件上传出错!", 1);
        }
    });
}

/**
 * 文件下载
 * @param obj
 */
function fileDownLoad(obj) {
    var fileUrl = $(obj).attr("data-url");
    var fileName = $(obj).attr("data-name");
    var data = ajaxPost("/fileIsExists.ajax?fileUrl=" + fileUrl);
    if(data==1){
        $.msgTips(trade_msg_lib.warn_file_notexit, 1);
    }else{
        window.location.href = ctx + "/downLoadFile.ajax?fileUrl=" + fileUrl+"&fileName="+fileName;
    }
}

// 出舍五入以后精确到几位 出错返回空字符串
function numToFixed(num, ws) {
    try {
        var num = Number(num);
        if (!isNaN(num))
            num = num.toFixed(ws);
        else
            return "";
        return parseFloat(num);
    } catch (e) {
        return "";
    }
}

/*******************************************************************************
 * 封装收集页面数据为json数据 例如： var json = createFormJson("[json='true']");
 *
 * @param o
 */
function createFormJson(o) {
    var m = {
        xType : [ "input", "textarea", "select" ],
        inputType : [ "text", "password", "radio", "checkbox", "hidden" ]
    };
    m.objArr = typeof o == "string" ? $(o) : o;
    var json = "{";
    $.each(m.objArr, function(index, c) {
        var ed = $(c);
        var keyName = ed.attr("name");
        $.each(m.xType, function(i, n) {
            if (ed.is(n)) {
                if (n == "input") {
                    if (ed.is(":input[type='text']")
                        || ed[0].type.toLowerCase() == "text"
                        || ed.is(":input[type='password']")) {
                        json += '"' + keyName + '":"'
                            + compileJsonVal(ed.val()) + '",';
                    } else if (ed.is(":input[type='checkbox']")
                        || ed.is(":input[type='radio']")) {
                        if (ed.is(":checked")) {
                            json += '"' + keyName + '":"'
                                + compileJsonVal(ed.val()) + '",';
                        }
                    } else if (ed.is(":input[type='hidden']")) {
                        json += '"' + keyName + '":"'
                            + compileJsonVal(ed.val()) + '",';
                    }
                }
                if (n == "textarea") {
                    json += '"'
                        + keyName
                        + '":"'
                        + compileJsonVal(ed.val().replace(/\r/ig, "\\r")
                            .replace(/\n/ig, "\\n")) + '",';// //处理换行符
                }
                if (n == "select") {
                    json += '"' + keyName + '":"'
                        + compileJsonVal(ed.find("option:selected").val())
                        + '",';
                }
            }
        });
    });
    return json.substring(0, json.length - 1) + '}';
}

/**
 * 加载下拉框 字典数据
 *
 * @param dicType
 *            字典类型
 * @param selectId
 *            下拉框ID
 * @param dicKey
 *            字典Key 需要选中的key 可以为空,为空 默认不选中
 * @param isSel
 *            是否需要 --请选择--
 */
function loadSelectDicData(dicType, selectId, dicKey, isSel) {
    if (selectId == undefined && selectId == "") {
        return;
    }
    var url = "/getDicList.ajax";
    if (dicType != undefined && dicType != "") {
        url += "?dicType=" + dicType;
    }
    ajaxPostCallbackNoLoader(url, null, function(data) {
        if (data != undefined) {
            data = $.parseJSON(data);
            var optionsHtml = "";
            if (isSel != undefined && isSel != "") {
                optionsHtml += "<option value=''>--请选择--</option>";
            }
            $.each(data, function(index, item) {
                if (dicKey != undefined && dicKey != "") {
                    if (item.dicKey == dicKey) {
                        optionsHtml += "<option value='" + item.dicKey
                            + "' selected >" + item.dicValue + "</option>";
                    } else {
                        optionsHtml += "<option value='" + item.dicKey + "'>"
                            + item.dicValue + "</option>";
                    }
                } else {
                    optionsHtml += "<option value='" + item.dicKey + "'>"
                        + item.dicValue + "</option>";
                }
            });
            $("#" + selectId).html(optionsHtml);
        }
    });
}

/**
 * 加载仿下拉框 字典数据
 *
 * @param dicType
 *            字典类型
 * @param selectId
 *            下拉框ID
 * @param dicKey
 *            字典Key 需要选中的key 可以为空,为空 默认不选中
 * @param isSel
 *            是否需要 1:全部  2:--请选择--
 */
function loadFSelectDicData(dicType, selectId, dicKey, isSel) {
    if (selectId == undefined && selectId == "") {
        return;
    }
    var url = "/getDicList.ajax";
    if (dicType != undefined && dicType != "") {
        url += "?dicType=" + dicType;
    }
    ajaxPostCallback(url, null, function(data) {
        if (data != undefined) {
            data = $.parseJSON(data);
            var optionsHtml = "";
            if (isSel == "1") {
                optionsHtml += "<li class='SIMPO_Select_item' lval='' onclick='selOption(this)'><a href='javascript:void(0)'>全部</a></li>";
            }
            if (isSel == "2") {
                optionsHtml += "<li class='SIMPO_Select_item' lval='' onclick='selOption(this)'><a href='javascript:void(0)'>--请选择--</a></li>";
            }
            $.each(data, function(index, item) {
                if (dicKey != undefined && dicKey != "") {
                    if (item.dicKey == dicKey) {
                        $("#"+selectId).parent().find("button").text(item.dicValue);
                        $("#"+selectId).next().val(item.dicKey);

                        optionsHtml += "<li class='SIMPO_Select_item' lval='" + item.dicKey + "' onclick='selOption(this)'><a href='javascript:void(0)'>"+ item.dicValue +"</a></li>";
                    } else {
                        optionsHtml += "<li class='SIMPO_Select_item' lval='" + item.dicKey + "' onclick='selOption(this)'><a href='javascript:void(0)'>"+ item.dicValue +"</a></li>";
                    }
                } else {
                    optionsHtml += "<li class='SIMPO_Select_item' lval='" + item.dicKey + "' onclick='selOption(this)'><a href='javascript:void(0)'>"+ item.dicValue +"</a></li>";
                }
            });
            $("#" + selectId).html(optionsHtml);
        }
    });
}

function selOption(obj){
    var val = $(obj).attr("lval");

    var text = $(obj).text();
    $(obj).parent().parent().find("button").text(text);
    $(obj).parent().next().val(val);
}

/* 只能输入数字和一个点，且输入的第一个字符不能为点，可按退格键删除数字或点 */
function vaildFloatNumberPerfect(evnt, obj) {
    evnt = evnt || window.event;
    var keyCode = window.event ? evnt.keyCode : evnt.which;
    if ((obj.value.length == 0 || obj.value.indexOf(".") != -1)
        && keyCode == 46)
        return false;
    return keyCode >= 48 && keyCode <= 57 || keyCode == 46 || keyCode == 8;
}

/**
 * 加载下拉框 地区数据
 *
 * @param regionType地区类型
 *            1.省 2.市 3.区
 * @param selectId下拉框ID
 * @param parentId地区父级ID
 *            省 直接传0
 * @param selId选中的id
 *            需要选中的地区 可以为空,为空 默认不选中
 */
function loadSelectRegionData(regionType, selectId, parentId, selId) {
    if (selectId == undefined && selectId == "") {
        var optionsHtml  = "<option value=''>--请选择--</option>";
        $("#" + selectId).html(optionsHtml);
        return;
    }
    var url = "/getRegion.ajax";
    if (regionType != undefined && regionType != "") {
        url += "?ctype=" + regionType;
    } else {
        var optionsHtml  = "<option value=''>--请选择--</option>";
        $("#" + selectId).html(optionsHtml);
        return;
    }
    if (parentId != undefined && parentId != "") {
        url += "&parentId=" + parentId;
    } else {
        var optionsHtml  = "<option value=''>--请选择--</option>";
        $("#" + selectId).html(optionsHtml);
        return;
    }
    ajaxPostCallbackNoLoader(url, null, function(data) {
        if (data != undefined) {
            var optionsHtml = "";
            optionsHtml += "<option value=''>--请选择--</option>";
            $.each(data, function(index, item) {
                if (selId != undefined && selId != "") {
                    if (item.id == selId) {
                        optionsHtml += "<option value='" + item.id
                            + "' selected >" + item.name + "</option>";
                    } else {
                        optionsHtml += "<option value='" + item.id + "'>"
                            + item.name + "</option>";
                    }
                } else {
                    optionsHtml += "<option value='" + item.id + "'>"
                        + item.name + "</option>";
                }
            });
            $("#" + selectId).html(optionsHtml);
        }
    });
}

$(function() {

    //鼠标不在下拉框时选择隐藏
    $(".ui-select").hover(function(){
    },function(){
        $(this).find("ul").css("display", "none");
    });

    /** *******实现下拉框选择开始******* */
    $(".ui-select-dz").click(function() {
        var status = $(this).find("ul").css("display");
        if (status == undefined || status == "none") {
            $(this).find("ul").css("display", "block");
        } else if (status == "block") {
            $(this).find("ul").css("display", "none");
        }
    });

    $(".SIMPO_Select_item").click(function() {
        var val = $(this).prop("value");
        var text = $(this).text();
        $(this).parent().parent().find("button").text(text);
        $(this).parent().next().val(val);
    });

    $(".ui-select").click(function() {
        var status = $(this).find("ul").css("display");
        if (status == undefined || status == "none") {
            $(this).find("ul").css("display", "block");
        } else if (status == "block") {
            $(this).find("ul").css("display", "none");
        }
    });

    /** *******实现下拉框选择结束******* */

});

/**
 * map对象（键值对形式，目前值设置为2个，即一个key对应着2个val）
 */
function Map() {
    this.isMap = true;
    var struct = function(key, value, other) {
        this.key = key;
        this.value = value;
        this.other = other;
    };
    var put = function(key, value, other) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                if (typeof other == Boolean || other === true) {
                    this.arr[i].value += "," + value;
                } else {
                    this.arr[i].value = value;
                    this.arr[i].reg = other;
                }
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key, value, other);
        return this;
    };

    var getOtherVal = function(key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key)
                return this.arr[i].other;
        }
        return null;
    };

    var getValue = function(key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key)
                return this.arr[i].value;
        }
        return null;
    };

    var remove = function(key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if (v.key === key)
                continue;
            this.arr.unshift(v);
        }
    };
    var removeAll = function() {
        for (var a = 0; a < this.arr.length; a++) {
            var _key = this.arr[a].key;
            var v;
            for (var i = 0; i < this.arr.length; i++) {
                v = this.arr.pop();
                if (v.key === _key)
                    continue;
                this.arr.unshift(v);
            }
        }
    };

    var keySet = function() {
        var keyArr = [];
        for (var i = 0; i < this.arr.length; i++) {
            var _key = this.arr[i].key;
            keyArr[i] = _key;
        }
        return keyArr;
    };
    var valSet = function() {
        var valArr = [];
        for (var i = 0; i < this.arr.length; i++) {
            var _val = this.arr[i].value;
            valArr[i] = _val;
        }
        return valArr;
    };
    var alertKeyAndVal = function() {
        var store = "";
        for (var i = 0; i < this.arr.length; i++) {
            var _val = this.arr[i].key;
            var _key = this.arr[i].value;
            store += "key:" + _key + ",val:" + _val;
        }
        return store;
    };
    var size = function() {
        return this.arr.length;
    };
    var isEmpty = function() {
        return this.arr.length <= 0;
    };

    this.arr = new Array();
    this.getValue = getValue;
    this.getOtherVal = getOtherVal;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.removeAll = removeAll;
    this.isEmpty = isEmpty;
    this.keySet = keySet;
    this.valSet = valSet;
    this.alertKeyAndVal = alertKeyAndVal;
}

/**
 * json编码处理json关键字
 *
 * @param val
 * @returns {string}
 */
function compileJsonVal(val) {
    val = val + "";
    if (val == "" || val == null || val == undefined || val == "undefined"
        || val == "null") {
        return "";
    }
    var replace = new Map();
    replace.put("&", "υ", /&/gi);
    replace.put("%", "﹪", /%/gi);
    replace.put("+", "﹢", /\+/gi);
    replace.put("[", "ш", /\[/gi);
    replace.put("]", "щ", /]/gi);
    replace.put("{", "ю", /\{/gi);
    replace.put("}", "я", /}/gi);
    replace.put("'", "ι", /'/gi);
    replace.put("\"", "ξ", /"/gi);
    replace.put(",", "й", /,/gi);
    replace.put(":", "д", /:/gi);
    replace.put("^", "ж", /\^/gi);
    replace.put("*", "﹡", /\*/gi);
    replace.put("<", "〈", /</gi);
    replace.put(">", "〉", />/gi);
    replace.put("#", "＃", /#/gi);
    $.each(replace.keySet(), function(i, key) {
        if (val == "" || val == null || val == undefined)
            val = "";
        else {
            val = val.replace(replace.getOtherVal(key), replace.getValue(key));
        }
    });
    return val;
}

/**
 * json解码处理json关键字
 *
 * @param val
 * @returns {string}
 */
function unCompileJsonVal(val) {
    val = val + "";
    if (val == "" || val == null || val == undefined || val == "undefined"
        || val == "null") {
        return "";
    }
    var replace = new Map();
    replace.put("υ", "&", /υ/gi);
    replace.put("﹪", "%", /﹪/gi);
    replace.put("﹢", "+", /﹢/gi);
    replace.put("ш", "[", /ш/gi);
    replace.put("щ", "]", /щ/gi);
    replace.put("ю", "{", /ю/gi);
    replace.put("я", "}", /я/gi);
    replace.put("ι", "'", /ι/gi);
    replace.put("ξ", "\"", /ξ/gi);
    replace.put("й", ",", /й/gi);
    replace.put("д", ":", /д/gi);
    replace.put("ж", "^", /ж/gi);
    replace.put("〈", "<", /〈/gi);
    replace.put("〉", ">", /〉/gi);
    replace.put("﹡", "*", /﹡/gi);
    replace.put("＃", "#", /＃/gi);
    $.each(replace.keySet(), function(i, key) {
        if (val == "" || val == null || val == undefined)
            val = "";
        else {
            val = val.replace(replace.getOtherVal(key), replace.getValue(key));
        }
    });
    return val;
}

//弹出登录窗口
function toLogin(){
    layer.open({
        type : 2,
        title : "用户登录",
        shadeClose : true,
        move : false,
        shade : [ 0.1 ],
        area : [ '400px', '530px' ],
        shift : 2,
        content : [ ctx + '/popLogin.html', 'no' ]
    });
    return ;
}



//qq即时通讯
function clickToQQ(qq){
    window.open('tencent://message/?uin='+qq+'&Site=sc.chinaz.com&Menu=yes');
}