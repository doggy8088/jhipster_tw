---
layout: default
title: 靜態API文件
sitemap:
priority: 0.5
lastmod: 2015-07-31T18:40:00-00:00
---

# 帶有Swagger2Markup的靜態API文件

__送出者 [@atomfrede](https://github.com/atomfrede)__

> 您應該使用新的 [swagger2markup](https://github.com/atomfrede/generator-jhipster-swagger2markup) 模組，而不是遵循此提示！ 見 [JHipster Marketplace](https://www.jhipster.tech/modules/marketplace/) 有關模組系統的詳細訊息。

如果要生成靜態API文件（並將其與手寫文件結合在一起），則[Swagger2Markup](https://swagger2markup.readme.io/) 提供了一種簡便的方法來組合由以下人員生成的自動生成的API文件：
將手寫文件，翻譯成HTML，PDF和EPUB格式的最新，易於閱讀的線上和離線使用者指南。

## 新增所需的依賴項，外掛和測試類

### Maven

將以下內容新增到您的專案依賴項中：

    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-staticdocs</artifactId>
        <version>${springfox.version}</version>
        <scope>test</scope>
    </dependency>

將以下內容新增到外掛部分：

    <plugin>
      <groupId>org.asciidoctor</groupId>
      <artifactId>asciidoctor-maven-plugin</artifactId>
      <version>1.5.2</version>
      <executions>
        <execution>
          <id>output-html</id>
          <phase>test</phase>
          <goals>
            <goal>process-asciidoc</goal>
          </goals>
          <configuration>
            <backend>html5</backend>
            <outputDirectory>${project.build.directory}/docs/html</outputDirectory>
          </configuration>
        </execution>
        <execution>
          <id>output-pdf</id>
          <phase>test</phase>
          <goals>
            <goal>process-asciidoc</goal>
          </goals>
          <configuration>
            <backend>pdf</backend>
            <outputDirectory>${project.build.directory}/docs/pdf</outputDirectory>
          </configuration>
        </execution>
      </executions>
      <dependencies>
        <dependency>
          <groupId>org.asciidoctor</groupId>
          <artifactId>asciidoctorj-pdf</artifactId>
          <version>1.5.0-alpha.8</version>
        </dependency>
      </dependencies>
      <configuration>
        <sourceDirectory>src/docs/asciidoc</sourceDirectory>
        <sourceDocumentName>index.adoc</sourceDocumentName>
        <attributes>
          <doctype>book</doctype>
          <toc>left</toc>
          <toclevels>2</toclevels>
          <generated>${project.build.directory}/docs/asciidoc/generated</generated>
        </attributes>
      </configuration>
    </plugin>

在 `src/test/rest`中建立一個名為 `Swagger2MarkupTest`的類：

    @RunWith(SpringJUnit4ClassRunner.class)
    @SpringApplicationConfiguration(classes = Application.class)
    @WebAppConfiguration
    @IntegrationTest
    public class Swagger2MarkupTest {

        private static final String API_URI = "/v2/api-docs";

        @Inject
        private WebApplicationContext context;

        private MockMvc mockMvc;

        private File projectDir;

        @Before
        public void setup() throws IOException {
            this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();

            ClassPathResource pathfileRes = new ClassPathResource("config/application.yml");
            projectDir = pathfileRes.getFile().getParentFile().getParentFile().getParentFile().getParentFile();
        }

        @Test
        public void convertSwaggerToAsciiDoc() throws Exception {
            Swagger2MarkupResultHandler.Builder builder = Swagger2MarkupResultHandler
                .outputDirectory(outputDirForFormat("asciidoc"));
            mockMvc.perform(get(API_URI).accept(APPLICATION_JSON))
                .andDo(builder.build())
                .andExpect(status().isOk());

        }

        private String outputDirForFormat(String format) throws IOException {
            return new File(projectDir, "target/docs/" + format + "/generated").getAbsolutePath();
        }
    }

### Gradle

將以下依賴項新增到您的專案依賴項中：

    testCompile group: 'io.springfox', name:'springfox-staticdocs', version: springfox_version

將以下內容新增到您的建立指令碼依賴項中：

    classpath 'org.asciidoctor:asciidoctor-gradle-plugin:1.5.2'
    classpath 'org.asciidoctor:asciidoctorj-pdf:1.5.0-alpha.8'

應用`asciidoctor convert`外掛：

    apply plugin: 'org.asciidoctor.convert'

新增以下內容以生成HTML和PDF：

    ext {
        generatedAsciidoc = file("${buildDir}/docs/asciidoc/generated")
    }

    asciidoctor {
        dependsOn test
        sources {
            include 'index.adoc'
        }
        backends = ['html5', 'pdf']
        attributes = [
            doctype: 'book',
            toc: 'left',
            toclevels: '2',
            numbered: '',
            sectlinks: '',
            sectanchors: '',
            hardbreaks: '',
            generated: generatedAsciidoc
        ]
    }

在`src/test/rest`中建立一個名為 `Swagger2MarkupTest`的測試類：

    @RunWith(SpringJUnit4ClassRunner.class)
    @SpringApplicationConfiguration(classes = Application.class)
    @WebAppConfiguration
    @IntegrationTest
    public class Swagger2MarkupTest {

        private static final String API_URI = "/v2/api-docs";

        @Inject
        private WebApplicationContext context;

        private MockMvc mockMvc;

        private File projectDir;

        @Before
        public void setup() throws IOException {
            this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();

            ClassPathResource pathfileRes = new ClassPathResource("config/application.yml");
            projectDir = pathfileRes.getFile().getParentFile().getParentFile().getParentFile().getParentFile();
        }

        @Test
        public void convertSwaggerToAsciiDoc() throws Exception {
            Swagger2MarkupResultHandler.Builder builder = Swagger2MarkupResultHandler
                .outputDirectory(outputDirForFormat("asciidoc"));
            mockMvc.perform(get(API_URI).accept(APPLICATION_JSON))
                .andDo(builder.build())
                .andExpect(status().isOk());

        }

        private String outputDirForFormat(String format) throws IOException {
            return new File(projectDir, "docs/" + format + "/generated").getAbsolutePath();
        }
    }

## 建立index.adoc檔案

使用以下內容在`src/docs/asciidoc`中建立`index.adoc`：

    include::{generated}/overview.adoc[]
    include::{generated}/paths.adoc[]
    include::{generated}/definitions.adoc[]

## 生成靜態文件

靜態文件是在專案的測試階段生成的。 您可以在`src/target/docs/html`或`build/asciidoc/html5`中找到它。

![Example documentation](../images/008_tips_static_swagger_docs_01.png)

## 更多

有關更多訊息（例如，如何新增手寫文件），請參見[官方參考文件](https://swagger2markup.readme.io/) 。
