---
layout: default
title: 發布 v2.20.0
---

JHipster release 2.20.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日誌
----------

Like last month, this new release was largely done by [the new dev team]({{ site.url }}/team/), so kudos to all of you guys!

The new and noteworthy features are:

- Migration to Node-Sass instead of Compass (see [#1527](https://github.com/jhipster/generator-jhipster/issues/1527) ). This is a big breaking change for people using Compass, for more information [here is the Node Sass website](https://www.npmjs.com/package/node-sass), and of course our documentation is already updated.
- Many improvements in the AngularJS side of the entity relationships. You will see new links between entities, which will bring you a much better user experience
- Library updates (Java and JavaScript sides), including for Sonar, SpringFox and Yeoman itself ( [#1698](https://github.com/jhipster/generator-jhipster/issues/1698) )
- Corrections on the DTO option (with MapStruct), which should go out of beta in the next release
- Many, many minor bugs corrected (83 issues closed in total!)

一如既往， __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.20.0+is%3Aclosed)__.

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
