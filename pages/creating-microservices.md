---
layout: default
title: 建立微服務
permalink: /creating-microservices/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> 建立微服務

微服務是一種JHipster應用程式，它沒有前端（必須在[閘道器]({{ site.url }}/api-gateway/))上生成Angular前端），並且可以與[JHipster Registry]({{ site.url }}/jhipster-registry/)一起設定，發現和管理。

## <a name="generating_entities"></a> 在微服務架構中生成實體

在微服務架構中，使用[實體子產生器]({{ site.url }}/creating-an-entity/)的工作方式略有不同，因為前端和後端程式碼不在同一應用程式中。

首先，在微服務應用程式中生成實體：這是一個常用操作，您還可以使用[JHipster UML]({{ site.url }}/jhipster-uml/)或[JDL Studio](https://start.jhipster.tech/jdl-studio/)來幫助您生成複雜的實體和關係。由於微服務沒有前端，因此不會生成Angular/React程式碼。

然後，在閘道器上，再次執行實體子產生器。開頭將出現一個新問題，該問題將特供於閘道器：

- 您可以選擇正常生成一個新實體（閘道器也是標準的JHipster應用程式，因此這對於Monolith應用程式來說可以正常工作），或者選擇使用微服務中現有的JHipster設定。
- 如果選擇從微服務生成實體，則需要在本地電腦上指定該微服務的路徑，然後JHipster將在閘道器上生成前端程式碼。

## <a name="hazelcast"></a> 使用Hazelcast進行分散式快取

如果您的應用程式使用SQL資料庫，那麼JHipster會為微服務提出一個不同的第二級快取解決方案：

- JHipster的預設微服務快取解決方案是Hazelcast
- 您仍然可以選擇Ehcache（monolith應用程式的預設解決方案）或Caffeine，或者選擇完全不使用快取

此解決方案是微服務的預設設定，因為在此架構中，您可以擴充套件服務：

- 使用本地快取，您的服務實例將沒有服務間同步的快取，從而導致資料不正確
- 沒有任何快取，擴充套件的負擔將被推到資料庫上，這將不是很好（除非您使用我們的Cassandra選項）

將Hazelcast與微服務一起使用將產生特定的設定：

- 在啟動時，您的應用程式將連線到JHipster Registry，以查詢同一服務的其他實例是否正在執行
- 透過`dev`設定檔案，JHipster將在本地主機（`127.0.0.1`）上建立這些實例的叢集，每個實例使用一個不同的連接埠。預設情況下，Hazelcast連接埠是`應用程式的連接埠+5701`（因此，如果您的應用程式的連接埠是`8081`，Hazelcast將使用連接埠`13782`） 
- 藉助`prod`設定檔案，JHipster將使用預設的Hazelcast連接埠（`5701`）建立一個包含所有找到的其他節點的叢集。

## <a name="no_database"></a> 沒有資料庫的微服務

沒有資料庫，只能建立微服務應用程式。這是因為微服務很小，並且沒有用戶管理程式碼。

沒有資料庫的微服務非常小，可以用來連線到特定的後端（如舊版系統）。
