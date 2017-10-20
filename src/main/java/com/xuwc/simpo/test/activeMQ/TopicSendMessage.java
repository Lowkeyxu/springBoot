/*
 * @(#) TopicSendMessage.java 2017/10/19
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.test.activeMQ;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import javax.jms.*;

/** 发送消息
 * @author xuwc
 * @version 1.0
 * @since 2017/10/19
 */
@Service
public class TopicSendMessage {

//    private ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:spring-context.xml");
//    private  JmsTemplate jmsTemplate = (JmsTemplate) ac.getBean("jmsTemplate");

    private Logger logger = LoggerFactory.getLogger(TopicSendMessage.class);

    @Autowired
    private JmsTemplate jmsTemplate;

    /**
     * 发送一条消息到指定的队列（目标）
     * @param topicName 队列名称
     * @param message 消息内容
     */
    public void send(String topicName,final String message){
        jmsTemplate.send(topicName,new MessageCreator() {
            public Message createMessage(Session session) throws JMSException {
                //ObjectMessage objectMessage = session.createObjectMessage();
                //objectMessage.setObject(object);
                TextMessage msg = session.createTextMessage(message);
                logger.info("==========发送数据...");
                return msg;
            }
        });
    }
}
