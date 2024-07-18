---
layout: default
title: 發布 v1.10.1
---

JHipster release 1.10.1
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

更新日誌
----------

This is a maintenance release for our latest v1.10.0 version. For your information, maintenance is done on the "v1.x_maintenance" branch, and contains only important bug fixes that been merged on the "master" branch (which contains the new v2.0.0 code).

The v2.0.0 version is taking some time to finish, as we have changed many parts of the generator. You can follow our changes on [our GitHub issue tracker, using the milestone "2.0.0"](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.0.0). When this is all finished, we will release a document listing what's new and what's cool in the v2.0.0 release.

This is why, as we have a couple of important fixes on the v1.x version, we have decided to release this maintenance version.

More specifically, we included the following fixes:

- Corrected the Gradle wrapper (which was corrupted), and added a .gitattribute configuration so that it doesn't happen ever again!
- Corrected the Maven build to enabled milestones, so you could grab the new Spring Boot 1.2.0.RC2 easily (lesson learned: a "release candidate" is not released yet!)

Many thanks to everybody sending us Pull Requests, we are very happy to have so many people contributing.

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
