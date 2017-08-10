/*
 * @(#) UserDao.java 2017/8/3
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.test.dao;

import com.xuwc.simpo.test.vo.UserVo;
import org.springframework.stereotype.Repository;

/** 用户Dao
 * @author xuwc
 * @version 1.0ZCDao.xml
 * @since 2017/8/3
 */
@Repository
public interface UserDao {
    //根据id查询用户
    UserVo getUser(String id);
}
