/**
 * Copyright &copy; 2012-2014 Simpotech All rights reserved.
 */
package com.xuwc.simpo.common.cache;

import com.xuwc.simpo.common.aware.SpringContextHolder;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;


/**
 * Cache工具类
 * 
 * @author ThinkGem
 * @version 2013-5-29
 */
public class CacheUtils {

    private static final String SYS_CACHE = "sysCache";
    private static CacheManager cacheManager =
                    (CacheManager) SpringContextHolder.getRootApplicationContext().getBean("cacheManager");

    /**
     * 获取SYS_CACHE缓存
     * 
     * @param key 键
     * @return 值
     */
    public static Object get(String key) {
        return get(SYS_CACHE, key);
    }

    /**
     * 写入SYS_CACHE缓存
     * 
     * @param key 键
     * @param value 值
     */
    public static void put(String key, Object value) {
        put(SYS_CACHE, key, value);
    }

    /**
     * 从SYS_CACHE缓存中移除
     * 
     * @param key 键名
     */
    public static void remove(String key) {
        remove(SYS_CACHE, key);
    }

    /**
     * 获取缓存
     *
     * @param cacheName 缓存名
     * @param key 键名
     * @return 值
     */
    public static Object get(String cacheName, String key) {
        Cache.ValueWrapper element = getCache(cacheName).get(key);
        return element == null ? null : element.get();
    }

    /**
     * 写入缓存
     *
     * @param cacheName 缓存名
     * @param key 键名
     * @param value 值
     */
    public static void put(String cacheName, String key, Object value) {
        getCache(cacheName).put(key, value);
    }

    /**
     * 从缓存中移除
     *
     * @param cacheName 缓存名
     * @param key 键名
     */
    public static void remove(String cacheName, String key) {
        getCache(cacheName).evict(key);
    }

    /**
     * 获得一个Cache，没有则创建一个。
     *
     * @param cacheName 缓存名
     */
    private static Cache getCache(String cacheName) {
        Cache cache = cacheManager.getCache(cacheName);
        if (cache == null) {
            throw new IllegalStateException("there's no cache [cacheName : " + cacheName +"] exists, please initialize it.");
        }
        return cache;
    }

    public static CacheManager getCacheManager() {
        return cacheManager;
    }

}
