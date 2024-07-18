---
layout: default
title: 設定Redis Leader-Follower（主-從）複製
sitemap:
priority: 0.1
lastmod: 2020-03-23T12:30:00-00:00
---

# 設定Redis Leader-Follower(master-slave)複製

**送出者 [@zhx828](https://github.com/zhx828)**

在最新的JHipster產生器中，它為生產部署提供了redis叢集設定。 但是通常，對於小型專案而言，這可能是過大的選擇。 本文件提供了設定RedisLeader-Follower（主-從）複製的解決方案。 有關Redis複製的更多訊息，請參見[** 相關文件 **](https://redis.io/topics/replication) 。

以下更改基於我自己的專案設定。 我假設您已經修改了應用程式屬性以設定Redis密碼，因此可以相應地調整自己的密碼。


## 第1步

增加檔案 `RedisProperties.java`:
```
public class RedisProperties {
    String type;
    String password;
    MasterSlaveRedisCache masterSlaveCache;
    SingleRedisCache singleCache;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public MasterSlaveRedisCache getMasterSlaveCache() {
        return masterSlaveCache;
    }

    public void setMasterSlaveCache(MasterSlaveRedisCache masterSlaveCache) {
        this.masterSlaveCache = masterSlaveCache;
    }

    public SingleRedisCache getSingleCache() {
        return singleCache;
    }

    public void setSingleCache(SingleRedisCache singleCache) {
        this.singleCache = singleCache;
    }
}
```

## 第二步
增加Redis屬性檔案 `ApplicationProperties.java`
```
public class ApplicationProperties {
    ...

    private RedisProperties redis;
    
    public RedisProperties getRedis() {
        return redis;
    }

    public void setRedis(RedisProperties redis) {
        this.redis = redis;
    }
    ...
}
```

## 第3步
更新檔案 `CacheConfiguration.java`中的 `jcacheConfiguration`方法。這些更改必須與當前群集設定結合在一起。

```
if (applicationProperties.getRedis().getType().equals(RedisType.SINGLE.getType())) {
    config.useSingleServer()
        .setAddress(applicationProperties.getRedis().getSingleCache().getAddress())
        .setPassword(applicationProperties.getRedis().getPassword());
} else if (applicationProperties.getRedis().getType().equals(RedisType.MASTER_SLAVE.getType())) {
    config.useMasterSlaveServers()
        .setMasterAddress(applicationProperties.getRedis().getMasterSlaveCache().getMasterAddress())
        .addSlaveAddress(applicationProperties.getRedis().getMasterSlaveCache().getSlaveAddress())
        .setPassword(applicationProperties.getRedis().getPassword());
} else {
    throw new Exception("The redis type " + applicationProperties.getRedis().getType() + " is not supported. Only single and master-slave are supported.");
}
```

## 第4步
更新 `application-dev.yml` 使用單個伺服器
```
application:
  profile: dev
  redis:
    type: 'single'
    password: 'public-redis-password'
    single-cache:
      address: 'redis://localhost:6379'

```

## 第5步
更新 `application-prod.yml` 使用主從伺服器
```
application:
  profile: prod
  redis:
    type: 'master-slave'
    password: 'public-redis-password'
    master-slave-cache:
      master-address: 'redis://redis-master:6379'
      slave-address: 'redis://redis-slave:6379'

```
