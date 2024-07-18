---
layout: default
title: 依賴漏洞檢查
permalink: /dependency-vulnerabities-check/
sitemap:
    priority: 0.7
    lastmod: 2018-09-15T19:00:00-00:00
---

# <i class="fa fa-check-circle-o"></i> 依賴漏洞檢查

## 為什麼要檢查專案依賴項

JHipster使用了許多技術，該專案在選擇它們時非常謹慎。但是，也許專案錯過了這麼多依賴項中的一個漏洞，或者您新增或更新了一個觸發新漏洞的依賴項。

根據[OWASP十大最關鍵的Web應用程式安全風險](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project)，使用具有已知漏洞的元件（即，依賴項）排名第9，並且（由惡意的或不由第三方的）依賴項提供了許多已知的安全漏洞。

## 為什麼JHipster預設不提供依賴項檢查

在JHipster建立中提出預設情況下的依賴項檢查已經討論了幾次（[#6329](https://github.com/jhipster/generator-jhipster/issues/6329), [#8191](https://github.com/jhipster/generator-jhipster/issues/8191)）。總而言之，擁有一份現實的報告（消除誤報）和上下文相關依賴（確保安全始終是在實際風險/批評與努力預防之間的權衡）是很複雜的。

但是，如果您在生產中使用JHipster，我們強烈建議使用諸如[Dependabot](https://dependabot.com/)或[Snyk](https://snyk.io/)之類的依賴分析工具。

## 如果在JHipster的一個依賴項中檢測到漏洞，該怎麼辦

如果您在JHipster的一個依賴項中發現了漏洞，請檢查該漏洞是否在[issue](https://github.com/jhipster/generator-jhipster/issues)存在。

如果未提及任何漏洞相關內容，請私下向我們傳送安全漏洞報告。請閱讀有關如何漏洞的[安全政策](https://github.com/jhipster/generator-jhipster/security/policy)。包括重現漏洞利用，安全報告，部落格文章等等步驟。

確保JHipster團隊致力於提供高質量，企業級且安全的開發架構，並且此問題將是我們的重中之重。

# 如何檢查JHipster專案的依賴關係

## 在服務器端檢查

要檢查Java依賴項是否具有已知的常見漏洞和披露（aka. CVE），請訪問[NIST國家漏洞資料庫](https://nvd.nist.gov/)，該資料庫維護了最新清單。

OWASP專案提供了Maven和Gradle外掛來自動檢查整個依賴鏈，生成報告甚至阻止建立（不建議這樣做，在進行持續整合時會非常激進）。

[如何閱讀依賴性檢查報告文件](https://jeremylong.github.io/DependencyCheck/general/thereport.html).

### 使用Maven

請參閱[OWASP Maven Dependency Check外掛文件](https://jeremylong.github.io/DependencyCheck/dependency-check-maven/index.html)

新增owasp依賴項檢查外掛：
```
<build>
...
  <plugins>
  ...
  <plugin>
      <groupId>org.owasp</groupId>
      <artifactId>dependency-check-maven</artifactId>
      <version>5.2.4</version>
      <executions>
        <execution>
          <goals>
            <goal>check</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  ..
  </plugins>
  ...
</build>
```

執行`./mvnw verify`將在`target`目錄下生成一個依賴項檢查報告。

### 使用Gradle

請參閱[OWASP Gradle依賴檢查外掛文件](https://jeremylong.github.io/DependencyCheck/dependency-check-gradle/index.html)

更新`build.gradle`檔案以應用[OWASP依賴項檢查外掛](https://plugins.gradle.org/plugin/org.owasp.dependencycheck)。

```
plugins {
  // 新增外掛在現有外掛模組
  id "org.owasp.dependencycheck" version "5.2.4"

}

if(project.hasProperty('strict-security')) {
  check.dependsOn dependencyCheckAnalyze
}
```

執行`./gradlew dependencyCheckAnalyze`在`build/report`目錄中生成一個依賴項檢查報告。

透過執行`./gradlew check -Pstrict-security`，可以透過依賴性檢查來更新持續整合建立。

## 在前端檢查

從版本6開始，預設情況下，NPM包括針對每個依賴項安裝的安全稽核。檢視[關於安全稽核](https://docs.npmjs.com/getting-started/running-a-security-audit)頁面以獲取更多訊息。
