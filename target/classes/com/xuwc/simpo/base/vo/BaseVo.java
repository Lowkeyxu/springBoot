/*
 * @(#) BaseVo.java 2016年08月29日
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.base.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xuwc.simpo.common.persistence.Page;

import java.io.Serializable;


/**
 * 基础实体类
 * 
 * @author ZHang.WenBin
 * @version 1.0
 * @since 2016年08月29日
 */
public abstract class BaseVo<T> implements Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 6478021448802033208L;
	/**
	 * 当前实体分页对象
	 */
	protected Page<T> page;

	@JsonIgnore
	public Page<T> getPage() {
		if (page == null) {
			page = new Page<T>();
		}
		return page;
	}

	public Page<T> setPage(Page<T> page) {
		this.page = page;
		return page;
	}
}
