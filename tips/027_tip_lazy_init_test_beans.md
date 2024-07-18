---
layout: default
title: 透過延遲bean初始化來提高整合測試效能
sitemap:
priority: 0.1
lastmod: 2019-10-01T18:20:00-00:00
---

# 透過延遲bean初始化來提高整合測試效能

__送出者 [@atomfrede](https://github.com/atomfrede)__

在許多Spring整合測試中，您不需要所有bean，因此可以在context中初始化所有bean，例如:不需要進行repository測試，這會浪費寶貴的時間。

您可以將測試設定為延遲初始化bean，這樣可以透過在`src/test/java/YOUR-PACKAGE/config`中建立類`TestLazyBeanInitConfiguration`來建立僅必需的bean，其內容如下：

```java
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Profile("!" + TestLazyBeanInitConfiguration.EAGER_BEAN_INIT)
public class TestLazyBeanInitConfiguration implements BeanFactoryPostProcessor {
    public static final String EAGER_BEAN_INIT = "eager-bean-init";

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        Arrays.stream(beanFactory.getBeanDefinitionNames())
            .map(beanFactory::getBeanDefinition)
            .forEach(beanDefinition -> beanDefinition.setLazyInit(true));
    }
}
```

如果您希望或者需要一個測試來初始化所有bean，則需要使用`@ActiveProfiles(TestLazyBeanInitConfiguration.EAGER_BEAN_INIT)`註解該測試。

可參考 [spring boot blog](https://spring.io/blog/2019/03/14/lazy-initialization-in-spring-boot-2-2) 和
[related pull request](https://github.com/jhipster/generator-jhipster/pull/10241).

謝謝 [@rabiori](https://github.com/rabiori) 的實現





