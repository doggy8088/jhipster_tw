---
layout: default
title: 發布 v3.2.0
---

JHipster release 3.2.0
==================

更新日誌
----------

This is an upgrade and a bug-fix version for JHipster 3.1.0, with some major new features, so we recommend you read the following most important changes:

- Migrated from [maven-yeoman-plugin](https://github.com/trecloux/yeoman-maven-plugin) to [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) for the Maven build: this new plugin is far more popular and provides a lot more options, but works a little bit differently, so feedback is highly welcome!
- New JHipster Registry v2.0.0 release! This is a major new release, with a brand new UI, we're waiting for your feedback on it! There is one breaking change: it is now secured, so now you will need to log in to use it, using the usual default admin/admin user.
- Spring Boot Actuator endpoints are now secured behind the new "/management" URL prefix. This makes it easier to secure them, but if you rely on those URLs, you will need to update your code.
- Migration from [Mongeez](https://github.com/mongeez/mongeez) to [Mongobee](https://github.com/mongobee/mongobee) for MongoDB: now you can use MongoDB on Heroku and Cloud Foundry!
- Migration from [gulp wiredep](https://github.com/taptapship/wiredep) to [gulp inject](https://github.com/klei/gulp-inject) for bower dependency injection, checkout the generated gulpfile!
- Migration to Spring Cloud Brixton.RC2
- A new [BETA] option to generate a dedicated UAA server for microservices, so you can already try using OAuth2 with microservices!
- Support for required validation for relationships
- New Blob support for Cassandra
- JHipster Console v1.2.0 released, with some bug fixes for alerting
- Many small UI improvements and bug corrections

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.2.0+is%3Aclosed)__.

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

更新你的專案和所有的實體類

```
yo jhipster --with-entities
```

You can also update your entities by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
