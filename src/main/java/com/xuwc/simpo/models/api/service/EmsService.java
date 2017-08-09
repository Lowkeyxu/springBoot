/*
 * @(#) EmsService.java 2017/8/9
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.models.api.service;

import com.xuwc.simpo.models.api.vo.EmsVo;

import java.util.List;

/**
 * @author xuwc
 * @version 1.0
 * @since 2017/8/9
 */
public interface EmsService {

    /**
     * 快递集合
     * @return
     */
    List<EmsVo> getEmsList();
}
