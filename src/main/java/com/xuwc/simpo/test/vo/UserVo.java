/*
 * @(#) UserVo.java 2017/8/3
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.test.vo;

import java.io.Serializable;

/** 用戶vo
 * @author xuwc
 * @version 1.0
 * @since 2017/8/3
 */
public class UserVo implements Serializable{

    private String id;//id
    private String loginName;//登录名
    private String userName;//用户名
    private String sex;//性别（数据字典 sexType ）
    private String password;//密码
    private String delFlag;//删除标识(0:有效,1:删除)
    private String addTime;//创建时间
    private String addUserId;//创建者
    private String addMark;//创建页面ID
    private String updTime;//更新时间
    private String updUserId;//更新者
    private String updMark;//更新页面ID

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }

    public String getAddUserId() {
        return addUserId;
    }

    public void setAddUserId(String addUserId) {
        this.addUserId = addUserId;
    }

    public String getAddMark() {
        return addMark;
    }

    public void setAddMark(String addMark) {
        this.addMark = addMark;
    }

    public String getUpdTime() {
        return updTime;
    }

    public void setUpdTime(String updTime) {
        this.updTime = updTime;
    }

    public String getUpdUserId() {
        return updUserId;
    }

    public void setUpdUserId(String updUserId) {
        this.updUserId = updUserId;
    }

    public String getUpdMark() {
        return updMark;
    }

    public void setUpdMark(String updMark) {
        this.updMark = updMark;
    }
}
