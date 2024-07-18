---
layout: default
title: 使用JHipster進行微服務
permalink: /microservices-architecture/
sitemap:
    priority: 0.7
    lastmod: 2016-03-10T00:00:00-00:00
---

# <i class="fa fa-sitemap"></i> 使用JHipster進行微服務

## <a name="microservices_vs_monolithic"></a> 微服務架構與整體架構

生成應用時JHipster問您的第一個問題是您要生成的應用程式型別。您可以在兩種架構之間進行選擇：

- "monolithic"架構使用一個單獨的，所有元件集一體的應用程式，其中包含前端程式碼和後端Spring Boot程式碼。
- "微服務"架構將前端和後端分開，因此您的應用程式可以更輕鬆地擴充套件和解決基礎架構問題。

"monolithic"應用程式更易於操作，因此，如果您沒有任何特定要求，則建議使用此選項，並且將其作為預設選項。

## <a name="overview"></a> 微服務架構概述

JHipster微服務架構以以下方式工作：

 * [gateway]({{ site.url }}/api-gateway/)是JHipster生成的應用程式(生成時選擇`microservice application``microservice gateway`)，該應用程式處理Web流量，併為Angular/React應用程式提供服務。如果您要遵循[Backends for Frontends模式](https://www.thoughtworks.com/insights/blog/bff-soundcloud)，則可以存在幾種不同的閘道器，但這不是強制性的。
 * [JHipster Registry]({{ site.url }}/jhipster-registry/)是一個所有應用程式在執行時候在其註冊並從中獲取其設定的服務。它還提供了執行時監視儀表板。
 * [Consul]({{ site.url }}/consul/)是服務發現服務以及提供鍵/值儲存。它可以用作JHipster Registry的替代服務。
 * [Microservices]({{ site.url }}/creating-microservices/)是JHipster生成的應用程式（生成時選擇`microservice application`），用於處理REST請求。它們是無狀態的，可以並行啟動它們的多個實例來達到負載均衡的目的。

在下圖中，綠色元件特定於您的應用程式，藍色元件提供了其基礎結構。

<img src="{{ site.url }}/images/microservices_architecture_2.png" alt="Diagram" style="width: 930px; height: 558px"/>
