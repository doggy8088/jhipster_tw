---
layout: default
title: JHipster 領域語言 (JDL) - 答疑解惑
permalink: /jdl/troubleshooting
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster 領域語言 (JDL) - 答疑解惑

## 答疑解惑

我們試圖使語法對開發人員儘可能友好。
您可以使用它來執行以下操作：
  - 宣告應用程式及其選項和實體，
  - 宣告實體及其屬性，
  - 宣告他們之間的關係，
  - 並宣告一些特定於JHipster的選項。

如果您想檢視JDL的語法，則可以使用HTML檔案
[JDL的語法](https://github.com/jhipster/jhipster-core/blob/master/lib/dsl/gen/grammar.html).

---

### 對應微服務 baseName時，JDL匯入僅找到一個實體

這是有關解析系統的已知問題，解決它很棘手。
解決方法是對微服務和內部實體使用不同的名稱。

檢視 [JHipster Core 議題 #308](https://github.com/jhipster/jhipster-core/issues/308) 瞭解詳細內容。

---

## <a name="issues"></a>問題與錯誤

JDL在[GitHub](https://github.com/jhipster/jhipster-core), 並遵循相同的
[JHipster貢獻準則]( https://github.com/jhipster/generator-jhipster/blob/main/CONTRIBUTING.md).

請使用我們的專案送出有關函式庫本身的問題和PR。

- [JDL問題](https://github.com/jhipster/jhipster-core/issues)
- [JDL合併請求](https://github.com/jhipster/jhipster-core/pulls)

送出任何內容時，您都必須儘可能精確：
  - **一個已issue只能有一個問題** (or one demand/question);  
  - 受歡迎送出合併請求，但送出必須是『原子的』真正可理解的。 
