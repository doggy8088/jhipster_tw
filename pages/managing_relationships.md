---
layout: default
title: 管理關係
permalink: /managing-relationships/
redirect_from:
  - /managing_relationships.html
sitemap:
    priority: 0.7
    lastmod: 2019-02-07T18:40:00-00:00
---

# <i class="fa fa-sitemap"></i> 管理關係

使用JPA時，[實體子產生器]({{ site.url }}/creating-an-entity/)可以為實體之間建立關係。

## 介紹

關係僅在使用JPA時有效。如果您選擇使用[Cassandra]({{ site.url }}/using-cassandra/)他們將不可用。萬一你用[MongoDB]({{ site.url }}/using-mongodb/) 、 [Couchbase]({{ site.url }}/using-couchbase/)或者[Neo4j]({{ site.url }}/using-neo4j)關係具有不同的語義，但它們都可以使用。有關Couchbase和MongoDB關係的更多訊息，請參閱[Couchbase和MongoDB的嵌入式實體](#embedded-entities-for-couchbase-and-mongodb)。

兩個實體之間存在關係，JHipster將為生成以下程式碼：

- 使用JPA管理生成實體中的關係
- 建立正確的Liquibase變更日誌，確認實體的關係存同步到資料庫中
- 生成Angular/React前端，以便您可以在使用者介面中以圖形方式管理此關係

## JHipster UML與JDL Studio

本頁描述如何使用標準指令行介面與JHipster建立關係。如果要建立多個實體和關係，則可能更喜歡使用圖形界面工具。

在這種情況下，有三個選項可用：

- [JDL Studio](https://start.jhipster.tech/jdl-studio/), 我們的線上工具，可以使用我們特定於域的語言來建立實體和關係。
- [JHipster IDE]({{site.url}}/jhipster-ide/) ，一個外掛，為流行的IDE提供JDL檔案的文字編輯支援。
- 不推薦：[JHipster UML]({{ site.url }}/jhipster-uml/), 它允許您使用UML編輯器。

您可以使用`jdl`子產生器透過執行`jhipster jdl your-jdl-file.jh`從JDL檔案生成具有關係的實體。

## 支援的關係

當我們使用JPA時，可以使用通常的一對多，多對一，多對多和一對一的關係：

- [<i class="fa fa-sitemap"></i>管理關聯關係](#i-classfa-fa-sitemapi-managing-relationships)
  - [介紹](#presentation)
  - [JHipster UML和JDL Studio](#jhipster-uml-and-jdl-studio)
  - [可用關係](#available-relationships)
  - [雙向一對多關係](#a-bidirectional-one-to-many-relationship)
  - [雙向多對一關係](#a-bidirectional-many-to-one-relationship)
  - [單向多對一關係](#a-unidirectional-many-to-one-relationship)
  - [單向一對多關係](#a-unidirectional-one-to-many-relationship)
  - [同一對實體上的兩個一對多關係](#two-one-to-many-relationships-on-the-same-two-entities)
  - [多對多關係](#a-many-to-many-relationship)
  - [一對一關係](#a-one-to-one-relationship)
  - [單向一對一關係](#a-unidirectional-one-to-one-relationship)
    - [使用JPAFork識別符號（@MapsId）進行一對一關係](#using-jpa-derived-identifiersmapsid-for-one-to-one-relationship)
    - [將獲取資料策略設定為全部抓取（FetchType.EAGER）](#setting-fetching-data-strategy-to-eager-fetchtypeeager)
  - [Couchbase和MongoDB的嵌入式實體](#embedded-entities-for-couchbase-and-mongodb)

_提示: `User`實體_

關於它的訊息位於[使用者實體]({{site.url}}/user-entity/) 。

**關於實體和關係生成的小警告**：在以下範例中，您會注意到在某些情況下 _可能_ 編譯會失敗，因為未生成目標實體，這很正常（可以忽略此警告）。

有兩種方法可以避免這種情況：
- 首先生成實體，然後生成關係
- 使用JDL

---

## <a name="a-bidirectional-one-to-many-relationship"></a> 雙向一對多關係

讓我們從兩個實體開始，一個`Owner`和一個`Car`。一位所有者可以擁有多輛汽車，一輛汽車只能擁有一位所有者。

因此，這是一種一對多關係（一個所有者有很多車），而另一側是多對一的關係（多輛汽車車主是一位）：

    Owner (1) <-----> (*) Car
    
我們將先建立`Owner`。以下是與`Owner`建立時JHipster提出的問題：

    jhipster entity Owner
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? car
    ? What is the type of the relationship? one-to-many
    ? What is the name of this relationship in the other entity? owner

請注意，我們選擇使用預設的關係名稱。

現在我們生成 `Car`：

    jhipster entity Car
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Owner
    ? What is the name of the relationship? owner
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with Angular, which field from 'Owner' do you want to use? id


使用下面的JDL語句也可以實現相同的目的

    entity Owner
    entity Car

    relationship OneToMany {
      Owner{car} to Car{owner}
    }

就是這樣，您現在在這兩個實體之間建立了一對多關係！在生成的Angular/React前端UI上，您將在`Car`下拉選單中選擇`Owner`。

## <a name="a-bidirectional-many-to-one-relationship"></a> 雙向多對一關係

在反轉JDL檔案中的邊之後，這等效於雙向一對多關係：

    entity Owner
    entity Car

    relationship ManyToOne {
      Car{owner} to Owner{car}
    }


## <a name="a-bidirectional-many-to-one-relationship"></a> 單向多對一關係

在前面的範例中，我們有一個雙向關係：從`Car`實例中可以找到它的所有者，從`Owner`實例中可以得到它的所有汽車。

多對一的單向關係意味著汽車知道其所有者，但反向不行。

    Owner (1) <----- (*) Car

您之所以會建立這種關係，有兩個原因：

- 從業務角度來看，您以這種方式來使用實體。因此，您不希望擁有一個允許開發人員執行無意義的操作的API。

- 使用 `Owner`實體時，您可以獲得很小的效能提升（因為它不必管理汽車實體資料的採集）。

在這種情況下，您仍將首先建立`Owner`，但這一次沒有指定關係：

    jhipster entity Owner
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? No

然後 `Car`實體，與上一個範例一樣：

    jhipster entity Car
    ...
    Generating relationships with to entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Owner
    ? What is the name of the relationship? owner
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with Angular, which field from 'Owner' do you want to use? id

這將與上一個範例相同，但是您將無法從`Owner`實體中新增或刪除汽車。在生成的Angular/React前端UI上，您將在`Car`下拉選單中選擇`Owner`。

這是相應的JDL：

    entity Owner
    entity Car

    relationship ManyToOne {
      Car{owner} to Owner
    }


## <a name="a-unidirectional-one-to-many-relationship"></a> 單向一對多關係

一對多的單向關係意味著`Owner`實例可以獲取其汽車集合，但反向不行。與前面的範例相反。

    Owner (1) -----> (*) Car

目前，JHipster中預設不提供這種型別的關係，有關更多訊息，請參見[#1569](https://github.com/jhipster/generator-jhipster/issues/1569)。

You have two solutions for this:
您有兩種解決方案：

- 進行雙向對映，並且無需修改即可使用：這是我們推薦的方法，因為它更簡單
- 進行雙向對映，然後對其進行修改以將其轉換為單向對映：
    - 刪除`@OneToMany`註解上的"mappedBy"屬性
    - 生成所需的聯接表：您可以執行`mvn liquibase:diff`來生成該表，請參閱[有關使用Liquibase diff的文件]({{ site.url }}/development/)

JDL不支援此功能，因為JHipster中不支援。

## <a name="two-one-to-many-relationships-on-the-same-two-entities"></a> 同一對實體上的兩個一對多關係

對於此範例，一個`Person`可以是許多汽車的所有者，還可以是許多汽車的駕駛員：

    Person (1) <---owns-----> (*) Car
    Person (1) <---drives---> (*) Car

為此，我們需要使用關係名稱，我們在前面的範例中保留了它們的預設值。

生成`Person`實體，該實體與`Car`實體具有兩個一對多的關係：

    jhipster entity Person
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? ownedCar
    ? What is the type of the relationship? one-to-many
    ? What is the name of this relationship in the other entity? owner
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? drivedCar
    ? What is the type of the relationship? one-to-many
    ? What is the name of this relationship in the other entity? driver

生成`Car`實體，該實體使用與`Person`實體中設定中相同的關係名稱：

    jhipster entity Car
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Person
    ? What is the name of the relationship? owner
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with Angular, which field from 'Person' do you want to use? id
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Person
    ? What is the name of the relationship? driver
    ? What is the type of the relationship? many-to-one
    ? When you display this relationship with Angular, which field from 'Person' do you want to use? id

使用下面的JDL也可以實現相同的目的

    entity Person
    entity Car

    relationship OneToMany {
      Person{ownedCar} to Car{owner}
    }

    relationship OneToMany {
      Person{drivedCar} to Car{driver}
    }

現在，`Car`可以具有駕駛員和所有者，這兩者都是`Person`實體。在生成的Angular/React前端UI上，您將在`Car`下拉選單中選擇`owner`欄位和`driver`欄位的`Person`。

## <a name="a-many-to-many-relationship"></a> 多對多關係

`Driver`可以駕駛許多汽車，但是 `Car`也可以具有許多駕駛員。

    Driver (*) <-----> (*) Car

在資料庫視角，這意味著我們將在`Driver`表和`Car`表之間有一個聯接表。

對於JPA，這兩個實體之一需要管理該關係：在我們的範例中，是`Car`實體，它將負責新增或刪除駕駛員。

請注意，生成實體後，產生器將通知您在生成檔案時發生了一些錯誤。 這是正常的，因為尚未生成目標實體，因此您可以放心地忽略此警告。

讓我們生成具有多對多關係的關係的非所有權方`Driver`：

    jhipster entity Driver
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? car
    ? What is the type of the relationship? many-to-many
    ? Is this entity the owner of the relationship? No
    ? What is the name of this relationship in the other entity? driver

然後生成`Car`，具有多對多關係的所有權：

    jhipster entity Car
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Driver
    ? What is the name of the relationship? driver
    ? What is the type of the relationship? many-to-many
    ? Is this entity the owner of the relationship? Yes
    ? What is the name of this relationship in the other entity? car
    ? When you display this relationship on client-side, This field will be displayed as a String, so it cannot be a Blob id

使用下面的JDL也可以實現相同的目的

    entity Driver
    entity Car

    relationship ManyToMany {
      Car{driver} to Driver{car}
    }

就是這樣，您現在在這兩個實體之間建立了多對多關係！在生成的Angular/React前端UI上，您將在`Car`中有一個多選下拉選單，以選擇多個`Driver`，因為`Car`是擁有方。

## <a name="a-one-to-one-relationship"></a> 一對一關係

按照我們的範例，一對一關係意味著`Driver`只能駕駛一輛`Car`，而一輛`Car`只能擁有一名`Driver`。

    Driver (1) <-----> (1) Car

讓我們建立關係中的非所有權方，在我們的範例中是`Driver`：

    jhipster entity Driver
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Car
    ? What is the name of the relationship? car
    ? What is the type of the relationship? one-to-one
    ? Is this entity the owner of the relationship? No
    ? What is the name of this relationship in the other entity? driver

然後生成擁有關係的`Car`：

    jhipster entity Car
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Driver
    ? What is the name of the relationship? driver
    ? What is the type of the relationship? one-to-one
    ? Is this entity the owner of the relationship? Yes
    ? Do you want to use JPA Derived Identifier - @MapsId? No
    ? What is the name of this relationship in the other entity? car
    ? When you display this relationship on client-side, which field from 'Driver' do you want to use? This field will be displayed as a String, so it cannot be a Blob id

使用下面的JDL也可以實現相同的目的

    entity Driver
    entity Car

    relationship OneToOne {
      Car{driver} to Driver{car}
    }

就是這樣，您現在在這兩個實體之間建立了一對一的關係！在生成的Angular/React前端使用者介面上，您會在`Car`下拉選單中選擇一個`Driver`，因`Car`是擁有方。

[有關與JPAFork識別符號一對一使用的更多訊息](#using-jpa-derived-identifiersmapsid-for-one-to-one-relationship)

## <a name="a-unidirectional-one-to-one-relationship"></a> 單向一對一關係

單向一對一關係意味著`citizen`實例可以獲取其護照，但`passport`實例無法獲取其所有者。

    Citizen (1) -----> (1) Passport

首先生成`Passport`實體，與其所有者沒有任何關係：

    jhipster entity Passport
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? No

然後, 生成`Citizen`實體:

    jhipster entity Citizen
    ...
    Generating relationships to other entities
    ? Do you want to add a relationship to another entity? Yes
    ? What is the name of the other entity? Passport
    ? What is the name of the relationship? passport
    ? What is the type of the relationship? one-to-one
    ? Is this entity the owner of the relationship? Yes
    ? Do you want to use JPA Derived Identifier - @MapsId? No
    ? What is the name of this relationship in the other entity? citizen
    ? When you display this relationship with Angular, which field from 'Passport' do you want to use? id

完成此操作後，`Citizen`擁有護照，但是在`Passport`中未定義任何`Citizen`實例。在生成的Angular/React前端UI上，由於`Citizen`是擁有者，因此`Citizen`中將出現一個下拉清單以選擇`Passport`。
這是相應的JDL：

    entity Citizen
    entity Passport

    relationship OneToOne {
      Citizen{passport} to Passport
    }

### <a name="using-jpa-derived-identifiersmapsid-for-one-to-one-relationship"></a>  使用JPAFork識別符號（@MapsId）進行一對一關係
  
  
[JPAFork識別符號](https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapsId.html)可提供[最高效的對映](https://vladmihalcea.com/the-best-way-to-map-a-onetoone-relationship-with-jpa-and-hibernate/)。

這是前面的單向一對一範例的相應JDL：

    entity Citizen
    entity Passport

    relationship OneToOne {
      Citizen{passport} to Passport with jpaDerivedIdentifier 
    }

這是前面的雙向一對一範例的相應JDL：

    entity Driver
    entity Car

    relationship OneToOne {
      Car{driver} to Driver{car} with jpaDerivedIdentifier 
    }

但是，根據業務需求，在某些情況下可能應避免這種情況，因為它具有以下約束：
**一旦在擁有方設定了id（主鍵），就無法使用JPA/Hibernate對其關聯值進行修改。無論如何，您都不應對其進行變更。**
-
**以下是有關用法的一些建議：**

在以下情況下使用`@MapsId`：

* 從屬-擁有方（子實體）緊密依賴於非擁有方（父實體）。

* 關聯值永遠都不會改變-如果您一旦設定了子實體的ID（主鍵）就永遠不會改變。

    例如,

    ```
    class User{}
    class Profile{ @OneToOne @MapsId private User user; } // 個人資料僅適用於該使用者
    class Preferences{ @OneToOne @MapsId private User user; } // 首選項僅適用於該使用者
    ```

    為使用者建立個人資料或首選項後，它將永遠不會更改為其他使用者。

在以下情況下，請勿使用 `@MapsId`：
* 不依賴-如果擁有方（子實體）似乎不依賴於非擁有方（父實體）
* 關聯值是可以更改的-如果您認為子實體將來會引用另一個父實體。

    例如,

    ```
    class Car{ @OneToOne @JoinColumn(name="id") Driver currentDriver} // 將來可以由其他駕駛員駕駛汽車
    class Driver{@OneToOne @JoinColumn(name="id") Car drivingCar} // 駕駛員將駕駛其他汽車
    ```
    汽車和駕駛員的關聯值都可能在將來發生變化。

**注意：[已知存在一個關於一起使用`@OneToOne`與`@MapsId`的問題，以及如何避免使用它們](https://www.jhipster.tech/tips/026_tip_issue_of_onetoone_with_mapsid_how_to_avoid_it.html)。**

### 將獲取資料策略設定為全部抓取（FetchType.EAGER）

所有關係都使用預設的JPA抓取策略：
- 一對多：LAZY
- 多對一：EAGER
- 多對多：LAZY
- 一對一：EAGER

由於FetchType.EAGER，存在一個[JSON反序列化期間存在NPE的已知問題](https://github.com/jhipster/generator-jhipster/issues/10981) 。 如果要將`OneToMany`或`ManyToMany`關係設定為`FetchType.EAGER`，則可以使用以下解決方案之一： 

- 使用 ```@JsonInclude(JsonInclude.Include.NON_EMPTY)``` 在關係上

  如：

    ```
    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<Child> child = new HashSet<>();
    ```
- 如果在後端獲取資源時集合為空，則回傳null
- 使用DTO處理空集合的邊緣情況

### Couchbase和MongoDB的嵌入式實體

Couchbase和MongoDB透過嵌入式文件支援關係。 有關MongoDB中嵌入式文件的更多訊息，請參考[https://docs.mongodb.com/manual/applications/data-models-relationships/](https://docs.mongodb.com/manual/applications/data-models-relationships/) 和有關Couchbase的訊息，請參考[https://docs.couchbase.com/server/5.1/data-modeling/modeling-relationships.html](https://docs.couchbase.com/server/5.1/data-modeling/modeling-relationships.html) 。

您可以簡單地透過使用@embedded來定義嵌入式文件。 例如定義一對一的關係；

```
entity Country {
  countryName String
}

@embedded
entity Region {
  regionName String
}


relationship OneToOne {
  Country to Region
}
```

同樣，對於一對多關係，

```
entity Country {
  countryName String
}

@embedded
entity Region {
  regionName String
}


relationship OneToMany {
  Country to Region
}
```

對於多對多關係，您可以簡單地雙向使用`@ embedded`關鍵字。

```
@embedded
  entity Country {
  countryName String
}

@embedded
entity Region {
  regionName String
}


relationship ManyToMany {
  Country to Region
}
```