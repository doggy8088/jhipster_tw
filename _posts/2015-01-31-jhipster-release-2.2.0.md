---
layout: default
title: 發布 2.2.0
---

JHipster release 2.2.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日誌
----------

This is mostly a bug-fixing release, but we included a __breaking change__ in the configuration files of the entity sub-generator:

- Configuration files are now stored in the '.jhipster' directory, and not at the root directory, so we don't end up with lots of files at the root of the project (this mostly affected Windows users, as their inferior OS has no idea what a dotfile is)
- Now those files always start with a upper case letter: they have the same name as the entity they generate. Otherwise we had trouble with people calling the sub-generator twice, once with a upper-case letter, and once with a lower-case letter

一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.2.0+is%3Aclosed)__.

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
