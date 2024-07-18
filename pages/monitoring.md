---
layout: default
title: 監視您的JHipster應用程式
permalink: /monitoring/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---
# <i class="fa fa-line-chart"></i> 監視您的JHipster應用程式

JHipster提供了幾個選項來監視您執行應用程式。

## 摘要

1. [生成的儀表板](#generated-dashboards)
2. [JHipster Registry](#jhipster-registry)
3. [ELK](#elk)
4. [將指標轉發到受支援的第三方監視系統](#configuring-metrics-forwarding)
5. [Zipkin](#zipkin)
6. [使用Elastalert進行告警](#elastalert)

## <a name="generated-dashboards"></a> 生成的儀表板

對於monoliths和閘道器，JHipster會生成多個儀表板來監視每個應用程式。這些儀表板在執行時可用，並且是進行一些簡單監視的最簡單方法。

![JHipster Metrics page][jhipster-metrics-page]

### 指標儀表板

指標儀表板使用Micrometer來提供應用程式效能的詳細檢視。

它提供以下指標：

- JVM
- HTTP請求
- 快取使用率
- 資料庫連線池

透過單擊JVM執行緒指標旁邊的Expand按鈕，您將獲得正在執行的應用程式的執行緒轉儲，這對於找出阻塞的執行緒非常有用。

### 健康狀況儀表板

健康狀況儀表板使用Spring Boot Actuator的執行狀況端點來提供有關應用程式各個部分的執行狀況訊息。Spring Boot Actuator提供了許多開箱即用的健康檢查，您可以新增特定於應用程式的執行狀況檢查。

### 日誌儀表板

日誌儀表板允許在執行時管理正在執行的應用程式的Logback設定。
您可以透過單擊按鈕來更改Java軟體套件的日誌級別，這在開發和生產中都非常方便。

## <a name="jhipster-registry"></a> JHipster Registry

JHipster Registry[在此處具有自己單獨的文件頁面]({{ site.url }}/jhipster-registry/)。

它主要提供與上一部分相同的監視儀表板，但可在​​單獨的伺服器上工作。因此，設定起來有點複雜，但是強烈建議讓儀表板與正在執行的應用程式隔離執行：否則，當應用程式出現故障時，它們將不可用。

## <a name="elk"></a> ELK (Elasticsearch, Logstash, Kibana) Stack

ELK技術棧通常用於日誌聚合和搜尋，它由以下元件組成：

- [Elasticsearch](https://www.elastic.co/products/elasticsearch) 用於索引資料（日誌和指標）
- [Logstash](https://www.elastic.co/products/logstash) 管理和處理從應用程式收到的日誌
- [Kibana](https://www.elastic.co/products/kibana) 用一個漂亮的介面視覺化日誌

<div class="alert alert-warning"><i> 警告: </i>
JHipster支援將日誌轉發到Logstash，但是從JHipster7開始，我們不提供任何ELK技術棧docker部署和可以使用儀表板。 這曾經是不再維護的[JHipster Console](https://github.com/jhipster/jhipster-console) 子專案的一部分。 我們建議現有使用者遷移到另一個ELK解決方案。
</div>

### 將日誌轉發到Logstash

要設定JHipster應用程式將其日誌轉發到Logstash，請在它們的`application-dev.yml`或`application-prod.yml`中啟用logstash日誌記錄：

```yaml
    jhipster:
        logging:
            logstash:
                enabled: true
                host: localhost
                port: 5000
                queueSize: 512
```

為了收集這些日誌，可以在Logstash端提供一個簡單的`logstash.conf`檔案：

    input {
        tcp {
            port => "5000"
            type => syslog
            codec => json_lines
        }
    }

    output {
        elasticsearch {
                hosts => ["${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}"]
                index => "logs-%{+YYYY.MM.dd}"
            }
        }
    }

有關如何設定ELK技術棧的更多訊息，請參考[官方Elastic文件](https://www.elastic.co/guide/en/elastic-stack/current/index.html) 。

## <a name="configuring-metrics-forwarding"></a> 將指標轉發到受支援的第三方監視系統（JMX，Prometheus）

預設情況下，JHipster以[Prometheus](https://prometheus.io/) 格式公開應用程式指標。
它在`management/prometheus`下公開。
還可以透過[spring boot actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-metrics) 將指標轉發到備用系統。

如果您想停用暴露指標端點，可以在`src/main/resources/application.yml`中停用它。

```yaml
    management:
        metrics:
            export:
                prometheus:
                    enabled: false
```

Prometheus端點預設情況下不受保護。 如果您想透過Spring Security保護它，則可以透過向Prometheus端點新增基本身份驗證來實現，因為Prometheus可以與受基本身份驗證保護的抓取端點一起使用。

建立一個新的設定檔案（例如`BasicAuthConfiguration.java`）。

```java
    @Configuration
    @Order(1)
    @ConditionalOnProperty(prefix = "management", name = "metrics.export.prometheus.enabled")
    public class BasicAuthConfiguration extends WebSecurityConfigurerAdapter {

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                .antMatcher("/management/prometheus/**")
                .authorizeRequests()
                .anyRequest().hasAuthority(AuthoritiesConstants.ADMIN)
                .and()
                .httpBasic().realmName("jhipster")
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().csrf().disable();
        }
    }
```

您可以使用預設的`admin/admin`登入。您必須在prometheus設定中新增以下設定，以便prometheus仍然可以抓取您的應用程式。

    basic_auth:
        username: "admin"
        password: "admin"

您可以透過`docker-compose -f src/main/docker/monitoring.yml up -d`在本地電腦上啟動預設定的Grafana和Prometheus實例，
以檢視預設定的[jvm/micrometer儀表板](https://grafana.com/grafana/dashboards/4701) 。

![Grafana Micrometer Dashboard][grafana-micrometer-dashboard]

注意：與以前的JHipster版本不同，JHipster 5.8指標報告開箱即用僅支援JMX和Prometheus。 
請檢視Metrics官方文件，以獲取有關如何設定其他報告程式（如[Graphite](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-metrics-export-graphite) 的說明。。


## <a name="zipkin"></a> Zipkin

JHipster應用程式可以透過[Spring Cloud Sleuth](https://cloud.spring.io/spring-cloud-sleuth/)與[Zipkin](http://zipkin.io/)整合，從而為您的微服務架構提供分散式跟蹤。要啟用Zipkin跟蹤，請使用 `zipkin` maven/gradle設定檔案打包您的應用程式，並將`spring.zipkin.enabled`屬性設定為true。這將觸發向Zipkin伺服器的跨度報告，並且還將向請求標頭和日誌新增相關性ID（TraceId，SpanId和ParentId）。

Zipkin還提供了服務依賴關係圖功能，使您可以直觀地觀察微服務之間的依賴關係。

有關如何設定您的應用程式以將跟蹤記錄報告給Zipkin的更多訊息，請遵循官方的[Spring Cloud Sleuth文件](https://cloud.spring.io/spring-cloud-sleuth/reference/html/#sending-spans-to-zipkin) 。

[jhipster-metrics-page]: {{ site.url }}/images/jhipster_metrics_page.png "JHipster Metrics page"
[grafana-micrometer-dashboard]: {{ site.url }}/images/monitoring_grafana_micrometer.png "Grafana Micrometer Dashboard" 
