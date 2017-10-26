/*
 * @(#) TopicMessageListen.java 2017/10/19
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.common.activemq;

import com.xuwc.simpo.common.websocket.WebsocketController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;

/** activeMQ监听
 * @author xuwc
 * @version 1.0
 * @since 2017/10/19
 */
public class TopicMessageListen implements MessageListener {

    private Logger logger = LoggerFactory.getLogger(TopicMessageListen.class);

    /**
     * 监听消息
     * @param message
     */
    public void onMessage(Message message) {
        logger.info("================正在监听activeMQ==============");
        try {
//            ObjectMessage tm = (ObjectMessage)(message);
            TextMessage tm = (TextMessage)(message);
            //获取数据
            String jsonStr = tm.getText();
            logger.info("==========监听的数据为："+jsonStr);
            if (jsonStr != null) {
                //Client info = JSON.parseObject(jsonStr, Client.class);
                WebsocketController.broadcast("user", "推送的消息为："+jsonStr);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.info("==========监听数据错误！");
        }
    }
}
