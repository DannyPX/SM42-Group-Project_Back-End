# Local Buddy

> Version: `0.4`

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
| Version | `.V3`        |
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
| Version | `.V2`         |
| Docs    | `/docs/buddy` |

| Request                        | Description        |
| ------------------------------ | ------------------ |
| `POST /api/buddy/card`         | Create a card      |
| `GET /api/buddy/card`          | Get all cards      |
| `PUT /api/buddy/card`          | Update a card      |
| `DELETE /api/buddy/card`       | Delete a card      |
| `GET /api/buddy/card`          | Get one card       |
| `GET /api/buddy/card/own`      | Get own cards      |
| `GET /api/buddy/card/other`    | Get other cards    |
| `GET /api/buddy/card/accept`   | Accept card        |
| `GET /api/buddy/card/accepted` | Get accepted cards |

### Chat

|         |              |
| ------- | ------------ |
| Base    | `/api/chat`  |
| Version | `.V1`        |
| Docs    | `/docs/chat` |

| Request                  | Description      |
| ------------------------ | ---------------- |
| `POST /api/chat`         | Create a chat    |
| `GET /api/chat`          | Get one chat     |
| `PUT /api/chat`          | Update chat info |
| `POST /api/chat/message` | Send message     |
| `GET /api/chat/own`      | Get own chats    |

## Javascript Usage (no Auth requests)

### Axios

```js
import qs from 'qs'

let data = qs.stringify({
  {parameterName}: {value}
});
axios
  .{typeRequest}(apiURL + "/{requestName}", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
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
import qs from 'qs'

fetch("apiURL" + "/{requestName}", {
  method: '{typeRequest}',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: qs.stringify({
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

### `V0.4`

#### Changelog

- Auth token changes to consist of more credentials
- Card changes to new Auth token
  - Card requires less parameters to fill in card values due to usage of token data
  - Modifed Buddy Docs

### `V0.5`

#### Changelog

- Chat Implementation
