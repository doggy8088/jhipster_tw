---
layout: default
title: 提供Internet Explorer支援
sitemap:
priority: 0.1
lastmod: 2019-03-05T18:20:00-00:00
---

# 提供Internet Explorer支援

**送出者 [@wmarques](https://github.com/wmarques)** 和 [@anthony-o](https://github.com/anthony-o)

JHipster僅支援Evergreen Browser。
但是，您仍然可以輕鬆地支援某些較舊的瀏覽器，例如Internet Explorer。

為此，您必須：

1. 在您的`tsconfig`中將目標設定為`es5`。
2. 然後，您有兩個選擇：
   1. 從'core-js'新增正確的polyfill，如果您不知道應該使用哪個，請檢查Angular CLI專案及其polyfill。
   2. 或使用babel+[Babel預設環境](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) 自動基於瀏覽器清單檔案匯入正確的core-js polyfill。

## 使用Babel的完整提示

首先，新增以下`package.json`依賴項：`@babel/core`、`@babel/preset-env` 和 `babel-loader`。`yarn`例子:
```bash
yarn add @babel/core @babel/preset-env babel-loader --exact --dev
```
(已針對JHipster v6.3.1生成的應用程式上的可用IE11版本使用以下版本進行了測試：
```json
    "@babel/core": "7.6.4",
    "@babel/preset-env": "7.6.3",
    "babel-loader": "8.0.6",
```
)

現在，在`src/main/webapp/app/polyfills.ts`的頂部新增以下行 :
```ts
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

在 `webpack/webpack.common.js`檔案中，
```js
            {
                test: /manifest.webapp$/,
                loader: 'file-loader',
                options: {
                    name: 'manifest.webapp'
                }
            },
```
之後，新增以下行：
```js
            {
                test: /\.js/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    "presets": [
                      [
                        "@babel/preset-env",
                        {
                          "targets": {
                            "firefox": "60",
                            "ie": "11"
                          },
                          "useBuiltIns": "entry",
                          "corejs": 3
                        }
                      ]
                    ]
                  }
                },
                exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
              },
```

最後，在`tsconfig.json`和`tsconfig-aot.json`中將`target`更改為`es5`。

參見 [GitHub issue](https://github.com/jhipster/generator-jhipster/issues/10184#issuecomment-541650501) 和 [this SO answer](https://stackoverflow.com/a/58377002/535203) 瞭解更多訊息。
