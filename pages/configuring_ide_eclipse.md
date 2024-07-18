---
layout: default
title: 設定使用Maven的Eclipse
permalink: /configuring-ide-eclipse/
redirect_from:
  - /configuring_ide_eclipse.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 設定使用Maven的Eclipse

在Eclipse中匯入JHipster應用程式將需要一些額外的手動設定步驟。您將需要進行如下一些設定：

- Maven方面（針對Maven使用者）

- JavaScript方面（因此Eclipse可以忽略幾個靜態檔案資料夾）

## 1. 將專案匯入為Maven專案

- 選擇 File -> Import
- 選擇 "Existing Maven Projects"
- 選擇你的專案
- 點選"Finish"

![Import]({{ site.url }}/images/configuring_ide_eclipse_1.png)

![Select]({{ site.url }}/images/configuring_ide_eclipse_2.png)

在匯入階段結束時，可以看到以下對話框。"Maven plugin connectors"是m2eclipse的擴充套件。需要安裝該程式，完成後需要重新啟動Eclipse。

如果您已經安裝了它，則無需執行任何其他操作。

![Select]({{ site.url }}/images/configuring_ide_eclipse_maven_processor.png)

__注意__: 如果您已經有一個現有的JHipster專案，但尚未安裝相應的connectors，則應該看到以下錯誤:

`Plugin execution not covered by lifecycle configuration: org.bsc.maven:maven-processor-plugin:2.2.4:process (execution: process, phase: generate-sources)`

需在錯誤標記上選擇Quick Fix/Ctrl+1（在Mac上為Cmd+1），然後選擇"Discover new m2e connectors"

## 2. 排除生成的靜態檔案夾

在此階段，您應該沒有任何Java錯誤出現了，但仍然應該看到一些JavaScript錯誤。這是因為您有一些Eclipse無法正確解析的JavaScript檔案。這些檔案僅在執行時使用，並且不需要在您的工作區中可見。他們應該被排除在外。

### 排除「node_modules」資料夾

- 進入 Project -> Properties -> Resource -> Resource Filters
- 選擇: Exclude all, Applies to folders, Name matches node_modules
- 點選"Ok"

![Right-click]({{ site.url }}/images/configuring_ide_eclipse_3.png)

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_4.png)


### 從src/main/webapp中排除'app'

- 進入 Project -> Properties -> Javascript -> Include path
- 單擊『source』頁籤，然後選擇 your_project/src/main/webapp
- 選擇 『Excluded: (N  one) -> Edit -> Add multiple
- 選擇`app`然後點選『Ok』
- 以下資料夾應該已經被自動排除（如果沒有的話，請手動排除它們）：
    - `bower_components`
    - `node_modules/`

![Right-click]({{ site.url }}/images/configuring_ide_eclipse_5.png)

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_6.png)

![Multiple select]({{ site.url }}/images/configuring_ide_eclipse_7.png)

### Maven IDE設定檔案

如果使用Maven，則需要在Eclipse中啟用`IDE`設定檔案。這用於應用IDE特定的調整，目前僅包括應用MapStruct註解處理器。

- 進入 Project -> Properties -> Maven
- 在"Active Maven Profiles"設定中, 輸入`dev,IDE`

透過此設定，您將同時使用JHipster`dev`和`IDE`設定檔案。

### 設定MapStruct外掛

為了使IDE正確識別mapstruct程式碼產生器，還需要一些設定。

您應該使用m2e-apt外掛（https://marketplace.eclipse.org/content/m2e-apt）。安裝m2e-apt外掛，使Eclipse能夠與mapstruct一起使用。

您也可以安裝MapStruct的Eclipse外掛（https://marketplace.eclipse.org/content/mapstruct-eclipse-plugin），以獲取IDE的幫助和提示。