---
layout: default
title: 如何建立一個新的許可權（Authority）
sitemap:
priority: 0.1
lastmod: 2018-10-05T18:20:00-00:00
---
# 如何建立一個新的許可權（Authority）

__送出者 [@Tonterias](https://github.com/Tonterias)__

假設除了給定的ADMIN和USER之外，您還需要一個新的許可權。

修改AuthoritiesConstants.java檔案以包括您的新許可權：

	/**
	 * Constants for Spring Security authorities.
	 */
	public final class AuthoritiesConstants {
	
	    public static final String ADMIN = "ROLE_ADMIN";
	
	    public static final String USER = "ROLE_USER";
	
	    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
	
	    private AuthoritiesConstants() {
	    }
	}

Do not forget to include your new role in your authorities.csv:

	name
	ROLE_ADMIN
	ROLE_USER
	ROLE_ANONYMOUS


這樣，您將可以在SecurityConfiguration.java或（FrontpageconfigResource.java）中使用它，例如：
	
	@DeleteMapping("/order-items/{id}")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteOrderItem(@PathVariable Long id) {
	    ...
	}

以及Angular檔案中，`jhiHasAnyAuthority=[「ROLE_ADMIN」. 「ROLE_X」 ……]`甚至路由檔案中使用它：

	export const messageRoute: Routes = [
	    {
	        path: 'message',
	        component: MessageComponent,
	        data: {
	            authorities: ['ROLE_USER'],
	            pageTitle: 'Messages'
	        },
	        canActivate: [UserRouteAccessService]
	    }
	];

開源範例位於JhipsterPress: https://github.com/Tonterias/JhipsterPress
