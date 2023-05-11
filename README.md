# AesirX PIM

## About

AesirX PIM is our Open-Source Product Information Management as a Service (PIMaaS) Solution

Find out more in [https://pim.aesirx.io](https://pim.aesirx.io)

## Development setup
### Configure

1. Rename the `.env.dist` file to `.env`.
2. Replace license keys in the `.env` file with the one provided in your profile account.
   1. `REACT_APP_SSO_CLIENT_ID` replace this with the provided `REACT_APP_SSO_CLIENT_ID` from https://pim.aesirx.io
   2. `REACT_APP_SSO_CLIENT_SECRET` replace this with the provided `REACT_APP_SSO_CLIENT_SECRET` from https://pim.aesirx.io

### `yarn install`

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Get a full build and install it in your favorite web server.

## Dockerize

#### Production
`docker compose -f "docker-compose.yml" up -d --build`