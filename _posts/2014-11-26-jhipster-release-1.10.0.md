---
layout: default
title: 發布 v1.10.0
---

JHipster release 1.10.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

更新日誌
----------

This should be our last 1.x release, and we are now going to merge our "v2.0" branch into our "master" branch.

The highlights of this release are:

- We upgraded to the latest Spring Boot 1.2.0.RC2
- We have a new "fast" profile, which is documented [here]({{ site.url }}/profiles/). You can expect to start up a JHipster application in 4 seconds!
- We have corrected lots of small issues, and upgraded most libraries (like Hazelcast or Atmosphere)


一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.10.0+is%3Aclosed)__.

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
