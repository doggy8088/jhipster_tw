---
layout: default
title: 通用連接埠
permalink: /common-ports/
sitemap:
    priority: 0.7
    lastmod: 2018-10-15T10:20:00-00:00
---

# <i class="fa fa-plug"></i> 通用連接埠

JHipster設定了許多工具和服務，每個工具和服務都可能使用一個或多個連接埠。這個文件可幫助您瞭解每個連接埠的功能，並在連接埠衝突的情況下提供幫助。

請注意，根據JHipster[規範1]({{ site.url }}/policies/)，除非有問題（請在此處進行說明），否則每種技術均使用標準連接埠。

此處的連接埠按順序列出，最常見的問題是連接埠`8080`, `9000`和`9060`。

<table class="table table-striped table-responsive">
  <tr>
    <th>連接埠</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>2181</td>
    <td>Zookeeper (與Kafka一起使用)</td>
  </tr>
  <tr>
    <td>3000</td>
    <td>Grafana</td>
  </tr>
  <tr>
    <td>3306</td>
    <td>MySQL 和 MariaDB</td>
  </tr>
  <tr>
    <td>5000</td>
    <td>Logstash</td>
  </tr>
  <tr>
    <td>5432</td>
    <td>PostgreSQL</td>
  </tr>
  <tr>
    <td>5701</td>
    <td>Hazelcast</td>
  </tr>
  <tr>
    <td>7742</td>
    <td>Swagger Editor</td>
  </tr>
  <tr>
    <td>8080</td>
    <td>JHipster應用程式後端開發連接埠（Spring Boot伺服器）</td>
  </tr>
  <tr>
    <td>8081</td>
    <td>JHipster微服務預設連接埠</td>
  </tr>
  <tr>
    <td>8091</td>
    <td>Couchbase - Web管理連接埠</td>
  </tr>
  <tr>
    <td>8092</td>
    <td>Couchbase - API 連接埠</td>
  </tr>
  <tr>
    <td>8093</td>
    <td>Couchbase - 查詢服務用於REST/HTTP通訊</td>
  </tr>
  <tr>
    <td>8180</td>
    <td>Hazelcast管理中心</td>
  </tr>
  <tr>
    <td>8301</td>
    <td>Consul - serflan-tcp 和 serflan-udp</td>
  </tr>
  <tr>
    <td>8302</td>
    <td>Consul - serfwan-tcp 和 serfwan-udp</td>
  </tr>
  <tr>
    <td>8300</td>
    <td>Consul - server</td>
  </tr>
  <tr>
    <td>8400</td>
    <td>Consul - RPC</td>
  </tr>
  <tr>
    <td>8500</td>
    <td>Consul - Web UI的HTTP連接埠</td>
  </tr>
  <tr>
    <td>8600</td>
    <td>Consul - DNS</td>
  </tr>
  <tr>
    <td>8761</td>
    <td>JHipster Registry (Netflix Eureka)</td>
  </tr>
  <tr>
    <td>9000</td>
    <td>帶有BrowserSync的JHipster前端開發連接埠</td>
  </tr>
  <tr>
    <td>9001</td>
    <td>SonarQube</td>
  </tr>
  <tr>
    <td>9042</td>
    <td>Cassandra - CQL</td>
  </tr>
  <tr>
    <td>9060</td>
    <td>帶Webpack熱載入功能的JHipster前端開發連接埠</td>
  </tr>
  <tr>
    <td>9090</td>
    <td>Prometheus</td>
  </tr>
  <tr>
    <td>9092</td>
    <td>Kafka</td>
  </tr>
  <tr>
    <td>9093</td>
    <td>Prometheus 警報管理器</td>
  </tr>
  <tr>
    <td>9160</td>
    <td>Cassandra - Thrift</td>
  </tr>
  <tr>
    <td>9200</td>
    <td>Elasticsearch - HTTP連線 (REST API)</td>
  </tr>
  <tr>
    <td>9300</td>
    <td>Elasticsearch - 傳輸連線 (native API)</td>
  </tr>
  <tr>
    <td>9411</td>
    <td>Zipkin</td>
  </tr>
  <tr>
    <td>11210</td>
    <td>Couchbase - 內部/外部桶連接埠</td>
  </tr>
  <tr>
    <td>18080</td>
    <td>H2 (嵌入式資料庫) 在單體應用內部執行。預設連接埠通常為9092，但這會與Kafka發生衝突，因此修正為`1`+`Spring Boot連接埠`</td>
  </tr>
  <tr>
    <td>18081</td>
    <td>H2 (嵌入式資料庫) 在微服務中執行。有關更多訊息，請參見上面的行</td>
  </tr>
  <tr>
    <td>27017</td>
    <td>MongoDB</td>
  </tr>
</table>
