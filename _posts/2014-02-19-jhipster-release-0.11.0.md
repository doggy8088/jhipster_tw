---
layout: default
title: 發布 v0.11.0
---

JHipster release 0.11.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

This is the most important version we have done, ever. More than one month of work to give you full hot reloading of your Java code.

We do not know of any other solution that goes this far, as we have hot reloading working from the database (the tables are automatically updated) to the JavaScript application!

Hot reload is specifically impressive as you can:

- Add or modify any Spring bean (JHipster handles autowiring, aspects, caching... all automatically!)
- Add or modify Spring Data JPA repositories or Spring MVC REST endpoints
- Add new JPA entities (Hibernate is updated, and we even generate the Liquibase changeset automatically, and update the database accordingly!)

All those are possible thanks to a lot of very complex code that is generated inside your application: in the future, we will probably release this as a separate library.

This version also comes with some less important changes:

- Many improvements on the Metrics page
- All Grunt libraries are now fixed, as we had to many issues with broken JavaScript libraires. This is the same thing we have done with Bower in the previous release
- We have switched from HSQLDB to H2, as it provides a nice Web console, available with the "/console" URL of your application. This allows you to check that hot reload really updated your database!
- Several bugfixes, most noticeably in the Atmosphere code

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
