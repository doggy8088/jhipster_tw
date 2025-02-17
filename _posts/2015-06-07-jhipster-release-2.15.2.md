---
layout: default
title: 發布 v2.15.2
---

JHipster release 2.15.2
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日誌
----------

This is a bug-fixing release, which correct a missing NPM library (EJS), and adds also some bug fixes in the Gradle and Gulp.js builds.

If you still have the `Error: Cannot find module 'ejs'` issue, please send us a bug report, it's hard to test on a development build (as we have the module installed anyway). Of course it's easy to fix manually by typing `npm install ejs`, but we want this solved for everyone!

Those issues still come from our migration to Yeoman 0.20.1, which has been very complicated, but this should be the end of them! That's the price to pay to be ready for Yeoman 1.0.

一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.15.2+is%3Aclosed)__.

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
