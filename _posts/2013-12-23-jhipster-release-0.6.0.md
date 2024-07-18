---
layout: default
title: 發布 0.6.0
---

JHipster release 0.6.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

- 更新到Spring Security 3.2, 並使用Java Config類替換了之前的XML設定檔案, 感謝[Jerome Mirc](https://twitter.com/JeromeMirc)巨大的貢獻.
- 現在所有的Spring設定檔案都不依賴XML. 最後一個依賴XML的設定檔案是web.xml (Java EE太愛XML了!!).
- 我們更新了一個"services"子產生器, 用於業務服務類生成. 你可以在[此處]({{ site.url }}/creating-a-service/)找到最新的文件.

更新指引
------------

使用以下指令更新Jhipster:

```
npm update -g generator-jhipster
```

使用以下指令更新你的專案

```
yo jhipster
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題
