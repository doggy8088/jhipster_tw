---
layout: default
title: 在IntelliJ IDEA中執行Protractor e2e測試
sitemap:
priority: 0.1
lastmod: 2018-04-14T03:57:00-00:00
---

# 在IntelliJ IDEA中執行Protractor e2e測試

**送出者 [@SudharakaP](https://github.com/SudharakaP) 和 [@yelhouti](https://github.com/yelhouti)**

本技巧適用於JHipster v6.8.0或更高版本。 預設情況下，JHipster專案在Protractor設定檔案（`src/test/javascript/protractor.conf.js`）中將具有以下`beforeLanuch`函式。

```js
beforeLaunch: function() {
    require('ts-node').register({
        project: 'tsconfig.e2e.json'
    });
}
``` 

如果透過在專案的根資料夾中執行`npm run e2e`來執行Protractor測試，這非常方便。

但是，IntelliJ Ultimate也支援[在IDE中執行Protractor測試](https://www.jetbrains.com/help/idea/protractor.html#ws_protractor_running) 。
如果要使用此方法，則必須更改`beforeLanuch`函式，如下所示；

```js
beforeLaunch: function() {
    require('ts-node').register({
        project: '../../../tsconfig.e2e.json'
    });
}
``` 
這樣IntelliJ就會知道在哪裡可以找到`tsconfig.e2e.json`檔案。

請注意，按上述方式更改`protractor.conf.js`檔案後，`npm run e2e`將不再起作用，因此，如果您打算再次使用npm進行e2e測試，則必須回滾。