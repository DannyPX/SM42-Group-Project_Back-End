## Chat API

|         |             |
| ------- | ----------- |
| Base    | `/api/chat` |
| Version | `.V1`       |

## `POST /api/chat`

> Description: Create a chat `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters    | Default                    | Description            | Format   |
| -------- | -------------- | -------------------------- | ---------------------- | -------- |
| x        | `participants` | -                          | IDs of the participant | `Array`  |
|          | `chatname`     | firstnames of participants | Name of the chat       | `string` |

### **Example**

```js
let data = qs.stringify({
  participants: { value }
  chatname: { value }
})
axios
  .post(apiURL + "/chat", data , {
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

STATUS 200
{
"status": 200,
  "chats": [
    {
      "_id": "***",
      "chatname": "***",
      "participants": [
        {
          "_id": "***",
          "firstname": "***",
          "lastname": "***"
        },
        {
          "_id": "***",
          "firstname": "***",
          "lastname": "***"
        },
        ...
      ],
      "lastMessage": {
        "message": "***",
        "_id": "***",
        "date": "***"
      }
    },
    ...
  ]
}
```

## `PUT /api/chat`

> Description: Update chatname `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description      | Format   |
| -------- | ----------- | ------- | ---------------- | -------- |
| x        | `chatname`  | -       | Name of the chat | `string` |

### **Example**

```js
let data = qs.stringify({
  chatname: { value },
});
axios
  .put(apiURL + "/chat", data, {
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
  "chat": [
    {
      "chatname": "***",
    }
  ]
}
```

## `DELETE /api/chat`

> Description: Delete chat `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description | Format   |
| -------- | ----------- | ------- | ----------- | -------- |
| x        | `_id`       | -       | Chat ID     | `string` |

### **Example**

```js
let data = qs.stringify({
  _id: { value },
});
axios
  .delete(apiURL + "/chat", data, {
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

## `GET /api/chat`

> Description: Get chat by ID `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description | Format   |
| -------- | ----------- | ------- | ----------- | -------- |
| x        | `_id`       | -       | Chat ID     | `string` |

### **Example**

```js
let data = qs.stringify({
  _id: { value },
});
axios
  .get(apiURL + "/chat", data, {
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
  "chat": [
    {
      "_id": "***",
      "chatname": "***",
      "participants": [
        {
          "_id": "***",
          "firstname": "***",
          "lastname": "***"
        },
        ...
      ],
      "chatlog": [
        {
          "message": "***",
          "_id": "***",
          "date": "***"
        },
                {
          "message": "***",
          "_id": "***",
          "date": "***"
        },
        ...
      ]
    }
  ]
}
```

## `GET /api/chat/own`

> Description: Get own chats `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description | Format |
| -------- | ----------- | ------- | ----------- | ------ |


### **Example**

```js
axios
  .get(apiURL + "/chat", {
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
  "chats": [
    {
      "_id": "***",
      "chatname": "***",
      "participants": [
        {
          "_id": "***",
          "firstname": "***",
          "lastname": "***"
        },
        {
          "_id": "***",
          "firstname": "***",
          "lastname": "***"
        },
        ...
      ],
      "lastMessage": {
        "message": "***",
        "_id": "***",
        "date": "***"
      }
    },
    ...
  ]
}
```

## `POST /api/chat/message`

> Description: Send a message `[Needs Auth]`

### **Query Parameters**

| Required | Paramenters | Default | Description     | Format   |
| -------- | ----------- | ------- | --------------- | -------- |
| x        | `_id`       | -       | Chat ID         | `string` |
| x        | `message`   | -       | Message to send | `string` |

### **Example**

```js
let data = qs.stringify({
  _id: { value },
  message: { value },
});
axios
  .post(apiURL + "/chat", data, {
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
  "chat": [
    {
      "_id": "***",
      "chatname": "***",
      "participants": [
        {
          "_id": "***",
          "firstname": "***",
          "lastname": "***"
        },
        ...
      ],
      "chatlog": [
        {
          "message": "***",
          "_id": "***",
          "date": "***"
        },
                {
          "message": "***",
          "_id": "***",
          "date": "***"
        },
        ...
      ]
    }
  ]
}
```
