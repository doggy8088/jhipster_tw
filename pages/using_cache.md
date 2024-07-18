---
layout: default
title: 使用快取
permalink: /using-cache/
sitemap:
    priority: 0.7
    lastmod: 2017-02-10T18:40:00-00:00
---

# <i class="fa fa-line-chart"></i> 使用快取

快取可以在JHipster中用於兩個級別：

- 使用Spring Cache抽象，這是生成應用程式時的一個特定問題，並且使用Spring Boot `@EnableCaching`註解。這需要根據您的特定業務需求進行調整，並且比Hibernate 2級快取更高階。
- 作為Hibernate 2級快取，快取解決方案可以極大地提高應用程式的效能，這就是人們通常使用JHipster所做的。請注意，如果您選擇使用Spring Cache，則此選項僅適用於SQL資料庫。

Spring Cache和Hibernate 2級快取將使用相同的快取解決方案，但不能在同一級別上使用：我們不建議對同一物件同時使用這兩個快取，因為這會使快取失效問題更加複雜。相反，我們建議您使用：

- Spring Cache用於更高階別或聚合的物件，就像您通常使用的DTO一樣
- 用於對映到資料庫的實體的Hibernate 2級快取，以減少SQL請求的數量

JHipster支援以下快取實現：
1. Ehcache，
2. Caffeine，
3. Hazelcast，
4. Infinispan，
5. Memcached，
6. Redis。

它們都在下面詳細說明。

## 通用設定

快取是在`CacheConfiguration`類別中設定的，也可以使用JHipster[通用應用程式屬性]({{ site.url }}/common-application-properties/)進行調整。

## 使用Ehcache快取

