---
layout: default
title: 使用WebSockets
permalink: /using-websockets/
redirect_from:
  - /using_websockets.html
sitemap:
    priority: 0.7
    lastmod: 2015-08-31T18:40:00-00:00
---

# <i class="fa fa-envelope"></i> 使用WebSockets

WebSockets對於具有非常動態的應用程式很有用，在該應用程式中，伺服器及其前端之間幾乎實時地共享資料。

JHipster當前使用Spring WebSockets作為其實現，因此您可以在[Spring WebSockets網站](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html)上找到有關此功能的更多訊息。

此選項有一些限制：

- 預設情況下，我們使用Spring Websockets提供的排程程式，該排程程式是記憶體中的實現。如果要使用多個服務器，它將無法擴充套件。如果要這樣做，請檢視[Spring WebSockets 文件](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html)，該文件說明了如何設定外部代理。

## Tracker範例

JHipster提供了一個開箱即用的Tracker範例。位於`admin`選單中，它將跟蹤其他使用者的行為：您將看到他們的登入名和IP，以及他們當前正在檢視的頁面。

- 這是作為範例提供的，因此您可以開始使用WebSockets，而不必將其用作生產就緒的使用者跟蹤器，但效果很好。
- 它將向您展示如何將WebSocket與Spring Security整合，這是一個相當複雜的主題
- 之所以可行，是因為JHipster是單頁Web應用程式，因此不會在每個頁面之間重新初始化WebSockets連線：這是您使用JHipster體系結構的一大好處的地方
