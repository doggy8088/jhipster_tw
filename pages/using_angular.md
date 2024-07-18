---
layout: default
title: 使用Angular
permalink: /using-angular/
sitemap:
    priority: 0.7
    lastmod: 2015-01-29T23:41:00-00:00
---

# <i class="fa fa-html5"></i> 使用Angular

## 工具

Angular使用TypeScript而不是JavaScript，因此需要一些特定的工具來有效地使用它。我們針對Angular 2+應用程式的[開發]({{ site.url }}/development/)工作流程如下所示，如果您願意，可以使用`npm`代替`yarn`。

1. 生成應用程式時，將建立新的檔案，並在生成結束時觸發`npm install`任務。
2. 一旦`npm install`完成，它將在`package.json`中呼叫`postInstall`指令碼，此步驟將觸發`webapp:build`任務。
3. 現在，基於您選擇的生成工具（Maven或Gradle），所有的檔案應該被生成並編譯到`target`或`build`資料夾內的`www`資料夾中。
4. 現在執行`./mvnw`或`./gradlew`來啟動應用程式伺服器，它應該在[localhost:8080](localhost:8080)上可用，這也可以提供根據上述步驟編譯的前端程式碼。
5. 現在，在新終端中執行`npm start`或`yarn start`，以使用BrowserSync啟動Webpack開發伺服器。這將負責編譯您的TypeScript程式碼，並自動重新載入瀏覽器。

如果您在沒有執行`npm start`或`yarn start`的情況下開始對前端程式碼進行更改，則不會反映任何內容，因為更改未被編譯，因此您需要在更改後手動執行`npm run webapp:build`或執行`npm start`或`yarn start`執行。

您還可以透過開始時傳遞`./mvnw -Pdev，webapp`這樣的`webapp`設定檔案，強制Maven在執行時執行`webapp：dev`任務。
**注意**如果前端發生了變化，Gradle會在`dev`設定檔案中自動執行webpack編譯（僅在啟動時，對於實時載入，請使用`npm start`或`yarn start`）。

其他可用的yarn/npm指令可以在您專案的`package.json`檔案的`scripts`部分中找到。

