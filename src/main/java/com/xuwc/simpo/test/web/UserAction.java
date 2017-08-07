/*
 * @(#) UserAction.java 2017/8/3
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.test.web;

import com.xuwc.simpo.test.service.UserService;
import com.xuwc.simpo.test.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

/** 用户Action
 * @author xuwc
 * @version 1.0
 * @since 2017/8/3
 */
@Controller
@RequestMapping(value = "sys/user/")
public class UserAction {

    //用户service
    @Autowired
    private UserService userService;

    /**
     * 根据id 查询用户
     * @param id
     * @return
     */
    @RequestMapping("getUser")
    public String getUser(String id,ModelMap map){
        UserVo userVo = userService.getUser(id);
        map.put("userVo",userVo);
        return "module/user/index";
    }

}
