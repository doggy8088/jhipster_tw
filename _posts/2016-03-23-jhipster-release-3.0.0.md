---
layout: default
title: 發布 v3.0.0
---

JHipster release 3.0.0
==================

更新日誌
----------

After months of efforts, with a [great international team]({{ site.url }}/team/), our 3.0.0 version is out!

If you liked how easy it is to develop a full-stack application with JHipster 2.0, it all stays the same. But we have extended what we mean by "full-stack":

- JHipster 3 can generate a complete microservices architecture. It will generate and configure microservices, routers, a service registry, monitoring... It's as easy as generating a standard "monolithic" application, but it now works for huge mission-critical, distributed systems.
- Infrastructure can be completely generated using Docker and Docker Compose. Complex microservices architectures can be run and tested on a laptop, and then deployed in a datacenter or in the cloud. Services can be scaled with one single command.

This website is already up-to-date with the latest documentation (and if you want to access our old 2.x documentation [it's here](https://www.jhipster.tech/documentation-archive/)), so if you want more information about microservices we recommend you read those new and updated sections:

- [Doing microservices with JHipster]({{ site.url }}/microservices-architecture/)
- [Docker and Docker Compose with JHipster]({{ site.url }}/docker-compose/)
- [Monitoring your JHipster Applications]({{ site.url }}/monitoring/)

Check out the presentation [here]({{ site.url }}/presentation/).

As it's our first 3.0 release, you can expect the usual bugs, so you might want to wait a couple of minor releases before using it in production.

Other important changes
------------

- The AngularJS front-end has been refactored, mostly to follow the [John Papa guidelines](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md). The folder structure has changed and is a breaking change for applications generated with 2.x version. This ensures that JHipster is ready for migrating to AngularJS 2, when it is ready and mature enough.
- We now support JSON Web Tokens for security, and this replaces our former "xauth tokens" that we had coded ourselves.
- We have completely migrated to Gulp.js, so you can't use Grunt anymore with JHipster.
- [JDL]({{ site.url }}/jdl/) is now a first class citizen with the new `import-jdl` sub generator.
- The entity sub-generator got many new features like option to update existing entities, custom table name, AngularJS suffix etc. Check the documentation [here]({{ site.url }}/creating-an-entity/) for details.
- The `fast` profile has been removed and instead you now have profile switches. Check the documentation [here]({{ site.url }}/profiles/) for details.
- We have changed the way application is packaged, to improve performance. Find more details [here]({{ site.url }}/production/).
- You can now choose a base language and additional languages during application generation if you have choosen internationalization.

Closed tickets
------------
This is a huge release for us and 一如既往， __[you can check all the 596 closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.0.0+is%3Aclosed)__.

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
