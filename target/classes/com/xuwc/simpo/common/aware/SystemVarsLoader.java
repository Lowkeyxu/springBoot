/*
 * @(#) SystemVarsLoader.java 2015 Copyright (c) 2015, SIMPO Technology. All Rights Reserved. SIMPO
 * Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.common.aware;

import com.xuwc.simpo.common.config.Global;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ServletContextAware;

import javax.servlet.ServletContext;


@Component
@Lazy(false)
public class SystemVarsLoader implements ServletContextAware {

    /* 日志 */
    private static final Logger LOGGER = LoggerFactory.getLogger(SystemVarsLoader.class);

    public void setServletContext(ServletContext servletContext) {
        LOGGER.debug("Loading System variables for servletContext start...");
        String ctxStr = Global.getCtxPath();
        // 当前项目 上下文路径
        if(StringUtils.isEmpty(ctxStr)){
            servletContext.setAttribute("ctx", servletContext.getContextPath());
        }else{
            servletContext.setAttribute("ctx",ctxStr );
        }

        LOGGER.debug("Loading System variables for servletContext end...");
    }

}
