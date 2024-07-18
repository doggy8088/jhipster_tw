---
layout: default
title: 發布 v3.7.1
---

JHipster release 3.7.1
==================

更新日誌
----------

This is a bug-fixing release, with a few new features.

- Questions in the main generator have been refactored - see [#4134](https://github.com/jhipster/generator-jhipster/pull/4134)
- Downgrade the MySQL Docker image to 5.7.13 - see [#4144](https://github.com/jhipster/generator-jhipster/pull/4144)
- Add Swagger back in the default `dev` profile - see [#4146](https://github.com/jhipster/generator-jhipster/pull/4146)
- Ehcache configuration is now generated for entities and their relationships - see [this commit](https://github.com/jhipster/generator-jhipster/commit/d8477598334c133ff86b7a2b6999803f8fdd5a8d)
- The Maven Spring Boot plugin now runs in fork mode, which allows hot-reload using the Spring Boot devtools.
- We now support officially Visual Studio Code, [here is our new specific documentation]({{ site.url }}/configuring-ide-visual-studio-code/)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.7.1+is%3Aclosed)__.

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
