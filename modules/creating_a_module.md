---
layout: default
title: 建立模組
permalink: /modules/creating-a-module/
redirect_from:
  - /creating_a_module.html
  - /modules/creating_a_module.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> 建立模組

JHipster模組是一個Yeoman產生器，由特定的JHipster子產生器[組成](http://yeoman.io/authoring/composability.html)，以繼承JHipster的某些常用功能。 
JHipster模組還可以註冊其自身，以充當JHipster產生器的鉤子。

JHipster模組在[JHipster市場]({{site.url}}/modules/marketplace/) 上列出。

這允許建立可以訪問JHipster變數和函式並像標準JHipster子產生器一樣工作的第三方產生器。
鉤子機制在應用程式生成和實體生成之前和之後呼叫第三方產生器。

## 範例

[JHipster Fortune 模組](https://github.com/jdubois/generator-jhipster-fortune) 在JHipster生成的應用程式中生成『fortune cookie』頁面。

這是我們的範例模組，展示了如何使用JHipster的變數和函式來建立自己的產生器。

或者，您可以使用[JHipster模組產生器](https://github.com/jhipster/generator-jhipster-module) 來幫助您初始化模組。

## JHipster模組的基本規則

JHipster模組：

- 是NPM套件，並且是Yeoman產生器。
- 遵循[http://yeoman.io/generators/](http://yeoman.io/generators/) 上列出的Yeoman規則的擴充套件，並且可以使用`yo`指令進行安裝，使用和更新。 它不是以`generator-`為字首，而是以`generator-jhipster-`為字首，並且不僅僅具有`yeoman-generator`關鍵字，還必須具有兩個關鍵字：`yeoman-generator`和`jhipster-module`。
- 註冊為鉤子的JHipster模組不應在被掛鉤的產生器中呼叫`process.exit`。

## 匯入generator-jhipster

JHipster模組必須匯入generator-jhipster：

```
    const util = require('util');
    const BaseGenerator = require('generator-jhipster/generators/generator-base');
    const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

    const JhipsterGenerator = generator.extend({});
    util.inherits(JhipsterGenerator, BaseGenerator);

    module.exports = JhipsterGenerator.extend({

        // all your yeoman code here

    });
```

然後，您可以直接訪問JHipster的變數和函式。

## 鉤子

JHipster將在其某些任務之前和之後呼叫某些掛鉤，下面列出了當前可用和計劃中的任務。

- 實體建立後鉤子
- 實體建立前鉤子 [計劃中]
- 應用程式建立後鉤子 [計劃中]
- 應用程式建立前鉤子 [計劃中]

[JHipster模組產生器](https://github.com/jhipster/generator-jhipster-module)現在可以選擇生成它。
JHipster模組的主要產生器由最終使用者執行時，可以註冊以充當鉤子。 您需要從主（應用）產生器中呼叫`registerModule`方法以註冊為鉤子，您需要在方法中傳遞以下引數，如下所示：

```javascript
this.registerModule(npmPackageName, hookFor, hookType[, callbackSubGenerator[, description]])
```

- `npmPackageName` 產生器的npm套件名稱。如： `jhipster-generator-fortune`
- `hookFor` 上面的哪個Jhipster鉤子應該註冊到 ( 值必須是`entity`或`app`)
- `hookType` 在產生器階段將其掛在哪裡 ( 值必須是`pre`或`post`)
- `callbackSubGenerator` [可選] 被呼叫子產生器，如果未指定，則將呼叫模組的主（應用）產生器，例如：`bar`或`foo`產生器。
- `description` [可選] 產生器的描述，如果未給出，我們將根據給定的npm名稱生成預設值

## 可用的變數和功能

### 設定中的變數：

您必須使用此功能：

您可以在`.yo-rc.json`中訪問設定：

```
    this.jhipsterAppConfig = this.getAllJhipsterConfig();
    this.baseName = this.jhipsterAppConfig.baseName;
    this.packageName = this.jhipsterAppConfig.packageName;
    this.clientFramework = this.jhipsterAppConfig.clientFramework;
```

### 全域變數：

您可以在[generator-constants](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-constants.js) 中使用常數：

```
    const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
    const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
```

### 功能:

您可以在[generator-base](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-base.js)中使用所有功能。

```
    this.angularAppName = this.getAngularAppName(); // 獲取Angular應用程式名稱。
    this.printJHipsterLogo(); // 列印JHipster徽標
```

**注意**: `generator-base.js` 中的功能和 `generator-constants.js`  中的變數是公共API的一部分，因此將遵循semver版本控制。但是其他檔案如`generator-base-private.js`、`utils.js` 等將不會遵循semver版本控制，並且可能會在次要版本中破壞方法簽名。

## 向JHipster市場註冊模組

要使您的模組在[JHipster市場]({{site.url}}/modules/marketplace/)中可用，您需要確保在已發布的npm套件`package.json`中有2個關鍵字`yeoman-generator`和`jhipster-module` 。
如果您在市場上找到不是JHipster模組的任何條目，則可以透過將其新增到[modules-config.json檔案](https://github.com/jhipster/jhipster.github.io/blob/master/modules/marketplace/data/modules-config.json)的`blacklistedModules`部分中來將其列入黑名單，方法是對 [jhipster/jhipster.github.io專案] (https://github.com/jhipster/jhipster.github.io) 發出拉取請求

如果JHipster團隊對其進行驗證，則您的模組將變為『已驗證』。

將模組發布到NPM後，您的模組將在我們的市場上可用。