---
layout: default
title: 發布 2.3.0
---

JHipster release 2.3.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日誌
----------

The most important news of this release is the support of [BrowserSync](http://www.browsersync.io/) to enable easy multi-device testing.

This supercedes the "live edit" plugin we were using before, so typing ```grunt serve``` will now launch BrowserSync. Everything should work the same as before, only better: you can now open several browsers, or use external devices, and all clicks/scrolls/inputs will be synchronized everywhere.

To have a preview of this feature, you can watch our [short introduction video](https://www.youtube.com/watch?v=u8rf8Fq5x0o).

一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.3.0+is%3Aclosed)__.

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
