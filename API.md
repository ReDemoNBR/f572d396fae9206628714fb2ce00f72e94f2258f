# API Docs

## **SUMMARY**
-   [Service](#service)
-   [Endpoints](#endpoints)
    -   [User](#user-routes)
    -   [Item](#item-routes)
    -   [Sale](#sale-routes)


## **SERVICE**
Every response of this service appends a header to identify the API version. This way, the client application or any system
integrating this API service can modify its own internal procedures to avoid related to this version.

There is also a standard error message shown to any address that is not matched in the router.



## **ENDPOINTS**
Some endpoints require authentication via `Authentication` request header. You can get an authentication token by login an
account via POST `/user/login`.  
Some routes for listing objects can be paginated with `limit` and `offset` query parameters. They also support an `order`
parameter to select how to order by.

All `POST` and `PUT` request body contents must be `application/json` MIME type.




### User
Any request can create, list users, read user public information and login. The other routes, like for updating, logout and
removing users require authorization via `Authorization` header.

#### **POST** `/user/`
Create a new user. The `login` must be unique.
-   `login`: Unique login name of the user
-   `password`: Password to login the user
-   `firstName`: (optional) First name of the user
-   `lastName`: (optional) Last name of the user

```shell
POST /user/
{
    "login": "SanMonico",
    "password": "sekritpass",
    "firstName": "Alanderson",
    "lastName": "Mônico"
}
```

#### **POST** `/user/login`
Login user via `login` and `password`. The response contains an `Authorization` header with the access token that
can be used in authenticated routes. Also, for compatibility purposes, the token is also returned in the response body
-   `login`: Unique login name of the user
-   `password`: Password to login the user

```shell
POST /user/login
body: {
    "login": "SanMonico",
    "password": "sekritpass"
}
```

#### **GET** `/user/`
Lists all users. Accepts 3 optional query parameters:
-   `limit`: Maximum number of objects to return
-   `offset`: Number of objects to offset. Good when used in conjunction with `limit` to paginate
-   `order`: Order by parameter. Can be one of the following: `id`, `login`, `firstName`, `lastName`

Example:
```shell
GET /user/?limit=10&offset=0&order=id
```

#### **GET** `/user/:id`
Lists user public information, including items he is trying to sell.

Example:
```shell
GET /user/4
```

#### **GET** `/user/whoami`
Identify the logged in user via access token. The `Authorization` token must include the access token.

#### **PUT** `/user/:id`
Update user information. The user must be authenticated for this. Only the `firstName` and `lastName` can be updated.  
**Warning**: If one of the properties is not set in the request body, then it will be emtpied by the service
-   `firstName`: (optional) First name of the user
-   `lastName`: (optional) Last name of the user.

Example:
```shell
PUT /user/4
body: {
    "firstName": "Alanderson",
    "lastName": "Mônico"
}
```

#### **DELETE** `/user/logout`
Remove all access tokens of the authenticated user so it logs out from every device

Example:
```shell
DELETE /user/logout
```

#### **DELETE** `/user/:id`
Remove all access tokens of the authenticated user and the user data.

Example:
```shell
DELETE /user/4
```

---

### Item
Anyone, authenticated or not, can use the REST API for managing the Items

#### **POST** `/item/`
Create a new item
-   `name`: Name of the item
-   `alias`: (optional) Alias (queriable name) of the item. If it is not set, the API service will automatically
generate a `dash`-erized lower case version of the name
-   `description`: (optional) Description text of the item

Example:
```shell
POST /item/
body: {
    "name": "Lamborghini Murciélago SV LP670",
    "alias": "lambo-murci-sv",
    "description": "The return of the SuperVeloce moniker to bring the most amazing Italian car ever to the road"
}
```

#### GET `/item/`
Lists all supported items. Accepts 3 optional query parameters:
-   `limit`: Maximum number of objects to return
-   `offset`: Number of objects to offset. Good when used in conjunction with `limit` to paginate
-   `order`: Order by parameter. Can be one of the following: `id`, `name`, `alias`

Example:
```shell
GET /item/?limit=20&offset=0&order=alias
```

#### **GET** `/item/:id`
Lists item information, including items the maximum and minimum prices and quantities in stock availables.

Example:
```shell
GET /item/2
```

### **PUT** `/item/:id`
Update item information. Only the `name`, `alias` and `description` can be updated.  
**Warning**: If one of the properties is not set in the request body, then it will be emtpied by the service
-   `name`: Name of the item
-   `alias`: (optional) Alias (queriable name) of the item. If it is not set, the API service will automatically
generate a `dash`-erized lower case version of the name
-   `description`: (optional) Description text of the item

Example:
```shell
PUT /item/13
body: {
    "name": "Ferrari Testarossa",
    "description": "The most iconic Ferrari ever"
}
```

#### **DELETE** `/item/:id`
Remove this item and every sale list for it

Example:
```shell
DELETE /item/4
```

---

### Sale
Every sale route requires user authentication. These routes are to manage the items for sale of the authenticated user

#### **POST** `/sale/`
Create an item for sale in user account.
-   `itemId`: ID number of the item that authenticated user will put for sale
-   `quantity`: Number of items in stock
-   `price`: Price per unit

Example:
```shell
POST /sale/
body: {
    "itemId": 4,
    "quantity": 200,
    "price": 129.99
}
```

#### GET `/sale/`
Lists all items for sale of authenticated. Accepts 3 optional query parameters:
-   `limit`: Maximum number of objects to return
-   `offset`: Number of objects to offset. Good when used in conjunction with `limit` to paginate
-   `order`: Order by item parameter. Can be one of the following: `id`, `name`, `alias`

Example:
```shell
GET /sale/?limit=20&offset=10&order=id
```

#### **GET** `/sale/:itemId`
Lists item for sale information, including the item and user information

Example:
```shell
GET /sale/2
```

### **PUT** `/sale/:itemId`
Update item for sale information. Only the `quantity` and `price` can be updated.
-   `quantity`: Name of the item
-   `price`: Price per unit

Example:
```shell
PUT /item/13
body: {
    "quantity": 300,
    "price": 20199.99
}
```

#### **DELETE** `/sale/:itemId`
Remove this item from sale.

Example:
```shell
DELETE /sale/4
```
