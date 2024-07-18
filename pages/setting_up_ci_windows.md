---
layout: default
title: 在Windows上設定Jenkins 1
permalink: /setting-up-ci-windows/
redirect_from:
  - /setting_up_ci_windows.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> 在Windows上設定Jenkins 1

## 安裝Jenkins

從[https://jenkins.io/](https://jenkins.io/)下載Jenkins Windows Installer

安裝程式會將Jenkins設定為使用SYSTEM使用者作為服務執行，這可能很危險，將使用者的服務更改為非特權使用者服務會更安全：

[http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html](http://antagonisticpleiotropy.blogspot.fr/2012/08/running-jenkins-in-windows-with-regular.html)

## 設定Jenkins

### 安裝JDK 8

透過Jenkins管理，新增JDK 8自動安裝程式。

### 安裝Maven

透過Jenkins管理，從Apache站點新增Maven自動安裝程式。

### 安裝PhantomJS

從[http://phantomjs.org/download.html](http://phantomjs.org/download.html)安裝二進位檔案

檢查可執行檔案是否包含在PATH中：

~~~
phantomjs --version
2.1.1
~~~

## 安裝NodeJS

Jenkins NodeJS外掛在Windows上不起作用，因此我們將進行手動安裝。

從 [http://nodejs.org/](http://nodejs.org/)下載最新的LTS（長期支援）64位版本。

不要將NodeJS安裝到預設目錄`C:\Program Files\nodejs`，因為它需要管理許可權，請使用更簡單的路徑，例如`c:\nodejs`。

編輯`C:\nodejs\node_modules\npm\npmrc`替換

~~~
prefix=${APPDATA}\npm
~~~

為

~~~
prefix=C:\nodejs\node_modules\npm
~~~

將'C:\nodejs\node_modules\npm'資料夾新增到PATH環境變數中，刪除安裝程式新增的資料夾：'C:\Users\<user>\AppData\Roaming\npm'

npm可能需要Git，可從 [https://git-for-windows.github.io/](https://git-for-windows.github.io/)安裝

新增Bower和Gulp：

~~~
npm install -g bower gulp
bower --version
gulp --version
~~~

在同一台電腦上安裝多個版本的NodeJS可能會很有用，但是Windows上的`nvm`等效項更多地關注開發環境，而不是持續整合。因此，如果作業需要其他版本的NodeJS，請更改其PATH變數。