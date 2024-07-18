---
layout: default
title: 發布 v4.2.0
---

JHipster release 4.2.0
==================

更新日誌
----------

The biggest news in JHipster 4.2.0 is that we migrated to the freshly-released Angular 4! This includes AOT support inside JHipster, which provides an important performance enhancements - have a look at the [Angular cookbook on AOT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) if you need more information.

Angular 4 is still in BETA, but the final release is getting closer and closer. We now have quite a lot of people using it, with some very good results. Our biggest remaining work is to provide a "production" build as good as the AngularJS 1 (in fact, thanks to AOT, it should be much, much better!!). So you can start developing Angular 4 applications with confidence, and prepare to upgrade your JHipster version when we have finished the production build.

Other really cool features are:

- [ELK 5](https://www.elastic.co/fr/v5) and [Zipkin](http://zipkin.io/) support in our microservices architecture by [Pierre Besson](https://twitter.com/pibesson) - beware, the new dashboards are gorgeous :-)
- [Rancher](http://rancher.com/rancher/) support by [Steve Houël](https://twitter.com/SteveHouel), documentation should be available in the next few days.

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.2.0+is%3Aclosed)__.

更新指引
------------

**自動升級**

在已存在的專案上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動升級:

```
yo jhipster:upgrade
```

**手動升級**

選擇手動升級, 需要先升級你的Jhipster版本:

```
yarn global upgrade generator-jhipster
```

如果你已經有了一個專案, 將會繼續使用當時專案生成的Jhipster版本.
如果需要升級你的專案, 你需要先刪除`node_modules`資料夾再執行:

```
yo jhipster
```

更新你的專案和所有的實體類

```
yo jhipster --with-entities
```

你也可以使用實體類子產生器挨個更新你的實體類, 例如你的實體類別名稱字是_Foo_

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
