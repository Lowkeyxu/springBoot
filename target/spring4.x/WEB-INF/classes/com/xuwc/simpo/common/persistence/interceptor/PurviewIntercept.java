/*
 * @(#) PurviewIntercept.java 2015年6月24日
 *
 * Copyright (c) 2014, SIMPO Technology. All Rights Reserved.
 * SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.common.persistence.interceptor;


import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.UrlPathHelper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Dao 插入更新操作 共通字段设置
 */
public class PurviewIntercept extends HandlerInterceptorAdapter {

    private UrlPathHelper urlPathHelper = new UrlPathHelper();

    /**
     * 在进入全部Action之前进行拦截处理（即处理请求之前）。
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) throws Exception {
        // 获取访问url
        String url = urlPathHelper.getLookupPathForRequest(request);
        // 空
        if (org.apache.commons.lang3.StringUtils.isEmpty(url)) {
            return false;
        }

        // url碎片
        int dotIndex = url.lastIndexOf(".") ;
        String[] urlFragments;
        if (dotIndex == -1) {
            urlFragments = url.split("/");
        } else {
            urlFragments = url.substring(0, dotIndex).split("/");
        }
        String mark = urlFragments.length == 0 ? null : urlFragments[urlFragments.length - 2 > 0 ? urlFragments.length - 2 : urlFragments.length - 1];

        ClientSettingUtil.setMark(mark);


        // 下面这句话不要动，就这样放着。你在处理你的业务逻辑之后，spring会将你的请求和响应继续往容器传或者往客户端进行传递
        return super.preHandle(request, response, handler);
    }

    /**
     * 在进入全部Action之后进行拦截处理（即在业务处理器处理请求执行完成后,生成视图之前执行的动作 ）。
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response,
                           Object handler, ModelAndView modelAndView) throws Exception {
        // /下面这句话不要动，就这样放着。你在处理你的业务逻辑之后，spring会将你的请求和响应继续往容器传或者往客户端进行传递
        super.postHandle(request, response, handler, modelAndView);
    }

    /**
     * 在现实视图之后进行处理（在DispatcherServlet完全处理完请求后被调用）
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) throws Exception {
        // //下面这句话不要动，就这样放着。你在处理你的业务逻辑之后，spring会将你的请求和响应继续往容器传或者往客户端进行传递
        super.afterCompletion(request, response, handler, ex);
    }
}
