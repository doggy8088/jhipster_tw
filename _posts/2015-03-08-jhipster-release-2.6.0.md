---
layout: default
title: 發布 v2.6.0
---

JHipster release 2.6.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日誌
----------

The __big__ news is that we added validation support in JHipster!

By validation, we mean we have new options when generating an entity, that allows to configure validation for:

- HTML views, using the AngularJS validation mechanism
- Java domain objects, using Bean Validation
- Spring MVC REST controllers
- Hibernate (well, that's automatic, we didn't do anything on this one!)

Also noteworthy is that database columns are correctly generated, depending on the validation options (for a required field, its column is marked non-nullable, for example).

More information is available in our [entity sub-generator documentation]({{ site.url }}/creating-an-entity/).

一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.6.0+is%3Aclosed)__.

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
