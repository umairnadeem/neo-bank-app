# Neo Bank App

> A modern banking app wrapper that displays your banking information in a convenient manner. Proposed features include a graph display of your earnings/spending and the ability to send/recieve money. 

## Table of Contents

1. [Requirements](#requirements)
2. [Usage](#Usage)
3. [API Routes](#REST-API-Routes)
4. [API Examples](#API-Examples)
5. [Testing](#Testing)
6. [Future Features](#Future-features)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 8.10.0

## Usage
Insert API client ID and secret in server/config/indexExample.js, then rename it to index.js.
 
From within the root directory:
```sh
npm install
npm run react-dev
npm start
```
- In a browser, go to: localhost:3000

## Credentials
| Type  | Value | Description |
| ------------- | ------------- |------------- |
| Username  | ```synapse_good```  | Working username |
| Password  | ```test1234```  | Working password |
| MFA  | ```test_answer```  | Takes you to dashboard |
| MFA  | ```again```  | Requires another MFA step |

## REST API Routes

| Type  | Route | Description |
| ------------- | ------------- |------------- |
| POST  | ```/api/v1/users/create```  | Creates a user with a given username and password in body |
| POST  | ```/api/v1/users/authenticate```  | Authenticate a user with the provided MFA key |
## API Examples

```POST: /api/v1/users/authenticate```
- Authenticate a user (MFA):
```
{
  data: {
  error_code: '0',
  http_code: '200',
  limit: 2,
  node_count: 2,
  nodes: [{
    ...
    }]
  }
}
  ```


## Testing

From within the root directory:
```sh
npm test
```

## Future features
Todo:
  - Add timeline showing transactions over time
  - Allow money transfer
  - Show money-in/money-out for each account
  - Allow switching account to change graph
