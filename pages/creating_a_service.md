---
layout: default
title: 建立一個服務
permalink: /creating-a-spring-service/
redirect_from:
  - /creating_a_service.html
  - /creating-a-service/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> 建立一個Spring服務

## 介紹

_注意：此子產生器比建立完整CRUD實體的[實體子產生器]({{ site.url }}/creating-an-entity/)簡單得多_

該子產生器生成一個Spring Service bean，您應該在此bean中編寫應用程式的業務邏輯。

生成"Bar"的Service bean, 執行：

`jhipster spring-service Bar`

_這將生成一個`BarService`：很少的程式碼行，但是它們通常會帶來很多疑問。我們嘗試回答以下最常見的問題。_

## 為什麼服務類別不是由『entity』產生器生成的？

這裡有兩個主要的架構原則：

*   我們不想提倡建立無用的服務：如果您所需要的只是資料庫上的基本CRUD，則不需要Service Bean。因此，預設情況下，JHipster不會生成它們。

*   我們認為Service Bean比repository更解耦。Service Bean將使用多個repository在它們之上提供業務邏輯。這就是為什麼無法直接使用實體生成Service Bean的原因。

## 我們應該在Service Bean中使用介面嗎？

簡而言之: **No**.

如果您想得到詳細答案，這裡是：

使用Spring的主要興趣之一是AOP。這項技術使Spring可以在Bean之上新增新行為：例如，這就是事務或安全的工作方式。

為了新增這些行為，Spring需要在您的類別上建立一個代理，並且有兩種建立代理的方法：

*   如果您的類使用介面，則Spring將使用Java提供的標準機制來建立動態代理。

*   如果您的類不使用介面，則Spring將使用CGLIB即時生成一個新類：這不是標準的Java機制，但其工作原理與標準機制一樣。

還會有人認為介面更適合編寫測試，但是我們認為我們不應該為了測試的而修改我們的生產程式碼，而且所有新的模擬框架（例如EasyMock）都允許您建立非常好的單元測試，在沒有任何介面的情況下。

因此，最後，我們發現Service Bean的介面幾乎沒有用，這就是為什麼我們不推薦它們的原因（但是我們還是為您保留了選擇生成它們的選項！）。

## 為什麼要使用事務來獲取惰性的JPA關係？

預設情況下，JPA使用一對多和多對多實體關係的惰性初始模式。如果使用此預設設定，則可能會看到可怕的`LazyInitializationException`：這意味著您試圖在事務外部使用未初始化的關係。

由於生成的Service類預設具有`@Transactional`註解，因此其所有方法都是事務性的。這意味著您可以在這些業務方法中獲取所有必需的惰性關係，而無不用擔心遇見`LazyInitializationException`。

_提示:_ 如果您不修改任何資料，請在方法上使用`@Transactional(readOnly = true)`。這是一個不錯的效能最佳化（Hibernate不需要重新整理其一級快取，因為我們沒有進行任何修改），並且透過某些JDBC驅動程式提高了質量（Oracle不允許您傳送INSERT/UPDATE/DELETE語句）

## 我們可以為Service Bean新增安全屬性嗎？

是!您的類或方法上新增Spring Security的 `@Secured`批注，然後使用提供的`AuthoritiesConstants`類即可限制對特定使用者許可權的訪問。
