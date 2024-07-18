---
layout: default
title: 發布 0.10.0
---

JHipster release 0.10.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

* Thymeleaf支援! 為了解決單頁Web應用無法適用的場景, 我們在Jhipser中新增了Thymeleaf引擎支援, 這個新檔案: src/main/resources/templates/error.html, 正常的接管你的應用中404與500錯誤!
* 實現Spring Boot Actuator的安全審計. 在管理選單可以檢視到 "安全審計"!
* __警告__ 上面一個屬性更新了一些新的資料表和索引! 如果您在一個現有的資料庫上重新生成你的應用將會報錯! 檢視db-changelog.xml這個檔案的變更, 我們新增了兩個表和兩個索引. 如果覺得不可思議, 請在推特[@jhipster](https://twitter.com/jhipster)聯絡我們: 您是希望為新專案使用乾淨的db-changelog.xml，還是為新表/索引/FK在db-changelog.xml中使用新的變更集？
* 所有的Bower依賴我們現在寫死在生成的bower.json檔案. 意味著我們不再相信其他專案提供所謂的"可更新"的依賴, 因為之前導致了各種奇怪的問題. 現在每個使用Jhipster的使用者都擁有相同的Bower依賴, 除非你選擇自己執行"bower update"!
* 一些次要缺陷修復, 重構和效能提升

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
