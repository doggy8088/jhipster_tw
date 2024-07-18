---
layout: default
title: 發布 v4.14.0
---

JHipster release 4.14.0
==================

更新日誌
----------

The big news is that this is the last 4.x release from the master branch. Starting now, our focus will be JHipster 5, and JHipster 4 will be in maintenance mode: we will do patches if necessary, but the main development work will be on JHipster 5.

For the record, JHipster 5 will focus on Spring Boot 2 and on React. Angular will still be a first-class citizen, but AngularJS will be excluded from the main project (you will still be able to use AngularJS as an external "blueprint", which is a new system that will be published with JHipster 5).

Here are the highlights of this release:

- Upgrade to Spring Security 4.2.4 to fix [CVE-2017-8030](http://spring.io/blog/2018/01/30/cve-2017-8030-spring-security-5-0-1-4-2-4-4-1-5-released) - see [#7059](https://github.com/jhipster/generator-jhipster/issues/7059)
- Migrate to the new HttpClientModule from Angular 4.3 - see [#6281](https://github.com/jhipster/generator-jhipster/issues/6281)
- Upgrade to Angular 5.2 and Bootstrap 4.0.0 - see [#7005](https://github.com/jhipster/generator-jhipster/pull/7005)
- Upgrade to Angular CLI to 1.6.6 - see [#7052](https://github.com/jhipster/generator-jhipster/pull/7052)
- Heroku deployments can now be made directly through Git - see [#7045](https://github.com/jhipster/generator-jhipster/pull/7045)
- React support is still "experimental", so you need to run `jhipster --experimental` to enable React support. This is not complete yet, but we are quickly moving forward, so you can already have a good taste of JHipster 5 here. And if you're a React expert, don't hesitate to contribute!
- Generate i18n mouseover/tooltip help from JDL comments - see [#6797](https://github.com/jhipster/generator-jhipster/issues/6797)

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.14.0+is%3Aclosed)__.

更新指引
------------

**自動升級**

在已存在的專案上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動升級:

升級Jhipster版本:

```
yarn global upgrade generator-jhipster
```

然後升級子產生器:

```
jhipster upgrade
```

**手動升級**

選擇手動升級, 需要先升級你的Jhipster版本:

```
yarn global upgrade generator-jhipster
```

如果你已經有了一個專案, 將會繼續使用當時專案生成的Jhipster版本.
如果需要升級你的專案, 你需要先刪除`node_modules`資料夾再執行:

```
jhipster
```

更新你的專案和所有的實體類

```
jhipster --with-entities
```

你也可以使用實體類子產生器挨個更新你的實體類, 例如你的實體類別名稱字是_Foo_

```
jhipster entity Foo
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
