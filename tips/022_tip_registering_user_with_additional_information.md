---
layout: default
title: 使用者註冊時附加其他訊息
sitemap:
priority: 0.5
lastmod: 2017-02-15T22:30:00-00:00
---

# 使用者註冊時附加其他訊息

__送出者 [@Paul-Etienne](https://github.com/Paul-Etienne)__

如果我們需要儲存的訊息比JHipster預設提供的訊息更多，則需要進行一些調整。

為了說明這一點，假設我們要儲存使用者的電話號碼。

## 與JHI_User建立一對一關係的新實體

新增預設JHipster使用者無法處理的訊息的最佳方法是，在透過一對一關係與其連結的新實體中使用聚合。

建立此實體後，我們將其稱為UserExtra，處理其ID的最佳方法是將其對映到JHI_User的ID。 這樣，我們的UserExtra將具有與使用者相同的ID，從而加速了不同的請求。
為此，您將需要使用@MapsId註解：

```
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "phone")
    private String phone;

    @OneToOne
    @MapsId
    private User user;
    ...

}
```

請注意，需要刪除ID上的@GeneratedValue註解。

## 更新註冊HTML頁面以考慮此更改

現在已經存在一個實體來儲存電話號碼，我們需要在登錄檔單中新增輸入以詢問使用者的電話號碼。

如此簡單，只需更新webapp/app/account/register/register.html以新增一個輸入欄位，該輸入欄位繫結到已經用於儲存基本訊息（vm.registerAccount）的變數：

```
<input class="form-control" id="phone" ng-model="vm.registerAccount.phone" placeholder="{{'global.form.phone.placeholder' | translate}}" />
```

## 更新 ManagedUserVM

來自java/com.mycompany.myapp/web/rest/AccountResource的registerAccount()方法接收註冊頁面的請求。
它的唯一引數是ManagedUserVM物件，該物件包含來自用戶端的vm.registerAccount變數中最初包含的訊息。

位於web/rest/vm中的ManagedUserVM類也必須進行更新，以便儲存用戶端傳送的電話號碼。 唯一要做的就是新增電話號碼屬性及其getter：

```
public class ManagedUserVM extends UserDTO {

    // Default attributes omitted for brevity

    private String phone;

    ...

    public String getPhone() {
        return phone;
    }

}
```

## 更新AccountResource中registerAccount()方法

現在，registerAccount()方法將接收一個ManagedUserVM物件，該物件還包含使用者的電話號碼。 剩下要做的就是將此電話號碼儲存到與JHipster使用者關聯的新UserExtra中。

為此，我們將把phone引數從UserService新增到createUser()方法中。 但首先，在registerAccount()中呼叫此函式的位置新增此引數：

```
public ResponseEntity<?> registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {

    HttpHeaders textPlainHeaders = new HttpHeaders();
    textPlainHeaders.setContentType(MediaType.TEXT_PLAIN);

    return userRepository.findOneByLogin(managedUserVM.getLogin().toLowerCase())
        .map(user -> new ResponseEntity<>("login already in use", textPlainHeaders, HttpStatus.BAD_REQUEST))
        .orElseGet(() -> userRepository.findOneByEmail(managedUserVM.getEmail())
            .map(user -> new ResponseEntity<>("e-mail address already in use", textPlainHeaders, HttpStatus.BAD_REQUEST))
            .orElseGet(() -> {
                User user = userService
                    .createUser(managedUserVM.getLogin(), managedUserVM.getPassword(),
                        managedUserVM.getFirstName(), managedUserVM.getLastName(),
                        managedUserVM.getEmail().toLowerCase(), managedUserVM.getLangKey(),
                        managedUserVM.getPhone());

                mailService.sendActivationEmail(user);
                return new ResponseEntity<>(HttpStatus.CREATED);
            })
    );
}
```

## 更新UserService中的createUser()方法

最後，我們更新了儲存JHI_User的服務層功能，現在也儲存了UserExtra。建議您使用其他引數來建立一個新方法，而不是更新現有方法。

不要忘記注入UserExtra的Repository：

```
@Inject
private UserExtraRepository userExtraRepository;

@Inject
private UserExtraSearchRepository userExtraSearchRepository;

...

public User createUser(String login, String password, String firstName, String lastName, String email,
                           String langKey, String phone) {

    User newUser = new User();
    Authority authority = authorityRepository.findOne(AuthoritiesConstants.USER);
    Set<Authority> authorities = new HashSet<>();
    String encryptedPassword = passwordEncoder.encode(password);
    newUser.setLogin(login);
    // new user gets initially a generated password
    newUser.setPassword(encryptedPassword);
    newUser.setFirstName(firstName);
    newUser.setLastName(lastName);
    newUser.setEmail(email);
    newUser.setLangKey(langKey);
    // new user is not active
    newUser.setActivated(false);
    // new user gets registration key
    newUser.setActivationKey(RandomUtil.generateActivationKey());
    authorities.add(authority);
    newUser.setAuthorities(authorities);
    userRepository.save(newUser);
    userSearchRepository.save(newUser);
    log.debug("Created Information for User: {}", newUser);

    // Create and save the UserExtra entity
    UserExtra newUserExtra = new UserExtra();
    newUserExtra.setUser(newUser);
    newUserExtra.setPhone(phone);
    userExtraRepository.save(newUserExtra);
    userExtraSearchRepository.save(newUserExtra);
    log.debug("Created Information for UserExtra: {}", newUserExtra);

    return newUser;
}
```

完成了！
