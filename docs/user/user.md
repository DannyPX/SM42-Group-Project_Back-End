## User API

|         |             |
| ------- | ----------- |
| Base    | `/api/user` |
| Version | `0.1.V1`    |

---

## `POST /api/user{params}`

> Description: Create a user

### **Query Parameters**

| Required | Paramenters | Default | Description           | Format     |
| -------- | ----------- | ------- | --------------------- | ---------- |
| x        | `username`  | -       | Username of a user    | `string`   |
| x        | `password`  | -       | Password of a user    | `string`   |
| x        | `name`      | -       | Name of a user        | `string`   |
|          | `pc`        | -       | Postal Code of a user | `nnnnss`   |
|          | `birthdate` | -       | Birthdate of a user   | `ddMMyyyy` |

### **Example response**

> `POST .../api/user?username=TestUser&password=**********&name=Danny`

```json
{
  "status": null
}
```

---

## `GET /api/user`

> Description: Get all users

### **Query Parameters**

| Required | Paramenters | Default | Description | Format |
| -------- | ----------- | ------- | ----------- | ------ |


### **Example response**

> `GET .../api/user`

```json
{
  "status": null
}
```

---

## `PUT /api/user{params}`

> Description: Update a user

### **Query Parameters**

| Required | Paramenters | Default | Description           | Format     |
| -------- | ----------- | ------- | --------------------- | ---------- |
| x        | `id`        | -       | ID of a user          | `int`      |
|          | `username`  | -       | Username of a user    | `string`   |
|          | `password`  | -       | Password of a user    | `string`   |
|          | `name`      | -       | Name of a user        | `string`   |
|          | `pc`        | -       | Postal Code of a user | `nnnnss`   |
|          | `birthdate` | -       | Birthdate of a user   | `ddMMyyyy` |

### **Example response**

> `PUT .../api/user?id=1&username=TestUserChange&birthdate=14031999`

```json
{
  "status": null
}
```

---

## `DELETE /api/user{params}`

> Description: Delete a user

### **Query Parameters**

| Required | Paramenters | Default | Description  | Format |
| -------- | ----------- | ------- | ------------ | ------ |
| x        | `id`        | -       | ID of a user | `int`  |

### **Example response**

> `DELETE .../api/user?id=1`

```json
{
  "status": null
}
```

---

## `GET /api/user{params}`

> Description: Get one user

### **Query Parameters**

| Required | Paramenters | Default | Description  | Format |
| -------- | ----------- | ------- | ------------ | ------ |
| x        | `id`        | -       | ID of a user | `int`  |

### **Example response**

> `GET .../api/user?id=1`

```json
{
  "status": null
}
```

---

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
