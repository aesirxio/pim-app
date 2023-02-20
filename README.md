# AesirX PIM

## About

AesirX PIM is our Open-Source Product Information Management as a Service (PIMaaS) Solution

Find out more in [https://pim.aesirx.io](https://pim.aesirx.io)

## Development setup
### Configure

1. Get your `REACT_APP_CLIENT_SECRET` key from https://pim.aesirx.io by creating an account.
2. Rename the `.env.dist` file to `.env`.
3. Replace the `REACT_APP_CLIENT_SECRET` in the `.env` file with the one provided in your profile account.
4. Replace license keys in the `.env` file with the one provided in your profile account.
   1. `REACT_APP_CLIENT_SECRET` replace this with the provided `REACT_APP_CLIENT_SECRET` from https://pim.aesirx.io
   2. `REACT_APP_LICENSE` replace this with the provided `REACT_APP_LICENSE` from https://pim.aesirx.io
   3. `REACT_APP_SSO_CLIENT_ID` replace this with the provided `REACT_APP_SSO_CLIENT_ID` from https://pim.aesirx.io
   4. `REACT_APP_SSO_CLIENT_SECRET` replace this with the provided `REACT_APP_SSO_CLIENT_SECRET` from https://pim.aesirx.io
   5. `REACT_APP_DAM_LICENSE` replace this with the provided `REACT_APP_DAM_LICENSE` from https://dam.aesirx.io/
5. Replace the `REACT_APP_ENDPOINT_URL` in the `.env` file with the link to your server.

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Get a full build and install it in your favorite web server.

## Dockerize

#### Production
`docker compose -f "docker-compose.yml" up -d --build`