/*
 * @(#) ApiAction.java 2017/8/9
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.models.api.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xuwc.simpo.common.utils.HttpClientUtil;
import com.xuwc.simpo.models.api.service.EmsService;
import com.xuwc.simpo.models.api.vo.EmsVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
     * @param type 类型
     * @param number 单号
     * @return 物流信息
     */
    @RequestMapping("/queryLogistics")
    @ResponseBody
    public JSONObject queryLogistics(String type, String number){
        //demo api
        final String URL = "http://www.kuaidi100.com/query?type="+type+"&postid="+number+"";
        //http 请求
        String result = HttpClientUtil.httpClientRequest(URL);
        Map<String, Object> data = new HashMap<String, Object>();
        if(StringUtils.isNotEmpty(result)){
            return JSON.parseObject(result);
        }else{
            return null;
        }
    }

    /**
     * 号码归属地查询
     * @param phone
     * @return
     */
    @RequestMapping("/queryPhone")
    @ResponseBody
    public String queryPhone(String phone){
        String URL = "https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel="+phone;
        String result = HttpClientUtil.httpClientRequest(URL);
        return result;
    }

}
