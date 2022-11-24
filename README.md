# AesirX BI

## About

AesirX BI is our Open Source Business Intelligence as a Service (BIaaS) Solution

Find out more in [https://bi.aesirx.io](https://bi.aesirx.io)

## Development setup
### Setup 1st party server for AesirX Analytics
Please follow instruction: [https://github.com/aesirxio/analytics-1stparty](https://github.com/aesirxio/analytics-1stparty)
### Configure

1. Get your `REACT_APP_CLIENT_SECRET` key from https://bi.aesirx.io by creating an account.
1. Rename the `.env.dist` file to `.env`.
1. Replace the `REACT_APP_CLIENT_SECRET` in the `.env` file with the one provided in your profile account.
1. Replace the `REACT_APP_ENDPOINT_URL` in the `.env` file with the link to your `1st party server for AesirX Analytics`.
1. Rename the `src/data-stream.json.dist` file to `src/data-stream.json`.
1. Replace the `name` and `domain` to the your data-stream endpoint.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm build`

Get a full build and install it in your favorite web server.