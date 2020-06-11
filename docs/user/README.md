## User API

|         |             |
| ------- | ----------- |
| Base    | `/api/user` |
| Version | `.V2`       |

## `POST /api/user`

> Description: Create a user

### **Query Parameters**

| Required | Paramenters   | Default | Description           | Format   |
| -------- | ------------- | ------- | --------------------- | -------- |
| x        | `username`    | -       | Username of a user    | `string` |
| x        | `password`    | -       | Password of a user    | `string` |
| x        | `firstname`   | -       | Firstname of a user   | `string` |
| x        | `lastname`    | -       | Lastname of a user    | `string` |
|          | `nationality` | -       | Nationality of a user | `string` |
|          | `pc`          | -       | Postal Code of a user | `nnnnss` |

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
        "firstname": "***",
        "lastname": "***",
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
| x        | `_id`         | -       | ID of a user          | `int`    |
| x        | `username`    | -       | Username of a user    | `string` |
| x        | `password`    | -       | Password of a user    | `string` |
| x        | `firstname`   | -       | Firstname of a user   | `string` |
| x        | `lastname`    | -       | Lastname of a user    | `string` |
| x        | `nationality` | -       | Nationality of a user | `string` |
| x        | `pc`          | -       | Postal Code of a user | `nnnnss` |

### **Example**

```js
let data = JSON.stringify({
  _id: { value },
  username: { value },
  password: { value },
  firstname: { value },
  lastname: { value },
  nationality: { value },
  pc: { value },
});
axios
  .put(apiURL + "/user", data, {
    headers: {
      "Content-Type": "application/json",
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
    "nationality": "***",
    "pc": "***",
  },
  "token": "..."
}
```

## `DELETE /api/user`

> Description: Delete a user `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description  | Format |
| -------- | ----------- | ------- | ------------ | ------ |
| x        | `_id`       | -       | ID of a user | `int`  |

### **Example**

```js
let data = JSON.stringify({
  _id: { value },
});
axios
  .delete(apiURL + "/user", data, {
    headers: {
      "Content-Type": "application/json",
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

STATUS 410
{
    "status": 410
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
let data = JSON.stringify({
  _id: { value },
});
axios
  .get(apiURL + "/user", data, {
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
    "firstname": "***",
    "lastname": "***",
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
let data = JSON.stringify({
  username: { value },
  password: { value },
});
axios
  .post(apiURL + "/user/auth", data, {
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

STATUS 200
{
  "status": 200,
  "token": "..."
}
```