[Ehcache](http://www.ehcache.org/)是​​JHipster生成monoliths應用的預設快取。Ehcache啟動速度非常快，因此它是"常規"單體應用的完美解決方案。

使用JHipster，Ehcache無法作為分散式快取使用，因為它沒有允許以程式設計方式新增新節點的API

Ehcache是​​在`CacheConfiguration` Spring設定bean中設定的，該設定bean在JHipster[通用應用程式屬性]({{ site.url }}/common-application-properties/)中定義了2個屬性（`time-to-live-seconds`和`max-entries`）。可以在應用程式的特定`ApplicationProperties` Spring設定bean中新增更多屬性。

預設情況下，在`dev`和`prod`模式下，`time-to-live-seconds`的預設值均為3600秒（1小時），在`dev`模式下`max-entries`的預設值為100項，在生產模式下的預設值為1000項。

這些值應根據您的特定業務需求進行調整，並且JHipster監視螢幕可以幫助您更好地瞭解應用程式中的快取使用情況。另請參閱Ehcache文件以微調這些值。

## 使用Caffeine快取

[Caffeine](https://github.com/ben-manes/caffeine)是一種[高效能](https://github.com/ben-manes/caffeine/wiki/Benchmarks)、[接近最佳](https://github.com/ben-manes/caffeine/wiki/Efficiency)的快取函式庫，是EHcache的替代品，可用於JHipster中的monoliths應用。

與Ehcache類似，Caffeine無法用作分散式快取。

Jhipster會為Caffeine生成與Ehcache相同的預設設定。但是，您可能希望新增其他選項以根據需要進行微調。Caffeine快取設定是在`CacheConfiguration` Spring設定bean中完成的，而您的應用程式特定的屬性可以新增到`ApplicationProperties` bean中。您可能會發現以下三個檔案對於定義自己的Caffeine設定很有用。

- 我們在`CacheConfiguration` bean中使用[`CaffeineConfiguration`](https://github.com/ben-manes/caffeine/blob/master/jcache/src/main/java/com/github/benmanes/caffeine/jcache/configuration/CaffeineConfiguration.java)類來新增Caffeine屬性。
- 您可能會發現[`TypesafeConfigurator`](https://github.com/ben-manes/caffeine/blob/master/jcache/src/main/java/com/github/benmanes/caffeine/jcache/configuration/TypesafeConfigurator.java)以及 [`reference.conf`](https://github.com/ben-manes/caffeine/blob/master/jcache/src/main/resources/reference.conf)作為對所有受支援的Caffeine屬性的引用。

## 使用Hazelcast快取

[Hazelcast](https://hazelcast.com/)可以用作本地快取（如Ehcache），但也可以用作分散式快取。結果是：

- 這是微服務的預設選項，因為我們希望微服務能夠擴充套件
- 這是閘道器的預設選項，因為我們希望它們能夠擴充套件，並且因為Hazelcast可以用於分佈[閘道器速率限制訊息]({{ site.url }}/api-gateway/#rate_limiting)
- 當在monolith中使用時，Hazelcast需要具有[JHipster Registry]({{ site.url }}/jhipster-registry/)選項才能擴充套件

對於擴充套件應用程式，Hazelcast將使用設定的服務發現來查詢新節點並水平擴充套件。對於微服務和閘道器，這將與JHipster Registry和Consul一起使用，而對於monolith，則僅與JHipster Registry一起使用。

新增新節點後，它將在服務發現中註冊自己（例如，它將在JHipster Registry中可用），並尋找相同型別的其他節點。如果找到一個或多個相同型別的節點，它將使用它們建立一個叢集快取：您應該在每個節點的日誌中看到一條訊息，如以下範例所示：

    [172.18.0.10]:5701 [dev] [3.7]
    Members [4] {
    Member [172.18.0.10]:5701 - 3cbddfcd-0229-4cd5-be55-4611927a9071 this
    Member [172.18.0.5]:5701 - 204d457d-f6fe-43f2-8e8d-497e96b3f08e
    Member [172.18.0.14]:5701 - 7804d535-86fb-46be-b2a5-d7801dc6a4df
    Member [172.18.0.11]:5701 - 6114ae28-56cd-4840-a575-4d73a6003744
    }

為了更好地使用Hazelcast，JHipster包括對Hazelcast管理中心的支援：

- 請注意，您只能免費監控2個節點，因為這是商業產品。但這已經足以測試您的應用程式。
- 在`application-dev.yml`和`application-prod.yml`檔案中，參考JHipster[常用應用程式屬性]({{ site.url }}/common-application-properties/)，透過鍵`jhipster.cache.hazelcast.management-center`對其進行設定。請注意，預設情況下它是關閉的。
- JHipster生成了Docker Compose設定以執行Hazelcast管理中心。請閱讀我們的[Docker Compose文件]({{ site.url }}/docker-compose/)，然後使用`docker-compose -f src/main/docker/hazelcast-management-center.yml up -d`執行該應用程式。

## 使用Infinispan快取

[Infinispan](http://infinispan.org/)是一種高效能的快取解決方案，可以用作記憶體中的本地快取以及群集快取。它支援多種快取模式，

  - [本地](http://infinispan.org/docs/stable/user_guide/user_guide.html#local_mode)
  - [invalidation](http://infinispan.org/docs/stable/user_guide/user_guide.html#invalidation_mode)
  - [分散式](http://infinispan.org/docs/stable/user_guide/user_guide.html#replicated_mode)
  - [複製](http://infinispan.org/docs/stable/user_guide/user_guide.html#distribution_mode)

透過JHipster，Infinispan可以被用於：

- 作為Spring Cache抽象的實現
- 作為Hibernate 2級快取

以下是預設定的預設設定：

- 實體以invalidation快取模式執行
- 對於特定於應用程式的快取，預定義了三種快取設定
  - **local-app-data** 用於快取節點本地的資料
  - **dist-app-data** 用於跨節點的分散式資料快取（由分散式副本數確定的副本數）
  - **repl-app-data** 用於跨節點複製資料

可以使用JHipster[通用應用程式屬性]({{ site.url }}/common-application-properties/)，微調快取中每個獨立操作模式的物件逐出，生存時間和最大條目數，以及分散式模式的副本數。微調`jhipster.cache.infinispan`中的屬性以用於特定於應用程式的快取，並微調`spring.jpa.properties`以用於Hibernate的第二級快取。

如果啟用了JHipster Registry，將在Registry中註冊節點清單。如果未啟用JHipster Registry，則節點發現將基於Infinispan Jar中打包的`config-file`中定義的預設傳輸設定。Infinispan原生發現支援大多數平台（例如Kubernets/OpenShift，AWS，Azure和Google）。

儘管Infinispan 9.0.0.Final GA和更高版本，透過使用本機KUBE_PING發現，增加了對在Kubernetes和OpenShift上執行Infinispan嵌入式快取應用程式的支援，但Hibernate依賴項尚未更新至9.x版本，因此不支援在Kubernetes和OpenShift本機發現。但是，您可以透過使用JHipster Registry進行實例發現來執行應用程式。

## 使用Memcached快取

[Memcached](https://memcached.org/)是一個開源分散式快取。它與JHipster支援的其他快取實現完全不同：

- Memcached不能用作Hibernate 2級快取，它僅支援Spring Cache抽象。
- Memcached在遠端服務下執行，沒有本地快取​​。這樣，您的物件始終會通過網路進行序列化/反序列化，這意味著如果您的物件集很小，放入記憶體中，效率反而可能會降低。
- 它非常易於擴充套件，並且運營成本低。大多數大型雲提供商（如Heroku，GCP或AWS）都支援Memcached。這樣，擁有分散式（且便宜）的Memcached叢集比使用其他快取實現要容易得多。

JHipster將流行的[Xmemcached](https://github.com/killme2008/xmemcached) Java用戶端用於Memcached，並使用通常的JHipster[通用應用程式屬性]({{ site.url }}/common-application-properties/)來設定其最重要的屬性。

請注意，每個快取記憶體必須在`CacheConfiguration`設定Bean中設定為特定的Spring Bean。

由於Memcached需要在其類載入器中對物件進行序列化/反序列化，因此在使用Spring Boot devtools（使用特定的類載入器對應用程式類進行熱重裝）時，該功能不起作用。這就是在開發人員模式下預設停用Memcached的原因。

JHipster依然如往日一樣提供了Docker Compose設定，因此您可以輕鬆地在電腦上啟動Memcached伺服器。為了使用它，請執行`docker-compose -f src/main/docker/memcached.yml up -d`。

## 使用Redis快取

[Redis](https://redis.io/)是一個開源的記憶體資料結構儲存，可以用作高效能快取解決方案。當前，它在產生器JHipster中作為單個伺服器節點實現，但也可以作為分散式快取使用。

JHipster使用[Redisson](https://redisson.org/)作為Redis Java用戶端主要有兩個原因：
- Redis強烈推薦
- 它提供了一個的JCache（JSR-107）的實現

由於我們在可用時使用JCache實現，因此這兩者都可以與其他快取保持一致，並在Spring快取和Hibernate 2級快取之間共享相同的Redis連線。