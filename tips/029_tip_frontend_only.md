---
layout: default
title: 提高開發人員的體驗，如果在IDE中只打開前端
sitemap:
priority: 0.1
lastmod: 2019-10-14T12:35:00-00:00
---

# 提高開發人員的體驗，如果在IDE中只打開前端

**送出者 [@kaidohallik](https://github.com/kaidohallik)**

至少在Visual Studio程式碼中，將發生以下行為。

如果生成完整技術棧的應用程式（不跳過伺服器或前端），並且前端開發人員希望看到的檔案越少越好，並且僅在IDE中開啟資料夾`src/main/webapp/app`，則IDE無法識別以`app`開頭的匯入。 這些匯入是紅色的，開發人員無法看到這些匯入的類別的內容，也無法一鍵跳轉到這些匯入的類。 路徑`app`是在位於生成的應用程式的根資料夾中的`tsconfig.json`檔案中定義的，因此，如果開啟某些子資料夾，則會丟失此訊息。

## 可能的解決方案1

向檔案 `src/main/webapp/app/tsconfig.json` 中新增以下內容：
```
{
    "extends": "../../../../tsconfig.json"
}
```
併為測試檔案 `src/test/javascript/spec/tsconfig.json` 新增同樣的內容：
```
{
    "extends": "../../../../tsconfig.json"
}
```
之後，如果僅開啟資料夾`src/main/webapp/app`或`src/test/javascript/spec`，Visual Studio Code會正確解析路徑app。

## 可能的解決方案2

* 將node指令碼`remove-import-alias.js`新增到應用程式根資料夾，該資料夾將匯入別名替換為相對路徑：

```
const fs = require('fs');

removeImportAlias = function(dir, level, additionalPath) {
  fs.readdirSync(dir).forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      removeImportAlias(dir + file + '/', level + 1, additionalPath);
    } else if (file.endsWith('.ts')) {
      fs.readFile(dir + file, 'utf8', function (err, content) {
        if (err) {
          console.log(err);
        } else {
          let path = '../'.repeat(level);
          if (additionalPath) {
            path += additionalPath;
          }
          if (!path) {
            path = './';
          }
          const newContent = content.replace(/import \{ (.*) \} from 'app\/(.*)';/g, `import { $1 } from '${path}$2';`);
          fs.writeFile(dir + file, newContent, 'utf8', function (err) {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    }
  });
};

removeImportAlias(`./src/main/webapp/app/`, 0);
removeImportAlias(`./src/test/javascript/spec/`, 0, '../../../main/webapp/app/');
```

* 在 `.eslintignore`中新增`remove-import-alias.js`

* 執行新增的指令碼：`node remove-import-alias.js`

* 從`tsconfig.json`檔案的`compilerOptions.paths`部分中刪除`app/*`
