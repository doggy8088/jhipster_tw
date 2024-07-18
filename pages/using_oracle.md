---
layout: default
title: 使用Oracle
permalink: /using-oracle/
redirect_from:
  - /using_oracle.html
sitemap:
    priority: 0.7
    lastmod: 2015-06-08T18:40:00-00:00
---

# <i class="fa fa-database"></i> 使用Oracle

使用JPA時，可以選擇使用Oracle資料庫。

_僅Oracle 12cR1及更高版本（例如19c，18c和12cR2）支援此選項。_

當將Oracle與JHipster一起使用時，根據Oracle資料庫版本，將有以下限制。

對於19c，18c和12cR2版本：

- 實體名稱不能超過124個字元，這是由於Oracle對物件名稱的128個字元的限制，並且我們保留4個字元來為生成的表生成主鍵序列。
- 實體欄位名稱不能超過128個字元。
- 建立關係時，外鍵名稱不能超過128個字元，因此，如果它們太長，則會被截斷。
- 建立多對多關係時，聯接表名稱將遵循JPA規範（格式為`firstTable_secondTable`）：如果長度超過128個字元，則將其截斷。

對於版本12cR1：

- 實體名稱不能超過26個字元，這是由於Oracle對物件名稱的限制為30個字元，並且我們保留4個字元來為生成的表生成主鍵序列。
- 實體欄位名稱不能超過30個字元。
- 建立關係時，外鍵名稱不能超過30個字元，因此，如果它們太長，則會被截斷。
- 在進行多對多關係時，聯接表名稱將遵循JPA規範（格式為" firstTable_secondTable"）：如果長度超過30個字元，則將其截斷。
- Oracle保留關鍵字不能用作實體名稱或欄位名稱。
- 可在以下位置找到Oracle資料庫19c（EE，SE2，單實例和RAC）Docker映像：https://container-registry.oracle.com
- 可以在這裡找到Oracle資料庫19c Docker建立檔案：https://github.com/oracle/docker-images/tree/master/OracleDatabase

請注意，強烈建議使用版本19c，因為它具有長期支援（到2027年結束）。

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
