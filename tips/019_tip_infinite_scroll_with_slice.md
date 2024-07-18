---
layout: default
title: 藉助Slice提升無限捲動效能
sitemap:
priority: 0.5
lastmod: 2016-11-12T22:22:00-00:00
---

# 藉助Slice提升無限捲動效能

__送出者 [@nkolosnjaji](https://github.com/nkolosnjaji)__

使用無限捲動的分頁使用Spring Data Page從資料庫中檢索實體。
這將觸發兩個查詢，一個查詢獲取實體，第二個查詢『全部計數』以確定分頁的總項。 無限捲動不需要有關總大小的訊息，而僅在有下一頁要載入時才需要。 為了避免使用`count all`查詢（在處理大型資料集時這可能是一項昂貴的操作），請使用[Slice](http://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Slice.html)（而不是Page）將提高無限捲動的效能。

我們將使用自定義HTTP標頭『 X-Has-Next-Page』將訊息傳送到前端無限捲動外掛。

  * 在您的實體儲存庫中定義新方法：

```
Slice<YourEntity> findSliceBy(Pageable pageable);
```

  * 在`web/rest/util`套件中的`PaginationUtil.java`中定義新的靜態方法

```
public static HttpHeaders generateSliceHttpHeaders(Slice<?> slice) {
  HttpHeaders headers = new HttpHeaders();
  headers.add("X-Has-Next-Page", "" + slice.hasNext());
  return headers;
}
```

  * 修改REST控制器以呼叫Slice而不是Page並生成新的HTTP標頭。

```
@GetMapping("/<YourEntities>")
@Timed
public ResponseEntity<List<Repo>> getAllRepos(Pageable pageable)
    throws URISyntaxException {
    Slice<YourEntity> slice = repoRepository.findSliceBy(pageable);
    HttpHeaders headers = PaginationUtil.generateSliceHttpHeaders(slice);
    return new ResponseEntity<>(slice.getContent(), headers, HttpStatus.OK);
}
```

  * 在`entity.controller.js`中定義新的檢視模型

```
vm.hasNextPage = false;
```

  * 從回應中提取HTTP標頭值，並將其分配給以下檢視模型

```
function onSuccess(data, headers) {
    vm.hasNextPage = headers('X-Has-Next-Page') === "true";
    ...
}
```

  * 在`<your-entities> .html`中使用帶有無限捲動外掛的檢視模型

```
<tbody infinite-scroll="vm.loadPage(vm.page + 1)" infinite-scroll-disabled="!vm.hasNextPage">
```
