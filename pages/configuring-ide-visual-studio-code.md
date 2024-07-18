---
layout: default
title: 設定Visual Studio Code
permalink: /configuring-ide-visual-studio-code/
sitemap:
    priority: 0.7
    lastmod: 2016-09-15T17:13:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 設定Visual Studio Code

Visual Studio Code是Microsoft製作的開源文字編輯器。它對TypeScript具有出色的支援，因此許多人都希望將其用於開發Angular 2應用程式。

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_1.png)

## Yeoman支援

**警告！在撰寫本文時，此擴充套件已損壞**

Visual Studio Code具有Yeoman擴充套件，可以幫助您執行JHipster指令。

您可以使用Visual Studio Code市場來安裝它：

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_2.png)

## Java程式碼支援

Visual Studio Code具有Red Hat開發的Java擴充套件。它對使用Maven或Gradle都具有良好的Java支援。

您可以使用Visual Studio Code市場來安裝它：

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_3.png)

## 常見任務：編譯，執行和打包程式碼

Visual Studio Code Java擴充套件不能用於執行指令：它不能編譯，執行程式碼或打包應用程式。

對於所有這些任務，有兩種解決方案：

- 使用終端（例如，Visual Studio Code提供的內部終端）手動執行這些指令
- 使用[JHipster App]({{ site.url }}/jhipster-app)，該應用程式為所有這些指令提供圖形界面。**注意**不推薦使用JHipster App。

## 使用Spring Boot開發工具的應用程式"熱重啟"

[Spring Boot開發工具](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html)已由JHipster設定, ，並且在編譯專案中的類時將『熱重啟』您的應用程式。這是一項必備功能，因為它可以使您的應用程式實時更新。

Spring Boot devtools由JHipster設定，並且在編譯專案中的類時將『熱重啟』您的應用程式。這是一項必備功能，因為它可以使您的應用程式實時更新。

要在Visual Studio Code中使用它，您需要：

- 在終端中執行您的應用程式, 通常在終端中輸入 `./mvnw`

- 在另一個終端中，編譯您的應用程式： `./mvnw compile`

在第一個終端中，您的JHipster應用程式會自動使用新程式碼重新部署。

如果您使用JHipster App，只需單擊2個按鈕即可（一個用於執行該應用程式，另一個用於編譯它），您的應用程式將以相同的方式自動重新部署。

## 自定義設定

為了獲得最佳效能，建議排除一些資料夾，在專案的`.vscode`資料夾中建立一個`settings.json`檔案，如下所示：

```
{
    // Configure glob patterns for excluding files and folders.
    "files.exclude": {
        "**/.git": true,
        "**/.gradle": true,
        "**/.idea": true,
        "**/.mvn": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/.DS_Store": true
    },
    // Configure glob patterns for excluding files and folders in searches. Inherits all glob patterns from the files.exclude setting.
    "search.exclude": {
        "**/node": true,
        "**/node_modules": true,
        "**/bower_components": true,
        "**/build": true,
        "**/target": true
    }
}
```
