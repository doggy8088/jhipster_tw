---
layout: default
title: 發布 0.5.0
---

JHipster release 0.5.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

- 實體類別的子產生器現在已可以使用. 完整的使用文件參考[此處](/creating-an-entity/)
- 你現在可以建立一個單獨的可執行Jar檔案用於簡便部署. 文件參考[生產環境章節](/production/)
- 一些缺陷修復與些許效能提升, 以及文件更新

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

我們修改了Liquebase變更集, 新增了"HIBERNATE_SEQUENCES"表, 你需要刪除你現有的表結構或者手動新增.

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題
