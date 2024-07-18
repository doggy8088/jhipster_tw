---
layout: default
title: 發布 v5.2.0
---

JHipster release v5.2.0
==================

JHipster v5.2.0 comes with 120 closed tickets and pull requests.

Please note that we have launched a [bug bounties program]({{ site.url }}/bug-bounties/) and that several important tickets have been closed thanks to this. At the moment, we have $2,000 on this program thanks to our awesome sponsors, through our [OpenCollective initiative](https://opencollective.com/generator-jhipster).

Here are the most important tickets closed in this release:

- Lots of CI/CD improvements by [@pascalgrimaud](https://twitter.com/pascalgrimaud) - see  [#7904](https://github.com/jhipster/generator-jhipster/issues/7904).
- Upgrade to Yeoman 3 [#7909](https://github.com/jhipster/generator-jhipster/issues/7909).
- Production build fix for React [#8023](https://github.com/jhipster/generator-jhipster/pull/8023).
- Make Angular e2e tests use async/await [#8026](https://github.com/jhipster/generator-jhipster/pull/8026).
- Update spring-boot to 2.0.4, spring-cloud to Finchley.SR1  [#8046](https://github.com/jhipster/generator-jhipster/pull/8046).
- Add admin module tests for Angular [#8048](https://github.com/jhipster/generator-jhipster/pull/8048).
- Update Angular to 6.1 [#8066](https://github.com/jhipster/generator-jhipster/pull/8066).
- Move to Terser plugin instead of UglifyJS [#8069](https://github.com/jhipster/generator-jhipster/pull/8069).

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.2.0+is%3Aclosed)__.

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
