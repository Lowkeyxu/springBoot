/*
 * @(#) UserVo.java 2017/8/3
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.test.vo;

import com.xuwc.simpo.base.vo.DbBaseVo;


/** 用戶vo
 * @author xuwc
 * @version 1.0
 * @since 2017/8/3
 */
public class UserVo extends DbBaseVo<UserVo>{

    private String loginName;//登录名
    private String userName;//用户名
    private String sex;//性别（数据字典 sexType ）
    private String password;//密码

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
