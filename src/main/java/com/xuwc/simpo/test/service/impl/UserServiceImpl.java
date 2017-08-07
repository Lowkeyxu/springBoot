/*
 * @(#) UserServiceImpl.java 2017/8/3
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.test.service.impl;

import com.xuwc.simpo.test.dao.UserDao;
import com.xuwc.simpo.test.service.UserService;
import com.xuwc.simpo.test.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** 用户service实现
 * @author xuwc
 * @version 1.0
 * @since 2017/8/3
 */
@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;

    /**
     * 获取用户信息
     * @param id
     * @return
     */
    public UserVo getUser(String id) {
        return userDao.getUser(id);
    }
}
