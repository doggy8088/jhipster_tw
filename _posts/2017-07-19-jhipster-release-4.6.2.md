---
layout: default
title: 發布 v4.6.2
---

JHipster release 4.6.2
==================

更新日誌
----------

This is the second patch release for JHipster v4.6.0.

- As it is already used in several production clusters, our Kubernetes sub-generator is now out of beta - see [#6145](https://github.com/jhipster/generator-jhipster/pull/6145).
- Upgrade to Typescript 2.4.1 - see [#6051](https://github.com/jhipster/generator-jhipster/issues/6051).
- Support for Arabic language (another left-to-right language, following our Farsi support in [#5961](https://github.com/jhipster/generator-jhipster/pull/5961)) - see [#6101](https://github.com/jhipster/generator-jhipster/pull/6101).
- Support for Bahasa Indonesia language - see [#6092](https://github.com/jhipster/generator-jhipster/pull/6092).
- Lots of small improvements and minor bug fixes.

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.6.2+is%3Aclosed)__.

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
