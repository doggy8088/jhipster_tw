---
layout: default
title: 發布 v3.7.0
---

JHipster release 3.7.0
==================

更新日誌
----------

This is a very big release with [more than 100 closed tickets and PRs](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.7.0+is%3Aclosed)! Here are the most important changes:

- **Breaking change** if you use i18n, because of [#4076](https://github.com/jhipster/generator-jhipster/pull/4076). As `translate` is an HTML5 element (which is a boolean), we are now using `data-translate` instead. To migrate your application, just do a search and replace from one attribute to the other, in all your HTML files.
- **Security issue** for people using the Twitter social login, without the rights to use the user's email address [#4024](https://github.com/jhipster/generator-jhipster/issues/4024)
- **Migration to Undertow** is our biggest change - see [#4054](https://github.com/jhipster/generator-jhipster/issues/4054). This brings some very good performance enhancements in start up time and memory usage: this is good for everyone, but people doing microservices will benefit from it even more. With this change, JHipster uses nearly as much JBoss code (Undertow, Hibernate, Bean Validation, MapStruct) as Spring code!
- **Upgrade to Gradle 3**, which is a huge change for people using Gradle - see [#3994](https://github.com/jhipster/generator-jhipster/issues/3994)
- Support for Feign clients using OAuth2 client - see [#3662](https://github.com/jhipster/generator-jhipster/pull/3662)
- New JHipster DevBox, which now uses the new "Bento" box - see [jhipster-devbox/#59](https://github.com/jhipster/jhipster-devbox/pull/59)
- Upgrade to JHipster Registry v2.5.0, which is an update of the JHipster Registry to use this JHipster v3.7.0 release (with Undertow support, etc)
- Upgrade to JHipster Console v1.3.1 - see [JHipster Console v1.3.1 release notes](https://github.com/jhipster/jhipster-console/releases/tag/v1.3.1)
- Update to Spring Cloud Brixton.SR5 - see [#4074](https://github.com/jhipster/generator-jhipster/pull/4074) [#4094](https://github.com/jhipster/generator-jhipster/pull/4094)
- Improvements to our Kubernetes sub-generator - see [#4049](https://github.com/jhipster/generator-jhipster/pull/4049) and [#4044](https://github.com/jhipster/generator-jhipster/pull/4044)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.7.0+is%3Aclosed)__.

更新指引
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

選擇手動升級, 需要先升級你的Jhipster版本:

```
npm update -g generator-jhipster
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
