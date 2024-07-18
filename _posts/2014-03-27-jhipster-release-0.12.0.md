---
layout: default
title: 發布 v0.12.0
---

JHipster release 0.12.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

JHipster 0.12 comes with a lot of bug fixes and new features, which we have listed [here](https://github.com/jhipster/generator-jhipster/issues?milestone=1&page=1&state=closed).

Most importantly, we have now moved "JHipster-Loaded", which allows us to have hot reload of Java code, to a specific project: [https://github.com/jhipster/jhipster-loaded](https://github.com/jhipster/jhipster-loaded).

This means 3 things:

- your JHipster project has now fewer classes, 
- our Java Agent has changed, you now need to use "-javaagent:spring_loaded/springloaded-jhipster.jar -noverify -Dspringloaded=plugins=io.github.jhipster.loaded.instrument.JHipsterLoadtimeInstrumentationPlugin"
- and that you can use JHipster-Loaded in other, non-jhipster projects

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
