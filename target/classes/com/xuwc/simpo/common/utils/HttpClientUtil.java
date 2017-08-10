/*
 * @(#) HttpClientUtil.java 2016年03月31日
 *
 * Copyright (c) 2015, SIMPO Technology. All Rights Reserved. SIMPO Technology. CONFIDENTIAL
 */
package com.xuwc.simpo.common.utils;


import com.xuwc.simpo.common.config.Global;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.net.ssl.SSLContext;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.KeyStore;


/**
 * @author Wang Yuhui
 * @version 1.0
 * @since 2016年03月31日
 */
public class HttpClientUtil {

    private static final Log log = LogFactory.getLog(HttpClientUtil.class);

    /**
     * post方式
     *
     * @return
     */
    public static String postHttp(String url, String msg) {
        String responseMsg = "";

        // 1.构造HttpClient的实例
        HttpClient httpClient = new HttpClient();

        httpClient.getParams().setContentCharset("utf-8");

        // 2.构造PostMethod的实例
        PostMethod postMethod = new PostMethod(url);
        // 3.把参数值放入到PostMethod对象中
        // 方式1：
        /*
         * NameValuePair[] data = { new NameValuePair("param1", param1), new NameValuePair("param2",
         * param2) }; postMethod.setRequestBody(data);
         */

        try {
            postMethod.setRequestEntity(new StringRequestEntity(msg, "text/xml", "utf-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        // postMethod.setRequestHeader("Content-Type","text/xml");
        // postMethod.setRequestHeader("charset","utf-8");


        try {
            // 4.执行postMethod,调用http接口
            httpClient.executeMethod(postMethod);// 200

            // 5.读取内容
            responseMsg = postMethod.getResponseBodyAsString().trim();
            log.info(responseMsg);

            // 6.处理返回的内容

        } catch (HttpException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 7.释放连接
            postMethod.releaseConnection();
        }
        return responseMsg;
    }

//    public static String doRefund(String url, String data) throws Exception {
//
//        KeyStore keyStore = KeyStore.getInstance("PKCS12");
//        FileInputStream instream =
//                        new FileInputStream(new File(Global.getConfig("weixin.certPath")));// P12文件目录
//        String key = Global.getConfig("weixin.mch_id");
//        try {
//            keyStore.load(instream, key.toCharArray());// 这里写密码..默认是你的MCHID
//        } finally {
//            instream.close();
//        }
//
//        SSLContext sslcontext =
//                        SSLContexts.custom().loadKeyMaterial(keyStore, key.toCharArray()).build();// 这里也是写密码的
//        SSLConnectionSocketFactory sslsf =
//                        new SSLConnectionSocketFactory(sslcontext, new String[] {"TLSv1"}, null,
//                                        new NoopHostnameVerifier());
//        CloseableHttpClient httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
//
//        try {
//            HttpPost httpost = new HttpPost(url); // 设置响应头信息
//            httpost.addHeader("Connection", "keep-alive");
//            httpost.addHeader("Accept", "*/*");
//            httpost.addHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
//            httpost.addHeader("Host", "api.mch.weixin.qq.com");
//            httpost.addHeader("X-Requested-With", "XMLHttpRequest");
//            httpost.addHeader("Cache-Control", "max-age=0");
//            httpost.addHeader("User-Agent", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) ");
//            httpost.setEntity(new StringEntity(data, "UTF-8"));
//            CloseableHttpResponse response = httpclient.execute(httpost);
//            try {
//                HttpEntity entity = response.getEntity();
//
//                String jsonStr = EntityUtils.toString(response.getEntity(), "UTF-8");
//                EntityUtils.consume(entity);
//
//                System.out.print(jsonStr);
//                return jsonStr;
//            } finally {
//                response.close();
//            }
//        } finally {
//            httpclient.close();
//        }
//    }

    public static String httpClientRequest(String url) {
        String responseMsg = "";
        // 1.构造HttpClient的实例
        HttpClient httpClient = new HttpClient();
        httpClient.getParams().setContentCharset("UTF-8");
        // 2.构造PostMethod的实例
        GetMethod getMethod = new GetMethod(url);
        // 3.把参数值放入到PostMethod对象中
        try {
            // 4.执行postMethod,调用http接口
            httpClient.executeMethod(getMethod);// 200
            // 5.读取内容
            responseMsg = getMethod.getResponseBodyAsString().trim();
            // 6.处理返回的内容
        } catch (HttpException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 7.释放连接
            getMethod.releaseConnection();
        }
        return responseMsg;
    }

    /**
     * 调用 HTTP 接口
     *
     * @author Fangchen
     * @since 2015-12-3
     * @param url
     * @param param
     * @return
     */
    public static String httpClientRequest(String url,String param_name,String param) {
        String responseMsg = "";
        // 1.构造HttpClient的实例
        HttpClient httpClient = new HttpClient();
        httpClient.getParams().setContentCharset("UTF-8");
        // 2.构造PostMethod的实例
        PostMethod postMethod = new PostMethod(url);
        // 3.把参数值放入到PostMethod对象中
        // 方式1：
        // NameValuePair[] data = { new NameValuePair("param1", param1), new NameValuePair("param2", param2) };
        // postMethod.setRequestBody(data);

        // 方式2：
        postMethod.addParameter(param_name, param);

        try {
            // 4.执行postMethod,调用http接口
            httpClient.executeMethod(postMethod);// 200
            // 5.读取内容
            responseMsg = postMethod.getResponseBodyAsString().trim();
            System.out.println(responseMsg);
            // 6.处理返回的内容
        } catch (HttpException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 7.释放连接
            postMethod.releaseConnection();
        }
        return responseMsg;
    }
}
