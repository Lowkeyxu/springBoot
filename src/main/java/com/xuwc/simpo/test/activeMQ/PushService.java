/*
 * @(#) PushService.java 2017/10/26
 * 
 * Copyright (c) 2016, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.test.activeMQ;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/** mq推送Service
 * @author xuwc
 * @version 1.0
 * @since 2017/10/26
 */
public interface PushService {

    ExecutorService pushExecutor = Executors.newFixedThreadPool(10);

    void push(Object info);
}
