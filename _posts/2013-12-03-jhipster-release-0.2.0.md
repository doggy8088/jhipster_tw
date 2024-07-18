---
layout: default
title: 發布 0.2.0
---

JHipster release 0.2.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

在發布v0.1.0不久之後, 我們又發布了JHipster v0.2.0!

這個版本修復了一些缺陷和些許效能提升, 但是為生成器更新了一個令人興奮的屬性-在AngularJS支援了完整的本地化支援.

- 本地化所有的Angularjs檢視!
- 使用了優秀的["Angular Translate"](https://github.com/PascalPrecht/angular-translate)函式庫
- i18n的使用文件-["development" section](/development/)

我們還沒發現其他的Yeoman產生器具有這個功能, 所以Jhipster再次實現了一個企業屬性!

*還需完善部分*: 在"production"模式下我們還沒找到最小化與快取本地化Json檔案的最佳解決方案. 當前唯一的解決方法是使用ETags (使用Spring的ShallowEtagHeaderFilter), 但是這並不是一個完美的解決方案. 如果你有任何想法, 歡迎和我們交流!

十分感謝[Jerome Mirc](https://twitter.com/JeromeMirc)提出這個想法以及辛勤的程式碼貢獻.
