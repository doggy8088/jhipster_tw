---
layout: default
title: 發布 v1.9.0
---

JHipster release 1.9.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

更新日誌
----------

The highlights of this release are:

- We upgraded to the latest Spring Boot 1.1.9
- We now __recommend__ the use of Maven over Gradle, and the use of Grunt over Gulp.js. Both Gradle and Gulp.js were community-driven add-ons, and we find them hard to maintain, while it is clear that very few people are using them. So we are looking for volonteers to maintain those tools (it you like one of them, speak up! Become a maintainer!).
- We have reworked the generator options, so they are in a more logical order
- We now have Java 8 by default, instead of Java 7. As Java 7 will be end-of-life'd in April 2015, we feel it is the right time to switch!

We are currently preparing our 2.0 release, which is why we are cleaning up the generator. This new release is mostly a re-work of our AngularJS front-end to make it more modular, so you can use JHipster on bigger projects. It is inspired by [Angular Fullstack](https://github.com/DaftMonk/generator-angular-fullstack), which looks to us to have the best front-end architecture.

Feel free to have a look at [at our 2.0 branch](https://github.com/jhipster/generator-jhipster/tree/v2.0) and send us your comments!

一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.9.0+is%3Aclosed)__.

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
