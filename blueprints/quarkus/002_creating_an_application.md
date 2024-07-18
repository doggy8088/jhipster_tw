---
layout: default
title: 建立一個應用程式
sitemap:
priority: 0.5
lastmod: 2021-01-07T08:40:00-00:00
---

# 建立一個應用程式

## 快速上手

首先，建立一個空目錄，您將在其中建立應用程式：

`mkdir my-quarkus-application`

轉到該目錄：

`cd my-quarkus-application`

要生成您的JHipster Quarkus應用程式，請輸入：

`jhipster-quarkus`

## 進階

`jhipster-quarkus`內建`jhipster`依賴關係，這意味著您不必自己安裝`jhipster`。
`jhipster-quarkus`的主要好處是確保JHipster Quarkus方案與下面的JHipster之間的相容性。

但是，如果要使用自定義的`jhipster`安裝，則可以使用`--blueprint`標誌，如下所示：

`jhipster --blueprints quarkus`

請記住，在這種設定下，您可能會遇到相容性問題，因此我們不建議您使用此用法。

## 生成應用程式時的問題

在JHipster Quarkus建立期間提出的問題與標準Quarkus相同。

請參考相應的文件：[生成應用時的問題]({{ site.url }}/creating-an-app/#2)
