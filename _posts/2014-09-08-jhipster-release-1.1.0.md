---
layout: default
title: 發布 v1.1.0
---

JHipster release 1.1.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

This release comes with [several enhancements and bug fixes](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.1+is%3Aclosed).

Most importantly:

- We have early support for deploying a JHipster application to the cloud in one command! We currently support [Heroku]({{ site.url }}/heroku/) and [Openshift]({{ site.url }}/openshift/). Please give them a try, but remember, this is an early release!
- We updated the Liquibase/JPA configuration so that they now match 100%. We even run the Hibernate schema validation tool when running the tests ("mvn test"). However, this will probably break existing Liquibase configuration, or be too strict for most users: please notify us, and we will remove this check in future releases if it is too strict!


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
