---
layout: default
title: 建立藍圖
permalink: /modules/creating-a-blueprint/
redirect_from:
  - /creating_a_blueprint.html
  - /modules/creating_a_blueprint.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> 建立藍圖

JHipster藍圖是Yeoman產生器，它是由特定的JHipster子產生器[composed](http://yeoman.io/authoring/composability.html) 來擴充套件該子產生器的功能的。 藍圖可以覆蓋子產生器的任何已定義的getter，並提供其自己的樣板和功能。

JHipster藍圖在帶有`jhipster-blueprint`標籤的[JHipster市場]({{site.url}}/modules/marketplace/) 上列出。

這允許建立可以覆蓋JHipster特定部分（例如僅用戶端樣板）的第三方藍圖。

## 使用藍圖

要使用藍圖，請執行以下指令

```bash
jhipster --blueprint <blueprint name>
```

## 例子

[JHipster Kotlin](https://github.com/jhipster/jhipster-kotlin) 藍圖用等效的Kotlin程式碼替換了大多數伺服器端Java程式碼。

這是我們的官方藍圖，展示了如何建立自己的藍圖。

[JHipster範例藍圖](https://github.com/hipster-labs/generator-jhipster-sample-blueprint) 顯示瞭如何覆蓋用戶端子產生器。

或者，您可以使用[JHipster藍圖產生器](https://github.com/jhipster/generator-jhipster-blueprint) 來幫助您初始化藍圖。

要使用JHipster藍圖產生器，請執行以下指令

```bash
npm install -g generator-jhipster-blueprint

mkdir my-blueprint && cd my-blueprint

yo jhipster-blueprint
```

在回答問題時選擇您要覆蓋的子產生器。

## JHipster藍圖的基本規則

JHipster藍圖：

- 是NPM軟體套件，並且是Yeoman產生器。
- 遵循[http://yeoman.io/generators/](http://yeoman.io/generators/) 上列出的Yeoman規則的擴充套件，並且可以使用`yo`指令進行安裝，使用和更新。 它不是由`generator-`字首，而是以`generator-jhipster-`字首，並且不僅具有`yeoman-generator`關鍵字，還必須具有兩個關鍵字，即`yeoman-generator`和`jhipster-blueprint`。
- 藍圖只能擴充套件以下子產生器（在generators資料夾下）
    - common
    - client
    - server
    - entity
    - entity-client
    - entity-server
    - entity-i18n
    - languages
    - spring-controller
    - spring-service

## 匯入generator-jhipster

JHipster藍圖必須具有generator-jhipster作為依賴項，並且應該匯入適當的子產生器以覆蓋它。

```javascript
    const chalk = require('chalk');
    const ClientGenerator = require('generator-jhipster/generators/client');
    ...

    module.exports = class extends ClientGenerator {
        constructor(args, opts) {
            super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

            const jhContext = this.jhipsterContext = this.options.jhipsterContext;

            if (!jhContext) {
                this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint helloworld')}`);
            }

            this.configOptions = jhContext.configOptions || {};
            // This sets up options for this sub generator and is being reused from JHipster
            jhContext.setupClientOptions(this, jhContext);
        }

        get initializing() {
            // Here we are not overriding this phase and hence its being handled by JHipster
            return super._initializing();
        }

        // other phases of the sub generator
    }
```

任何以`_`開頭的方法透過`super.`的形式都可以在繼承類別中使用，例如上例中的`ClientGenerator`。

每個JHipster子產生器都由多個yeoman階段組成，每個階段都是一個`getter`，例如`get initializing`。 藍圖可以自定義其覆蓋的子產生器的一個或多個階段。

有多種方法可以從JHipster定製階段。

1) 讓JHipster處理一個階段，藍圖不會覆蓋任何內容。

```javascript
    get initializing() {
        return super._initializing();
    }
```

2) 覆蓋整個階段，藍圖將控制這一階段。

```javascript
    get initializing() {
        return {
            myCustomInitPhaseStep() {
                // Do all your stuff here
            },
            myAnotherCustomInitPhaseStep(){
                // Do all your stuff here
            }
        };
    }
```

3) 部分覆蓋階段，藍圖從JHipster獲取階段並對其進行自定義。

```javascript
    get initializing() {
        const phaseFromJHipster = super._initializing();
        const myCustomPhaseSteps = {
            displayLogo() {
                // 重寫JHipster中_initializing階段的displayLogo方法
            },
            myCustomInitPhaseStep() {
                // 你自己的業務邏輯
            },
        }
        return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
    }
```

您還可以直接從藍圖訪問JHipster的變數和函式。

## 可用的變數和功能

### 設定中的變數：

您可以訪問`.yo-rc.json`中的設定，該設定將同時包含JHipster設定和您的藍圖設定。

### 全域變數：

您可以使用在 [generator-constants](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-constants.js)中的常數:

```javascript
    const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
    const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
```

### 功能：

您可以使用[generator-base](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-base.js) 中所有功能:

```javascript
    this.angularAppName = this.getAngularAppName(); // 獲取Angular應用程式名稱。
    this.printJHipsterLogo(); // 列印JHipster徽標
```

**注意**: `generator-base.js` 中的功能和 `generator-constants.js`  中的變數是公共API的一部分，因此將遵循semver版本控制。但是其他檔案如`generator-base-private.js`、`utils.js` 等將不會遵循semver版本控制，並且可能會在次要版本中破壞方法簽名。

## 開發中執行本地藍圖版本

在開發藍圖期間，請注意以下步驟。 他們非常重要。

1. 全域連結您的藍圖

注意：如果您不想將藍圖（第3步）連結到正在建立的每個專案，請使用NPM而不是Yarn，因為yeoman似乎無法獲取全域連結的Yarn模組。 另一方面，這意味著您還必須在以下所有步驟中使用NPM。

```bash
cd my-blueprint
npm link
```

2. 將JHipster的開發版本連結到您的藍圖（可選：僅當您要使用未發布的JHipster版本（例如master分支或您自己的自定義fork）時才需要）

```bash
cd generator-jhipster
npm link

cd my-blueprint
npm link generator-jhipster
```

3. 為要生成的應用程式建立一個新檔案夾，並在其中連結JHipster和您的藍圖

```bash
mkdir my-app && cd my-app

npm link generator-jhipster-myblueprint
npm link generator-jhipster (可選：僅在使用未發布的JHipster版本時才需要)

jhipster -d --blueprint myblueprint
```

## 向JHipster市場註冊藍圖

為了在[JHipster市場]({{ site.url }}/modules/marketplace/)中能夠找到你的藍圖，您需要確保在已發布的npm套件`package.json`中有兩個關鍵字`yeoman-generator`和`jhipster-blueprint`。
如果您在市場上找到不是JHipster模組或藍圖的任何條目，則可以透過將其新增到[modules-config.json檔案](https://github.com/jhipster/jhipster.github.io/blob/master/modules/marketplace/data/modules-config.json)的`blacklistedModules`部分中來將其列入黑名單，方法是對 [jhipster/jhipster.github.io專案] (https://github.com/jhipster/jhipster.github.io) 發出拉取請求

一旦您將藍圖發布到NPM，您的藍圖就會在我們的市場上出現。
