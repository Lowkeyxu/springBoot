/*
 * @(#) ApiAction.java 2017/8/9
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.models.api.web;

import com.xuwc.simpo.common.utils.HttpClientUtil;
import com.xuwc.simpo.models.api.service.EmsService;
import com.xuwc.simpo.models.api.vo.EmsVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/** 免费API接口Action
 * @author xuwc
 * @version 1.0
 * @since 2017/8/9
 */
@Controller
@RequestMapping("api")
public class ApiAction {

    @Autowired
    private EmsService emsService;

    //API入口页面
    @RequestMapping("")
    public String index(ModelMap map){
        //快递集合
        List<EmsVo> list  = emsService.getEmsList();
        map.put("EmsList",list);
        return "module/api/index";
    }

    /**
     * 物流信息查询
     * @param emsname
     * @param number
     * @return
     */
    @RequestMapping("/queryLogistics")
    @ResponseBody
    public String queryLogistics(String emsname,String number){
        String URL = "http://www.kuaidi100.com/query?type="+emsname+"&postid="+number+"";
        String result = HttpClientUtil.httpClientRequest(URL);
        return result;
    }

}
