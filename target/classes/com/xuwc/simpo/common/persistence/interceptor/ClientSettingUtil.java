/*
 * @(#) ClientSettingUtil.java 2015年12月07日
 *
 * Copyright (c) 2015, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.common.persistence.interceptor;

import org.springframework.core.NamedThreadLocal;

/*
 * 线程本地变量：存储 页面标识
 * 
 * @author ZHang.WenBin
 * 
 * @version 1.0
 * 
 * @since 2015年12月07日
 */
public class ClientSettingUtil {
    private static final NamedThreadLocal<String> setting = new NamedThreadLocal<String>("Mark-Setting");

    public ClientSettingUtil() {}

    public static String getMark() {
        String mark = setting.get();
        return mark == null ? "" : mark;
    }

    public static void setMark(String mark) {
        setting.set(subString(mark, 10));
    }

    private static String subString(String origin, int subLen) {
        return origin == null ? ""
                        : (origin.length() <= subLen ? origin : origin.substring(0, subLen));
    }

}
