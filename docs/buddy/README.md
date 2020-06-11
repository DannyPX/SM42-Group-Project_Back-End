## Buddy API

|         |              |
| ------- | ------------ |
| Base    | `/api/buddy` |
| Version | `.V1`        |

## `POST /api/buddy/card`

> Description: Create a card `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters   | Default | Description                | Format                |
| -------- | ------------- | ------- | -------------------------- | --------------------- |
| x        | `_sender`     | -       | User ID of the creator     | `string`              |
| x        | `firstname`   | -       | Firstname of the user      | `string`              |
| x        | `lastname`    | -       | Lastname of the user       | `string`              |
|          | `nationality` | -       | Nationality of the user    | `string`              |
|          | `bio`         | -       | Bio of the user            | `string`              |
| x        | `title`       | -       | Title of the card          | `string`              |
| x        | `text`        | -       | Description of the problem | `string`              |
| x        | `type`        | -       | Type of the problem        | `"task" | "question"` |

### **Example**

```js
let data = JSON.stringify({
  _sender: { value },
  firstname: { value },
  lastname: { value },
  nationality: { value },
  bio: { value },
  title: { value },
  text: { value },
  type: { value },
});
axios
  .post(apiURL + "/buddy/card", data, {
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
    "_sender": "***",
    "firstname": "***",
    "lastname": "***",
    "nationality": "***",
    "bio": "***",
    "title": "***",
    "text": "***",
    "type": "***",
  }
}
```

## `GET /api/buddy/card`

> Description: Get all cards

### **Query Parameters**

| Required | Paramenters | Default | Description | Format |
| -------- | ----------- | ------- | ----------- | ------ |


### **Example**

```js
axios
  .get(apiURL + "/buddy/card")
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
  "cards": [
    {
      "_id": "***",
      "_sender": "***",
      "firstname": "***",
      "lastname": "***",
      "nationality": "***",
      "bio": "***",
      "title": "***",
      "text": "***",
      "type": "***",
    },
    {
      ...
    }
  ]
}
```

## `PUT /api/buddy/card`

> Description: Update a user `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters   | Default | Description                | Format                |
| -------- | ------------- | ------- | -------------------------- | --------------------- |
| x        | `_id`         | -       | ID of a user               | `int`                 |
| x        | `_sender`     | -       | User ID of the creator     | `string`              |
| x        | `firstname`   | -       | Firstname of the user      | `string`              |
| x        | `lastname`    | -       | Lastname of the user       | `string`              |
| x        | `nationality` | -       | Nationality of the user    | `string`              |
| x        | `bio`         | -       | Bio of the user            | `string`              |
| x        | `title`       | -       | Title of the card          | `string`              |
| x        | `text`        | -       | Description of the problem | `string`              |
| x        | `type`        | -       | Type of the problem        | `"task" | "question"` |

### **Example**

```js
let data = JSON.stringify({
  _id: { value },
  _sender: { value },
  firstname: { value },
  lastname: { value },
  nationality: { value },
  bio: { value },
  title: { value },
  text: { value },
  type: { value },
});
axios
  .put(apiURL + "/buddy/card", data, {
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
  "card": {
      "_id": "***",
      "_sender": "***",
      "firstname": "***",
      "lastname": "***",
      "nationality": "***",
      "bio": "***",
      "title": "***",
      "text": "***",
      "type": "***",
    }
}
```

## `DELETE /api/buddy/card`

> Description: Delete a card `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description  | Format |
| -------- | ----------- | ------- | ------------ | ------ |
| x        | `_id`       | -       | ID of a card | `int`  |

### **Example**

```js
let data = JSON.stringify({
  _id: { value },
});
axios
  .delete(apiURL + "/buddy/card", data, {
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

## `GET /api/buddy/card`

> Description: Get one card

### **Query Parameters**

| Required | Paramenters | Default | Description  | Format |
| -------- | ----------- | ------- | ------------ | ------ |
| x        | `id`        | -       | ID of a card | `int`  |

### **Example**

```js
let data = JSON.stringify({
  _id: { value },
});
axios
  .get(apiURL + "/buddy/card", data, {
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
      "_sender": "***",
      "firstname": "***",
      "lastname": "***",
      "nationality": "***",
      "bio": "***",
      "title": "***",
      "text": "***",
      "type": "***",
    }
}
```
