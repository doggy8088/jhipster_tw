---
layout: default
title:
permalink: /managing-server-errors/
sitemap:
    priority: 0.7
    lastmod: 2018-03-07T00:00:00-00:00
---

# <i class="fa fa-fire-extinguisher"></i> 管理服務器錯誤

JHipster對錯誤處理提供一等的支援：它提供錯誤頁面和自定義機制來處理伺服器端的業務和技術錯誤。

## 錯誤頁面

JHipster會生成一個單頁應用程式（SPA），但對於不（或無法）訪問該應用程式的人，它仍然需要自定義錯誤頁面。

### 動態錯誤頁面

JHipster提供了一個通用錯誤頁面，它是 [Thymeleaf](https://www.thymeleaf.org/)樣板，位於`src/main/resources/templates/error.html`。

此頁面將顯示伺服器端錯誤訊息，例如，如果使用者嘗試訪問不存在的頁面，則該頁面將顯示404錯誤，告知使用者未找到該頁面。

### 靜態404錯誤頁面

JHipster提供了一個特定的靜態404錯誤頁面，該頁面位於`src/main/webapp/404.html`。預設情況下，JHipster不會使用此頁面：此頁面用於在JHipster之前使用代理軟體中（Apache/NGinx/等等。），因此即使JHipster應用程式不可用，代理軟體也可以顯示404錯誤頁面。

需要在前端代理上對其進行專門設定。

## API錯誤

為了處理Spring MVC REST錯誤，JHipster使用[Zalando的Problem Spring Web函式庫](https://github.com/zalando/problem-spring-web)來提供豐富的，基於JSON的錯誤訊息。

為了幫助終端使用者，對於每個已知問題，該函式庫都將提供指向特定錯誤頁面的連結，該頁面將提供更多詳細訊息。這些連結在`ErrorConstants`類別中設定，預設情況下指向該網站。在您的應用程式中，您應該自定義這些連結，並將它們指向您自己的API文件。

以下是可用的錯誤連結：

- [帶有訊息提示的錯誤]({{ site.url }}/problem/problem-with-message)
- [違反約束]({{ site.url }}/problem/constraint-violation)
- [引數化訊息出現問題]({{ site.url }}/problem/parameterized)
- [找不到實體]({{ site.url }}/problem/entity-not-found)
- [無效的密碼]({{ site.url }}/problem/invalid-password)
- [電子郵件已經使用]({{ site.url }}/problem/email-already-used)
- [登入名已使用]({{ site.url }}/problem/login-already-used)
- [電子郵件無法找到]({{ site.url }}/problem/email-not-found)
