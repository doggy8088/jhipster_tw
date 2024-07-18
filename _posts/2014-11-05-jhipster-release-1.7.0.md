---
layout: default
title: 發布 v1.7.0
---

JHipster release 1.7.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

更新日誌
----------

The main new improvement of this release is the [Cloud Foundry sub-generator]({{ site.url }}/cloudfoundry/). It is working so well that we didn't put the BETA tag on it (unlike our Heroku and OpenShift sub-generators). If you [Check the code](https://github.com/jhipster/generator-jhipster/tree/master/cloudfoundry) you can also see how small and clean it is.

You can now easily deploy your application to any Cloud Foundry instance available, with MySQL, Postgresql or MongoDB!

一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.7.0+is%3Aclosed)__.

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
