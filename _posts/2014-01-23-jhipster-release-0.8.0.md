---
layout: default
title: 發布 0.8.0
---

JHipster release 0.8.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

這是我們至今以來最大的一個更新.

我們從"正常"的Spring完全遷移至[Spring Boot](http://projects.spring.io/spring-boot/). 所以帶來了許多新變更:

- 需要執行應用, 可以從你的IDE中執行"Application"類, 或者執行"mvn spring-boot:run". 底層使用Tomcat.
- Java專案設定套件名從"conf"重新命名為"config"
- Yaml格式設定檔案
- liquibase設定檔案現在移到src/main/resources/config/liquibase目錄

我們將所有函式庫都已更新至最新版本!

Spring Boot是一門新技術, 希望大家謹慎升級:

### 好訊息

- IDE可以脫離Maven執行應用. 更快(無需啟動Maven)並且和debugger一起更容易執行
- 更精簡的設定檔案. 很難量化我們的提升程度, 大約精簡了200~300行程式碼
- Yaml格式設定帶來更好的可讀性與使用便利
- Spring Boot Actuator帶來許多屬性, 我們計劃下次更新新增更多這些屬性

### 壞訊息

- 使用Tomcat啟動會比之前慢２秒(Jetty沒有問題): 貌似是由於沒有web.xml導致Tomcat出現這個問題


更新指引
------------

使用以下指令更新Jhipster:

```
npm update -g generator-jhipster
```

使用以下指令更新你的專案

```
yo jhipster
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題
