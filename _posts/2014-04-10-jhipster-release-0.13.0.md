---
layout: default
title: 發布 v0.13.0
---

JHipster release 0.13.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

JHipster 0.13.0 comes with a lot of bug fixes and new features, which we have listed [here](https://github.com/jhipster/generator-jhipster/issues?milestone=2&page=1&state=closed).

Most importantly, we have:

- Support for Java 8
- Support for Spring Boot 1.0
- Added Swagger integration for documenting our REST interfaces
- Danish translation

Warning: it looks like in "production" mode we have an issue in the "uglify" task, that doesn't minify correctly the JavaScript files in the index.html file. It seems to depend on the "uglify" task version, if you encounter that issue please do not hesitate to contact [@juliendubois](https://twitter.com/juliendubois) who is struggling to reproduce that issue.

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
