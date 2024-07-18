---
layout: default
title: 發布 v4.12.0
---

JHipster release 4.12.0
==================

更新日誌
----------

This is a huge release, with 105 closed tickets and bug requests (yes, the last 2 weeks have been pretty busy for the team!).

Here are the most important ones:

- Angular 5 support [#6789](https://github.com/jhipster/generator-jhipster/pull/6789)
- MongoDB users can now use the Elasticsearch option, like JPA users [#6595](https://github.com/jhipster/generator-jhipster/pull/6595)
- Gateways secured with OpenID Connect can now be generated without any database [#6763](https://github.com/jhipster/generator-jhipster/issues/6763)
- Several server-side libraries upgrades, including Spring Boot 1.5.9 [#6782](https://github.com/jhipster/generator-jhipster/pull/6782)

As announced in the previous release, React support is still under development: use the `--experimental` flag when running JHipster to enable the React option. Warning, this is not finished yet! Your contributions are of course welcome.

OpenCollective
----------

We have opened an [OpenCollective account](https://opencollective.com/generator-jhipster). If you find the project helpful, or if your company benefits from it, please consider becoming a backer or a sponsor.

This is very important to keep the project growing.

JHipster Online
----------

[JHipster Online](https://start.jhipster.tech) has a new release, which supports Continuous Deployment. You can now generate your application, design your entities, and test everything, all from a nice Web user interface.

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.12.0+is%3Aclosed)__.

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
