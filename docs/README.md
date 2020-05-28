# Global Buddy

> Version: `0.1`

> Author:

| Base name | URL                                       |
| --------- | ----------------------------------------- |
| API       | `https://global-buddy.herokuapp.com/api`  |
| Docs      | `https://global-buddy.herokuapp.com/docs` |

## API Sections

### User

|         |              |
| ------- | ------------ |
| Base    | `/api/user`  |
| Version | `.V1`        |
| Docs    | `/docs/user` |

| Request                       | Description         |
| ----------------------------- | ------------------- |
| `POST /api/user{params}`      | Create a user       |
| `GET /api/user`               | Get all users       |
| `PUT /api/user`               | Update a user       |
| `DELETE /api/user{params}`    | Delete a user       |
| `GET /api/user{params}`       | Get one user        |
| `POST /api/user/auth{params}` | Authenticate a user |

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

### `V0.2 WIP`

#### Changelog

- Connect MongoDB
- Token Manager (JWT) \*
  - User encrypted \*
- Body request handlers instead of query

\* Might not want to use JWT
