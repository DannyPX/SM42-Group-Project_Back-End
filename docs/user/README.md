## User API

|         |             |
| ------- | ----------- |
| Base    | `/api/user` |
| Version | `.V2`       |

## `POST /api/user{params}`

> Description: Create a user

### **Query Parameters**

| Required | Paramenters | Default | Description           | Format   |
| -------- | ----------- | ------- | --------------------- | -------- |
| x        | `username`  | -       | Username of a user    | `string` |
| x        | `password`  | -       | Password of a user    | `string` |
| x        | `name`      | -       | Name of a user        | `string` |
|          | `pc`        | -       | Postal Code of a user | `nnnnss` |

### **Example**

```js
let data = JSON.stringify({
  username: { value },
  password: { value },
  name: { value },
  pc: { value },
});
axios
  .post(apiURL + "/user", data, {
    headers: {
      "Content-Type": "application/json",
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
        "name": "***",
        "pc": "***"
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
let data = JSON.stringify({
  username: { value },
  password: { value },
  name: { value },
  pc: { value },
});
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
        "name": "***",
        "pc": "***"
      },
      {
        ...
      }
    ]
}
```

## `PUT /api/user{params}`

> Description: Update a user

### **Query Parameters**

| Required | Paramenters | Default | Description           | Format   |
| -------- | ----------- | ------- | --------------------- | -------- |
| x        | `id`        | -       | ID of a user          | `int`    |
|          | `username`  | -       | Username of a user    | `string` |
|          | `password`  | -       | Password of a user    | `string` |
|          | `name`      | -       | Name of a user        | `string` |
|          | `pc`        | -       | Postal Code of a user | `nnnnss` |

### **Example**

```js
let data = JSON.stringify({
  _id: { value },
  username: { value },
  password: { value },
  name: { value },
  pc: { value },
});
axios
  .put(apiURL + "/user", data, {
    headers: {
      "Content-Type": "application/json",
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
        "name": "***",
        "pc": "***"
    }
}
```

## `DELETE /api/user{params}`

> Description: Delete a user

### **Query Parameters**

| Required | Paramenters | Default | Description  | Format |
| -------- | ----------- | ------- | ------------ | ------ |
| x        | `id`        | -       | ID of a user | `int`  |

### **Example**

```js
let data = JSON.stringify({
  _id: { value },
});
axios
  .delete(apiURL + "/user", data, {
    headers: {
      "Content-Type": "application/json",
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

STATUS 410
{
    "status": 410
}
```

## `GET /api/user{params}`

> Description: Get one user

### **Query Parameters**

| Required | Paramenters | Default | Description  | Format |
| -------- | ----------- | ------- | ------------ | ------ |
| x        | `id`        | -       | ID of a user | `int`  |

### **Example**

```js
let data = JSON.stringify({
  _id: { value },
});
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
    "status": 201,
    "user": {
        "_id": "***",
        "username": "***",
        "name": "***",
        "pc": "***"
    }
}
```

## `POST /api/user/auth{params}`

> Description: Authenticate a user

### **Query Parameters**

| Required | Paramenters | Default | Description        | Format   |
| -------- | ----------- | ------- | ------------------ | -------- |
| x        | `username`  | -       | Username of a user | `string` |
| x        | `password`  | -       | Password of a user | `string` |

### **Example response**

> `POST .../api/user?username=TestUser&password=**********`

```json
{
  "status": null
}
```
