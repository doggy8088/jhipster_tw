---
layout: default
title: 發布 v7.0.0-beta.1
---

JHipster 發布 v7.0.0-beta.1 版本
==================

這是我們的JHipster v7的第二個Beta版本，也是今年的第一個Beta版本。

包括 [227個已關閉的憑單和合並請求](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.1).

_由於這是測試版，因此無法透過常規渠道獲得，請閱讀以下內容以獲取更多訊息！_

新屬性
------------

- React中測試檔案與被測檔案同目錄 [#13425](https://github.com/jhipster/generator-jhipster/issues/13425)
- 支援 --pk-type [#13296](https://github.com/jhipster/generator-jhipster/issues/13296)
- 支援 @MapstructExpression [#13195](https://github.com/jhipster/generator-jhipster/issues/13296)
- 伺服器通用指令碼-由Webapp替換的Webpack設定檔案 [#13196](https://github.com/jhipster/generator-jhipster/pull/13196)
- 微服務中Swagger異常 [#13446](https://github.com/jhipster/generator-jhipster/pull/13446)
- K8S子產生器支援neo4j [#13548](https://github.com/jhipster/generator-jhipster/pull/13548)
- 其他諸多改進
- 大量依賴庫升級
- 一些錯誤修復

關閉的工單與合併請求
------------
一如既往， __[您可以在此處檢視所有已關閉的工單和合並請求](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.1)__.


安裝方法
------------

這是一個beta版本，因此在我們通常的『穩定』發布渠道上不可用。

要使用NPM安裝JHipster v7.0.0-beta.1，請執行以下操作：

    npm install -g generator-jhipster@beta

它也可以透過JHipster Docker映像使用，因為它是根據我們的原始碼自動建立的。

但是，由於這是一個BETA版本，因此無法透過我們的其他常用渠道使用，例如：

- [JHipster Online](https://start.jhipster.tech)
- [JHipster Devbox](https://github.com/jhipster/jhipster-devbox)

您也將無法使用`jhipster upgrade`子產生器，因為它不會『看到』 BETA版本，該版本透過NPM上的特定Beta渠道分發。

您可以檢視 [v7 upgrade tips]({{ site.url }}/tips/033_tip_v7_upgrade.html) 頁面以獲取v7升級提示。


幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們：

- 送出Bug請到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 送出問題請到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
