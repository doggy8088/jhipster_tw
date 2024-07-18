---
layout: default
title: 發布 v7.0.1
---

JHipster 發布 v7.0.1 版本
==================

這是JHipster v7的第一個修補程式版本：
- Vue: npm start 啟動後無法重新整理問題 - [#14474](https://github.com/jhipster/generator-jhipster/issues/14474)
- Reactive: 使用者和許可權 - [#14475](https://github.com/jhipster/generator-jhipster/issues/14475) [14482](https://github.com/jhipster/generator-jhipster/issues/14482)
- Swagger 授權異常 - [#14488](https://github.com/jhipster/generator-jhipster/issues/14488)
- 預設情況下在Angular中使用HMR - [#14555](https://github.com/jhipster/generator-jhipster/pull/14555)
- 大量的依賴庫更新

關閉的工單與合併的請求
------------
一如既往, __[您可以在此處檢視所有已關閉的工單和合並請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.0.1+is%3Aclosed)__.

更新方法
------------

**自動升級**

在原有的專案上使用 [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動更新：

首先，升級JHipster版本：

```
npm update -g generator-jhipster
```

然後執行子產生器：

```
jhipster upgrade
```

**手動升級**

同樣，需要先升級您的JHipster到最新版：

```
npm update -g generator-jhipster
```

對於已經存在的專案，它仍使用原來生成該專案時的JHipster版本。
要升級專案，必須首先刪除其`node_modules`資料夾，然後執行：

```
jhipster
```

您還可以透過執行以下指令來更新專案及其所有實體：

```
jhipster --with-entities
```

您還可以透過再次執行entity子產生器（jhipster entity）來逐一更新實體，例如，如果您的實體名為_Foo_，則執行：

```
jhipster entity Foo
```

**小提示**

可以使用 [prettier-java](https://github.com/jhipster/prettier-java)來格式化你的原始碼，方法如下：

```
jhipster --prettier-java
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們：

- 送出Bug請到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 送出問題請到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
