/*
 * @(#) EmsDao.java 2017/8/9
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.models.api.dao;

import com.xuwc.simpo.models.api.vo.EmsVo;
import org.springframework.stereotype.Repository;

import java.util.List;

/** 快递编码Dao
 * @author xuwc
 * @version 1.0
 * @since 2017/8/9
 */
@Repository
public interface EmsDao {
    /**
     * 快递集合
     * @return
     */
    List<EmsVo> getEmsList();
}
