---
layout: default
title: 前端的動態環境變數
sitemap:
priority: 0.1
lastmod: 2020-07-01T10:50:00-00:00
---
# 前端的動態環境變數

__提示送出者 [@yelhouti](https://github.com/yelhouti)__

假設您需要在編譯程式碼後更新前端變數的值。 （例如：您的IP、網址，用於聯絡人的電子郵件等等）

一種方法是將其作為application.yml的一部分，並使後端使用新的自定義端點將其回傳到前端，與我們在使用OAuth2時在`AuthInfoResource.java`中所做的相同。

另一種方法是建立一個名為`env.js`的新檔案，能夠消除對該端點的需要並提供更好的靈活性和更少的程式碼，如下所示：

```javascript
window.__env = window.__env || {};
window.__env.myDynamicVariable = 'http://127.0.0.1:8090';
```

如果尚未宣告，下面的程式碼將建立一個全域的`__env`變數。

可以在您的Angular檔案中訪問它，但是我們建議透過constants.ts公開它，如下所示：
```typescript
@ts-ignore
export const MY_DYNAMIC_VARIABLE = window.__env.myDynamicVariable;
```
當使用kubernetes時，可以將這種格式的檔案作為configMap掛載，這就是為什麼我們保留了這種簡單的鍵值語法的原因。

現在，我們需要透過像這樣在`<head>`中新增指令碼標籤來確保`index.html`載入它：
```html
    ...
    <!-- jhipster-needle-add-resources-to-root - JHipster will add new resources here -->
    <script src="env.js"></script>
```
然後我們告訴webpack使用打包的程式碼按原樣複製它：
```javascript
// jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
{ from: './<%= MAIN_SRC_DIR %>env.js', to: 'env.js' },
```

我們建議將檔案新增到`.eslintignore.ejs`中以使用簡潔的語法：
```
src/main/webapp/env.js
```

下一步是研究完成所有這些工作的藍圖。
