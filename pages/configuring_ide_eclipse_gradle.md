---
layout: default
title: 設定使用Gradle的Eclipse
permalink: /configuring-ide-eclipse-gradle/
redirect_from:
  - /configuring-ide-eclipse-gradle.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 設定使用Gradle的Eclipse

為了在Eclipse中獲得Gradle的全面支援，您應該安裝[buildship外掛](https://gradle.org/eclipse/)。對於JavaScript設定部分，您可以參照使用Maven的指引進行操作。

## 1. 將您的專案匯入為Gradle專案

- 選擇 ``File -> Import``
- 選擇 ``Gradle Project``
- 選擇項目根目錄
- 單擊``Next``，完成嚮導

![Import]({{ site.url }}/images/configuring_ide_eclipse_gradle_1.png)

![Select]({{ site.url }}/images/configuring_ide_eclipse_gradle_2.png)

## 2. 新增apt生成的源資料夾以建立路徑

當使用buildship gradles時，預設的output資料夾被過濾, 並且在工作空間中不可見。因此，您需要將其從eclipse的資源過濾器設定中刪除。

- 右鍵單擊您的專案，然後選擇 ``Properties``
- 選擇 ``Resources``
- 刪除條目 ``build``
- 選擇 ``Java Build Path``
- 點選 ``Add Folder...``
- 檢查路徑 ``build/generated/source/apt/main``

透過Eclipse執行JHipster時，請確保新的源資料夾包含正確生成的mapper實現。

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_gradle_3.png)

![Buildpath]({{ site.url }}/images/configuring_ide_eclipse_gradle_4.png)
