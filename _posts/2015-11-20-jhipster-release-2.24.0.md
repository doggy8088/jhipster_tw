---
layout: default
title: 發布 v2.24.0
---

JHipster release 2.24.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日誌
----------

We've had more than 50 closed bugs, and this is a recommended update for everyone.

## Spring Boot 1.3.0.RELEASE

JHipster has migrated to the newly-released stable version of Spring Boot 1.3.0, which includes many libraries updates.

## The JHipster "devbox" is now available

The [JHipster devbox](https://github.com/jhipster/jhipster-devbox) is now available! It is a virtualized development environment with JHipster and many other useful tools already installed.

Closed tickets
------------

一如既往, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.24.0+is%3Aclosed)__.

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

You can also update your entities by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題
