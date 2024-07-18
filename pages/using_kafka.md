---
layout: default
title: 使用Kafka
permalink: /using-kafka/
redirect_from:
  - /using_kafka.html
sitemap:
    priority: 0.7
    lastmod: 2016-09-22T00:00:00-00:00
---

# <i class="fa fa-envelope"></i> 使用Kafka

## 細節

[Kafka](http://kafka.apache.org/)是一個流行的發布-訂閱訊息系統。JHipster對Kafka具有可選支援，它將：

- 使用JHipster設定[Kafka clients](https://docs.confluent.io/5.3.1/clients/consumer.html#java-client)。
- 在`application-*.yml`檔案中新增必要的設定。
- 生成Docker Compose設定檔案，只需輸入`docker-compose -f src/main/docker/kafka.yml up -d`，即可使用Kafka。

## 必備條件

生成一個新的應用程式，並確保在提示您要使用的技術時，選擇`Asynchronous messages using Apache Kafka`。 一個Docker Compose設定檔案將被生成，您可以使用以下指令啟動Kafka：

`docker-compose -f src/main/docker/kafka.yml up -d`

## 消費者和生產者

消費者(`<appName>KafkaConsumer` class) 正在執行，可以適應您的需求。
生產者(`<appName>KafkaProducer` class) 也是可用的，並且可以透過REST端點（`<appName> KafkaResource class`）進行呼叫。

## 執行應用

在`SecurityConfiguration.java`設定中允許訪問的端點：

`.antMatchers("/api/<appName>-kafka/publish").permitAll()`

如果您呼叫端點`http://localhost:8080/api/<appName>-kafka/publish?message=...`, 則應該看到記錄到控制台的訊息。

