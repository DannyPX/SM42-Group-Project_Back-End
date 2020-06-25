## Buddy API

|         |              |
| ------- | ------------ |
| Base    | `/api/buddy` |
| Version | `.V2`        |

## `POST /api/buddy/card`

> Description: Create a card `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description                | Format                   |
| -------- | ----------- | ------- | -------------------------- | ------------------------ |
| x        | `title`     | -       | Title of the card          | `string`                 |
| x        | `text`      | -       | Description of the problem | `string`                 |
| x        | `type`      | -       | Type of the problem        | `"Request" - "Question"` |

### **Example**

```js
let data = qs.stringify({
  title: { value },
  text: { value },
  type: { value },
});
axios
  .post(apiURL + "/buddy/card", data, {
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
    "_sender": "***",
    "firstname": "***",
    "lastname": "***",
    "nationality": "***",
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

> Description: Update a card `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description                | Format                   |
| -------- | ----------- | ------- | -------------------------- | ------------------------ |
| x        | `_id`       | -       | ID of a card               | `int`                    |
| x        | `title`     | -       | Title of the card          | `string`                 |
| x        | `text`      | -       | Description of the problem | `string`                 |
| x        | `type`      | -       | Type of the problem        | `"Request" - "Question"` |

### **Example**

```js
let data = qs.stringify({
  _id: { value },
  title: { value },
  text: { value },
  type: { value },
});
axios
  .put(apiURL + "/buddy/card", data, {
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
  "card": {
      "_id": "***",
      "_sender": "***",
      "firstname": "***",
      "lastname": "***",
      "nationality": "***",
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
let data = qs.stringify({
  _id: { value },
});
axios
  .delete(apiURL + "/buddy/card", data, {
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

STATUS 204
{
    "status": 204
}
```

## `GET /api/buddy/card`

> Description: Get one card

### **Query Parameters**

| Required | Paramenters | Default | Description  | Format |
| -------- | ----------- | ------- | ------------ | ------ |
| x        | `_id`       | -       | ID of a card | `int`  |

### **Example**

```js
let data = qs.stringify({
  _id: { value },
});
axios
  .get(apiURL + "/buddy/card", data, {
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
      "_sender": "***",
      "firstname": "***",
      "lastname": "***",
      "nationality": "***",
      "title": "***",
      "text": "***",
      "type": "***",
    }
}
```

## `GET /api/buddy/card/own`

> Description: Get own cards `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description | Format |
| -------- | ----------- | ------- | ----------- | ------ |


### **Example**

```js
axios
  .get(apiURL + "/buddy/card/own", {
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

## `GET /api/buddy/card/other`

> Description: Get other cards `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description | Format |
| -------- | ----------- | ------- | ----------- | ------ |


### **Example**

```js
axios
  .get(apiURL + "/buddy/card/other", {
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

## `GET /api/buddy/card/accept`

> Description: Accept card `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description    | Format   |
| -------- | ----------- | ------- | -------------- | -------- |
| x        | `_id`       | -       | ID of the card | `string` |

### **Example**

```js
let data = qs.stringify({
  _id: { value },
  _acceptor: { value },
});
axios
  .put(apiURL + "/buddy/card/accept", data, {
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

## `GET /api/buddy/card/accepted`

> Description: Get accepted cards `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description | Format |
| -------- | ----------- | ------- | ----------- | ------ |


### **Example**

```js
axios
  .get(apiURL + "/buddy/card/other", {
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

STATUS 200
{
  "status": 200,
  "cards": [
    {
      "_id": "***",
      "_sender": "***",
      "_acceptor": "***",
      "firstname": "***",
      "lastname": "***",
      "nationality": "***",
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
