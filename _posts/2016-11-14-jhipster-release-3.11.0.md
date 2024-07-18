---
layout: default
title: 發布 v3.11.0
---

JHipster release 3.11.0
==================

更新日誌
----------

75 closed tickets and merged PRs in this release! Those are mostly library upgrades, and quite a lot of small improvements in the generated code.

Here are the most important ones:

- Upgrade Gradle to 3.2 - [#4472](https://github.com/jhipster/generator-jhipster/pull/4472)
- Tests generated for ZonedDateTime entity attributes are failing - [#4373](https://github.com/jhipster/generator-jhipster/issues/4373)
- Update to Spring Boot 1.4.2 - [#4449](https://github.com/jhipster/generator-jhipster/issues/4449)
- Change @PostConstruct to @Before in tests - [#4435](https://github.com/jhipster/generator-jhipster/pull/4435)
- Upgrade springfox to 2.6.1 - [#4438](https://github.com/jhipster/generator-jhipster/pull/4438)
- Enable oauth with live reload - [#4442](https://github.com/jhipster/generator-jhipster/pull/4442)
- Configure default date format as ISO - [#4433](https://github.com/jhipster/generator-jhipster/pull/4433)
- Early support for Yarn - [#4426](https://github.com/jhipster/generator-jhipster/pull/4426)
- ClassNotFoundException when using Kafka + Gatling - [#4402](https://github.com/jhipster/generator-jhipster/issues/4402)
- Upgrade to node 6.9.1 LTS - [#4419](https://github.com/jhipster/generator-jhipster/pull/4419)
- Fill test strings with stream to avoid constant string too long error - [#4336](https://github.com/jhipster/generator-jhipster/pull/4336)
- CLOB validation annotations are wrong - [#4344](https://github.com/jhipster/generator-jhipster/issues/4344)


關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.11.0+is%3Aclosed)__.

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
