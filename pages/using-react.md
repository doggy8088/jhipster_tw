---
layout: default
title: 使用React
permalink: /using-react/
sitemap:
    priority: 0.7
    lastmod: 2018-04-02T23:41:00-00:00
---

# <i class="fa fa-html5"></i> 使用React（與Redux）
本部分引用與**Redux**一起使用的JavaScript函式庫**React**。

## 專案結構

您可以在`src/main/webapp`下找到JHipster前端程式碼，該程式碼與[Piotr Witek React樣式指南](https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/README.md)密切相關。

如果您對我們的應用程式結構、檔案名、TypeScript約定有任何疑問，請先閱讀本指南。

對於React路由，我們遵循破折號命名約定，以便URL乾淨且一致。
當您生成實體時，將根據此約定生成路由名稱，路由URL和REST API端點URL，並且實體名稱也會在需要時自動複數。

這是主要的專案結構：

```
webapp
├── app                             - Your application
│   ├── config                      - General configuration (redux store, middleware, etc.)
│   ├── entities                    - Generated entities
│   ├── modules                     - Main components directory
│   │   ├── account                 - Account related components
│   │   ├── administration          - Administration related components
│   │   ├── home                    - Application homepage
│   │   └── login                   - Login related components
│   ├── shared                      - Shared elements such as your header, footer, reducers, models and util classes
│   ├── app.scss                    - Your global application stylesheet if you choose the Sass option
│   ├── app.css                     - Your global application stylesheet
│   ├── app.tsx                     - The application main class
│   ├── index.tsx                   - Index script
│   ├── routes.tsx                  - Application main routes
│   └── typings.d.ts                -
├── i18n                            - Translation files
├── static                          - Contains your static files such as images and fonts
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
│   └── entities
│       ├── foo                           - CRUD front-end for the Foo entity
│       │   ├── foo-delete-dialog.tsx     - Delete dialog component
│       │   ├── foo-detail.tsx            - Detail page component
│       │   ├── foo-dialog.tsx            - Creation dialog component
│       │   ├── foo.reducer.ts            - Foo entity reducer
│       │   ├── foo.tsx                   - Entity main component
│       │   └── index.tsx                 - Entity main routes
│       └── index.tsx                     - Entities routes    
└── i18n                                  - Translation files
     ├── en                               - English translations
     │   ├── foo.json                     - English translation of Foo name, fields, ...
     └── fr                               - French translations
         └── foo.json                     - French translation of Foo name, fields, ...
```

請注意，預設語言翻譯將基於您在應用生成過程中選擇的語言。在此處僅顯示'en'和'fr'以進行示範。

## Redux

[Redux](https://redux.js.org/)是一個用於應用程式狀態管理的開源JavaScript函式庫。它與React一起使用來管理React元件的狀態。

Redux提供了一個物件**store**，用於儲存應用程式的整個狀態。
要訪問此儲存並因此更新狀態元件，唯一的方法是排程描述請求更新的**actions**，
然後**reducers**將定義如何回應這些操作來更新狀態。

這是`reducers`的範例：

``` typescript
export const ACTION_TYPES = {
  FETCH_FOOS: 'foo/FETCH_FOOS',
};

const initialState = {
  loading: false,
  foos: [],
  updateSuccess: false,
  updateFailure: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOOS):
      return {
        ...state,
        updateSuccess: false,
        updateFailure: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOOS):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        updateFailure: true
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOOS):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        updateFailure: false,
        foos: action.payload.data
      };
    default:
      return state;
  }
};
```

為了訪問您的商店並更新當前應用程式狀態，您需要如前所述，將操作分派到商店。動作是JavaScript物件，並且必須具有描述動作將要執行的操作的**type**，通常，它們還具有與要傳遞給儲存的資料相對應的**payload**。

這是訪問商店的操作：

``` typescript
const apiUrl = SERVER_API_URL + '/api/foos';

// Action
export const getFoos = () => ({
  type: ACTION_TYPES.FETCH_FOOS,
  payload: axios.get(apiUrl)
});
```

上述動作表明我們要透過傳送GET請求來檢索所有Foo物件。操作型別將對應。
請注意，**export**關鍵字用於使連線的元件能夠在必要時使用該操作（例如，每次更新元件時）。

## 鑑權

Jhipster使用[React路由器](https://github.com/ReactTraining/react-router)來組織應用程式的不同部分。

當涉及需要身份驗證的路由時，將使用生成的`PrivateRoute`元件。該組件將阻止任何未經身份驗證的使用者訪問路由。

這是PrivateRoute用法的範例：

``` typescript
const Routes = () => (
  <div className="view-routes">
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/account" component={Account} />
  </div>
);
```

如您所見，未經身份驗證的使用者可以訪問`/`和`/login`，但是訪問`/account`需要登入。

請注意，PrivateRoute使用`authentication.isAuthenticated`儲存值來了解使用者是否已透過身份驗證。

## 通知系統

JHipster使用[react-toastify](https://github.com/fkhadra/react-toastify)為通知系統提供告警。

預設情況下，每當建立/更新/刪除實體時，JHipster都會顯示成功通知，而從回應中捕獲到錯誤時，JHipster將顯示錯誤通知。

## React JHipster函式庫

[react-jhipster](https://github.com/jhipster/react-jhipster)函式庫為生成的應用程式提供實用程式和通用服務。它也處理i18n。
