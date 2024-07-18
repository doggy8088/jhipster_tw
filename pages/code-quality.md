---
layout: default
title: 程式碼質量
permalink: /code-quality/
sitemap:
    priority: 0.7
    lastmod: 2018-08-18T12:40:00-00:00
---

# <i class="fa fa-diamond"></i> 程式碼質量

使用[SonarCloud](https://sonarcloud.io)（由JHipster自動設定）可以分析程式碼質量。

## 將Sonar與JHipster結合使用

JHipster為Sonar提供了特定的Docker Compose設定（[這是JHipster Docker Compose文件]({{ site.url }}/docker-compose/))），提供了現成的Sonar實例。在專案的根目錄下，請執行：

    docker-compose -f src/main/docker/sonar.yml up -d

如果您使用的是Maven，則會自動對其進行設定：

    ./mvnw -Pprod clean verify sonar:sonar -Dsonar.host.url=http://localhost:9001

如果您需要重新執行Sonar階段，請確保至少指定`initialize`階段，因為Sonar屬性是從sonar-project.properties檔案載入的。

    ./mvnw initialize sonar:sonar -Dsonar.host.url=http://localhost:9001

如果您使用Gradle，也會自動對其進行設定：

    ./gradlew -Pprod clean check jacocoTestReport sonarqube -Dsonar.host.url=http://localhost:9001

現在，在每種情況下，如果已經安裝了[sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner)，則都可以執行分析。

    sonar-scanner

分析完成後，它將在Sonar儀表板上可用，預設情況下在 [http://127.0.0.1:9001/](http://127.0.0.1:9001/)上可用。

## 從Jacoco Analysis中排除檔案

如果您希望從覆蓋率分析中排除某些類（例如，生成的類或應用程式類），並且想要在預設的jacoco html報告中具有正確的覆蓋率，則必須從分析和報告中排除這些類。

### Maven

您需要將排除項新增到`prepare-agent`和`report`單元測試和整合測試的目標中：

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>${jacoco-maven-plugin.version}</version>
    <executions>
        <execution>
            <id>pre-unit-tests</id>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from instrumentation -->
                <excludes>**/Application.*</excludes>
                <destFile>${jacoco.utReportFile}</destFile>
            </configuration>
        </execution>
        <execution>
            <id>post-unit-test</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from reporting-->
                <excludes>**/Application.*</excludes>
                <dataFile>${jacoco.utReportFile}</dataFile>
                <outputDirectory>${jacoco.reportFolder}</outputDirectory>
            </configuration>
        </execution>
        <execution>
            <id>pre-integration-tests</id>
            <goals>
                <goal>prepare-agent-integration</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from instrumentation -->
                <excludes>**/Application.*</excludes>
                <destFile>${jacoco.itReportFile}</destFile>
            </configuration>
        </execution>
        <execution>
            <id>post-integration-tests</id>
            <phase>post-integration-test</phase>
            <goals>
                <goal>report-integration</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from reporting-->
                <excludes>**/Application.*</excludes>
                <dataFile>${jacoco.itReportFile}</dataFile>
                <outputDirectory>${jacoco.reportFolder}</outputDirectory>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### Gradle

您可以將以下內容新增到`sonar.gradle`檔案中：

```gradle
test {
    jacoco {
        excludes += ['build/generated/**']
    }
}

jacocoTestReport {
    afterEvaluate {
        classDirectories = files(classDirectories.files.collect {
            fileTree(dir: it, exclude: [
                    '**/*_.class'
            ])
        })
    }
}
```

## 自動分析預設生成的專案

JHipster產生器專案發布一個範例專案，每次在`main`分支中合併新送出時都會對其進行分析：

[JHipster組織](https://sonarcloud.io/organizations/jhipster)下的[JHipster範例應用程式分析](https://sonarcloud.io/dashboard?id=jhipster-sample-application)

這使JHipster團隊可以確保您將開始使用儘可能最乾淨的程式碼來開發專案。

[SonarCloud](https://sonarcloud.io)免費提供此分析。