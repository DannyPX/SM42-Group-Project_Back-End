## User API

|         |             |
| ------- | ----------- |
| Base    | `/api/user` |
| Version | `.V3`       |

## `POST /api/user`

> Description: Create a user

### **Query Parameters**

| Required | Paramenters   | Default | Description           | Format   |
| -------- | ------------- | ------- | --------------------- | -------- |
| x        | `username`    | -       | Username of a user    | `string` |
| x        | `password`    | -       | Password of a user    | `string` |
| x        | `firstname`   | -       | Firstname of a user   | `string` |
| x        | `lastname`    | -       | Lastname of a user    | `string` |
|          | `bio`         | -       | Bio of a user         | `string` |
|          | `nationality` | -       | Nationality of a user | `string` |
|          | `pc`          | -       | Postal Code of a user | `nnnnss` |

### **Example**

```js
let data = qs.stringify({
  username: { value },
  password: { value },
  name: { value },
  pc: { value },
});
axios
  .post(apiURL + "/user", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  .then((response) => {
    // Your code
  })
  .catch((error) => {
    // Error handling
  });
```

```json
RESPONSE

STATUS 201
{
    "status": 201,
    "user": {
        "_id": "***",
        "username": "***",
        "firstname": "***",
        "lastname": "***",
        "bio": "***",
        "nationality": "***",
        "pc": "***",
    }
}
```

## `GET /api/user`

> Description: Get all users

### **Query Parameters**

| Required | Paramenters | Default | Description | Format |
| -------- | ----------- | ------- | ----------- | ------ |


### **Example**

```js
axios
  .get(apiURL + "/user")
  .then((response) => {
    // Your code
  })
  .catch((error) => {
    // Error handling
  });
```

```json
RESPONSE

STATUS 200
{
  "status": 200,
  "users": [
    {
      "_id": "***",
      "username": "***",
      "firstname": "***",
      "lastname": "***",
      "bio": "***",
      "nationality": "***",
      "pc": "***",
    },
    {
      ...
    }
  ]
}
```

## `PUT /api/user`

> Description: Update a user `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters   | Default | Description           | Format   |
| -------- | ------------- | ------- | --------------------- | -------- |
|          | `username`    | -       | Username of a user    | `string` |
|          | `password`    | -       | Password of a user    | `string` |
|          | `firstname`   | -       | Firstname of a user   | `string` |
|          | `lastname`    | -       | Lastname of a user    | `string` |
|          | `bio`         | -       | Bio of a user         | `string` |
|          | `nationality` | -       | Nationality of a user | `string` |
|          | `pc`          | -       | Postal Code of a user | `nnnnss` |

### **Example**

```js
let data = qs.stringify({
  username: { value },
  password: { value },
  firstname: { value },
  lastname: { value },
  bio: { value },
  nationality: { value },
  pc: { value },
});
axios
  .put(apiURL + "/user", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    // Your code
  })
  .catch((error) => {
    // Error handling
  });
```

```json
RESPONSE

STATUS 201
{
  "status": 201,
  "user": {
    "_id": "***",
    "username": "***",
    "firstname": "***",
    "lastname": "***",
    "bio": "***",
    "nationality": "***",
    "pc": "***",
  },
  "token": "..."
}
```

## `DELETE /api/user`

> Description: Delete a user `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description | Format |
| -------- | ----------- | ------- | ----------- | ------ |


### **Example**

```js
axios
  .delete(apiURL + "/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    // Your code
  })
  .catch((error) => {
    // Error handling
  });
```

```json
RESPONSE

STATUS 204
{
    "status": 204
}
```

## `GET /api/user`

> Description: Get one user

### **Query Parameters**

| Required | Paramenters | Default | Description  | Format |
| -------- | ----------- | ------- | ------------ | ------ |
| x        | `_id`       | -       | ID of a user | `int`  |

### **Example**

```js
let data = qs.stringify({
  _id: { value },
});
axios
  .get(apiURL + "/user", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  .then((response) => {
    // Your code
  })
  .catch((error) => {
    // Error handling
  });
```

```json
RESPONSE

STATUS 201
{
  "status": 201,
  "user": {
    "_id": "***",
    "username": "***",
    "firstname": "***",
    "lastname": "***",
    "bio": "***",
    "nationality": "***",
    "pc": "***",
  }
}
```

## `GET /api/user/me`

> Description: Get your user

### **Query Parameters**

| Required | Paramenters | Default | Description | Format |
| -------- | ----------- | ------- | ----------- | ------ |


### **Example**

```js
axios
  .get(apiURL + "/user/me")
  .then((response) => {
    // Your code
  })
  .catch((error) => {
    // Error handling
  });
```

```json
RESPONSE

STATUS 201
{
  "status": 201,
  "user": {
    "_id": "***",
    "username": "***",
    "firstname": "***",
    "lastname": "***",
    "bio": "***",
    "nationality": "***",
    "pc": "***",
  }
}
```

## `POST /api/user/auth`

> Description: Authenticate a user

### **Query Parameters**

| Required | Paramenters | Default | Description        | Format   |
| -------- | ----------- | ------- | ------------------ | -------- |
| x        | `username`  | -       | Username of a user | `string` |
| x        | `password`  | -       | Password of a user | `string` |

### **Example**

```js
let data = qs.stringify({
  username: { value },
  password: { value },
});
axios
  .post(apiURL + "/user/auth", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  .then((response) => {
    // Your code
  })
  .catch((error) => {
    // Error handling
  });
```

```json
RESPONSE

STATUS 200
{
  "status": 200,
  "token": "..."
}
```
