---
layout: default
title: 發布 v5.3.2
---

JHipster release v5.3.2
==================

JHipster v5.3.2 is a patch release, with [134 tickets and pull requests closed](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.3.2+is%3Aclosed), so if you had any bugs in JHipster v5.3.1, this update will hopefully solve them!

This release is the first one where we used extensively our [bug bounty program](https://www.jhipster.tech/bug-bounties/), and this worked remarquably well, with [$1,100 in paid bounties](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aissue+milestone%3A5.3.2+is%3Aclosed+label%3A%24100) - and which also explains why this release has so many fixed bugs! As this has been a great success, we will continue to push this program forward: if you or your company benefit from JHipster, please consider [sponsoring the project](https://www.jhipster.tech/sponsors/), as the sponsor money fuels the bug bounty program.

Here are the most important bug fixes and enhancements from this release:

- Full microservice stack generation using import-jdl [#8335](https://github.com/jhipster/generator-jhipster/pull/8335/)
- Add a TLS profile (back and front) to run the development server in HTTPS [#8138](https://github.com/jhipster/generator-jhipster/pull/8138)
- Angular: Use Mocha+Chai for end to end tests [#8197](https://github.com/jhipster/generator-jhipster/pull/8197)
- Remove non-free and unused dependency to org.json:json [#8206](https://github.com/jhipster/generator-jhipster/issues/8206)
- Heroku: move Liquibase migrations to release phase [#8229](https://github.com/jhipster/generator-jhipster/pull/8229)
- New languages: Bengali [#8255](https://github.com/jhipster/generator-jhipster/pull/8255) and Myanmar [#8317](https://github.com/jhipster/generator-jhipster/pull/8317)
- Update spring-boot to 2.0.5 and dependencies [#8273](https://github.com/jhipster/generator-jhipster/pull/8273)

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.3.2+is%3Aclosed)__.

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
