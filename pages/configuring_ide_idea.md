---
layout: default
title: 設定Intellij IDEA
permalink: /configuring-ide-idea/
redirect_from:
  - /configuring_ide_idea.html
sitemap:
    priority: 0.7
    lastmod: 2015-11-28T17:13:00-00:00
---

# <i class="fa fa-keyboard-o"></i> 設定Intellij IDEA

## 開啟你的專案

- 正常開啟專案
- Maven應該自動被檢測到，您的專案將自動建立

如果需要對設定進行更多修改，還可以選擇 "Import project"。

## 排除目錄

如果您使用Git，初始化專案：(`git init && git add . && git commit -m 'Initial commit'`)，Intellij IDEA將自動排除被Git忽略的目錄（因此您無需執行任何操作）。

要手動排除目錄：

- 右鍵`node_modules/`目錄
- 選擇"Mark Directory As"並且選擇"Excluded"

![Exclude]({{ site.url }}/images/configuring_ide_idea_1.png)

**注意：** 如果您使用的是Intellij IDEA Ultimate，並且想使用IDEA前端編碼，則**不要**排除`node_modules`資料夾。 否則，您將沒有任何有關前端程式碼的程式碼幫助！

## Spring支援 (在社群版中不可用)

在一個新專案，如果需要在Spring中支援大多JHipster模組，請首先轉到`File → Project Structure`。

![Project Structure]({{ site.url }}/images/configuring_ide_idea_2.png)

然後轉到『Modules』頁籤，單擊`+`按鈕，然後單擊"Spring"以將Spring程式碼幫助新增到您的專案。

![Spring]({{ site.url }}/images/configuring_ide_idea_3.png)

它會提示您有未對映的Spring設定檔案，單擊右下角的`+`號（不是最初那個），然後選擇您的專案的所有Spring檔案，單擊資料夾就可以選擇所有內容。

![Spring Application Context]({{ site.url }}/images/configuring_ide_idea_4.png)

之後，單擊`OK`，然後Spring應該設定了適當的程式碼輔助。

現在，單擊最初用於新增Spring的`+` 按鈕，然後新增Hibernate。
您無需在此這裡新增任何檔案，只需在其中新增提供基於Hibernate的程式碼幫助。請記住在`Project structure`對話框上單擊`OK`。

現在，大多數程式碼庫都具有Spring支援。每次啟動新專案時，都必須重複此步驟，因為這些設定是基於專案特殊設定的。

## 使用Spring Boot開發工具支援應用程式『熱重啟』

[Spring Boot開發工具](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html)已由JHipster設定, ，並且在編譯專案中的類時將『熱重啟』您的應用程式。這是一項必備功能，因為它可以使您的應用程式實時更新。

預設情況下，IntelliJ IDEA在應用程式執行時不會自動編譯檔案。要啟用"Compile on save"功能：

* 轉到`File -> Settings -> Build, Execution, Deployment -> Compiler`然後啟用"Make project automatically"
* 開啟Action視窗：
  * Linux : `CTRL+SHIFT+A`
  * Mac OSX : `SHIFT+COMMAND+A`
  * Windows : `CTRL+ALT+SHIFT+/`
* 進入`Registry...`並啟用`compiler.automake.allow.when.app.running`

## Maven IDE設定檔案

如果使用的是Maven，則需要在IntelliJ中啟用`IDE`設定檔案。這是用於應用IDE特定的調整，目前僅包括應用MapStruct註解處理器。

開啟"Maven Projects"工具視窗（View -> Tool Windows），檢查`IDE`maven設定檔案並將其啟用。

## Gradle

為了獲得Gradle的最佳開箱即用體驗，您應該將所有[IDE生成/執行操作直接委派給Gradle](https://www.jetbrains.com/idea/whatsnew/#v2017-3-gradle)。
使用此設定，註解處理將自動設定，並且在混合IDE和cli建立時不會有重複的類。如果您使用的是舊版本（<2016.3），則必須手動啟用註解處理。