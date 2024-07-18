---
layout: default
title: 通用應用程式屬性
permalink: /common-application-properties/
sitemap:
    priority: 0.7
    lastmod: 2018-03-18T18:20:00-00:00
---

# <i class="fa fa-flask"></i> 通用應用程式屬性

JHipster生成一個Spring Boot應用程式，並且可以使用標準的Spring Boot屬性機制進行設定。

這些屬性是由JHipster在生成時設定的，並且在開發和生產模式中通常具有不同的值：請在我們的[Profiles文件]({{ site.url }}/profiles/)中瞭解有關此屬性的更多訊息。

在JHipster應用程式中，存在三種屬性：

1. [Spring Boot標準應用程式屬性](#1)
2. [JHipster應用程式屬性](#2)
3. [應用程式特殊屬性](#3)

## <a name="1"></a> Spring Boot標準應用程式屬性

與其他任何Spring Boot應用程式一樣，JHipster允許您設定任何標準[Spring Boot應用程式屬性](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html)。

## <a name="2"></a> JHipster應用程式屬性

JHipster提供來自[JHipster伺服器端函式庫](https://github.com/jhipster/jhipster)的特定應用程式屬性。這些屬性是所有JHipster專案的標準屬性，但是其中一些屬性僅取決於您在建立應用程式時選擇的屬性：例如，`jhipster.cache.hazelcast`鍵僅在您選擇Hazelcast作為第二級Hibernate快取時才有效。

這些屬性是使用`io.github.jhipster.config.JHipsterProperties`類設定的。

這是這些屬性的文件：
```YAML
    jhipster:

        # 在JHipster中用於非同步方法呼叫的執行緒池
        async:
            core-pool-size: 2 # 初始池大小
            max-pool-size: 50 # 最大池大小
            queue-capacity: 10000 # 池的佇列容量

        # JHipster閘道器的特定設定
        # 有關JHipster閘道器的更多訊息，請參見https://www.jhipster.tech/api-gateway/
        gateway:
            rate-limiting:
                enabled: false # 速率限制預設為停用
                limit: 100_000L # 預設情況下，我們允許100,000個API呼叫
                duration-in-seconds: 3_600 # 預設情況下，每小時限制速率會重新初始化
            authorized-microservices-endpoints: # 訪問控制策略，如果將路由留空，則所有端點均可訪問
                app1: /api # 建議的prod設定，它允許從"app1"微服務訪問所有API呼叫

        # HTTP configuration
        http:
            cache: # 由io.github.jhipster.web.filter.CachingHttpHeadersFilter使用
                timeToLiveInDays: 1461 # 靜態資源預設快取4年

        # Hibernate 2級快取，由CacheConfiguration使用
        cache:
            hazelcast: # Hazelcast設定
                time-to-live-seconds: 3600 # 預設情況下，物件在快取中停留1小時
                backup-count: 1 # 物件備份數
                # 設定Hazelcast管理中心
                # 完整的參考資料可在以下網址獲得：http://docs.hazelcast.org/docs/management-center/3.9/manual/html/Deploying_and_Starting.html
                management-center:
                    enabled: false # 預設情況下，Hazelcast管理中心處於停用狀態
                    update-interval: 3 # 預設情況下，更新每3秒鐘將傳送到Hazelcast管理中心
                    # 使用JHipster的Docker Compose設定時Hazelcast管理中心的預設URL
                    # 參見src/main/docker/hazelcast-management-center.yml
                    # 警告，預設連接埠為8180，因為JHipster已使用連接埠8080
                    url: http://localhost:8180/mancenter
            ehcache: # Ehcache設定
                time-to-live-seconds: 3600 # 預設情況下，物件在快取中停留1小時
                max-entries: 100 # 每個快取記憶體條目中的物件數
            caffeine: # Caffeine設定
                time-to-live-seconds: 3600 # 預設情況下，物件在快取中停留1小時
                max-entries: 100 # 每個快取記憶體條目中的物件數   
            infinispan: #Infinispan設定
                config-file: default-configs/default-jgroups-tcp.xml
                # 本地應用程式快取
                local:
                    time-to-live-seconds: 60 # 預設情況下，物件在快取中保留1小時（以分鐘為單位）
                    max-entries: 100 # 每個快取記憶體條目中的物件數
                #分散式應用程式快取
                distributed:
                    time-to-live-seconds: 60 # 預設情況下，物件在快取中保留1小時（以分鐘為單位）
                    max-entries: 100 # 每個快取記憶體條目中的物件數
                    instance-count: 1
                #複製的應用程式快取
                replicated:
                    time-to-live-seconds: 60 # 預設情況下，物件在快取中保留1小時（以分鐘為單位）
                    max-entries: 100 # 每個快取記憶體條目中的物件數
            # Memcached設定
            # 使用Xmemcached函式庫，請參閱https://github.com/killme2008/xmemcached
            memcached:
                # 預設情況下在dev模式下停用，因為它不適用於Spring Boot devtools
                enabled: true
                servers: localhost:11211 # 用逗號或空格分隔的伺服器地址清單
                expiration: 300 # 快取的過期時間（以秒為單位）
                use-binary-protocol: true # 建議使用二進位協定以提高效能（和安全性）
                authentication: # 如果需要身份驗證，則可以使用以下引數進行設定。 預設停用
                    enabled: false,
                    # username: 預設未設定
                    # password: 預設未設定
            redis: # Redis 設定
                expiration: 3600 # 預設情況下，物件在快取中保留1小時（以秒為單位）
                server: redis://localhost:6379 # 伺服器地址
                cluster: false
                connectionPoolSize: 64,
                connectionMinimumIdleSize: 24,
                subscriptionConnectionPoolSize: 50,
                subscriptionConnectionMinimumIdleSize: 1 

        # E-mail屬性
        mail:
            enabled: false # 如果啟用了電子郵件傳送。需要設定標準的`spring.mail`鍵
            from: jhipster@localhost # 電子郵件的預設"from"地址
            base-url: http://127.0.0.1:8080 # 應用程式的URL，在電子郵件中使用

        # Spring Security特定的設定
        security:
            remember-me: # JHipster的"記住我"機制的安全實現，用於基於會話的身份驗證
                # 安全金鑰（此金鑰對於您的應用程式應該是唯一的，並且應保密）
                key: 0b32a651e6a65d5731e869dc136fb301b0a8c0e4
            authentication:
                jwt: # JHipster特定的JWT實現
                    # 秘密令牌應使用Base64進行編碼（您可以在指令行中輸入`echo 'secret-key'|base64`）。
                    # 如果同時設定了這兩個屬性，則`secret`屬性的優先級高於`base64-secret`屬性。
                    secret: # JWT明文金鑰（不推薦）
                    base64-secret:  # 使用Base64編碼的JWT秘密金鑰（推薦）
                    token-validity-in-seconds: 86400 # 令牌有效期為24小時
                    token-validity-in-seconds-for-remember-me: 2592000 # Remember me令牌有效期為30天

        # Swagger設定
        swagger:
            default-include-pattern: /api/.*
            title: JHipster API
            description: JHipster API documentation
            version: 0.0.1
            terms-of-service-url:
            contact-name:
            contact-url:
            contact-email:
            license:
            license-url:
            host:
            protocols:

        # DropWizard Metrics設定，由MetricsConfiguration使用
        metrics:
            jmx: # 將指標匯出為JMX Bean
                enabled: true # 預設情況下啟用JMX
            # 將指標傳送到Graphite伺服器
            # 使用"graphite" Maven設定檔案來具有Graphite依賴項
            graphite:
                enabled: false # 預設情況下停用Graphite
                host: localhost
                port: 2003
                prefix: jhipster
            # 將指標傳送到Prometheus伺服器
            prometheus:
                enabled: false # 預設情況下停用Prometheus
                endpoint: /prometheusMetrics
            logs: # 在日誌中報告Dropwizard指標
                enabled: false
                reportFrequency: 60 # 報告頻率（以秒為單位）

        # 日誌記錄設定，由LoggingConfiguration使用
        logging:
            logstash: # 透過socket將日誌轉發到Logstash
                enabled: false # 預設情況下停用Logstash
                host: localhost # Logstash伺服器URL
                port: 5000 # Logstash伺服器端口
                queue-size: 512 # 佇列快取日誌
            spectator-metrics: # 在日誌中報告Netflix Spectator指標
                enabled: false # Spectator預設是停用的

        # 預設情況下，跨域資源共享（CORS）在"dev"模式下的monoliths和閘道器上啟用
        # 出於安全原因和微服務的考慮，預設情況下在"prod"模式下將其停用
        # （因為您應該使用閘道器來訪問它們）。
        # 這將設定標準的org.springframework.web.cors.CorsConfiguration
        # 請注意，"exposed-headers"對於基於JWT的安全性是強制性的，它使用
        # "Authorization"頭部，這不是預設的暴露頭部。
        cors:
            allowed-origins: "*"
            allowed-methods: "*"
            allowed-headers: "*"
            exposed-headers: "Authorization"
            allow-credentials: true
            max-age: 1800

        # Ribbon顯示在JHipster應用程式的左上方
        ribbon:
            # 以逗號分隔的顯示ribbon的設定檔案清單
            display-on-active-profiles: dev
```
## <a name="3"></a> 應用程式特殊屬性

您生成的應用程式還可以具有自己的Spring Boot屬性。強烈建議這樣做，因為它允許對應用程式進行型別安全的設定，以及IDE中的自動完成和文件。

JHipster已在`config`套件中生成了一個`ApplicationProperties`類，該類別已經預先設定，並且已經在檔案`application.yml`, `application-dev.yml`和`application-prod.yml`的底部進行了說明。您所需要做的就是編寫自己的特定屬性。