---
layout: default
title: 發布 0.9.1
---

JHipster release 0.9.1
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

* "熱過載"屬性變得越來越好: 現在我們支援熱載入Spring Beans(在*大多*情況)和Jackson beans(序列化和反序列化的快取在過載會被清除), 我們現在著重解決過載JPA的實體類..
* 更新Spring Boot至最新的1.0.0.RC2. 這個會導致[warning when running the executable WAR](https://github.com/spring-projects/spring-boot/issues/348)
* 更新了產生器依賴庫的版本, 在Mac OS X執行我們發現還有一些問題

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
