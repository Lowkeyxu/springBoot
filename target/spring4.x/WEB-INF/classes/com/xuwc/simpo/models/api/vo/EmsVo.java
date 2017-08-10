/*
 * @(#) EmsVo.java 2017/8/9
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.models.api.vo;

import com.xuwc.simpo.base.vo.DbBaseVo;

/** 快递编码Vo
 * @author xuwc
 * @version 1.0
 * @since 2017/8/9
 */
public class EmsVo extends DbBaseVo<EmsVo> {

    private String code;//快递编码
    private String name;//快递名称

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
