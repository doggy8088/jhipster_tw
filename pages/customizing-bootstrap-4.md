---
layout: default
title: 自定義Bootstrap 4
permalink: /customizing-bootstrap-4/
sitemap:
    priority: 0.7
    lastmod: 2017-12-08T00:00:00-00:00
---

# <i class="fa fa-css3"></i> 自定義Bootstrap 4

## 基本定製

_專家提示：不要忘記執行`npm start`或`yarn start`以獲取更改後的即時反饋！_

定製JHipster應用程式外觀的最簡單方法是，透過覆蓋`src/main/webapp/content/css/global.css`中的CSS樣式，或者如果您選擇了Sass選項，則重寫`src/main/webapp/content/scss/global.scss`檔案。

由於Bootstrap也是用Sass編寫的，因此與普通CSS相比，使用Sass既簡單，簡潔又功能強大，請參考[Bootstrap的官方主題文件](https://getbootstrap.com/docs/4.0/getting-started/theming/)。

如果要在自己的`scss`檔案中使用Bootstrap [partials](http://sass-lang.com/guide)，請按如下所示將其匯入`scss`檔案的開頭。
例如，使用border-radius mixin：
```
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins/border-radius";
```

確保僅匯入部分檔案而不匯入主Sass檔案，否則最終將生成重複的CSS，這可能會導致問題。

要更改預設的Bootstrap設定（例如顏色，邊框半徑等），請在區域性檔案`src/main/webapp/content/scss/_bootstrap-variable.scss`中新增或更改屬性的值

Bootstrap  [_variables.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss)中定義的所有值都可以在此處覆蓋。