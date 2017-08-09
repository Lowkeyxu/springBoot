/*
 * @(#) EmsServiceImpl.java 2017/8/9
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.models.api.service.impl;

import com.xuwc.simpo.models.api.dao.EmsDao;
import com.xuwc.simpo.models.api.service.EmsService;
import com.xuwc.simpo.models.api.vo.EmsVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author xuwc
 * @version 1.0
 * @since 2017/8/9
 */
@Service
public class EmsServiceImpl implements EmsService{

    @Autowired
    private EmsDao emsDao;

    /**
     * 快递集合
     * @return
     */
    public List<EmsVo> getEmsList() {
        return emsDao.getEmsList();
    }
}
