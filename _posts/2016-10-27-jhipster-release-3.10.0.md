---
layout: default
title: 發布 v3.10.0
---

JHipster release 3.10.0
==================

更新日誌
----------

Lots of new features and bug fixes in this new release, here are the most important ones:

- Use the new Spring 4.3 composed annotations for cleaner and shorter Spring MVC configuration. This is a great improvement for everyone!  [#4291](https://github.com/jhipster/generator-jhipster/pull/4291)
- Update the CSRF protection mechanism [#4272](https://github.com/jhipster/generator-jhipster/issues/4272)
- Pagination is causing issues when changing the number of items per page [#4347](https://github.com/jhipster/generator-jhipster/issues/4347)
- Add springfox-bean-validators dependency for better Swagger documentation [#4388](https://github.com/jhipster/generator-jhipster/pull/4388)
- Gitignore should have folders and not files [#4387](https://github.com/jhipster/generator-jhipster/issues/4387)
- Add listener to re-add logstash appender when config is reset [#4334](https://github.com/jhipster/generator-jhipster/pull/4334)
- Several improvements in the upgrade sub-generator [#4306](https://github.com/jhipster/generator-jhipster/pull/4306)
- Fix MongoDB running with Cloud Foundry [#4363](https://github.com/jhipster/generator-jhipster/issues/4363)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.10.0+is%3Aclosed)__.

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
