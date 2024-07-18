---
layout: default
title: 使用DTO
permalink: /using-dtos/
redirect_from:
  - /using_dtos.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-28T23:41:00-00:00
---

# <i class="fa fa-briefcase"></i> 使用DTO

## 介紹

預設情況下，JHipster直接在其REST端點中使用其Domain物件（通常是JPA實體）。
這有很多好處，主要的好處是程式碼包含更少的層，因此更易於理解。

但是，對於複雜的用例，您可能需要在REST端點使用對外部公開的數據傳輸物件（DTO）。這些物件在Domain物件之上新增了一個額外的層，並且專門針對REST層進行了調整：它們的主要好處是它們可以聚合多個Domain物件。

## DTO在JHipster中的工作方式

生成JHipster實體時，您可以選擇是否新增服務層：但是DTO選項僅在選擇使用服務層時才可用，因為它需要該層來處理對映（如果使用的是JPA，這是因為服務層是事務性的，所以可以進行延遲載入）。

選擇使用服務層後，您將可以選擇為實體生成對應DTO。如果選擇該選項，將會：

- 將生成一個DTO，並將其對映到底層實體上。
- 它將僅使用ID用於在前端（例如，Angular）的顯示欄位，來聚合多對一的關係。最後情況是，與`User`實體的多對一關係，將向DTO新增一個`userId`欄位和一個`userLogin`欄位。
- 它將忽略非所有者側的一對多關係和多對多關係：這與實體的工作方式對應（它們在這些欄位上具有`@JsonIgnore`註解）。
- 對於所有者方面的多對多關係：它將使用其他實體的DTO，並在`Set`中使用它們。因此，這僅在其他實體也使用DTO的情況下才有效。

## 使用MapStruct對映DTO和實體

由於DTO看起來很像實體，因此經常需要一種解決方案來自動相互對映。

在JHipster中選擇的解決方案是使用[MapStruct](http://mapstruct.org/)。這是一個插入Java編譯器的註解處理器，它將自動生成所需的對映。

我們發現它非常乾淨和高效，並且喜歡它不使用反射（當像在mapper中一樣頻繁使用時，這對效能不利）。

## 為MapStruct設定IDE

MapStruct是一個註解處理器，因此，它應該被設定為在IDE編譯專案時自動執行。

如果使用的是Maven，則需要在IDE中啟用`IDE`maven設定檔案。Gradle使用者不需要設定任何特定於IDE的東西。

設定檔案啟用的指引可以參考[設定IDE]({{ site.url }}/configuring-ide/)。

## MapStruct高階用法

MapStruct對映器設定為Spring Bean，並支援依賴注入。一個不錯友情提示，您可以將`Repository`注入到對映器中，以便可以使用其ID從對映器中獲取託管JPA實體。

這是獲取`User`實體的範例程式碼：

    @Mapper
    public abstract class CarMapper {

        @Inject
        private UserRepository userRepository;

        @Mapping(source = "user.id", target = "userId")
        @Mapping(source = "user.login", target = "userLogin")
        public abstract CarDTO carToCarDTO(Car car);

        @Mapping(source = "userId", target = "user")
        public abstract Car carDTOToCar(CarDTO carDTO);

        public User userFromId(Long id) {
            if (id == null) {
                return null;
            }
            return userRepository.findOne(id);
        }
    }
