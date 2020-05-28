# Global Buddy

> Version: `0.1`

> Author:

| Base name | URL          |
| --------- | ------------ |
| User API  | `/api/user`  |
| User Docs | `/docs/user` |

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
- Added express endpoints
  - Added user API
    - Added default response

### `V0.2 WIP`

#### Changelog

- Connect MongoDB
- Token Manager (JWT) \*
  - User encrypted \*
- Body request handlers instead of query
