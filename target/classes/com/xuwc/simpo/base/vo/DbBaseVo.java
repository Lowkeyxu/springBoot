/*
 * @(#) BaseVo.java 2016年08月29日
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.base.vo;

import com.xuwc.simpo.common.persistence.interceptor.ClientSettingUtil;
import com.xuwc.simpo.common.utils.UUIDGen;

import java.util.Date;


/**
 * 基础实体类
 * 
 * @author ZHang.WenBin
 * @version 1.0
 * @since 2016年08月29日
 */
public abstract class DbBaseVo<T> extends BaseVo<T> {
    private final static String DEFAULT_VALUE = "0";
    /** serialVersionUID */
    private static final long serialVersionUID = -8820913334214200448L;
    /* 主键 */
    private String id;
    /* 删除标识 */
    private String delFlag;
    /* 新增时间 ,插入时，此字段设为 now() **/
    private Date addTime;
    /* 新增用户Id */
    private String addUserId;
    /* 更新时间 ,插入、更新时，此字段设为 now() */
    private Date updTime;
    /* 更新用户Id */
    private String updUserId;
    /* 创建页面ID */
    private String addMark;
    /* 更新页面ID */
    private String updMark;

    /**
     * 新增前，共通字段 设置
     * 
     * @param userId 用户Id
     */
    public void preInsert(String userId) {
        this.id = UUIDGen.uuid();
        this.addUserId = userId;
        this.addMark = ClientSettingUtil.getMark();
        this.addTime = new Date();
        this.updUserId = this.addUserId;
        this.updMark = this.addMark;
        this.updTime = new Date();
        this.delFlag = DEFAULT_VALUE;
    }

    /**
     * 修改前，共通字段 设置
     *
     * @param userId 用户Id
     */
    public void preUpdate(String userId) {
        this.updUserId = userId;
        this.updMark = ClientSettingUtil.getMark();
        this.updTime = new Date();
    }

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }

    public String getAddUserId() {
        return addUserId;
    }

    public void setAddUserId(String addUserId) {
        this.addUserId = addUserId;
    }

    public Date getUpdTime() {
        return updTime;
    }

    public void setUpdTime(Date updTime) {
        this.updTime = updTime;
    }

    public String getUpdUserId() {
        return updUserId;
    }

    public void setUpdUserId(String updUserId) {
        this.updUserId = updUserId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddMark() {
        return addMark;
    }

    public void setAddMark(String addMark) {
        this.addMark = addMark;
    }

    public String getUpdMark() {
        return updMark;
    }

    public void setUpdMark(String updMark) {
        this.updMark = updMark;
    }
}
