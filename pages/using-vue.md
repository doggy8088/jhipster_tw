---
layout: default
title: 使用Vue
permalink: /using-vue/
sitemap:
    priority: 0.7
    lastmod: 2019-03-27T23:41:00-00:00
---

# <i class="fa fa-html5"></i> 使用Vue
本節引用JavaScript函式庫**Vue.js**。

## 專案結構

可以在`src/main/webapp`下找到JHipster前端程式碼。

如果您對我們的應用程式結構，檔案名，TypeScript約定有任何疑問，請先閱讀本指南。

請注意，在生成的Vue應用程式中使用TypeScript，我們遵循[vue-class-component](https://github.com/vuejs/vue-class-component)樣式和準則。

對於Vue路由，我們遵循雙引號命名約定，以便URL乾淨且一致。
當您生成實體時，將根據此約定生成路由名稱，路由URL和REST API端點URL，並且實體名稱也會在需要時自動複數。

這是主要的專案結構：

```
webapp
├── app                             - Your application
│   ├── account                     - Account related components
│   ├── admin                       - Administration related components
│   ├── core                        - Main components such as Home, navbar, ...
│   ├── entities                    - Generated entities
│   ├── locale                      - I18n / translation related components
│   ├── router                      - Routing configuration
│   ├── shared                      - Shared elements such as your config, models and util classes
│   ├── app.component.ts            - The application main class
│   ├── app.vue                     - The application main SFC component
│   ├── constants.ts                - Global application constants
│   ├── main.ts                     - Index script, application entrypoint
│   └── shims-vue.d.ts
├── content                         - Contains your static files such as images and fonts
├── i18n                            - Translation files
├── swagger-ui                      - Swagger UI front-end
├── 404.html                        - 404 page
├── favicon.ico                     - Fav icon
├── index.html                      - Index page
├── manifest.webapp                 - Application manifest
└── robots.txt                      - Configuration for bots and Web crawlers
```

使用[實體子產生器]({{ site.url }}/creating-an-entity/)建立名為`Foo`的新實體會在`src/main/webapp`下生成以下前端檔案：

```
webapp
├── app                                        
│   ├── entities
│   │   └── foo                           - CRUD front-end for the Foo entity
│   │       ├── foo-details.vue           - Details SFC component
│   │       ├── foo-detail.component.ts   - Details page component
│   │       ├── foo-update.vue            - Creation / Update SFC component
│   │       ├── foo-update.component.ts   - Creation / Update component class
│   │       ├── foo.vue                   - Entity main SFC component
│   │       ├── foo.component.ts          - Entity main component class
│   │       └── foo.service.ts            - Foo entity service
│   ├── router
│   │   └── index.ts                      - Entity main routes configuration
│   └── shared
│       └── model
│           └── foo.model.ts              - Entity model class
└── i18n                                  - Translation files
     ├── en                               - English translations
     │   ├── foo.json                     - English translation of Foo name, fields, ...
     └── fr                               - French translations
         └── foo.json                     - French translation of Foo name, fields, ...
```

Please note that the default language translations would be based on what you have choosen during app generation. 'en' and 'fr' are shown here only for demonstration.

## 使用VuexStore進行儲存

應用程式將使用儲存[VuexStore](https://vuex.vuejs.org/guide/state.html)來維護應用程式內的狀態。

該儲存啟動時在`app/config/config.ts:initVueXStore`中設定。請參考Vuex文件以新增新狀態或變異。

該應用程式將使用儲存來維護：

* 使用者認證訊息
* 語言和翻譯
* 通知和警報訊息
* 活動設定檔案資料

## 鑑權

JHipster使用[Vue路由器](https://router.vuejs.org/)來組織應用程式的不同部分。

對於需要身份驗證的路由，將在所需路由上使用`authorities`元資料。該組件將阻止任何未經身份驗證或未經授權的使用者訪問路由。

這是PrivateRoute用法的範例：

``` typescript
const Routes = () => [{
      path: '/public',
      name: 'public',
      component: Public
    },
    {
      path: '/private',
      name: 'Private',
      component: Private,
      meta: { authorities: ['ROLE_USER'] }
    }];
```

如您所見，未經身份驗證的使用者可以訪問`/public`，但是訪問`/private`至少需要登入。

請注意，攔截器使用`$store.getters.authenticated`儲存值來了解使用者是否已透過身份驗證。

## 校驗系統

為了執行表單驗證，我們使用[Vuelidate](https://vuelidate.netlify.com/)函式庫。除了新增校驗約束之外，還提供了一些過濾器，它們可以對錶單進行全面驗證。自定義驗證可以這樣新增：

```typescript
import { required } from 'vuelidate/lib/validators';

const mustBeCool = (value) => value.indexOf('cool') >= 0;
const validations = {
  foo: {
    required,
    mustBeCool
  }
};
@Component({
  validations
})
export default class FooComponent extends Vue {
  foo: string = null;
}
```

## Bootswatch主題

可以使用[Bootswatch](https://bootswatch.com)主題直接完成Bootstrap主題設定。現在，我們在生成期間提供選擇，以選擇Bootswatch提供的眾多主題之一。
