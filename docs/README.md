# Local Buddy

> Version: `0.2`

> Author:

| Base name | URL                                         |
| --------- | ------------------------------------------- |
| API       | `https://local-buddy-sm.herokuapp.com/api`  |
| Docs      | `https://local-buddy-sm.herokuapp.com/docs` |

## API Sections

### User

|         |              |
| ------- | ------------ |
| Base    | `/api/user`  |
| Version | `.V2`        |
| Docs    | `/docs/user` |

| Request               | Description         |
| --------------------- | ------------------- |
| `POST /api/user`      | Create a user       |
| `GET /api/user`       | Get all users       |
| `PUT /api/user`       | Update a user       |
| `DELETE /api/user`    | Delete a user       |
| `GET /api/user`       | Get one user        |
| `POST /api/user/auth` | Authenticate a user |

### Buddy

|         |               |
| ------- | ------------- |
| Base    | `/api/buddy`  |
| Version | `.V1`         |
| Docs    | `/docs/buddy` |

| Request                         | Description                                               |
| ------------------------------- | --------------------------------------------------------- |
| `POST /api/buddy/card`          | Create a card                                             |
| `GET /api/buddy/card`           | Get all cards                                             |
| `PUT /api/buddy/card`           | Update a card                                             |
| `DELETE /api/buddy/card`        | Delete a card                                             |
| `GET /api/buddy/card`           | Get one card                                              |
| `POST /api/buddy/card/newcomer` | Accept and assign user that accepted the card to the card |
| `GET /api/buddy/chat`           | ???                                                       |
| `POST /api/buddy/chat`          | ???                                                       |

## Javascript Usage (no Auth requests)

### Axios

```js
let data = JSON.stringify({
  {parameterName}: {value}
});
axios
  .{typeRequest}(apiURL + "/{requestName}", data, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    // Your code
  })
  .catch(error => {
    // Error handling
  })
```

### Fetch

```js
fetch("apiURL" + "/{requestName}", {
  method: '{typeRequest}',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    {parameterName}: {value}
  })
})
.then(response => {
  // Your code
})
.catch(error => {
  // Error handling
})
```

## Version History

### `V0.1`

#### Changelog

- Added user docs `.V1`
  - Added requests
  - Added descriptions
  - Added parameters
  - Added mock response
- Added home docs
  - Added user section
  - Added JS examples
- Added express endpoints
  - Added user API
    - Added default response

### `V0.2`

#### Changelog

- Connect MongoDB
- Body request handlers instead of query
- Modified user docs `.V2`
  - Modified parameters
  - Modified examples responses
  - Modified JS examples
- Modified user API
  - Modified user Schemas
- Added TokenManager Authorization

### `V0.3`

#### Changelog

- Card Implementation
