---
layout: default
title: 發布 v0.0.28
---

JHipster release 0.0.28
==================


Maven設定檔案"development"和"production"已改名為"dev"和"prod", 簡化輸入

"dev"模式, 沒有新增額外的功能.

"prod"模式, 新增了以下功能:

- 打包應用時候會自動觸發完整的"grunt build"
- 最小化、最佳化後的靜態資源會寫入"src/main/webapp/dist"目錄
- 更新了兩個全新的Servlet filter: 一個管理"/dist"目錄下的靜態檔案, 另一個新增HTTP頭部快取訊息
