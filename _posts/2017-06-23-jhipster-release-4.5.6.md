---
layout: default
title: 發布 v4.5.6
---

JHipster release 4.5.6
==================

更新日誌
----------

This is the sixth patch release for JHipster v4.5.0.

This patch release that was triggered by [this comment](https://github.com/jhipster/generator-jhipster/commit/bdc77898d184c2ad9a1b1d4acc8acf40aadc0431#commitcomment-22724306), as the previous release had an issue for all MongoDB and Cassandra entities, which made the Angular 4 code fail to compile (if you are on 4.5.5, don't worry and look at the comment, this is really a trivial fix).

This release also comes with some really awesome new features:

- After months of being stuck, our [Upgrade sub-generator is fixed!](https://github.com/jhipster/generator-jhipster/pull/5966). Many thanks to [Tien Tran](https://github.com/tientq) who fixed this! Of course there are many use cases when upgrading, and this is still very new, so feedback is **highly welcome**.
- Infinispan support for both Hibernate 2nd-level cache and Spring Cache abstraction - see [#5874](https://github.com/jhipster/generator-jhipster/issues/5874) - many thanks to [@srinivasavasu](https://twitter.com/srinivasavasu) from Red Hat! This is still in **BETA** and should be more tested, but you can already try it and send us your feedback.

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.6+is%3Aclosed)__.

更新指引
------------

**自動升級**

WARNING [this has been fixed very recently](https://github.com/jhipster/generator-jhipster/pull/5966), so if you have trouble with this:

- You can still do a "manual upgrade" (see below)
- If you find anything helpful for us, please send us comments on ticket [#5883](https://github.com/jhipster/generator-jhipster/issues/5883)
- If you have time and want to help, don't hesitate to contribute on this part!

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