- 要在瀏覽器中處理程式碼，我們建議使用[Angular Augury](https://augury.angular.io/)，以便您可以檢視路由並除錯程式碼

## 專案結構

可以在`src/main/webapp`下找到JHipster前端程式碼，該程式碼與[Angular樣式指南](https://angular.io/guide/styleguide)密切相關。如果您對我們的應用程式結構，檔案名，TypeScript約定有任何疑問，請先閱讀本指南。

該樣式指南已被Angular團隊認可，並提供了每個Angular專案都應遵循的最佳實踐。

對於Angular路由，我們遵循雙引號命名約定，以使URL乾淨且一致。
當您生成實體時，將根據此約定生成路由名稱，路由URL和REST API端點URL，並且實體名稱也會在需要時自動複數。

這是主要的專案結構：

    webapp
    ├── app                               - Your application
    │   ├── account                       - User account management UI
    │   ├── admin                         - Administration UI
    │   ├── blocks                        - Common building blocks like configuration and interceptors
    │   ├── entities                      - Generated entities (more information below)
    │   ├── home                          - Home page
    │   ├── layouts                       - Common page layouts like navigation bar and error pages
    │   ├── shared                        - Common services like authentication and internationalization
    │   ├── app.main.ts                   - Main application class
    │   ├── app.module.ts                 - Application modules configuration
    │   ├── app-routing.module.ts         - Main application router
    ├── content                           - Static content
    │   ├── css                           - CSS stylesheets
    │   ├── images                        - Images
    ├── i18n                              - Translation files
    ├── scss                              - Sass style sheet files will be here if you choose the option
    ├── swagger-ui                        - Swagger UI front-end
    ├── 404.html                          - 404 page
    ├── favicon.ico                       - Fav icon
    ├── index.html                        - Index page
    ├── robots.txt                        - Configuration for bots and Web crawlers

使用[實體子產生器]({{ site.url }}/creating-an-entity/)建立名為`Foo`的新實體會在`src/main/webapp`下生成以下前端檔案：

    webapp
    ├── app
    │   ├── entities
    │       ├── foo                                    - CRUD front-end for the Foo entity
    │           ├── foo.component.html                 - HTML view for the list page
    │           ├── foo.component.ts                   - Controller for the list page
    │           ├── foo.model.ts                       - Model representing the Foo entity
    │           ├── foo.module.ts                      - Angular module for the Foo entity
    │           ├── foo.route.ts                       - Angular Router configuration
    │           ├── foo.service.ts                     - Service which access the Foo REST resource
    │           ├── foo-delete-dialog.component.html   - HTML view for deleting a Foo
    │           ├── foo-delete-dialog.component.ts     - Controller for deleting a Foo
    │           ├── foo-detail.component.html          - HTML view for displaying a Foo
    │           ├── foo-detail.component.ts            - Controller or displaying a Foo
    │           ├── foo-dialog.component.html          - HTML view for editing a Foo
    │           ├── foo-dialog.component.ts            - Controller for editing a Foo
    │           ├── foo-popup.service.ts               - Service for handling the create/update dialog pop-up
    │           ├── index.ts                           - Barrel for exporting everything
    ├── i18n                                           - Translation files
    │   ├── en                                         - English translations
    │   │   ├── foo.json                               - English translation of Foo name, fields, ...
    │   ├── fr                                         - French translations
    │   │   ├── foo.json                               - French translation of Foo name, fields, ...

請注意，預設語言翻譯將基於您在應用生成過程中選擇的語言。在此處僅顯示'en'和'fr'以進行示範。

## 鑑權

JHipster使用[Angular路由器](https://angular.io/docs/ts/latest/guide/router.html) 來組織前端應用程式的不同部分。

對於每個路徑，所需的許可權都列在該路徑的資料中，並且當權限清單為空時，表示可以匿名訪問該路徑。

許可權也在服務器端`AuthoritiesConstants.java`類別中定義，並且從邏輯上講，前端和伺服器端許可權應相同。

在下面的範例中，'sessions'路徑設計為僅由具有`ROLE_USER`許可權的經過身份驗證的使用者訪問：

    export const sessionsRoute: Route = {
        path: 'sessions',
        component: SessionsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.account.sessions'
        },
        canActivate: [UserRouteAccessService]
    };

一旦在路由器中定義了這些許可權，就可以根據引數型別透過`jhiHasAnyAuthority`指令在其2個變數中使用它們：

- 對於單個字串，該指令僅在使用者具有所需許可權時才顯示HTML元件
- 對於字串陣列，如果使用者具有列出的許可權之一，則偽指令將顯示HTML元件

例如，以下文字僅顯示給具有`ROLE_ADMIN`許可權的使用者：

    <h1 *jhiHasAnyAuthority="'ROLE_ADMIN'">Hello, admin user</h1>

例如，以下文字僅顯示給具有`ROLE_ADMIN`或`ROLE_USER`許可權之一的使用者：

    <h1 *jhiHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">Hello, dear user</h1>

*請注意* 這些指令僅在前端顯示或隱藏HTML元件，並且您還需要在服務器端保護程式碼！

## ng-jhipster函式庫

ng-jhipster函式庫是免費和OSS的，可在[https://github.com/jhipster/ng-jhipster](https://github.com/jhipster/ng-jhipster)上獲得。

ng-jhipster函式庫套件含Angular 2+應用程式使用的實用程式功能和通用元件。他們包括：

- 校驗指令
- 國際化元件
- 常用通道，例如大寫，排序和單詞截斷
- Base64，日期和分頁處理服務
- 通知系統（見下文）

### 通知系統

JHipster使用自定義通知系統將事件從伺服器端傳送到前端，並具有支援i18n的`JhiAlertComponent`和`JhiAlertErrorComponent`元件，這些元件可在整個生成的應用程式中使用。

預設情況下，當HTTP回應捕獲到錯誤時，JHipster將顯示錯誤通知。

要顯示自定義通知或警報，請在將`AlertService`注入控制器，指令或服務後使用以下方法。

簡化方法`success`、`info`、`warning`和`error`的預設超時為5秒，可以被設定：

    this.alerts.push(
        this.alertService.addAlert(
            {
                type: 'danger',
                msg: 'you should not have pressed this button!',
                timeout: 5000,
                toast: false,
                scoped: true
            },
            this.alerts
        )
    );

## 使用Angular CLI

Angular CLI用於建立和測試JHipster應用程式。
但是，我們新增了一個自定義的webpack設定檔案，以透過新增BrowserSync，ESLint（Angular CLI仍在TSLint上），合併JSON轉換檔案並在建立完成或失敗時新增通知來改善開發人員的體驗。

### 總覽

[Angular CLI](https://cli.angular.io/)是用於開發，建立和維護Angular應用程式的工具。JHipster生成Angular CLI設定檔案，因此Angular CLI工作流程可與JHipster一起使用。

透過在應用程式根資料夾中生成`angular.json`檔案，並將其依賴項新增到`package.json`檔案中來完成此整合。

### 用法

```bash
ng help
```

### 建立

您可以使用`ng build`來建立前端，但是我們仍然建議使用提供的NPM指令碼，例如`npm start`，`npm run build`等。檢視我們的[開發使用文件]({{ site.url }}/development/)和[生產使用文件]({{ site.url }}/production/)。

### 生成元件，指令，通道和服務

您可以使用`ng generate`（或`ng g`）指令生成Angular元件：

```bash
ng generate component my-new-component
ng g component my-new-component # using the alias

# 元件支援相對路徑生成
# 轉到src/app/feature/並執行
ng g component new-cmp
# 您的元件將在src/app/feature/new-cmp中生成
# 但是如果你執行了
ng g component ../newer-cmp
# 您的元件將在src/app/newer-cmp中生成
```
您可以在下表中找到所有可能的藍圖：

腳手架  | 用法
---       | ---
[Component](https://github.com/angular/angular-cli/wiki/generate-component) | `ng g component my-new-component`
[Directive](https://github.com/angular/angular-cli/wiki/generate-directive) | `ng g directive my-new-directive`
[Pipe](https://github.com/angular/angular-cli/wiki/generate-pipe)           | `ng g pipe my-new-pipe`
[Service](https://github.com/angular/angular-cli/wiki/generate-service)     | `ng g service my-new-service`
[Class](https://github.com/angular/angular-cli/wiki/generate-class)         | `ng g class my-new-class`
[Guard](https://github.com/angular/angular-cli/wiki/generate-guard)         | `ng g guard my-new-guard`
[Interface](https://github.com/angular/angular-cli/wiki/generate-interface) | `ng g interface my-new-interface`
[Enum](https://github.com/angular/angular-cli/wiki/generate-enum)           | `ng g enum my-new-enum`
[Module](https://github.com/angular/angular-cli/wiki/generate-module)       | `ng g module my-module`


### 測試

為了考慮JHipster應用程式上的一致性，可以透過`npm`指令執行測試：

```bash
npm test
```

### i18n

JHipster使用`ngx-translate`依賴項進行翻譯。Angular CLI i18n基於預設的Angular i18n支援，該支援與JHipster不相容。

### 執行服務

如果您更喜歡使用Angular CLI開發應用程式，則可以使用其專用指令直接執行伺服器。

```bash
ng serve
```

### 結論

有關Angular CLI的更多訊息，請訪問官方網站[https://cli.angular.io/](https://cli.angular.io/)
