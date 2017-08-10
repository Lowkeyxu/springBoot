/*
 * @(#) UserService.java 2017/8/3
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.test.service;

import com.xuwc.simpo.test.vo.UserVo;

/** 用户service
 * @author xuwc
 * @version 1.0
 * @since 2017/8/3
 */
public interface UserService {
    //根据id查询用户
    UserVo getUser(String id);
}
