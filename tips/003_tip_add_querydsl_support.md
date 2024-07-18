---
layout: default
title: 新增Querydsl支援
sitemap:
priority: 0.5
lastmod: 2017-04-27T08:40:00-00:00
---

# 新增Querydsl支援

__提示由 [@omrzljak](https://github.com/omrzljak) 送出, [@arnaud-deprez](https://github.com/arnaud-deprez) 更新__

在某些情況下，Spring Data [query possibilities](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongodb.repositories.queries) 不能滿足查詢需求。 您可以使用 `@Query` 註解和 [write your own](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongodb.repositories.queries.json-based) 。有些人喜歡編寫型別安全的查詢，例如 [Querydsl](http://www.Querydsl.com/) 。

## 生成的Predicate類

Querydsl的重要部分是為查詢生成的domain類，即Predicate。 對於spring-data-mongodb，它們是由Java註解後處理工具生成的。

## Gradle外掛

還有Querydsl的Gradle外掛，它支援spring-data-mongodb的設定。

## Maven外掛

還有一個Maven外掛。 在文件[Maven整合](http://www.querydsl.com/static/querydsl/latest/reference/html/ch02.html#d0e132) 一章中全面介紹了Maven設定。 您還需要執行以下步驟。

**注意**: 不要包含`org.slf4j`依賴，因為它已包含在Spring Boot中。

## 變化內容

### build.gradle

在 `build.gradle`中，將依賴項新增到`Querydsl plugin`

```groovy
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath "gradle.plugin.com.ewerk.gradle.plugins:querydsl-plugin:1.0.9"
    }
}

apply from: 'gradle/querydsl.gradle'
```
定義 `Querydsl version` 在 `gradle.properties`中。

```properties
querydsl_version=4.1.4
```

然後建立一個檔案 `gradle/querydsl.gradle` ，內容為：

```groovy
apply plugin: "com.ewerk.gradle.plugins.querydsl"

sourceSets {
    main {
        java {
            srcDir "$buildDir/generated/source/apt/main"
        }
    }
}

querydsl {
    // we use mongodb
    springDataMongo = true
    querydslSourcesDir = "$buildDir/generated/source/apt/main"
}

dependencies {
    compile "com.querydsl:querydsl-mongodb:${querydsl_version}"
    compileOnly "com.querydsl:querydsl-apt:${querydsl_version}"
}
```

__注意__ 我們使用MongoDB，但Querydsl外掛還支援[更多選項](https://github.com/ewerk/gradle-plugins/tree/master/Querydsl-plugin) 。

如果您執行`gradle build`，您將看到這樣的輸出
`Note: Generating net.jogat.names.domain.QName for [net.jogat.names.domain.Name]`

對於使用@Document註解的每個域類，Querydsl外掛將生成一個Predicate類。

## 修改Repository類

如果您有一個實體類，例如`Name`，那麼您也有一個`NameRepository`類。 您必須更改每個Repository類以從`QueryDslPredicateExecutor`擴充套件。

    public interface NameRepository extends MongoRepository<Name, String>, QueryDslPredicateExecutor<Name> {

這將透過支援Querydsl的其他方法擴充套件您的Repository類（[參見](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongodb.repositories.queries.type-safe) ）

## Web支援

要擴充套件剩餘控制器以支援引數化請求，您必須在方法引數中新增以`org.springframework.data.querydsl.binding.QuerydslPredicate`註解的`com.mysema.query.types.Predicate`：

    @RestController
    @RequestMapping("/api")
    class NameResource {

        private final NameRepository nameRepository;
        
        public NameResource(NameRepository nameRepository) {
            this.nameRepository = nameRepository;
        }

        @RequestMapping(value = "/names",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
        @Timed
        public ResponseEntity<List<Name>> getAllNames(@QuerydslPredicate(root = Name.class) Predicate predicate,
                                                        Pageable pageable) {
            log.debug("REST request to get a page of Name");
            Page<Name> page = nameRepository.findAll(predicate, pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/names");
            return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
        }
        ...
    }

同樣在 `NameResourceIntTest` 你必須支援 `QuerydslPredicateArgumentResolver`:

    public class NameResourceIntTest {
        ...
        @Autowired
        private NameRepository nameRepository;
        @Autowired
        private QuerydslPredicateArgumentResolver querydslPredicateArgumentResolver;

        @PostConstruct
        public void setup() {
            MockitoAnnotations.initMocks(this);
            NameResource nameResource = new nameResource(nameRepository);
            this.restNameMockMvc = MockMvcBuilders.standaloneSetup(nameResource)
                .setCustomArgumentResolvers(pageableArgumentResolver, querydslPredicateArgumentResolver)
                .setMessageConverters(jacksonMessageConverter).build();
        }
        ...
    }

可以在 [相關文件](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#core.web.type-safe) 中找到更多詳細訊息。

## 編寫型別安全的查詢

Gradle或Maven外掛生成了QName類，該類別可用於編寫Name.class的查詢。 這是Java範例：

```java
QName name = QName.name;

// count all names whose list "categorie" contains string "TOP_EVER"
nameRepository.count(name.categories.contains("TOP_EVER"));
```
