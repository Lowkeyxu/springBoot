/*
 * @(#) IndexAction.java 2017/8/6
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.test.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author xuwc
 * @version 1.0
 * @since 2017/8/6
 */
@Controller
@RequestMapping(value = "index")
public class IndexAction {
    @RequestMapping("")
    public String getUser(ModelMap map){
        return "index";
    }
}


