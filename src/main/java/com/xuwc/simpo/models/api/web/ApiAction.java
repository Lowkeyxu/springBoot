/*
 * @(#) ApiAction.java 2017/8/9
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.models.api.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xuwc.simpo.common.cache.JedisUtils;
import com.xuwc.simpo.common.utils.HttpClientUtil;
import com.xuwc.simpo.common.utils.SimpoStringUtils;
import com.xuwc.simpo.common.utils.UUIDGen;
import com.xuwc.simpo.models.api.service.EmsService;
import com.xuwc.simpo.models.api.vo.EmsVo;
import com.xuwc.simpo.test.activeMQ.TopicSendMessage;
import com.xuwc.simpo.test.vo.UserVo;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private Logger logger = LoggerFactory.getLogger(ApiAction.class);

    @Autowired
    private EmsService emsService;
    @Autowired
    private TopicSendMessage topicSendMessage;

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
        final String url = "http://www.kuaidi100.com/query?type="+type+"&postid="+number+"";
        //http 请求
        String result = HttpClientUtil.httpClientRequest(url);
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
        String url = "https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel="+phone;
        String result = HttpClientUtil.httpClientRequest(url);
        return result;
    }

    /**
     * activeMQ发送主题消息
     * @param topicName 主题名称
     * @param message 消息内容
     */
    @RequestMapping("/sendTopicMessage")
    @ResponseBody
    public int sendTopicMessage(String topicName,String message){
        //FIXME 测试数据
        UserVo userVo = new UserVo();
        userVo.setId(UUIDGen.uuid());
        userVo.setLoginName(topicName);
        userVo.setUserName(message);
        userVo.setSex("1");
        userVo.setPassword(Math.random()+"");
        //测试jedis 存入缓存
        if(StringUtils.isNotEmpty(JedisUtils.get(topicName))){
            System.out.println("从redis中获取到的数据为："+JedisUtils.get(topicName));
            if(!message.equals(JedisUtils.get(topicName))){
                JedisUtils.set(topicName,message,30000);
            }
        }else {
            JedisUtils.set(topicName,message,30000);
        }
        JedisUtils.setObject("user",userVo,3000);
        //消息发送
        topicSendMessage.send(topicName,message);
        //消息推送
        //topicSendMessage.push(userVo);
        return 1;
    }

    //聊天室入口页面
    @RequestMapping("chatRoom")
    public String chat(ModelMap map){
        map.put("userName", SimpoStringUtils.getChineseName());
        return "module/api/chatroom";
    }


    /**
     * 聊天信息
     * @param topicName
     * @param message
     */
    @RequestMapping("chat")
    @ResponseBody
    public int chat(String topicName,String message){
        //消息发送
        topicSendMessage.send(topicName,message);
        return 1;
    }

}
